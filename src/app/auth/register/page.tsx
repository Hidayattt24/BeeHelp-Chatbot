import { RegisterForm } from "@/components/auth/register-form";
import { HeroHeader } from "@/components/header";

export default function RegisterPage() {
  return (
    <>
      <HeroHeader />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md p-6 border rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
