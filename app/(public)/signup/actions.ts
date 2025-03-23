'use server';

import { createSSRClient } from '@/services/supabase';
import { AuthError } from '@supabase/supabase-js';

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
