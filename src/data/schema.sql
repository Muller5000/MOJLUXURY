-- SQL Schema Script for MOJLUXURY Supabase Backend Database Setup
-- Copy and paste this script directly into the Supabase SQL Editor (https://database.supabase.com)

-- 1. Create the primary orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference TEXT UNIQUE NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'verified', -- verified, tailoring, inspection, transit, delivered
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create the custom measurements table associated with orders
CREATE TABLE IF NOT EXISTS public.bespoke_measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    bust NUMERIC(5, 2),
    waist NUMERIC(5, 2),
    hips NUMERIC(5, 2),
    length NUMERIC(5, 2),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create the atelier logging ticker table for real-time progress history
CREATE TABLE IF NOT EXISTS public.atelier_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_reference TEXT REFERENCES public.orders(reference) ON DELETE CASCADE,
    log_text TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'atelier', -- system, atelier, logistics
    log_time TEXT NOT NULL, -- e.g. "09:40"
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bespoke_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atelier_logs ENABLE ROW LEVEL SECURITY;

-- 5. Establish permissive security policies to allow public anon clients to insert & lookup
-- Note: In a production enterprise system, you would restrict writes through Edge Functions/Auth,
-- but for premium sandbox Paystack flow, anonymous client insertions and lookups are standard.

-- Orders table policies
CREATE POLICY "Allow public read of orders" 
ON public.orders FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Allow public insert of orders" 
ON public.orders FOR INSERT 
TO anon 
WITH CHECK (true);

-- Bespoke measurements policies
CREATE POLICY "Allow public read of measurements" 
ON public.bespoke_measurements FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Allow public insert of measurements" 
ON public.bespoke_measurements FOR INSERT 
TO anon 
WITH CHECK (true);

-- Atelier logs policies
CREATE POLICY "Allow public read of logs" 
ON public.atelier_logs FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Allow public insert of logs" 
ON public.atelier_logs FOR INSERT 
TO anon 
WITH CHECK (true);

-- ========================================================
-- ADMIN CMS: Dynamic Products Table
-- ========================================================
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'featured',
    badge TEXT,
    badge_color TEXT,
    fabric TEXT,
    occasion TEXT,
    is_pre_order BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ========================================================
-- STORAGE: Product Images Bucket
-- ========================================================
-- Run these commands in the Supabase SQL Editor to set up the storage bucket
-- (Note: Storage schemas are sometimes restricted, you may need to create this in the dashboard)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow public reads
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'product-images' );

-- Policy to allow admin inserts (or authenticated if auth is set up)
-- For MVP, if using an env variable passcode on the frontend, you might need to enable anon uploads 
-- temporarily, or strictly use the backend to upload. Since the client is using the frontend, 
-- we allow uploads to this bucket for now (ensure you secure this later with Supabase Auth!)
CREATE POLICY "Allow public uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'product-images' );
