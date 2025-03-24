'use server';

import { createSSRClient } from '@/services/supabase';
import { redirect } from 'next/navigation';

export async function signOut() {
  const supabase = await createSSRClient();
  await supabase.auth.signOut();
  redirect('/');
}
