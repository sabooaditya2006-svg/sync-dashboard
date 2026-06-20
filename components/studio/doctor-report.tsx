"use client"

import { useSync } from "@/components/sync-context"
import { Button } from "@/components/ui/button"
import { Flower2, Printer, X } from "lucide-react"

export function DoctorReport({ onClose }: { onClose: () => void }) {
  const { profile, periodDays, weightLogs, symptoms, riskScore, riskLabel } = useSync()

  const flaggedSymptoms = [
    symptoms.energy && symptoms.energy !== "Energetic" && symptoms.energy !== "Stable" ? `Energy: ${symptoms.energy}` : null,
    symptoms.cravings && symptoms.cravings !== "None" ? `Sugar cravings: ${symptoms.cravings}` : null,
    symptoms.postMealSluggish === "Yes" ? "Post-meal sluggishness present" : null,
    symptoms.skin && symptoms.skin !== "Calm" ? `Skin: ${symptoms.skin}` : null,
    symptoms.hirsutism === "Noticeable Excess Growth" ? "Hirsutism: noticeable excess growth" : null,
    symptoms.acanthosis === "New Pigmentation Flares" ? "Acanthosis: new pigmentation flares" : null,
    symptoms.bloating >= 40 ? `Bloating severity: ${symptoms.bloating}/100` : null,
    symptoms.gut && symptoms.gut !== "Smooth Digestion" ? `Gut: ${symptoms.gut}` : null,
    symptoms.mood && symptoms.mood !== "Grounded & Calm" ? `Mood: ${symptoms.mood}` : null,
    symptoms.brainFog === "High Distraction & Fatigue" ? "Brain fog / high distraction" : null,
  ].filter(Boolean) as string[]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="animate-fade-up flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl">
        <div className="no-print flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <p className="font-heading text-lg font-semibold text-foreground">Doctor&apos;s Discussion Report</p>
          <div className="flex items-center gap-2">
            <Button onClick={() => window.print()} className="rounded-full px-4">
              <Printer className="mr-1 size-4" /> Print
            </Button>
            <button
              onClick={onClose}
              className="flex size-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="print-area overflow-y-auto px-6 py-6">
          <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Flower2 className="size-6" />
            </span>
            <div>
              <p className="font-heading text-xl font-semibold text-foreground">sYnc Wellness Summary</p>
              <p className="text-xs text-muted-foreground">
                Generated {new Date().toLocaleDateString()} · Confidential
              </p>
            </div>
          </div>

          <ReportRow label="Patient">
            {profile?.name || "—"}
            {profile?.age ? `, ${profile.age} years` : ""}
            {profile?.cycleLength ? ` · target cycle ${profile.cycleLength} days` : ""}
          </ReportRow>

          <ReportRow label="PMOS Alignment Score">
            {riskScore}/100 — {riskLabel}
          </ReportRow>

          <ReportRow label="Calendar Flow Trends">
            {periodDays.length > 0
              ? `${periodDays.length} flow day(s) marked: day ${Math.min(...periodDays)} to day ${Math.max(...periodDays)} of the tracked window.`
              : "No period flow days marked yet."}
          </ReportRow>

          <ReportRow label="Weight Logs">
            {weightLogs.length > 0
              ? weightLogs.map((w) => `${w.label}: ${w.kg}kg`).join(" · ")
              : "No weight logged."}
          </ReportRow>

          <ReportRow label="Flagged Symptoms">
            {flaggedSymptoms.length > 0 ? (
              <ul className="ml-4 list-disc space-y-1">
                {flaggedSymptoms.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ) : (
              "No notable symptoms flagged."
            )}
          </ReportRow>

          <div className="mt-6 rounded-2xl bg-accent/50 px-4 py-4 text-sm leading-relaxed text-accent-foreground">
            You are taking a brave and caring step by tracking your body. Please consider sharing this summary with a{" "}
            <strong>gynecologist or endocrinologist</strong>. Seeking support for PMOS is a sign of strength, never
            shame — you deserve clear answers and compassionate care.
          </div>
        </div>
      </div>
    </div>
  )
}

function ReportRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-1 text-sm text-foreground">{children}</div>
    </div>
  )
}
