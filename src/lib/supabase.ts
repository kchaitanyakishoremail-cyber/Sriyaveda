import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Partner = {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  business_type: string;
  created_at: string;
};

export type PartnerQuotation = {
  id: string;
  partner_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  system_size: number;
  panel_brand: string;
  inverter_brand: string;
  wiring_brand: string;
  total_cost: number;
  status: 'new' | 'contacted' | 'converted' | 'lost';
  date_submitted: string;
};