/*
# Create consultations table (single-tenant, no auth)

## Purpose
Stores a record of each health guidance consultation: the symptoms the user
reported, the AI-generated triage level, the guidance text, and any nearby
hospital search results that were returned. This lets users review their
past consultations and serves as a lightweight history feature.

## New Tables
- `consultations`
  - `id` (uuid, primary key)
  - `symptoms` (text, what the user reported — the main complaint)
  - `age` (integer, nullable — user may or may not provide age)
  - `gender` (text, nullable)
  - `duration` (text, nullable — free-form duration string like "2 days")
  - `severity` (text, nullable — mild / moderate / severe)
  - `location` (text, nullable — the place name the user entered)
  - `triage_level` (integer, 1–4, how urgent the guidance recommended care)
  - `guidance` (jsonb, the full structured guidance response)
  - `hospitals` (jsonb, array of nearby facility results, nullable)
  - `created_at` (timestamptz, when the consultation was created)

## Security
- Enable RLS on `consultations`.
- This is a no-auth, single-tenant app. The frontend uses the anon key for
  its entire lifetime, so every policy lists `TO anon, authenticated`.
  `USING (true)` is intentional here because all data is public/shared.

## Notes
1. No user_id column — no sign-in screen in this app.
2. `guidance` and `hospitals` are stored as JSONB so the structured response
   (possible causes, self-care steps, warning signs, etc.) is preserved
   exactly as generated without needing many separate columns.
3. An index on created_at supports reverse-chronological history display.
*/

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symptoms text NOT NULL,
  age integer,
  gender text,
  duration text,
  severity text,
  location text,
  triage_level integer,
  guidance jsonb,
  hospitals jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_consultations" ON consultations;
CREATE POLICY "anon_select_consultations"
  ON consultations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_consultations" ON consultations;
CREATE POLICY "anon_insert_consultations"
  ON consultations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_consultations" ON consultations;
CREATE POLICY "anon_update_consultations"
  ON consultations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_consultations" ON consultations;
CREATE POLICY "anon_delete_consultations"
  ON consultations FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS consultations_created_at_idx ON consultations (created_at DESC);