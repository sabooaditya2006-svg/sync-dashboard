"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function ProgressRing({
  value,
  size = 120,
  stroke = 10,
  label,
  sublabel,
  trackClass = "text-secondary",
  progressClass = "text-primary",
  children,
}: {
  value: number
  size?: number
  stroke?: number
  label?: string
  sublabel?: string
  trackClass?: string
  progressClass?: string
  children?: ReactNode
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className={trackClass}
          stroke="currentColor"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("transition-[stroke-dashoffset] duration-700 ease-out", progressClass)}
          stroke="currentColor"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children ?? (
          <>
            {label && <span className="font-heading text-2xl font-semibold text-foreground">{label}</span>}
            {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
          </>
        )}
      </div>
    </div>
  )
}

export function SelectorPill({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "border-primary bg-accent text-accent-foreground shadow-sm"
          : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  )
}

export function SectionCard({
  title,
  subtitle,
  icon,
  children,
  className,
  action,
}: {
  title?: string
  subtitle?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  action?: ReactNode
}) {
  return (
    <section className={cn("rounded-3xl border border-border bg-card p-6 shadow-sm", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {icon && (
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                {icon}
              </span>
            )}
            <div>
              {title && <h3 className="font-heading text-lg font-semibold text-foreground text-balance">{title}</h3>}
              {subtitle && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function StatScale({
  options,
  value,
  onSelect,
}: {
  options: string[]
  value: string | null
  onSelect: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <SelectorPill key={opt} active={value === opt} onClick={() => onSelect(opt)}>
          {opt}
        </SelectorPill>
      ))}
    </div>
  )
}
