import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ziscxsegfsgqzsmdoxzm.supabase.co";

const supabaseKey = "sb_publishable_X7YoPFtBAjiGUNge-l5y_w_2GRCQ973";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);