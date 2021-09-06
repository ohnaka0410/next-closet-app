import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseKey } from "~/Env";

export const supabase = createClient(supabaseUrl, supabaseKey, {});
