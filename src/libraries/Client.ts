import { createClient } from "@supabase/supabase-js";
import { QueryClient } from "react-query";
import { supabaseUrl, supabaseKey } from "~/Env";

export const supabase = createClient(supabaseUrl, supabaseKey, {});

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: Infinity } },
});
