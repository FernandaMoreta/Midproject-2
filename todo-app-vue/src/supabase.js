//Este js tiene como objetivo vincular supabase con nuestro proyecto 
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
//permite interactuar con la cuenta de supabase y la tabla previamente creada

