"use client"

import { useSync } from "@/components/sync-context"
import { cn } from "@/lib/utils"
import { Flower2, HeartHandshake, Home, Sparkles, LineChart } from "lucide-react"

const NAV = [
  { key: "home", label: "Sanctuary Home", icon: Home },
  { key: "studio", label: "Insight Studio", icon: LineChart },
  { key: "circle", label: "Care Circle", icon: HeartHandshake },
] as const

export function AppSidebar() {
  const { view, setView, profile } = useSync()

  return (
    <aside className="flex w-full shrink-0 flex-col gap-2 border-border bg-sidebar md:h-screen md:w-72 md:border-r md:p-5">
      {/* brand */}
      <div className="flex items-center gap-3 px-2 py-4 md:py-2">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Flower2 className="size-6" />
        </span>
        <div>
          <p className="font-heading text-2xl font-semibold leading-none tracking-tight text-sidebar-foreground">
            sYnc
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Body in balance</p>
        </div>
      </div>

      <nav className="flex gap-2 px-1 md:mt-4 md:flex-col">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = view === item.key
          return (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={cn(
                "flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all md:flex-none",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">{item.label.split(" ")[0]}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto hidden rounded-3xl border border-sidebar-border bg-secondary/60 p-4 md:block">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
            {profile?.name?.[0]?.toUpperCase() ?? "S"}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{profile?.name ?? "Guest"}</p>
            <p className="text-xs text-muted-foreground">{profile?.age ? `${profile.age} yrs` : "Welcome"}</p>
          </div>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          You are in complete sYnc today.
        </p>
      </div>
    </aside>
  )
}
