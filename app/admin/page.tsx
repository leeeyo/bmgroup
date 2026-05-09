import { listLeads } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { LeadsTable } from "./leads-table";
import { LogoutButton } from "./logout-button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  const leads = await listLeads();

  const totals = {
    total: leads.length,
    new: leads.filter((lead) => lead.status === "new").length,
    contacted: leads.filter((lead) => lead.status === "contacted").length,
    closed: leads.filter((lead) => lead.status === "closed").length,
  };

  return (
    <main className="px-4 py-10 sm:px-8 sm:py-14 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-foreground/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.34em] text-gold">
              Administration · BM Group
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1] tracking-[-0.04em] text-deep-green sm:text-5xl">
              Demandes reçues
            </h1>
            <p className="mt-3 text-sm text-ink-soft">
              Connecté en tant que <span className="text-deep-green">{session.email}</span>.
            </p>
          </div>
          <LogoutButton />
        </header>

        <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total" value={totals.total} />
          <Stat label="Nouvelles" value={totals.new} accent />
          <Stat label="Contactées" value={totals.contacted} />
          <Stat label="Clôturées" value={totals.closed} muted />
        </section>

        <section className="mt-10">
          {leads.length === 0 ? (
            <div className="rounded-sm border border-dashed border-foreground/15 bg-stone/40 p-10 text-center">
              <p className="font-serif text-2xl tracking-[-0.025em] text-deep-green">
                Aucune demande pour le moment.
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Les nouveaux messages déposés via le formulaire du site apparaîtront ici.
              </p>
            </div>
          ) : (
            <LeadsTable initialLeads={leads} />
          )}
        </section>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: number;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 rounded-sm border border-foreground/10 px-5 py-4 ${
        accent ? "bg-gold/10" : muted ? "bg-stone/40" : "bg-white"
      }`}
    >
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-ink-soft">
        {label}
      </span>
      <span className="font-serif text-3xl font-semibold tracking-[-0.025em] text-deep-green">
        {value}
      </span>
    </div>
  );
}
