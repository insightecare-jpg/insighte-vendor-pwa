-- ============================================================
-- Migration: Parent Dashboard IA Children Fields
-- Created: 2026-04-21
-- Description: Extending children table to support specialist matching and rich profiles.
-- ============================================================

-- 1. ADD NEW COLUMNS TO CHILDREN TABLE
ALTER TABLE public.children 
ADD COLUMN IF NOT EXISTS school TEXT,
ADD COLUMN IF NOT EXISTS class_grade TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS area TEXT,
ADD COLUMN IF NOT EXISTS preferred_mode TEXT CHECK (preferred_mode IN ('ONLINE', 'HOME', 'CLINIC')) DEFAULT 'ONLINE',
ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS diagnosis_details JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS specific_concerns TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 2. UPDATE RLS (Ensure parents can still manage these fields)
-- No changes needed to policies if they use auth.uid() = parent_id

-- 3. ENSURE INDEXES FOR SEARCH PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_children_parent ON public.children(parent_id);
CREATE INDEX IF NOT EXISTS idx_children_city_area ON public.children(city, area);
