-- ============================================================
-- Migration: Sovereign Sanctuary Final Modernization
-- Created: 2026-04-21
-- Description: 
-- 1. Safely ensures expert trust schema exists.
-- 2. COMPLETELY purges Rahul Iyer and legacy clinical profiles.
-- 3. Seeds 4 high-impact, diverse experts using robust dollar-quoting.
-- 4. Corrects neutral language (Educators/Therapists).
-- ============================================================

-- 1. SCHEMA STABILITY --------------------------------------------
DO $$ 
BEGIN
    -- Ensure columns exist in partners
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='partners' AND column_name='suitability_notes') THEN
        ALTER TABLE public.partners ADD COLUMN suitability_notes TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='partners' AND column_name='verified_sessions_count') THEN
        ALTER TABLE public.partners ADD COLUMN verified_sessions_count INTEGER DEFAULT 0;
    END IF;

    -- Ensure outcomes table exists
    CREATE TABLE IF NOT EXISTS public.provider_outcomes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        timeframe TEXT,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    
    -- Ensure fit items table exists
    CREATE TABLE IF NOT EXISTS public.provider_fit_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        is_positive BOOLEAN DEFAULT true,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
END $$;

-- 2. RLS & POLICIES ----------------------------------------------
ALTER TABLE public.provider_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_fit_items ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public outcomes are readable') THEN
        CREATE POLICY "Public outcomes are readable" ON public.provider_outcomes FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public fit items are readable') THEN
        CREATE POLICY "Public fit items are readable" ON public.provider_fit_items FOR SELECT USING (true);
    END IF;
END $$;

-- 3. THE PURGE ----------------------------------------------------
-- Remove Rahul Iyer and any stray references
DELETE FROM public.provider_outcomes WHERE partner_id IN (SELECT id FROM public.partners WHERE slug = 'rahul-iyer' OR name ILIKE '%Rahul Iyer%');
DELETE FROM public.provider_fit_items WHERE partner_id IN (SELECT id FROM public.partners WHERE slug = 'rahul-iyer' OR name ILIKE '%Rahul Iyer%');
DELETE FROM public.services WHERE partner_id IN (SELECT id FROM public.partners WHERE slug = 'rahul-iyer' OR name ILIKE '%Rahul Iyer%');
DELETE FROM public.partners WHERE slug = 'rahul-iyer' OR name ILIKE '%Rahul Iyer%';

-- 4. DIVERSE EXPERT SEEDING (NEUTRAL LANGUAGE) --------------------
-- Using dollar quoting $$ to prevent any unterminated string issues

-- 4.1 Arulselvan Murugan
INSERT INTO public.partners 
(name, slug, category, provider_type, bio, about, approach, rating, review_count, experience_years, first_session_price, location, city, mode, session_modes, age_groups, is_featured, booking_count, verified_sessions_count, specializations, services, approval_status, suitability_notes)
VALUES
(
  'Arulselvan Murugan',
  'arulselvan-murugan',
  'Speech Therapy',
  'Speech & Language Pathologist',
  $$Expert in early language intervention and social communication bridges.$$,
  $$Arulselvan is a seasoned SLP with over 12 years of experience in facilitating radical communication shifts in non-verbal children. His work focuses on empowering children to find their own voice through a mix of AAC and naturalistic play.$$,
  $$Focuses on "Communication over Compliance". Arulselvan uses high-fidelity sensory-integrated speech protocols that respect the child's pace.$$,
  4.9, 156, 12, 1200, 'Indiranagar, Bangalore', 'Bangalore', 'Hybrid',
  ARRAY['Online', 'Clinic', 'Home'], ARRAY['Toddlers (2-4)', 'Pre-Primary (4-6)', 'Primary (6-10)'],
  true, 450, 1200,
  ARRAY['Early Intervention', 'Social Skills', 'AAC', 'Apraxia'],
  ARRAY['Diagnostic Assessment', '1:1 Speech Session', 'Social Communication Group'],
  'LIVE',
  $$Ideal for non-verbal children and families seeking a neuro-affirmative, patient-first approach to communication.$$
) ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  provider_type = EXCLUDED.provider_type,
  bio = EXCLUDED.bio,
  about = EXCLUDED.about,
  approach = EXCLUDED.approach,
  suitability_notes = EXCLUDED.suitability_notes;

