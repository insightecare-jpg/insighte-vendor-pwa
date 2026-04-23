-- ============================================================
-- Migration: Expert Trust & Decision Support Schema
-- Created: 2026-04-20
-- Description: Adds structured outcomes, suitability, and verified stats.
-- ============================================================

-- 1. Extend Partners Table ---------------------------------------
ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS suitability_notes TEXT;
ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS verified_sessions_count INTEGER DEFAULT 0;

-- 2. Create Outcomes Table ----------------------------------------
CREATE TABLE IF NOT EXISTS public.provider_outcomes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    timeframe TEXT, -- e.g. "After 4 weeks", "After 3 months"
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS and set policies
ALTER TABLE public.provider_outcomes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public outcomes are readable" ON public.provider_outcomes;
CREATE POLICY "Public outcomes are readable" ON public.provider_outcomes FOR SELECT USING (true);

-- 3. Create Fit Items Table (Suitability) -------------------------
CREATE TABLE IF NOT EXISTS public.provider_fit_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_positive BOOLEAN DEFAULT true, -- true for "Who this is for", false for "Who this is NOT for"
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS and set policies
ALTER TABLE public.provider_fit_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public fit items are readable" ON public.provider_fit_items;
CREATE POLICY "Public fit items are readable" ON public.provider_fit_items FOR SELECT USING (true);

-- 4. Update search_partners RPC ----------------------------------
-- Adding the new trust columns to the return set.
CREATE OR REPLACE FUNCTION search_partners(
  search_term       text      DEFAULT '',
  selected_specs    text[]    DEFAULT NULL,
  selected_modes    text[]    DEFAULT NULL,
  selected_ages     text[]    DEFAULT NULL,
  target_city       text      DEFAULT NULL,
  require_available boolean   DEFAULT false
)
RETURNS TABLE (
  id                uuid,
  slug              text,
  name              text,
  avatar_url        text,
  category          text,
  specializations   text[],
  services          text[],
  experience_years  integer,
  location          text,
  city              text,
  mode              text,
  session_modes     text[],
  rating            numeric,
  review_count      integer,
  first_session_price integer,
  is_featured       boolean,
  booking_count     integer,
  age_groups        text[],
  bio               text,
  tagline           text,
  about             text,
  approach          text,
  parent_insights   jsonb,
  suitability_notes text,
  verified_sessions_count integer
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.slug,
    p.name,
    p.avatar_url,
    p.category,
    p.specializations,
    p.services,
    p.experience_years,
    p.location,
    p.city,
    p.mode,
    p.session_modes,
    p.rating,
    p.review_count,
    p.first_session_price,
    p.is_featured,
    p.booking_count,
    p.age_groups,
    p.bio,
    p.tagline,
    p.about,
    p.approach,
    p.parent_insights,
    p.suitability_notes,
    p.verified_sessions_count
  FROM partners p
  WHERE
    (p.approval_status = 'APPROVED' OR p.approval_status = 'LIVE')
    AND (
      (search_term IS NULL OR search_term = '')
      OR p.name               ILIKE '%' || search_term || '%'
      OR p.category           ILIKE '%' || search_term || '%'
      OR p.bio                ILIKE '%' || search_term || '%'
      OR p.about              ILIKE '%' || search_term || '%'
      OR p.specializations::text ILIKE '%' || search_term || '%'
      OR p.services::text     ILIKE '%' || search_term || '%'
    )
    AND (
      selected_specs IS NULL
      OR p.category = ANY(selected_specs)
      OR p.services        && selected_specs
      OR p.specializations && selected_specs
    )
    AND (
      selected_modes IS NULL
      OR p.session_modes && selected_modes
      OR p.mode = ANY(selected_modes)
    )
    AND (
      selected_ages IS NULL
      OR p.age_groups && selected_ages
    )
    AND (
      target_city IS NULL
      OR p.city     ILIKE target_city
      OR p.location ILIKE '%' || target_city || '%'
    )
  ORDER BY
    p.is_featured    DESC,
    p.booking_count  DESC,
    p.rating         DESC NULLS LAST;
END;
$$;

-- 5. Seed Initial Data (Pre-population) --------------------------
-- Pre-populating for our two main experts: Dr. Priya Sharma and Mr. Rahul Iyer

DO $$
DECLARE
    priya_id UUID;
    rahul_id UUID;
BEGIN
    SELECT id INTO priya_id FROM partners WHERE slug = 'priya-sharma';
    SELECT id INTO rahul_id FROM partners WHERE slug = 'rahul-iyer';

    -- Seed Priya's Trust Data
    IF priya_id IS NOT NULL THEN
        UPDATE partners SET 
            verified_sessions_count = 450,
            suitability_notes = 'Ideal for families seeking evidence-based behavioral intervention with a focus on long-term autonomy.'
        WHERE id = priya_id;

        INSERT INTO provider_outcomes (partner_id, title, description, timeframe) VALUES
        (priya_id, 'Behavioral Baseline', 'Establish clear trigger mapping and response strategies.', 'After 2 weeks'),
        (priya_id, 'Regulatory Stability', 'Reduction in sensory-driven meltdowns by 40%.', 'After 4 weeks'),
        (priya_id, 'Social Fluency', 'Child begins initiating peer interactions independently.', 'After 3 months');

        INSERT INTO provider_fit_items (partner_id, content, is_positive) VALUES
        (priya_id, 'Children aged 3-12 with ASD or ADHD', true),
        (priya_id, 'Families committed to home-carryover tasks', true),
        (priya_id, 'Acute crisis intervention (Emergency support)', false),
        (priya_id, 'Strictly non-verbal cases without previous assessment', false);
    END IF;

    -- Seed Rahul's Trust Data
    IF rahul_id IS NOT NULL THEN
        UPDATE partners SET 
            verified_sessions_count = 320,
            suitability_notes = ' Rahul uses a high-engagement, play-based approach that works exceptionally well for hesitant communicators.'
        WHERE id = rahul_id;

        INSERT INTO provider_outcomes (partner_id, title, description, timeframe) VALUES
        (priya_id, 'Engagement Spark', 'Child shows increased motivation to vocalize during play.', 'After 1 week'),
        (priya_id, 'Functional Language', 'Ability to communicate primary needs without frustration.', 'After 4 weeks'),
        (priya_id, 'Sentence Expansion', 'Consistency in 3-4 word phrase construction.', 'After 2 months');

        INSERT INTO provider_fit_items (partner_id, content, is_positive) VALUES
        (rahul_id, 'Late talkers and expressive delay cases', true),
        (rahul_id, 'Virtual-friendly learners who love interactive play', true),
        (rahul_id, 'Adult post-stroke rehabilitation', false),
        (rahul_id, 'Severe swallowing (dysphagia) clinical cases', false);
    END IF;
END $$;
