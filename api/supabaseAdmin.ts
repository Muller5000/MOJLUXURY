import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : null;

if (!supabaseAdmin) {
  console.warn('?? SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_URL is missing. Backend Supabase writes will be disabled.');
}

