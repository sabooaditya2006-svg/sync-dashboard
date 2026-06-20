"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

export type Profile = {
  name: string
  age: string
  cycleLength: string
}

export type SymptomState = {
  energy: string | null
  cravings: string | null
  postMealSluggish: string | null
  skin: string | null
  hirsutism: string | null
  acanthosis: string | null
  bloating: number
  gut: string | null
  mood: string | null
  brainFog: string | null
}

export type Medication = {
  id: string
  name: string
  dosage: string
  slots: string[]
  taken: boolean
}

export type ChatMessage = {
  id: string
  role: "user" | "sync"
  text: string
}

export type WeightLog = { label: string; kg: number }

type View = "home" | "studio" | "circle"

const EXERCISE_ITEMS = [
  "Post-Meal Stroll",
  "Cortisol-Drop Yoga Flow",
  "10 Squats",
  "15 Heel Raises",
  "5-Min Endorphin Booster",
]

const SLEEP_ITEMS = [
  "Lay out workout clothes",
  "Prep protein breakfast",
  "Dim the lights",
  "Clear meditation floor space",
]

type SyncContextValue = {
  // shell
  profile: Profile | null
  setProfile: (p: Profile) => void
  onboarded: boolean
  completeOnboarding: () => void
  skipped: boolean
  setSkipped: (v: boolean) => void
  view: View
  setView: (v: View) => void

  // nutrition pane
  nutrition: { stroll: boolean; protein: boolean; alarm: boolean }
  toggleNutrition: (key: "stroll" | "protein" | "alarm") => void
  insulinNote: string
  setInsulinNote: (s: string) => void

  // mental pane
  journal: string
  setJournal: (s: string) => void
  journalSaved: boolean
  saveJournal: () => void
  moodNote: string
  setMoodNote: (s: string) => void

  // exercise pane
  exerciseItems: string[]
  exerciseChecked: boolean[]
  toggleExercise: (i: number) => void

  // sleep pane
  sleepItems: string[]
  sleepChecked: boolean[]
  toggleSleep: (i: number) => void

  // derived pillars
  pillarProgress: { nutrition: number; mental: number; exercise: number; sleep: number }
  pillarsWon: number
  masterProgress: number

  // studio quiz
  quizAnswers: Record<number, string | number>
  setQuizAnswer: (id: number, value: string | number) => void
  quizSubmitted: boolean
  submitQuiz: () => void
  quizAnsweredCount: number

  // trackers
  periodDays: number[]
  togglePeriodDay: (day: number) => void
  weightLogs: WeightLog[]
  addWeight: (kg: number) => void
  water: number
  setWater: (n: number) => void

  // symptoms
  symptoms: SymptomState
  setSymptom: <K extends keyof SymptomState>(key: K, value: SymptomState[K]) => void

  // ml
  riskScore: number
  riskLabel: string
  hasBaseline: boolean

  // care circle
  medications: Medication[]
  addMedication: (m: Omit<Medication, "id" | "taken">) => void
  toggleMedTaken: (id: string) => void
  messages: ChatMessage[]
  sendMessage: (userText: string, answer: string) => void
}

const SyncContext = createContext<SyncContextValue | null>(null)

export function useSync() {
  const ctx = useContext(SyncContext)
  if (!ctx) throw new Error("useSync must be used within SyncProvider")
  return ctx
}

