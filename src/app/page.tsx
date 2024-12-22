import { Metadata } from "next";
import AuthPage from "./(auth)/auth-form";

export const metadata: Metadata = {
  title: "Login | SIGMA",
};

export default function LoginPage() {
  return (
    <>
      <AuthPage />
    </>
  );
}
