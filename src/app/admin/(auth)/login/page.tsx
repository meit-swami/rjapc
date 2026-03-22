import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<p className="font-devanagari text-slate-600">लोड हो रहा है…</p>}>
      <LoginForm />
    </Suspense>
  );
}
