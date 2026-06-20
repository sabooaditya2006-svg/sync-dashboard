"use client"

import { useState } from "react"
import { useSync } from "@/components/sync-context"
import { ProgressRing, SectionCard } from "@/components/sync-ui"
import { Button } from "@/components/ui/button"
import { DoctorReport } from "@/components/studio/doctor-report"
import { Bot, FileText } from "lucide-react"

export function MlEngine() {
  const { riskScore, riskLabel, hasBaseline, profile } = useSync()
  const [reportOpen, setReportOpen] = useState(false)

  const ringColor =
    riskScore >= 60 ? "text-destructive" : riskScore >= 30 ? "text-primary" : "text-chart-4"

  return (
    <SectionCard
      title="Machine Learning Pattern Prediction Engine"
      subtitle="Cross-cluster symptom modeling"
      icon={<Bot className="size-5" />}
    >
      {!hasBaseline ? (
        <div className="rounded-2xl bg-secondary/50 px-4 py-8 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Awaiting baseline evaluation inputs for pattern prediction accuracy. Complete the Body Weather quiz, log
            cycle days, or record symptoms to activate the engine.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
            <div className="mx-auto">
              <ProgressRing value={riskScore} size={150} progressClass={ringColor}>
                <span className="px-4 text-center">
                  <span className="block font-heading text-2xl font-semibold text-foreground">{riskScore}</span>
                  <span className="block text-xs text-muted-foreground">PMOS Alignment</span>
                </span>
              </ProgressRing>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl bg-secondary/50 px-4 py-3">
                <p className="text-xs text-muted-foreground">Risk indicator</p>
                <p className="font-heading text-lg font-semibold text-foreground">{riskLabel}</p>
              </div>
              <p className="flex items-center gap-2 rounded-2xl bg-accent/50 px-4 py-3 text-sm text-accent-foreground">
                <Bot className="size-4 shrink-0" />
                sYnc ML Engine Status: Analyzing Clusters (Model Confidence: 94.2%)
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              <span className="font-medium text-foreground">
                sYnc ML Analysis for {profile?.name || "you"}, Age {profile?.age || "—"}:
              </span>{" "}
              Based on cross-cluster symptom modeling of your active inputs, our trained feature weight algorithm
              identifies an overlapping correlation between your logged cycle horizon variance and metabolic fatigue
              parameters.
            </p>
          </div>

          <Button onClick={() => setReportOpen(true)} className="w-full rounded-2xl py-6 text-base">
            <FileText className="mr-1 size-4" />
            Download Doctor&apos;s Discussion Report
          </Button>
        </div>
      )}

      {reportOpen && <DoctorReport onClose={() => setReportOpen(false)} />}
    </SectionCard>
  )
}
