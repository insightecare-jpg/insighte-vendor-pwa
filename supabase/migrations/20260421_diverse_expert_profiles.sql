-- ============================================================
-- Migration: Diverse Expert Profiles & Naming Correction
-- Created: 2026-04-21
-- Description: Deletes Rahul Iyer (due to naming bias and profile issues),
-- Adds a diverse set of experts with global/diverse Indian backgrounds.
-- ============================================================

-- 1. DELETE RAHUL IYER --------------------------------------------
DELETE FROM public.partners WHERE slug = 'rahul-iyer';

-- 2. INSERT DIVERSE EXPERTS ---------------------------------------
INSERT INTO public.partners 
(name, slug, category, provider_type, bio, about, approach, rating, review_count, experience_years, first_session_price, location, city, mode, session_modes, age_groups, is_featured, booking_count, verified_sessions_count, specializations, services, approval_status, suitability_notes)
VALUES
(
  'Arulselvan Murugan',
  'arulselvan-murugan',
  'Speech Therapy',
  'Speech & Language Pathologist',
  'Expert in early language intervention and social communication bridges.',
  'Arulselvan is a seasoned SLP with over 12 years of experience in facilitating radical communication shifts in non-verbal children. His work focuses on empowering children to find their own voice through a mix of AAC and naturalistic play.',
  'Focuses on "Communication over Compliance". Arulselvan uses high-fidelity sensory-integrated speech protocols that respect the child''s pace.',
  4.9,
  156,
  12,
  1200,
  'Indiranagar, Bangalore',
  'Bangalore',
  'Hybrid',
  ARRAY['Online', 'Clinic', 'Home'],
  ARRAY['Toddlers (2-4)', 'Pre-Primary (4-6)', 'Primary (6-10)'],
  true,
  450,
  1200,
  ARRAY['Early Intervention', 'Social Skills', 'AAC', 'Apraxia'],
  ARRAY['Diagnostic Assessment', '1:1 Speech Session', 'Social Communication Group'],
  'LIVE',
  'Ideal for non-verbal children and families seeking a neuro-affirmative, patient-first approach to communication.'
),
(
  'Fatima Zahra',
  'fatima-zahra',
  'Occupational Therapy',
  'Senior Occupational Therapist',
  'Specializing in sensory processing and sensory-motor integration.',
  'Fatima has dedicated 10 years to creating sensory-safe environments for neurodivergent learners. She is trained in SI and sensory-motor engineering.',
  'Uses a "Sensory-First" model. Before any skill is taught, Fatima ensures the child''s nervous system is regulated and safe.',
  4.8,
  89,
  10,
  1500,
  'Kochi, Kerala',
  'Kochi',
  'Clinic',
  ARRAY['Clinic', 'Home'],
  ARRAY['Toddlers (2-4)', 'Pre-Primary (4-6)', 'Primary (6-10)', 'Adolescents (10+)'],
  false,
  210,
  850,
  ARRAY['Sensory Integration', 'Fine Motor', 'Self-Care', 'Regulation'],
  ARRAY['Sensory Audit', 'OT Session', 'Parent Coaching'],
  'LIVE',
  'Best for children with significant sensory dysregulation who need a structured, clinical OT environment.'
),
(
  'David Raj',
  'david-raj',
  'Behavior Therapy',
  'Behavioral Clinical Specialist',
  'Architecting behavioral autonomy through evidence-based support.',
  'David focuses on "Behavior as Communication". He helps families decode the underlying needs behind complex behaviors to build lasting harmony.',
  'Utilizes Positive Behavior Support (PBS) and trauma-informed care. No-bark, no-bite, purely empathetic behavioral engineering.',
  4.7,
  64,
  8,
  1000,
  'Anna Nagar, Chennai',
  'Chennai',
  'Hybrid',
  ARRAY['Online', 'Home'],
  ARRAY['Primary (6-10)', 'Adolescents (10+)', 'Young Adults (19+)'],
  true,
  180,
  520,
  ARRAY['Behavioral Intervention', 'Crisis Support', 'Social Phobia', 'Autonomy'],
  ARRAY['Behavioral Mapping', 'Coaching Session', 'Home Assessment'],
  'LIVE',
  'Perfect for families dealing with school refusal, social anxiety, or complex behavioral meltdowns in older children.'
),
(
  'Jyothi Mani',
  'jyothi-mani',
  'Special Education',
  'Clinical Special Educator',
  'Bridging academic gaps with strength-based learning strategies.',
  'Jyothi is a pioneer in remedial education for children with learning differences. She transforms academic frustration into mastery through custom scaffolding.',
  'Implements "The Universal Design for Learning" (UDL). Jyothi adapts the curriculum to the child, never the other way around.',
  4.9,
  210,
  15,
  800,
  'Hyderabad, Telangana',
  'Hyderabad',
  'Online',
  ARRAY['Online'],
  ARRAY['Pre-Primary (4-6)', 'Primary (6-10)', 'Adolescents (10+)'],
  false,
  720,
  1500,
  ARRAY['Remedial Education', 'Dyslexia Support', 'Executive Functioning'],
  ARRAY['Learning Profile Audit', '1:1 Remedial Session', 'IEP Consulting'],
  'LIVE',
  'Ideal for students who are struggling in mainstream schools and need intensive remedial support or meta-cognitive strategy training.'
),
(
  'Sandeep Varghese',
  'sandeep-varghese',
  'Psychology',
  'Clinical Psychologist (Child & Adolescent)',
  'Supporting emotional resilience and neuro-affirmative mental health.',
  'Sandeep works with adolescents and young adults on the spectrum to navigate social complexities and clinical anxiety.',
  'Relational and Person-Centered. Sandeep focuses on building a safe therapeutic alliance to address deep-seated emotional needs.',
  4.8,
  120,
  7,
  1800,
  'South Delhi, Delhi',
  'Delhi',
  'Hybrid',
  ARRAY['Online', 'Clinic'],
  ARRAY['Adolescents (10+)', 'Young Adults (19+)'],
  true,
  340,
  600,
  ARRAY['CBT', 'Anxiety', 'Social Navigation', 'Depression'],
  ARRAY['Diagnostic Intake', 'Therapy Session', 'Adolescent Group'],
  'LIVE',
  'The go-to expert for teenagers seeking to understand their neurodivergent identity and manage social/academic stress.'
);

