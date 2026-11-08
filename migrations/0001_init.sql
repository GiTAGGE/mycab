CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  status TEXT NOT NULL,
  origin_label TEXT NOT NULL,
  destination_label TEXT NOT NULL,
  date TEXT,
  return_date TEXT,
  passengers INTEGER NOT NULL,
  vehicle_id TEXT,
  estimated_fare INTEGER,
  intent TEXT NOT NULL,
  landing_page TEXT,
  source TEXT,
  campaign TEXT,
  keyword TEXT,
  gclid TEXT,
  fbclid TEXT,
  gbraid TEXT,
  wbraid TEXT,
  notes TEXT,
  attribution_json TEXT NOT NULL,
  whatsapp_url TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_gclid ON leads (gclid);

CREATE TABLE IF NOT EXISTS conversion_events (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  destination TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_id TEXT NOT NULL,
  status TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  error TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_conversions_created ON conversion_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversions_status ON conversion_events (status);
CREATE INDEX IF NOT EXISTS idx_conversions_lead ON conversion_events (lead_id);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  reset_at TEXT NOT NULL
);
