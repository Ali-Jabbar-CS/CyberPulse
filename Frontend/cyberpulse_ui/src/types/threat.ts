export type ThreatLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Analysis {
  threat_level: ThreatLevel;
  priority_score: number;
  threat_summary: string;
  affected_systems: string[];
  affected_sectors: string[];
  recommended_action: string;
  relevance_to_defense: string;
  attack_vector: string;
}

export interface Article {
  id?: string;
  title: string;
  source: string;
  url: string;
  cve_ids: string[];
  attack_type: string;
  patch_available: boolean;
  analysis: Analysis;
  category?: string;
  error?: boolean;
  scraped_at?: string;
  severity_hint?: string;
  affected_software?: string[];
  threat_actor?: string;
  defense_relevance?: string;
  keywords?: string[];
  summary?: string;
}

export interface ThreatData {
  report_metadata: {
    generated_at: string;
    total_articles: number;
    sources: string[];
    pipeline_version?: string;
  };
  statistics: {
    by_threat_level: Record<string, number>;
    by_attack_type: Record<string, number>;
    by_sector: Record<string, number>;
    cves_identified: string[];
    patch_available_count: number;
    top_priority_articles?: Array<{
      title: string;
      priority_score: number;
      threat_level: string;
      url: string;
    }>;
  };
  articles: Article[];
}
