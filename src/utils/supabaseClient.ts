// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient } from '@supabase/supabase-js';

// Pega a URL e a Chave Anon das variáveis de ambiente definidas no .env
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Verifica se as variáveis foram carregadas corretamente
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL ou Anon Key não definidas nas variáveis de ambiente.');
}

// Cria e exporta o cliente Supabase para ser usado em outras partes do projeto
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
