import { createClient } from "@supabase/supabase-js";

const supbaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;


console.log(supabaseUrl);
console.log(supbaseAnonKey);

export const supabase = createClient(supabaseUrl, supbaseAnonKey);