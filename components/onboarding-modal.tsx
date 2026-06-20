"use client"

import { useState } from "react"
import { useSync } from "@/components/sync-context"
import { BodyWeatherQuiz } from "@/components/body-weather-quiz"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function OnboardingModal() {
  const { setProfile, completeOnboarding, setSkipped } = useSync()
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [cycleLength, setCycleLength] = useState("")

  const canContinue = name.trim().length > 0

  const goToStep2 = () => {
    setProfile({ name: name.trim(), age, cycleLength })
    setStep(2)
  }

  const finish = (didSkip: boolean) => {
    setProfile({ name: name.trim() || "friend", age, cycleLength })
    setSkipped(didSkip)
    completeOnboarding()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm">
      <div className="animate-fade-up flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-border bg-card px-6 py-5">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Sparkles className="size-5" />
          </span>
          <div>
            <p className="font-heading text-xl font-semibold tracking-tight text-foreground">sYnc</p>
            <p className="text-xs text-muted-foreground">PMOS well-being &amp; symptom literacy</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className={`h-1.5 w-8 rounded-full ${step === 1 ? "bg-primary" : "bg-border"}`} />
            <span className={`h-1.5 w-8 rounded-full ${step === 2 ? "bg-primary" : "bg-border"}`} />
          </div>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-foreground text-balance">
                  Welcome to sYnc.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  Before moving further, let&apos;s enter your profile details so we can personalise your care.
                </p>
              </div>

              <div className="grid gap-4">
                <Field label="Name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya"
                    className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Age">
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 27"
                      className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                    />
                  </Field>
                  <Field label="Target Cycle Length (days)">
                    <input
                      type="number"
                      value={cycleLength}
                      onChange={(e) => setCycleLength(e.target.value)}
                      placeholder="e.g. 28"
                      className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                    />
                  </Field>
                </div>
              </div>

              <Button
                onClick={goToStep2}
                disabled={!canContinue}
                className="w-full rounded-2xl py-6 text-base disabled:opacity-50"
              >
                Next
                <ArrowRight className="ml-1 size-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-foreground text-balance">
                  Welcome to sYnc, {name || "friend"}.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  Before moving further, let&apos;s answer a few questions to baseline your metabolic well-being.
                </p>
              </div>

              <BodyWeatherQuiz compact />

              <div className="space-y-3 pt-2">
                <Button onClick={() => finish(false)} className="w-full rounded-2xl py-6 text-base">
                  Submit Baseline
                </Button>
                <button
                  onClick={() => finish(true)}
                  className="w-full rounded-2xl border border-dashed border-primary/50 bg-accent/40 py-4 text-sm font-medium text-accent-foreground transition hover:bg-accent"
                >
                  Skip for now and continue to sYnc dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}
