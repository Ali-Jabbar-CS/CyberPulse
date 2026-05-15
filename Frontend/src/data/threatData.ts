import { ThreatData } from '../types/threat';

export const threatData: ThreatData = {
  report_metadata: {
    generated_at: '2026-05-14T23:33:00Z',
    total_articles: 12,
    sources: [
    'thehackernews.com',
    'bleepingcomputer.com',
    'krebsonsecurity.com',
    'cisa.gov']

  },
  statistics: {
    by_threat_level: { Critical: 4, High: 5, Medium: 2, Low: 1 },
    by_attack_type: {
      RCE: 4,
      Phishing: 2,
      'Supply Chain': 3,
      'Privilege Escalation': 2,
      DDoS: 1
    },
    by_sector: {
      Defense: 12,
      Government: 9,
      'Critical Infrastructure': 8,
      Financial: 5,
      Healthcare: 3,
      Energy: 6
    },
    cves_identified: [
    'CVE-2026-20182',
    'CVE-2026-0300',
    'CVE-2026-1194',
    'CVE-2026-8832',
    'CVE-2026-4419'],

    patch_available_count: 5
  },
  articles: [
  {
    id: 'art-001',
    title: 'Cisco Catalyst SD-WAN Auth Bypass Actively Exploited',
    source: 'thehackernews.com',
    url: 'https://thehackernews.com/cisco-sdwan-bypass',
    cve_ids: ['CVE-2026-20182'],
    attack_type: 'Privilege Escalation',
    patch_available: true,
    analysis: {
      threat_level: 'Critical',
      priority_score: 10,
      threat_summary:
      'Unauthenticated attacker can bypass auth on Cisco SD-WAN Controller via crafted HTTP requests.',
      affected_systems: ['Cisco Catalyst SD-WAN Controller v20.x', 'vManage'],
      affected_sectors: ['Defense', 'Government', 'Critical Infrastructure'],
      recommended_action:
      'Apply Cisco patch immediately and isolate affected systems from public internet.',
      relevance_to_defense:
      'SD-WAN controllers are critical to DOD network architecture and remote site connectivity.',
      attack_vector:
      'Remote unauthenticated exploitation via exposed management interfaces.'
    }
  },
  {
    id: 'art-002',
    title:
    'Lazarus Group npm Supply Chain Attack Targets Defense Contractors',
    source: 'bleepingcomputer.com',
    url: 'https://bleepingcomputer.com/lazarus-npm-supply-chain',
    cve_ids: [],
    attack_type: 'Supply Chain',
    patch_available: false,
    analysis: {
      threat_level: 'Critical',
      priority_score: 9.5,
      threat_summary:
      'Malicious npm packages mimicking popular internal defense libraries found exfiltrating environment variables.',
      affected_systems: [
      'CI/CD Pipelines',
      'Developer Workstations (Node.js)'],

      affected_sectors: ['Defense', 'Technology'],
      recommended_action:
      'Audit package.json dependencies, block external npm resolution for internal scopes.',
      relevance_to_defense:
      'Directly targets defense contractor software supply chains to steal AWS/Azure credentials.',
      attack_vector:
      'Dependency confusion / Typosquatting in public npm registry.'
    }
  },
  {
    id: 'art-003',
    title: 'Microsoft Exchange Zero-Day Phishing Campaign',
    source: 'krebsonsecurity.com',
    url: 'https://krebsonsecurity.com/exchange-zero-day',
    cve_ids: ['CVE-2026-0300', 'CVE-2026-1194'],
    attack_type: 'RCE',
    patch_available: true,
    analysis: {
      threat_level: 'High',
      priority_score: 8.8,
      threat_summary:
      'Chained vulnerabilities allow RCE on Exchange servers after successful phishing of low-privilege user.',
      affected_systems: ['Exchange Server 2019', 'Exchange Server 2022'],
      affected_sectors: ['Government', 'Financial', 'Defense'],
      recommended_action:
      'Deploy out-of-band security update KB503441. Reset potentially compromised credentials.',
      relevance_to_defense:
      'High risk of lateral movement into classified networks if unclassified email servers are breached.',
      attack_vector: 'Spear-phishing leading to authenticated RCE.'
    }
  },
  {
    id: 'art-004',
    title: "ICS/SCADA Systems Targeted by New 'IronGrid' Malware",
    source: 'cisa.gov',
    url: 'https://cisa.gov/irongrid-ics-malware',
    cve_ids: ['CVE-2026-8832'],
    attack_type: 'RCE',
    patch_available: false,
    analysis: {
      threat_level: 'Critical',
      priority_score: 9.8,
      threat_summary:
      'Custom malware framework designed to manipulate programmable logic controllers (PLCs) in energy grids.',
      affected_systems: ['Siemens S7 PLCs', 'Schneider Electric Modicon'],
      affected_sectors: ['Energy', 'Critical Infrastructure', 'Defense'],
      recommended_action:
      'Implement strict network segmentation. Monitor for anomalous Modbus/DNP3 traffic.',
      relevance_to_defense:
      'Threatens power continuity for military installations and defense manufacturing bases.',
      attack_vector:
      'Network intrusion followed by specialized OT protocol manipulation.'
    }
  },
  {
    id: 'art-005',
    title: 'Widespread DDoS Campaign Against NATO Logistics Portals',
    source: 'thehackernews.com',
    url: 'https://thehackernews.com/nato-ddos-campaign',
    cve_ids: [],
    attack_type: 'DDoS',
    patch_available: true,
    analysis: {
      threat_level: 'Medium',
      priority_score: 6.5,
      threat_summary:
      'Volumetric and application-layer DDoS attacks disrupting access to unclassified logistics portals.',
      affected_systems: [
      'Web Application Firewalls',
      'Public-facing Portals'],

      affected_sectors: ['Defense', 'Government'],
      recommended_action:
      'Enable advanced DDoS mitigation rulesets and geo-blocking for non-essential regions.',
      relevance_to_defense:
      'Causes operational friction and delays in unclassified logistics coordination.',
      attack_vector: 'Botnet-driven HTTP flood and DNS amplification.'
    }
  }]

};