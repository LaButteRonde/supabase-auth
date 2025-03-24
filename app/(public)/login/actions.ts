'use server';

import { createSSRClient } from '@/services/supabase';
import { AuthError, Provider } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = await createSSRClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signinProvider(provider: Provider) {
  if (!provider)
    return {
      error: new AuthError('You need to set a provider'),
      isSuccess: false,
      message: '',
    };

  const supabase = await createSSRClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    options: { redirectTo: 'http://localhost:3000/auth/callback' },
    provider: provider as Provider,
  });
  if (error)
    return {
      error,
      isSuccess: false,
      message: '',
    };

  if (data.url) {
    redirect(data.url);
  }
}
