-- ============================================================
-- Migration: Fix Bookings Schema alignment
-- Created: 2026-04-21
-- Description: Adds total_price and updates status check constraints.
-- ============================================================

-- 1. Add total_price column if missing
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS total_price DECIMAL(12, 2);

-- 2. Update status check constraint
-- First, drop the existing constraint if it exists. 
-- The name might vary, but in init_sanctuary it was likely 'bookings_status_check'
DO $$
BEGIN
    ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
END $$;

-- 3. Re-apply constraint with 'pending' included
ALTER TABLE public.bookings ADD CONSTRAINT bookings_status_check 
CHECK (status IN ('pending', 'upcoming', 'completed', 'cancelled'));

-- 4. Ensure column naming consistency
-- If the project used client_id in some places, we'll keep parent_id as the truth
-- but the code will be updated to match parent_id.
