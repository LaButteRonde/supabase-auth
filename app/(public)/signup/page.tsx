"use client";

import { AuthForm } from "@/components/auth-form";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

import { signup } from "./actions";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState: {
  message: string;
  error: AuthError | null;
  isSuccess: boolean;
} = { message: "", error: null, isSuccess: false };

export default function SignupPage() {
  // TODO: Change this to your app name
  const yourAppName = "Your App Name";

  const router = useRouter();

  const [state, formAction] = useActionState(signup, initialState);
  console.log("🚀 ~ SignupPage ~ state:", state);

  useEffect(() => {
    if(!state.isSuccess && !state.error) {
      return
    }
    if (!state.isSuccess && state.error) {
      toast.error(state.error?.message);
      return;
    }
    toast.success(state.message);
    router.push("/login");
  }, [state.isSuccess, state.message, router, state.error]);
  return (
    <>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {yourAppName}
          </Link>
          <AuthForm
            type="signup"
            onEmailAuth={formAction}
            title="Welcome to ..."
            description="Create your account with your Email"
          />
        </div>
      </div>
    </>
  );
}
