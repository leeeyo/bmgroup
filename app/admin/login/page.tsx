import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16 sm:px-8">
      <div className="w-full max-w-md">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.34em] text-gold">
          Administration
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1] tracking-[-0.04em] text-deep-green sm:text-5xl">
          Espace BM Group.
        </h1>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Connectez-vous pour consulter les demandes reçues depuis le site.
        </p>
        <div className="mt-10 border-t border-foreground/10 pt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