-- 4.2 Zoya Rehman
INSERT INTO public.partners 
(name, slug, category, provider_type, bio, about, approach, rating, review_count, experience_years, first_session_price, location, city, mode, session_modes, age_groups, is_featured, booking_count, verified_sessions_count, specializations, services, approval_status, suitability_notes)
VALUES
(
  'Zoya Rehman',
  'zoya-rehman',
  'Psychology',
  'Child & Adolescent Therapist',
  $$Specializing in social anxiety, school refusal, and emotional resilience.$$,
  $$Zoya has 9 years of experience helping children navigate the complexities of social-emotional development. She builds safe internal registries for neurodivergent teens.$$,
  $$Empathetic and Narrative-based. Zoya focuses on the child's "lived experience" to reframe challenges as unique developmental signatures.$$,
  4.9, 74, 9, 1600, 'HSR Layout, Bangalore', 'Bangalore', 'Hybrid',
  ARRAY['Online', 'Clinic'], ARRAY['Primary (6-10)', 'Adolescents (10+)', 'Young Adults (19+)'],
  true, 240, 580,
  ARRAY['Social Anxiety', 'School Refusal', 'Emotional Regulation', 'Identity'],
  ARRAY['Initial Assessment', 'Therapy Session', 'Adolescent Support Group'],
  'LIVE',
  $$Best for adolescents struggling with social transitions or those needing a safe space to explore their neurodivergent identity.$$
) ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  provider_type = EXCLUDED.provider_type,
  bio = EXCLUDED.bio,
  about = EXCLUDED.about,
  approach = EXCLUDED.approach,
  suitability_notes = EXCLUDED.suitability_notes;

-- 4.3 Karthik Vishwanathan
INSERT INTO public.partners 
(name, slug, category, provider_type, bio, about, approach, rating, review_count, experience_years, first_session_price, location, city, mode, session_modes, age_groups, is_featured, booking_count, verified_sessions_count, specializations, services, approval_status, suitability_notes)
VALUES
(
  'Karthik Vishwanathan',
  'karthik-vishwanathan',
  'Occupational Therapy',
  'Senior Therapist (SI)',
  $$Architecting independence through high-support sensory diets.$$,
  $$Karthik is an expert in managing high-support sensory needs for children with complex developmental profiles. He integrates AAC and functional mobility into every session.$$,
  $$High-Intensity SI. Karthik believes that every child can achieve motor autonomy if given the right sensory "anchors" and tools.$$,
  4.8, 112, 11, 1400, 'Kottivakkam, Chennai', 'Chennai', 'Clinic',
  ARRAY['Clinic', 'Home'], ARRAY['Toddlers (2-4)', 'Pre-Primary (4-6)', 'Primary (6-10)'],
  false, 310, 720,
  ARRAY['Sensory Integration', 'Motor Planning', 'AAC Integration', 'Functional Mobility'],
  ARRAY['OT Evaluation', '1:1 Sensory Session', 'Home Environmental Audit'],
  'LIVE',
  $$Ideal for non-verbal children with significant sensory-motor planning challenges.$$
) ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  provider_type = EXCLUDED.provider_type,
  bio = EXCLUDED.bio,
  about = EXCLUDED.about,
  approach = EXCLUDED.approach,
  suitability_notes = EXCLUDED.suitability_notes;

