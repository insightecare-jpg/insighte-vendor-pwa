-- ============================================================
-- Migration: Final Data Modernization & Diverse Expansion
-- Created: 2026-04-21
-- Description: Final cleanup of deprecated profiles (Rahul Iyer) 
-- and expansion of diverse expert pool for the 2016 DNA.
-- ============================================================

-- 1. CLEANUP DEPRECATED PROFILES ----------------------------------
-- Ensuring Rahul Iyer is completely removed from all related tables
DELETE FROM public.provider_outcomes WHERE partner_id IN (SELECT id FROM public.partners WHERE slug = 'rahul-iyer' OR name ILIKE '%Rahul Iyer%');
DELETE FROM public.provider_fit_items WHERE partner_id IN (SELECT id FROM public.partners WHERE slug = 'rahul-iyer' OR name ILIKE '%Rahul Iyer%');
DELETE FROM public.services WHERE partner_id IN (SELECT id FROM public.partners WHERE slug = 'rahul-iyer' OR name ILIKE '%Rahul Iyer%');
DELETE FROM public.partners WHERE slug = 'rahul-iyer' OR name ILIKE '%Rahul Iyer%';

-- 2. INSERT NEW DIVERSE EXPERTS -----------------------------------
INSERT INTO public.partners 
(name, slug, category, provider_type, bio, about, approach, rating, review_count, experience_years, first_session_price, location, city, mode, session_modes, age_groups, is_featured, booking_count, verified_sessions_count, specializations, services, approval_status, suitability_notes)
VALUES
(
  'Zoya Rehman',
  'zoya-rehman',
  'Psychology',
  'Child & Adolescent Psychologist',
  'Specializing in social anxiety, school refusal, and emotional resilience.',
  'Zoya has 9 years of experience helping children navigate the complexities of social-emotional development. She uses a mix of CBT and mindfulness-based interventions to build a safe internal registry for neurodivergent teens.',
  'Empathetic and Narrative-based. Zoya focuses on the child''s "lived experience" to reframe challenges as unique developmental signatures.',
  4.9,
  74,
  9,
  1600,
  'HSR Layout, Bangalore',
  'Bangalore',
  'Hybrid',
  ARRAY['Online', 'Clinic'],
  ARRAY['Primary (6-10)', 'Adolescents (10+)', 'Young Adults (19+)'],
  true,
  240,
  580,
  ARRAY['Social Anxiety', 'School Refusal', 'Emotional Regulation', 'Identity'],
  ARRAY['Initial Assessment', 'Therapy Session', 'Adolescent Support Group'],
  'LIVE',
  'Best for adolescents struggling with social transitions or those needing a safe space to explore their neurodivergent identity.'
),
(
  'Karthik Vishwanathan',
  'karthik-vishwanathan',
  'Occupational Therapy',
  'Sr. Occupational Therapist (Sensory Integration)',
  'Architecting independence through high-support sensory diets.',
  'Karthik is an expert in managing high-support sensory needs for children with complex developmental profiles. He integrates AAC and functional mobility into every session.',
  'High-Intensity SI. Karthik believes that every child can achieve motor autonomy if given the right sensory "anchors" and tools.',
  4.8,
  112,
  11,
  1400,
  'Kottivakkam, Chennai',
  'Chennai',
  'Clinic',
  ARRAY['Clinic', 'Home'],
  ARRAY['Toddlers (2-4)', 'Pre-Primary (4-6)', 'Primary (6-10)'],
  false,
  310,
  720,
  ARRAY['Sensory Integration', 'Motor Planning', 'AAC Integration', 'Functional Mobility'],
  ARRAY['OT Evaluation', '1:1 Sensory Session', 'Home Environmental Audit'],
  'LIVE',
  'Ideal for non-verbal children with significant sensory-motor planning challenges.'
),
(
  'Dr. Elizabeth Kurien',
  'elizabeth-kurien',
  'Medical',
  'Developmental Pediatrician',
  'Guiding families from first diagnosis to a lifelong developmental roadmap.',
  'Dr. Elizabeth is a leading pediatrician with 18 years of clinical expertise. She doesn''t just diagnose; she builds the foundational strategy that coordinates all other therapies.',
  'Evidence-Led & Holistic. She focuses on the biological and neurological intersections of development to ensure every therapy is medically optimized.',
  5.0,
  256,
  18,
  2500,
  'MG Road, Kochi',
  'Kochi',
  'Clinic',
  ARRAY['Clinic'],
  ARRAY['Toddlers (2-4)', 'Pre-Primary (4-6)', 'Primary (6-10)', 'Adolescents (10+)', 'Young Adults (19+)'],
  true,
  940,
  2100,
  ARRAY['Early Diagnosis', 'Developmental Mapping', 'Nutritional Support', 'Neurological Review'],
  ARRAY['Diagnostic Consultation', 'Developmental Review', 'Parent Strategy Call'],
  'LIVE',
  'The "North Star" expert for families who feel overwhelmed by conflicting therapy advice or are at the start of their journey.'
),
(
  'Tenzin Choedon',
  'tenzin-choedon',
  'Special Education',
  'Remedial Learning Specialist',
  'Transforming literacy hurdles into academic superpowers using MSL.',
  'Tenzin is a multi-linguistic remedial educator focused on dyslexic and hyperlexic learning styles. She makes reading a spatial and tactical experience.',
  'Multi-Sensory Structured Literacy (MSL). Tenzin uses visual-spatial anchors to help children decode language without the stress of traditional rote learning.',
  4.7,
  58,
  7,
  1000,
  'Online',
  'Online',
  'Online',
  ARRAY['Online'],
  ARRAY['Primary (6-10)', 'Adolescents (10+)'],
  false,
  156,
  420,
  ARRAY['Dyslexia Support', 'Executive Functioning', 'Literacy Scaffolding', 'Study Skills'],
  ARRAY['Literacy Audit', '1:1 Remedial Session', 'IEP Goal Setting'],
  'LIVE',
  'Perfect for students in mainstream schools who are falling behind in reading or writing and need a specialized, stress-free boost.'
);