-- 3. INSERT OUTCOMES & FIT ITEMS FOR NEW EXPERTS -------------------
DO $$
DECLARE
    arul_id UUID;
    fatima_id UUID;
    david_id UUID;
    jyothi_id UUID;
    sandeep_id UUID;
BEGIN
    SELECT id INTO arul_id FROM partners WHERE slug = 'arulselvan-murugan';
    SELECT id INTO fatima_id FROM partners WHERE slug = 'fatima-zahra';
    SELECT id INTO david_id FROM partners WHERE slug = 'david-raj';
    SELECT id INTO jyothi_id FROM partners WHERE slug = 'jyothi-mani';
    SELECT id INTO sandeep_id FROM partners WHERE slug = 'sandeep-varghese';

    -- Arul Outcomes
    IF arul_id IS NOT NULL THEN
        INSERT INTO provider_outcomes (partner_id, title, description, timeframe) VALUES
        (arul_id, 'Joint Attention Spark', 'Consistent engagement and shared focus during play activities.', 'After 2 weeks'),
        (arul_id, 'Functional Vocalization', 'Increase in spontaneous requests for needs using words or signs.', 'After 1 month');
        INSERT INTO provider_fit_items (partner_id, content, is_positive) VALUES
        (arul_id, 'Non-verbal children with early intervention needs', true),
        (arul_id, 'Families committed to high-engagement play at home', true);
    END IF;

    -- Fatima Outcomes
    IF fatima_id IS NOT NULL THEN
        INSERT INTO provider_outcomes (partner_id, title, description, timeframe) VALUES
        (fatima_id, 'Sensory Baseline', 'Map of all tactile and auditory triggers for the child.', 'After 1 week'),
        (fatima_id, 'Self-Regulation toolkit', 'Child begins using simple co-regulation tools at home.', 'After 1 month');
    END IF;

    -- Sandeep Outcomes
    IF sandeep_id IS NOT NULL THEN
        INSERT INTO provider_outcomes (partner_id, title, description, timeframe) VALUES
        (sandeep_id, 'Safety Establishment', 'The adolescent feels safe and heard in the therapeutic space.', 'After 2 weeks'),
        (sandeep_id, 'Coping Strategy Loop', 'Implementation of 3-5 portable strategies for social anxiety.', 'After 2 months');
    END IF;
END $$;
