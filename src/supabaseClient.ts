import { createClient } from '@supabase/supabase-js';

// Load Vite environment variables safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Safely initialize the Supabase client
let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
  }
}

/**
 * Retrieves the active Supabase client instance if configured.
 * Returns null if URL or Anon Key are missing, triggering simulated fallbacks.
 */
export function getSupabase() {
  return supabase;
}
