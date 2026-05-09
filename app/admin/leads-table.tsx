"use client";

import { useState, useTransition } from "react";
import type { Lead, LeadStatus } from "@/lib/db";

type Props = { initialLeads: Lead[] };

const statusStyles: Record<LeadStatus, string> = {
  new: "border-gold/40 bg-gold/15 text-deep-green",
  contacted: "border-deep-green/30 bg-deep-green/10 text-deep-green",
  closed: "border-foreground/15 bg-stone/60 text-ink-soft",
};

const statusLabels: Record<LeadStatus, string> = {
  new: "Nouvelle",
  contacted: "Contactée",
  closed: "Clôturée",
};

const allStatuses: LeadStatus[] = ["new", "contacted", "closed"];

export function LeadsTable({ initialLeads }: Props) {
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const filtered =
    filter === "all" ? leads : leads.filter((lead) => lead.status === filter);

  async function changeStatus(id: number, status: LeadStatus) {
    setError(null);
    const previous = leads;
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        throw new Error("update_failed");
      }
    } catch {
      setError("Mise à jour impossible. Vérifiez votre connexion.");
      setLeads(previous);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip
          label="Toutes"
          active={filter === "all"}
          onClick={() => startTransition(() => setFilter("all"))}
          count={leads.length}
        />
        {allStatuses.map((status) => (
          <FilterChip
            key={status}
            label={statusLabels[status]}
            active={filter === status}
            onClick={() => startTransition(() => setFilter(status))}
            count={leads.filter((lead) => lead.status === status).length}
          />
        ))}
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-sm border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-sm border border-foreground/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone/60 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-ink-soft">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Société</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                className="border-t border-foreground/10 align-top transition hover:bg-stone/30"
              >
                <td className="whitespace-nowrap px-4 py-4 text-xs text-ink-soft">
                  {formatDate(lead.created_at)}
                </td>
                <td className="px-4 py-4">
                  <div className="font-serif text-base font-semibold text-deep-green">
                    {lead.name}
                  </div>
                  <a
                    href={`mailto:${lead.email}`}
                    className="block text-xs text-ink-soft hover:text-gold"
                  >
                    {lead.email}
                  </a>
                  {lead.phone ? (
                    <a
                      href={`tel:${lead.phone}`}
                      className="block text-xs text-ink-soft hover:text-gold"
                    >
                      {lead.phone}
                    </a>
                  ) : null}
                </td>
                <td className="px-4 py-4 text-xs text-deep-green">
                  {lead.company ?? <span className="text-ink-soft/60">—</span>}
                </td>
                <td className="px-4 py-4 max-w-md">
                  {lead.subject ? (
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                      {lead.subject}
                    </p>
                  ) : null}
                  <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-ink-soft">
                    {lead.message}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <select
                    value={lead.status}
                    onChange={(event) =>
                      changeStatus(lead.id, event.target.value as LeadStatus)
                    }
                    className={`rounded-full border px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] outline-none ${statusStyles[lead.status]}`}
                  >
                    {allStatuses.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-ink-soft">
                  Aucune demande dans cette catégorie.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] transition ${
        active
          ? "border-deep-green bg-deep-green text-white"
          : "border-foreground/15 bg-white text-deep-green hover:border-gold"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-2 py-0.5 text-[0.55rem] ${
          active ? "bg-white/15 text-white" : "bg-stone/60 text-ink-soft"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function formatDate(value: string): string {
  // value is "YYYY-MM-DD HH:MM:SS" UTC from sqlite datetime('now').
  const iso = value.includes("T") ? value : value.replace(" ", "T") + "Z";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
