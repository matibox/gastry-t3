import { createClient } from '@supabase/supabase-js';
import { env } from '../env/client.mjs';

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(url, key);

export default supabase;
