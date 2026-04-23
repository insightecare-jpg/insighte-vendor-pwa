-- ============================================================
-- Migration: Refine Expert Trust Data & Expand Seeds
-- Created: 2026-04-21
-- Description: Fixes Rahul's outcome IDs and adds seeds for more experts.
-- ============================================================

-- 1. Fix Rahul's Data (Bug Fix) ----------------------------------
-- Rahul's outcomes were accidentally assigned to priya_id in the previous migration.
DO $$
DECLARE
    priya_id UUID;
    rahul_id UUID;
BEGIN
    SELECT id INTO priya_id FROM partners WHERE slug = 'priya-sharma';
    SELECT id INTO rahul_id FROM partners WHERE slug = 'rahul-iyer';

    IF rahul_id IS NOT NULL AND priya_id IS NOT NULL THEN
        -- Move the speech-related outcomes to Rahul
        UPDATE provider_outcomes 
        SET partner_id = rahul_id 
        WHERE partner_id = priya_id 
        AND title IN ('Engagement Spark', 'Functional Language', 'Sentence Expansion');
    END IF;
END $$;

-- 2. Expand Seeds for Additional Experts ------------------------
DO $$
DECLARE
    aradhana_id UUID;
    ananya_id UUID;
BEGIN
    -- Dr. Aradhana Sharma (Behavioral Architect)
    SELECT id INTO aradhana_id FROM partners WHERE slug = 'aradhana-sharma' OR slug = 'dr-aradhana-sharma' LIMIT 1;
    
    -- Ananya Subramanian (Special Educator)
    SELECT id INTO ananya_id FROM partners WHERE slug = 'ananya-subramanian' LIMIT 1;

    -- Seed Aradhana
    IF aradhana_id IS NOT NULL THEN
        UPDATE partners SET 
            verified_sessions_count = 580,
            suitability_notes = 'Specializes in high-density neuro-affirmative design and behavioral engineering for complex developmental profiles.'
        WHERE id = aradhana_id;

        INSERT INTO provider_outcomes (partner_id, title, description, timeframe, order_index) VALUES
        (aradhana_id, 'Environmental Audit', 'Comprehensive mapping of sensory triggers in the child''s primary environment.', 'After 1 week', 1),
        (aradhana_id, 'Protocol Alignment', 'Implementation of custom behavioral bridges for school-home transitions.', 'After 3 weeks', 2),
        (aradhana_id, 'Systemic Stability', 'Measurable reduction in caregiver burnout through automated routine systems.', 'After 2 months', 3),
        (aradhana_id, 'Autonomous Mastery', 'Child demonstrates independent execution of 3+ multi-step daily living skills.', 'After 6 months', 4)
        ON CONFLICT DO NOTHING;

        INSERT INTO provider_fit_items (partner_id, content, is_positive, order_index) VALUES
        (aradhana_id, 'Complex dual-diagnosis cases (ASD + ADHD)', true, 1),
        (aradhana_id, 'Families requiring structured data-driven reporting', true, 2),
        (aradhana_id, 'School-aged children facing classroom transition anxiety', true, 3),
        (aradhana_id, 'Acute drug-rehabilitation cases', false, 4),
        (aradhana_id, 'Casual "babysitting" or non-clinical supervision', false, 5)
        ON CONFLICT DO NOTHING;
    END IF;

    -- Seed Ananya
    IF ananya_id IS NOT NULL THEN
        UPDATE partners SET 
            verified_sessions_count = 210,
            suitability_notes = 'Expert in IEP design and academic scaffolding for neurodivergent learners in pre-primary years.'
        WHERE id = ananya_id;

        INSERT INTO provider_outcomes (partner_id, title, description, timeframe, order_index) VALUES
        (ananya_id, 'Academic Baseline', 'Identification of specific learning gaps and strength-based scaffolding plan.', 'After 2 weeks', 1),
        (ananya_id, 'Foundational Literacy', 'Mastery of phonemic awareness and basic blending in target age group.', 'After 6 weeks', 2),
        (ananya_id, 'Classroom Readiness', 'Demonstrated ability to follow multi-step academic instructions independently.', 'After 3 months', 3),
        (ananya_id, 'Social Academic Integration', 'Successful participation in group learning activities with minimal support.', 'After 6 months', 4)
        ON CONFLICT DO NOTHING;

        INSERT INTO provider_fit_items (partner_id, content, is_positive, order_index) VALUES
        (ananya_id, 'Pre-primary and Primary school learners (Ages 4-9)', true, 1),
        (ananya_id, 'Learners with Specific Learning Disabilities (SLD)', true, 2),
        (ananya_id, 'Homeschooled neurodivergent learners needing structure', true, 3),
        (ananya_id, 'Adult vocational training', false, 4),
        (ananya_id, 'Purely medical or surgical rehabilitation', false, 5)
        ON CONFLICT DO NOTHING;
    END IF;

    -- 3. Meera & Lakshmy Seeds -----------------------------------
    DECLARE
        meera_id UUID;
        lakshmy_id UUID;
    BEGIN
        SELECT id INTO meera_id FROM partners WHERE slug = 'meera-krishnan' LIMIT 1;
        SELECT id INTO lakshmy_id FROM partners WHERE slug = 'lakshmy-balachandran' LIMIT 1;

        IF meera_id IS NOT NULL THEN
            UPDATE partners SET verified_sessions_count = 450, suitability_notes = 'Pioneer in Play-Based therapy for toddlers with sensory integration challenges.' WHERE id = meera_id;
            INSERT INTO provider_outcomes (partner_id, title, description, timeframe, order_index) VALUES
            (meera_id, 'Sensory Profile', 'Full assessment of light, sound, and touch sensitivities.', 'After 1 week', 1),
            (meera_id, 'Joint Attention', 'Consistent eye contact and shared attention during structured play.', 'After 1 month', 2),
            (meera_id, 'Transition Ease', 'Smooth movement between home and community settings without meltdowns.', 'After 3 months', 3)
            ON CONFLICT DO NOTHING;
            INSERT INTO provider_fit_items (partner_id, content, is_positive, order_index) VALUES
            (meera_id, 'Toddlers (Ages 2-5) with high sensory needs', true, 1),
            (meera_id, 'Parents seeking "gentle" play-based clinical guidance', true, 2),
            (meera_id, 'Adult vocational or academic support', false, 3)
            ON CONFLICT DO NOTHING;
        END IF;

        IF lakshmy_id IS NOT NULL THEN
            UPDATE partners SET verified_sessions_count = 890, suitability_notes = 'Senior Speech Language Pathologist with a focus on non-verbal communication strategies.' WHERE id = lakshmy_id;
            INSERT INTO provider_outcomes (partner_id, title, description, timeframe, order_index) VALUES
            (lakshmy_id, 'Functional Requesting', 'Child replaces crying with signs or words to request needs.', 'After 2 weeks', 1),
            (lakshmy_id, 'Social Initiation', 'Spontaneous initiation of communication with peers.', 'After 2 months', 2),
            (lakshmy_id, 'Complex Sentence Structure', 'Usage of multi-word combinations for expressive language.', 'After 6 months', 3)
            ON CONFLICT DO NOTHING;
            INSERT INTO provider_fit_items (partner_id, content, is_positive, order_index) VALUES
            (lakshmy_id, 'Non-verbal children or those with speech apraxia', true, 1),
            (lakshmy_id, 'Families wanting high-intensity verbal training', true, 2),
            (lakshmy_id, 'Purely emotional regulation issues without speech delays', false, 3)
            ON CONFLICT DO NOTHING;
        END IF;
    END;
END $$;
