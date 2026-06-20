"use client"

import { useSync } from "@/components/sync-context"
import { BodyWeatherQuiz } from "@/components/body-weather-quiz"
import { Button } from "@/components/ui/button"
import { CycleTracker, WaterTracker, WeightTracker } from "@/components/studio/trackers"
import { SymptomLogger } from "@/components/studio/symptom-logger"
import { MlEngine } from "@/components/studio/ml-engine"
import { Check, ClipboardList } from "lucide-react"

export function InsightStudio() {
  const { submitQuiz, quizSubmitted, quizAnsweredCount } = useSync()

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-heading text-2xl font-semibold text-foreground text-balance md:text-3xl">
          Insight Studio
        </h1>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          Your dynamic data lab — baseline, track, and let the engine find patterns.
        </p>
      </header>

      {/* Section A */}
      <section className="space-y-4">
        <SectionHeading label="A" title="Body Weather Check Quiz" />
        <BodyWeatherQuiz />
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={submitQuiz} className="rounded-2xl px-6 py-6">
            <ClipboardList className="mr-1 size-4" /> Submit Data
          </Button>
          <span className="text-sm text-muted-foreground">{quizAnsweredCount}/20 answered</span>
          {quizSubmitted && (
            <span className="animate-fade-up flex items-center gap-1 text-sm font-medium text-primary">
              <Check className="size-4" /> Telemetry updated
            </span>
          )}
        </div>
      </section>

      {/* Section B */}
      <section className="space-y-4">
        <SectionHeading label="B" title="Core PMOS Interactive Trackers" />
        <CycleTracker />
        <div className="grid gap-4 lg:grid-cols-2">
          <WeightTracker />
          <WaterTracker />
        </div>
        <SymptomLogger />
      </section>

      {/* Section C */}
      <section className="space-y-4">
        <SectionHeading label="C" title="ML Pattern Prediction Engine" />
        <MlEngine />
      </section>
    </div>
  )
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-8 items-center justify-center rounded-xl bg-primary font-heading text-sm font-semibold text-primary-foreground">
        {label}
      </span>
      <h2 className="font-heading text-xl font-semibold text-foreground">{title}</h2>
    </div>
  )
}
