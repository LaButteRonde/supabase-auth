import { signOut } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createSSRClient } from '@/services/supabase';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = await createSSRClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  console.log('🚀 ~ ProfilePage ~ data:', data);
  console.log('🚀 ~ ProfilePage ~ error:', error);
  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className='flex flex-col gap-4 w-1/2 mx-auto h-1/2 p-8'>
        <p className='text-2xl font-bold'>Profile</p>
        <Label htmlFor='email'>Email</Label>
        <Input disabled id='email' name='email' type='email' value={data?.user?.email} />
        <Label htmlFor='full_name'>Full Name</Label>
        <Input disabled id='full_name' name='full_name' type='text' value={data?.user?.user_metadata?.full_name} />
        <Label htmlFor='avatar_url'>Provider</Label>
        <Input
          disabled
          id='avatar_url'
          name='avatar_url'
          type='text'
          value={
            (data?.user?.app_metadata?.provider?.charAt(0).toUpperCase() || '') +
            (data?.user?.app_metadata?.provider?.slice(1) || '')
          }
        />
        <Button onClick={signOut}>Sign out</Button>
      </Card>
    </div>
  );
}