export function SyncProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile | null>(null)
  const [onboarded, setOnboarded] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const [view, setView] = useState<View>("home")

  const [nutrition, setNutrition] = useState({ stroll: false, protein: false, alarm: false })
  const [insulinNote, setInsulinNote] = useState(
    "Insulin is the key that lets sugar move from your blood into your cells for energy. With insulin resistance, the lock gets stiff, so your body makes extra keys (insulin). Those extra keys can raise androgens and nudge PMOS patterns. Gentle movement, protein-first meals, and sleep help the lock work smoothly again.",
  )

  const [journal, setJournal] = useState("")
  const [journalSaved, setJournalSaved] = useState(false)
  const [moodNote, setMoodNote] = useState(
    "Mood shifts are not 'all in your head.' Estrogen and progesterone interact with serotonin and dopamine, so hormonal swings genuinely change how you feel. Naming the mechanic helps you respond with care instead of self-blame.",
  )

  const [exerciseChecked, setExerciseChecked] = useState<boolean[]>(Array(EXERCISE_ITEMS.length).fill(false))
  const [sleepChecked, setSleepChecked] = useState<boolean[]>(Array(SLEEP_ITEMS.length).fill(false))

  const [quizAnswers, setQuizAnswers] = useState<Record<number, string | number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const [periodDays, setPeriodDays] = useState<number[]>([])
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([
    { label: "Wk 1", kg: 68.2 },
    { label: "Wk 2", kg: 68.0 },
    { label: "Wk 3", kg: 67.6 },
  ])
  const [water, setWater] = useState(0)

  const [symptoms, setSymptoms] = useState<SymptomState>({
    energy: null,
    cravings: null,
    postMealSluggish: null,
    skin: null,
    hirsutism: null,
    acanthosis: null,
    bloating: 0,
    gut: null,
    mood: null,
    brainFog: null,
  })

  const [medications, setMedications] = useState<Medication[]>([
    { id: "seed-1", name: "Inositol", dosage: "2g", slots: ["Morning", "Evening"], taken: false },
    { id: "seed-2", name: "Vitamin D3", dosage: "2000 IU", slots: ["Morning"], taken: true },
  ])

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "sync",
      text: "Hi, I'm your sYnc companion. This is a judgment-free space — tap a question below or type your own, and let's bust some myths together.",
    },
  ])

  // ---- actions ----
  const setProfile = (p: Profile) => setProfileState(p)
  const completeOnboarding = () => setOnboarded(true)

  const toggleNutrition = (key: "stroll" | "protein" | "alarm") =>
    setNutrition((prev) => ({ ...prev, [key]: !prev[key] }))

  const saveJournal = () => setJournalSaved(true)

  const toggleExercise = (i: number) =>
    setExerciseChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))

  const toggleSleep = (i: number) =>
    setSleepChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))

  const setQuizAnswer = (id: number, value: string | number) =>
    setQuizAnswers((prev) => ({ ...prev, [id]: value }))

  const submitQuiz = () => setQuizSubmitted(true)

  const togglePeriodDay = (day: number) =>
    setPeriodDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => a - b)))

  const addWeight = (kg: number) =>
    setWeightLogs((prev) => [...prev, { label: `Wk ${prev.length + 1}`, kg }])

  const setSymptom = <K extends keyof SymptomState>(key: K, value: SymptomState[K]) =>
    setSymptoms((prev) => ({ ...prev, [key]: value }))

  const addMedication = (m: Omit<Medication, "id" | "taken">) =>
    setMedications((prev) => [...prev, { ...m, id: `med-${Date.now()}`, taken: false }])

  const toggleMedTaken = (id: string) =>
    setMedications((prev) => prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)))

  const sendMessage = (userText: string, answer: string) => {
    const base = Date.now()
    setMessages((prev) => [
      ...prev,
      { id: `u-${base}`, role: "user", text: userText },
      { id: `s-${base}`, role: "sync", text: answer },
    ])
  }

  // ---- derived: pillars ----
  const pillarProgress = useMemo(() => {
    const nutritionDone = [nutrition.stroll, nutrition.protein].filter(Boolean).length
    const nutritionPct = Math.round((nutritionDone / 2) * 100)

    const mentalDone = (journalSaved ? 1 : 0)
    const mentalPct = mentalDone ? 100 : 0

    const exDone = exerciseChecked.filter(Boolean).length
    const exPct = Math.min(100, Math.round((exDone / 2) * 100))

    const sleepDone = sleepChecked.filter(Boolean).length
    const sleepPct = Math.round((sleepDone / sleepChecked.length) * 100)

    return { nutrition: nutritionPct, mental: mentalPct, exercise: exPct, sleep: sleepPct }
  }, [nutrition, journalSaved, exerciseChecked, sleepChecked])

  const pillarsWon = useMemo(() => {
    return [
      pillarProgress.nutrition >= 100,
      pillarProgress.mental >= 100,
      pillarProgress.exercise >= 100,
      pillarProgress.sleep >= 100,
    ].filter(Boolean).length
  }, [pillarProgress])

  const masterProgress = useMemo(
    () =>
      Math.round(
        (pillarProgress.nutrition + pillarProgress.mental + pillarProgress.exercise + pillarProgress.sleep) / 4,
      ),
    [pillarProgress],
  )

  const quizAnsweredCount = Object.keys(quizAnswers).length

  // ---- derived: ML risk ----
  const hasBaseline = quizAnsweredCount >= 5 || periodDays.length > 0 || Object.values(symptoms).some((v) => v !== null && v !== 0)

  const { riskScore, riskLabel } = useMemo(() => {
    let score = 0

    // symptom signals
    if (symptoms.energy === "Low / Crashed") score += 12
    if (symptoms.cravings === "Extreme Spike") score += 16
    if (symptoms.cravings === "Mild") score += 6
    if (symptoms.postMealSluggish === "Yes") score += 8
    if (symptoms.skin === "Active Acne Flare") score += 14
    if (symptoms.skin === "Extremely Sensitive") score += 6
    if (symptoms.hirsutism === "Noticeable Excess Growth") score += 14
    if (symptoms.acanthosis === "New Pigmentation Flares") score += 12
    if (symptoms.bloating >= 70) score += 14
    else if (symptoms.bloating >= 40) score += 7
    if (symptoms.gut === "Acidity / Reflux" || symptoms.gut === "Slow Motility / Constipation") score += 8
    if (symptoms.mood === "High Anxiety" || symptoms.mood === "Emotional Irritability") score += 8
    if (symptoms.brainFog === "High Distraction & Fatigue") score += 8

    // cycle signal
    if (periodDays.length > 0) {
      const sorted = [...periodDays].sort((a, b) => a - b)
      const span = sorted[sorted.length - 1] - sorted[0]
      if (span >= 8) score += 12
      if (periodDays.length >= 7) score += 8
    }

    // quiz signals
    const q2 = quizAnswers[2]
    if (q2 === "Daily" || q2 === "Often") score += 8
    const q6 = quizAnswers[6]
    if (q6 === "<5" || q6 === "5-6") score += 6
    const q11 = quizAnswers[11]
    if (typeof q11 === "number" && q11 >= 7) score += 8
    const q16 = quizAnswers[16]
    if (q16 === "0" || q16 === "1-2") score += 6

    score = Math.min(100, score)

    let label = "Low"
    if (score >= 60) label = "Moderate-to-High Indicator"
    else if (score >= 30) label = "Moderate Indicator"
    else if (score > 0) label = "Low-to-Moderate"

    return { riskScore: score, riskLabel: label }
  }, [symptoms, periodDays, quizAnswers])

  const value: SyncContextValue = {
    profile,
    setProfile,
    onboarded,
    completeOnboarding,
    skipped,
    setSkipped,
    view,
    setView,
    nutrition,
    toggleNutrition,
    insulinNote,
    setInsulinNote,
    journal,
    setJournal,
    journalSaved,
    saveJournal,
    moodNote,
    setMoodNote,
    exerciseItems: EXERCISE_ITEMS,
    exerciseChecked,
    toggleExercise,
    sleepItems: SLEEP_ITEMS,
    sleepChecked,
    toggleSleep,
    pillarProgress,
    pillarsWon,
    masterProgress,
    quizAnswers,
    setQuizAnswer,
    quizSubmitted,
    submitQuiz,
    quizAnsweredCount,
    periodDays,
    togglePeriodDay,
    weightLogs,
    addWeight,
    water,
    setWater,
    symptoms,
    setSymptom,
    riskScore,
    riskLabel,
    hasBaseline,
    medications,
    addMedication,
    toggleMedTaken,
    messages,
    sendMessage,
  }

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>
}
