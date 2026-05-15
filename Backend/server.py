from reporter import generate_report
from analyzer import analyze_all_articles
from extractor import enrich_all_articles
from crawler import crawl_all_sources
import sys
import os
import json
import asyncio
import threading
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import your pipeline modules
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CAPSTONE_DIR = Path(__file__).parent
REPORT_PATH = CAPSTONE_DIR / "threat_report.json"

# Shared pipeline state
state = {
    "status": "idle",     # idle | running | complete | error
    "stage": None,        # crawling | enriching | analyzing | reporting
    "stage_index": 0,
    "error": None,
}


@app.get("/api/report")
def get_report():
    if not REPORT_PATH.exists():
        return {"error": "No report found — run the pipeline first"}
    return json.loads(REPORT_PATH.read_text(encoding="utf-8"))


@app.get("/api/status")
def get_status():
    return state


@app.post("/api/run")
def run_pipeline_endpoint():
    if state["status"] == "running":
        return {"error": "Pipeline already running"}

    state.update({
        "status": "running",
        "stage": "crawling",
        "stage_index": 0,
        "error": None,
    })

    thread = threading.Thread(target=run_pipeline_blocking, daemon=True)
    thread.start()
    return {"started": True}


def run_pipeline_blocking():
    """Run the full pipeline, updating shared state at each stage."""
    try:
        if sys.platform == "win32":
            asyncio.set_event_loop_policy(
                asyncio.WindowsProactorEventLoopPolicy())

        # Stage 1 — Crawl
        state["stage"] = "crawling"
        state["stage_index"] = 0
        articles = asyncio.run(crawl_all_sources())
        if not articles:
            state.update({"status": "error", "error": "No articles crawled"})
            return

        # Stage 2 — Enrich
        state["stage"] = "enriching"
        state["stage_index"] = 1
        enriched = enrich_all_articles(articles, limit=10)
        for article in enriched:
            if "summary" in article and article["summary"]:
                article["summary"] = article["summary"][:150].rstrip() + "..."

        # Stage 3 — Analyze
        state["stage"] = "analyzing"
        state["stage_index"] = 2
        analyzed = analyze_all_articles(enriched)

        # Stage 4 — Report
        state["stage"] = "reporting"
        state["stage_index"] = 3
        generate_report(analyzed)

        state.update({
            "status": "complete",
            "stage": None,
            "stage_index": 4,
        })

    except Exception as e:
        state.update({"status": "error", "error": str(e)})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
