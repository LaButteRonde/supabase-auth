'use server';

import { createSSRClient } from '@/services/supabase';
import { AuthError, Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

type State = {
  message: string;
  error: AuthError | null;
  isSuccess: boolean;
};

export async function signup(prevState: State, formData: FormData) {
  const supabase = await createSSRClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  if (!data.email || !data.password) {
    return {
      error: new AuthError('Email and password are required'),
      isSuccess: false,
      message: 'Email and password are required',
    };
  }

  const { error } = await supabase.auth.signUp(data);

  return error
    ? { error, isSuccess: false, message: '' }
    : {
        error: null,
        isSuccess: true,
        message: 'Account created successfully, please verify your email',
      };
}

export async function signupProvider(provider: Provider) {
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
