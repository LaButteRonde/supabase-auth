'use server';

import { createSSRClient } from '@/services/supabase';

export async function signOut() {
  const supabase = await createSSRClient();
  await supabase.auth.signOut();
}
