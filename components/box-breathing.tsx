"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Pause, Play } from "lucide-react"

const PHASES = [
  { label: "Breathe In", duration: 4000, scale: 1 },
  { label: "Hold", duration: 4000, scale: 1 },
  { label: "Breathe Out", duration: 4000, scale: 0.6 },
  { label: "Hold", duration: 4000, scale: 0.6 },
]

export function BoxBreathing() {
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState(0)
  const [scale, setScale] = useState(0.6)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!running) return
    setScale(PHASES[phase].scale)
    timer.current = setTimeout(() => {
      setPhase((p) => (p + 1) % PHASES.length)
    }, PHASES[phase].duration)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [running, phase])

  const toggle = () => {
    if (running) {
      setRunning(false)
      setScale(0.6)
      setPhase(0)
    } else {
      setRunning(true)
      setPhase(0)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-secondary/50 p-6">
      <div className="relative flex size-44 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-primary/30" />
        <span
          className="flex size-44 items-center justify-center rounded-full bg-accent transition-transform duration-[4000ms] ease-in-out"
          style={{ transform: `scale(${scale})` }}
        >
          <span className="font-heading text-base font-semibold text-accent-foreground">
            {running ? PHASES[phase].label : "Box Breathing"}
          </span>
        </span>
      </div>
      <Button onClick={toggle} className="rounded-full px-6">
        {running ? <Pause className="mr-1 size-4" /> : <Play className="mr-1 size-4" />}
        {running ? "Stop Breath" : "Start Breath"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        3-minute reset · 4s in · 4s hold · 4s out · 4s hold
      </p>
    </div>
  )
}
