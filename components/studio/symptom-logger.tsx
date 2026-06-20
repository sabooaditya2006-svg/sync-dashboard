"use client"

import { useSync } from "@/components/sync-context"
import { SectionCard, StatScale } from "@/components/sync-ui"
import { cn } from "@/lib/utils"
import { Lightbulb } from "lucide-react"

function ToggleRow({
  label,
  options,
  value,
  onSelect,
}: {
  label: string
  options: [string, string]
  value: string | null
  onSelect: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-foreground">{label}</span>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              value === opt
                ? "border-primary bg-accent text-accent-foreground shadow-sm"
                : "border-border bg-card text-muted-foreground hover:border-primary/60",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

const RELIEF_TIPS: Record<string, string> = {
  "Active Acne Flare":
    "Acne flares often track with androgen and insulin shifts. Try a protein-first breakfast, gentle dairy reduction for two weeks, and a fragrance-free routine — and note flares against your cycle here.",
  "Extreme Spike":
    "Extreme sugar cravings usually signal a glucose roller-coaster. Pair carbs with protein/fat, add a 10-minute post-meal walk, and keep water close to flatten the spike.",
  "Severe Inflamed Bloating":
    "Severe bloating can mean slowed gut motility. Warm water with lemon, slow mindful chewing, peppermint tea, and a short walk can ease the inflammation today.",
}

export function SymptomLogger() {
  const { symptoms, setSymptom } = useSync()

  const tips: string[] = []
  if (symptoms.skin === "Active Acne Flare") tips.push(RELIEF_TIPS["Active Acne Flare"])
  if (symptoms.cravings === "Extreme Spike") tips.push(RELIEF_TIPS["Extreme Spike"])
  if (symptoms.bloating >= 75) tips.push(RELIEF_TIPS["Severe Inflamed Bloating"])

  return (
    <SectionCard title="Categorized Daily Symptoms Logger" subtitle="Tap to log how today feels">
      <div className="space-y-5">
        {/* Metabolic */}
        <Category title="Metabolic & Energy Symptoms" emoji="🧬">
          <Field label="Energy Levels">
            <StatScale
              options={["Low / Crashed", "Stable", "Energetic"]}
              value={symptoms.energy}
              onSelect={(v) => setSymptom("energy", v)}
            />
          </Field>
          <Field label="Sugar Cravings Level">
            <StatScale
              options={["None", "Mild", "Extreme Spike"]}
              value={symptoms.cravings}
              onSelect={(v) => setSymptom("cravings", v)}
            />
          </Field>
          <ToggleRow
            label="Post-Meal Sluggishness"
            options={["Yes", "No"]}
            value={symptoms.postMealSluggish}
            onSelect={(v) => setSymptom("postMealSluggish", v)}
          />
        </Category>

        {/* Dermatological */}
        <Category title="Dermatological & Physical Signs" emoji="🧴">
          <Field label="Skin State">
            <StatScale
              options={["Calm", "Healing", "Active Acne Flare", "Extremely Sensitive"]}
              value={symptoms.skin}
              onSelect={(v) => setSymptom("skin", v)}
            />
          </Field>
          <ToggleRow
            label="Facial Hair / Hirsutism Check"
            options={["No Changes", "Noticeable Excess Growth"]}
            value={symptoms.hirsutism}
            onSelect={(v) => setSymptom("hirsutism", v)}
          />
          <ToggleRow
            label="Acanthosis / Skin Darkening"
            options={["Normal Texture", "New Pigmentation Flares"]}
            value={symptoms.acanthosis}
            onSelect={(v) => setSymptom("acanthosis", v)}
          />
        </Category>

        {/* Gut */}
        <Category title="Gut & Digestive Health" emoji="🍃">
          <Field label={`Bloating Severity — ${bloatLabel(symptoms.bloating)}`}>
            <input
              type="range"
              min={0}
              max={100}
              value={symptoms.bloating}
              onChange={(e) => setSymptom("bloating", Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full accent-primary"
              style={{
                background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${symptoms.bloating}%, var(--secondary) ${symptoms.bloating}%, var(--secondary) 100%)`,
              }}
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Flat &amp; Comfortable</span>
              <span>Severe Inflamed</span>
            </div>
          </Field>
          <Field label="Gut Comfort">
            <StatScale
              options={["Smooth Digestion", "Acidity / Reflux", "Slow Motility / Constipation"]}
              value={symptoms.gut}
              onSelect={(v) => setSymptom("gut", v)}
            />
          </Field>
        </Category>

        {/* Mood */}
        <Category title="Mood & Cognitive State" emoji="🧠">
          <Field label="Mood Swing Pattern">
            <StatScale
              options={["Grounded & Calm", "High Anxiety", "Emotional Irritability"]}
              value={symptoms.mood}
              onSelect={(v) => setSymptom("mood", v)}
            />
          </Field>
          <ToggleRow
            label="Brain Fog / Concentration"
            options={["Sharp Focus", "High Distraction & Fatigue"]}
            value={symptoms.brainFog}
            onSelect={(v) => setSymptom("brainFog", v)}
          />
        </Category>
      </div>

      {tips.length > 0 && (
        <div className="mt-5 space-y-3">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="animate-fade-up flex items-start gap-3 rounded-2xl border border-primary/40 bg-accent/50 px-4 py-3 text-sm text-accent-foreground"
            >
              <Lightbulb className="mt-0.5 size-4 shrink-0" />
              <p className="leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}

function bloatLabel(v: number) {
  if (v >= 75) return "Severe Inflamed Bloating"
  if (v >= 40) return "Moderate"
  if (v > 0) return "Mild"
  return "Flat & Comfortable"
}

function Category({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-secondary/40 p-4">
      <h4 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
        <span aria-hidden>{emoji}</span> {title}
      </h4>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm text-foreground">{label}</p>
      {children}
    </div>
  )
}
