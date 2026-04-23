-- Migration: Admin Sovereignty RLS Policies
-- Date: 2026-04-23
-- Goal: Ensure Admin role has full access to all tables for dashboard operations.

-- 0. SCHEMA ENFORCEMENT
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'partners' AND column_name = 'user_id') THEN
        ALTER TABLE public.partners ADD COLUMN user_id UUID REFERENCES public.users(id);
    END IF;
END $$;


-- 1. ADMIN ACCESS TO PARTNERS
DROP POLICY IF EXISTS "Admins can manage all partners" ON public.partners;
CREATE POLICY "Admins can manage all partners" ON public.partners
FOR ALL TO authenticated
USING (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
)
WITH CHECK (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
);

-- 2. ADMIN ACCESS TO BOOKINGS
DROP POLICY IF EXISTS "Admins can manage all bookings" ON public.bookings;
CREATE POLICY "Admins can manage all bookings" ON public.bookings
FOR ALL TO authenticated
USING (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
)
WITH CHECK (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
);

-- 3. ADMIN ACCESS TO PROGRAMS
DROP POLICY IF EXISTS "Admins can manage all programs" ON public.programs;
CREATE POLICY "Admins can manage all programs" ON public.programs
FOR ALL TO authenticated
USING (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
)
WITH CHECK (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
);

-- 4. ADMIN ACCESS TO BLOG POSTS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage all blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts
FOR ALL TO authenticated
USING (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
)
WITH CHECK (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
);

DROP POLICY IF EXISTS "Public can view published blog posts" ON public.blog_posts;
CREATE POLICY "Public can view published blog posts" ON public.blog_posts
FOR SELECT USING (status = 'published');


-- 5. ADMIN ACCESS TO PROFILES
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
CREATE POLICY "Admins can manage all profiles" ON public.profiles
FOR ALL TO authenticated
USING (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
)
WITH CHECK (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
);

-- 6. ADMIN ACCESS TO CHILDREN
DROP POLICY IF EXISTS "Admins can manage all children" ON public.children;
CREATE POLICY "Admins can manage all children" ON public.children
FOR ALL TO authenticated
USING (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
)
WITH CHECK (
  (auth.jwt() ->> 'app_role' = 'admin') OR 
  (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'))
);

-- 7. Ensure Public Read for Approved Partners (Unified)
DROP POLICY IF EXISTS approved_partners_public_read ON public.partners;
CREATE POLICY "Public can view approved partners" ON public.partners
FOR SELECT USING (approval_status = 'APPROVED');

-- 8. Ensure Public Read for Programs (Unified)
DROP POLICY IF EXISTS "Programs are readable by everyone" ON public.programs;
CREATE POLICY "Public can view programs" ON public.programs
FOR SELECT USING (true);