-- 3. INSERT OUTCOMES & FIT ITEMS ----------------------------------
DO $$
DECLARE
    zoya_id UUID;
    karthik_id UUID;
    liz_id UUID;
    tenzin_id UUID;
BEGIN
    SELECT id INTO zoya_id FROM partners WHERE slug = 'zoya-rehman';
    SELECT id INTO karthik_id FROM partners WHERE slug = 'karthik-vishwanathan';
    SELECT id INTO liz_id FROM partners WHERE slug = 'elizabeth-kurien';
    SELECT id INTO tenzin_id FROM partners WHERE slug = 'tenzin-choedon';

    -- Zoya Outcomes
    IF zoya_id IS NOT NULL THEN
        INSERT INTO provider_outcomes (partner_id, title, description, timeframe) VALUES
        (zoya_id, 'Emotional Safety', 'Adolescent identifies the therapy space as a non-judgmental sanctuary.', 'After 2 weeks'),
        (zoya_id, 'Anxiety Anchoring', 'Implementation of 3 core grounding techniques for school triggers.', 'After 3 weeks');
        INSERT INTO provider_fit_items (partner_id, content, is_positive) VALUES
        (zoya_id, 'Teens seeking an empathetic, clinical space to talk', true),
        (zoya_id, 'Acute behavioural aggression requiring physical restraint', false);
    END IF;

    -- Elizabeth Outcomes
    IF liz_id IS NOT NULL THEN
        INSERT INTO provider_outcomes (partner_id, title, description, timeframe) VALUES
        (liz_id, 'Clinical Clarity', 'A unified developmental roadmap mapping all necessary medical and therapeutic interventions.', 'After 1 session'),
        (liz_id, 'Bio-Regulational Balance', 'Optimization of sleep and nutrition to support active therapy output.', 'After 1 month');
    END IF;

    -- Tenzin Outcomes
    IF tenzin_id IS NOT NULL THEN
        INSERT INTO provider_outcomes (partner_id, title, description, timeframe) VALUES
        (tenzin_id, 'Decoding Breakthrough', 'Child begins to consistently decode 3-letter blends without hesitation.', 'After 1 month'),
        (tenzin_id, 'Executive Confidence', 'Student starts using a visual planner for homework without parent prompting.', 'After 2 months');
    END IF;
END $$;
