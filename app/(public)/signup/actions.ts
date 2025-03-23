"use server";

import { createSSRClient } from "@/services/supabase";
import { AuthError } from "@supabase/supabase-js";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

type State = {
  message: string;
  error: AuthError | null;
  isSuccess: boolean;
};

export async function signup(prevState: State, formData: FormData) {
  const supabase = await createSSRClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
    return {
      message: "Email and password are required",
      error: new AuthError("Email and password are required"),
      isSuccess: false,
    };
  }

  const { error } = await supabase.auth.signUp(data);

  return error
    ? { message: "", error, isSuccess: false }
    : {
        message: "Account created successfully, please verify your email",
        error: null,
        isSuccess: true,
      };

  // revalidatePath("/", "layout");
  // redirect("/login", );
}
