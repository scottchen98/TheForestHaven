import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xjumzfxqjtzgkxifnhtz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdW16ZnhxanR6Z2t4aWZuaHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2NDUxNDUsImV4cCI6MjAwNTIyMTE0NX0.GOK9C-lw4Kh3paTNoF1f9lgq9MHAhOvc2rm2WvypAeo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
