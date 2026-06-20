"use client"

import { SyncProvider, useSync } from "@/components/sync-context"
import { OnboardingModal } from "@/components/onboarding-modal"
import { AppSidebar } from "@/components/app-sidebar"
import { SanctuaryHome } from "@/components/views/sanctuary-home"
import { InsightStudio } from "@/components/views/insight-studio"
import { CareCircle } from "@/components/views/care-circle"
import { Lightbulb } from "lucide-react"

function SkipBanner() {
  const { skipped, setView } = useSync()
  if (!skipped) return null
  return (
    <button
      onClick={() => setView("studio")}
      className="flex w-full items-start gap-2 rounded-2xl border border-primary/40 bg-accent/50 px-4 py-3 text-left text-sm text-accent-foreground transition hover:bg-accent"
    >
      <Lightbulb className="mt-0.5 size-4 shrink-0" />
      <span>
        For better analyzing of your PMOS risk and patterns, you can attempt or complete your missing baseline
        questions at any time inside the <strong>Insight Studio</strong> tab.
      </span>
    </button>
  )
}

function Dashboard() {
  const { onboarded, view } = useSync()

  if (!onboarded) return <OnboardingModal />

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AppSidebar />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto w-full max-w-5xl space-y-5 px-4 py-6 md:px-8 md:py-8">
          <SkipBanner />
          {view === "home" && <SanctuaryHome />}
          {view === "studio" && <InsightStudio />}
          {view === "circle" && <CareCircle />}
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <SyncProvider>
      <Dashboard />
    </SyncProvider>
  )
}