-- 4.4 Tenzin Choedon
INSERT INTO public.partners 
(name, slug, category, provider_type, bio, about, approach, rating, review_count, experience_years, first_session_price, location, city, mode, session_modes, age_groups, is_featured, booking_count, verified_sessions_count, specializations, services, approval_status, suitability_notes)
VALUES
(
  'Tenzin Choedon',
  'tenzin-choedon',
  'Special Education',
  'Remedial Educator',
  $$Transforming literacy hurdles into academic superpowers using MSL.$$,
  $$Tenzin is a multi-linguistic remedial educator focused on dyslexic and hyperlexic learning styles. She makes reading a spatial and tactical experience.$$,
  $$Multi-Sensory Structured Literacy (MSL). Tenzin uses visual-spatial anchors to help children decode language without the stress of rote learning.$$,
  4.7, 58, 7, 1000, 'Online', 'Online', 'Online',
  ARRAY['Online'], ARRAY['Primary (6-10)', 'Adolescents (10+)'],
  false, 156, 420,
  ARRAY['Dyslexia Support', 'Executive Functioning', 'Literacy Scaffolding', 'Study Skills'],
  ARRAY['Literacy Audit', '1:1 Remedial Session', 'IEP Goal Setting'],
  'LIVE',
  $$Perfect for students in mainstream schools who are falling behind in reading or writing and need a specialized boost.$$
) ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  provider_type = EXCLUDED.provider_type,
  bio = EXCLUDED.bio,
  about = EXCLUDED.about,
  approach = EXCLUDED.approach,
  suitability_notes = EXCLUDED.suitability_notes;

-- 5. SEED OUTCOMES & FIT ITEMS -----------------------------------
DO $$
DECLARE
    arul_id UUID;
    zoya_id UUID;
    karthik_id UUID;
    tenzin_id UUID;
BEGIN
    SELECT id INTO arul_id FROM partners WHERE slug = 'arulselvan-murugan';
    SELECT id INTO zoya_id FROM partners WHERE slug = 'zoya-rehman';
    SELECT id INTO karthik_id FROM partners WHERE slug = 'karthik-vishwanathan';
    SELECT id INTO tenzin_id FROM partners WHERE slug = 'tenzin-choedon';

    -- Arulselvan Outcomes
    IF arul_id IS NOT NULL THEN
        DELETE FROM provider_outcomes WHERE partner_id = arul_id;
        INSERT INTO provider_outcomes (partner_id, title, description, timeframe, order_index) VALUES
        (arul_id, 'Joint Attention Spark', 'Consistent engagement and shared focus during play activities.', 'After 2 weeks', 1),
        (arul_id, 'Functional Vocalization', 'Increase in spontaneous requests for needs using words or signs.', 'After 1 month', 2);
    END IF;

    -- Zoya Outcomes
    IF zoya_id IS NOT NULL THEN
        DELETE FROM provider_outcomes WHERE partner_id = zoya_id;
        INSERT INTO provider_outcomes (partner_id, title, description, timeframe, order_index) VALUES
        (zoya_id, 'Emotional Safety', 'Adolescent identifies the therapy space as a non-judgmental sanctuary.', 'After 2 weeks', 1),
        (zoya_id, 'Anxiety Anchoring', 'Implementation of 3 core grounding techniques for school triggers.', 'After 3 weeks', 2);
    END IF;

    -- Karthik Outcomes
    IF karthik_id IS NOT NULL THEN
        DELETE FROM provider_outcomes WHERE partner_id = karthik_id;
        INSERT INTO provider_outcomes (partner_id, title, description, timeframe, order_index) VALUES
        (karthik_id, 'Sensory Regulation', 'Measurable reduction in sensory defensive behaviors in high-noise environments.', 'After 4 weeks', 1),
        (karthik_id, 'Motor Autonomy', 'Child demonstrates independent execution of 2+ complex daily living tasks.', 'After 3 months', 2);
    END IF;

    -- Tenzin Outcomes
    IF tenzin_id IS NOT NULL THEN
        DELETE FROM provider_outcomes WHERE partner_id = tenzin_id;
        INSERT INTO provider_outcomes (partner_id, title, description, timeframe, order_index) VALUES
        (tenzin_id, 'Decoding Confidence', 'Student starts decoding 3-letter blends independently.', 'After 3 weeks', 1),
        (tenzin_id, 'Executive Control', 'Student consistently uses visual schedules for academic tasks.', 'After 2 months', 2);
    END IF;
END $$;
