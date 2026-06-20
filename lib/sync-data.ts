export type QuizQuestion = {
  id: number
  category: "Nutrition" | "Sleep" | "Mental Health" | "Exercise"
  prompt: string
  type: "choice" | "slider"
  options?: string[]
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Nutrition
  { id: 1, category: "Nutrition", prompt: "Daily meal count?", type: "choice", options: ["1-2", "3", "4+", "Varies"] },
  {
    id: 2,
    category: "Nutrition",
    prompt: "Sugar cravings frequency?",
    type: "choice",
    options: ["Never", "Rarely", "Sometimes", "Often", "Daily"],
  },
  { id: 3, category: "Nutrition", prompt: "Daily water intake?", type: "choice", options: ["<1L", "1-2L", "2-3L", ">3L"] },
  {
    id: 4,
    category: "Nutrition",
    prompt: "Processed food frequency?",
    type: "choice",
    options: ["Rarely", "1-2x/wk", "3-5x/wk", "Daily"],
  },
  {
    id: 5,
    category: "Nutrition",
    prompt: "Post-meal sleepiness?",
    type: "choice",
    options: ["Never", "Rarely", "Sometimes", "Often"],
  },
  // Sleep
  { id: 6, category: "Sleep", prompt: "Hours of sleep?", type: "choice", options: ["<5", "5-6", "7-8", ">8"] },
  {
    id: 7,
    category: "Sleep",
    prompt: "Sleep quality?",
    type: "choice",
    options: ["Excellent", "Good", "Average", "Poor"],
  },
  {
    id: 8,
    category: "Sleep",
    prompt: "Wake up refreshed?",
    type: "choice",
    options: ["Always", "Often", "Sometimes", "Rarely"],
  },
  {
    id: 9,
    category: "Sleep",
    prompt: "Night wakings?",
    type: "choice",
    options: ["Never", "Occasionally", "Frequently", "Every night"],
  },
  {
    id: 10,
    category: "Sleep",
    prompt: "Daytime fatigue?",
    type: "choice",
    options: ["Never", "Rarely", "Sometimes", "Often"],
  },
  // Mental Health
  { id: 11, category: "Mental Health", prompt: "Current stress scale?", type: "slider" },
  {
    id: 12,
    category: "Mental Health",
    prompt: "Mood swings frequency?",
    type: "choice",
    options: ["Never", "Rarely", "Sometimes", "Often"],
  },
  {
    id: 13,
    category: "Mental Health",
    prompt: "Difficulty concentrating?",
    type: "choice",
    options: ["Never", "Rarely", "Sometimes", "Often"],
  },
  {
    id: 14,
    category: "Mental Health",
    prompt: "Feeling overwhelmed?",
    type: "choice",
    options: ["Never", "Rarely", "Sometimes", "Often"],
  },
  {
    id: 15,
    category: "Mental Health",
    prompt: "Health concerns dismissed by others?",
    type: "choice",
    options: ["Never", "Rarely", "Sometimes", "Often"],
  },
  // Exercise
  { id: 16, category: "Exercise", prompt: "Active days per week?", type: "choice", options: ["0", "1-2", "3-4", "5+"] },
  {
    id: 17,
    category: "Exercise",
    prompt: "Primary activity type?",
    type: "choice",
    options: ["Walking", "Running", "Gym", "Sports", "None"],
  },
  {
    id: 18,
    category: "Exercise",
    prompt: "Daily sitting duration?",
    type: "choice",
    options: ["<4h", "4-6h", "6-8h", ">8h"],
  },
  {
    id: 19,
    category: "Exercise",
    prompt: "Energetic enough for tasks?",
    type: "choice",
    options: ["Always", "Often", "Sometimes", "Rarely"],
  },
  { id: 20, category: "Exercise", prompt: "Exercise motivation scale?", type: "slider" },
]

export const QUIZ_CATEGORIES = ["Nutrition", "Sleep", "Mental Health", "Exercise"] as const

export type LiteracyCard = {
  title: string
  tag: string
  body: string
}

export const LITERACY_CARDS: LiteracyCard[] = [
  {
    tag: "Myth-buster",
    title: "PMOS is not caused by your weight",
    body: "Weight changes are often a symptom of the underlying hormonal and insulin patterns — not the root cause. Many people at every body size live with PMOS.",
  },
  {
    tag: "Education",
    title: "Insulin resistance, simply put",
    body: "When cells respond less to insulin, the body makes more of it. Higher insulin can nudge the ovaries toward producing more androgens, which links to many PMOS signs.",
  },
  {
    tag: "Cycle",
    title: "Irregular cycles are data, not failure",
    body: "A cycle that varies tells a story about your hormones. Tracking the pattern over months gives you and your clinician far more insight than a single month ever could.",
  },
  {
    tag: "Nutrition",
    title: "Protein-first, then the rest",
    body: "Eating protein and fiber before refined carbs can soften the post-meal glucose spike, which many people find steadies energy and cravings.",
  },
  {
    tag: "Movement",
    title: "Gentle movement counts",
    body: "A short post-meal walk improves how your muscles take up glucose. Consistency matters far more than intensity for metabolic balance.",
  },
  {
    tag: "Mind",
    title: "Stress speaks to your hormones",
    body: "Chronic cortisol elevation can amplify cravings and disrupt sleep. Small daily nervous-system resets are a legitimate part of metabolic care.",
  },
]

export type Specialist = {
  name: string
  specialty: string
  location: string
  rating: number
  reviews: number
  tag: string
}

export const SPECIALISTS: Specialist[] = [
  {
    name: "Dr. Anika Rao",
    specialty: "Gynecologist · PCOS focus",
    location: "Telehealth · Mumbai",
    rating: 4.9,
    reviews: 312,
    tag: "Shame-free care",
  },
  {
    name: "Dr. Leah Bennett",
    specialty: "Endocrinologist",
    location: "Telehealth · London",
    rating: 4.8,
    reviews: 248,
    tag: "Insulin & metabolic",
  },
  {
    name: "Dr. Priya Menon",
    specialty: "Reproductive Endocrinology",
    location: "Telehealth · Bengaluru",
    rating: 4.9,
    reviews: 197,
    tag: "Fertility friendly",
  },
  {
    name: "Dr. Sofia Marquez",
    specialty: "Gynecologist · Adolescent",
    location: "Telehealth · Madrid",
    rating: 4.7,
    reviews: 156,
    tag: "Teen & young adult",
  },
]

export const MYTH_ANSWERS: Record<string, string> = {
  "Society says this is my fault. Is it?":
    "Not at all. PMOS is a complex metabolic and hormonal condition shaped by genetics, insulin signalling, and environment — none of which are a moral failing or a result of willpower. You did not cause this, and managing it is about supporting your body, not punishing it. Anyone who frames it as your fault is misinformed, not you.",
  "Does PMOS limit my lifestyle goals?":
    "It does not have to. People with PMOS build careers, run marathons, travel, and have families every day. The condition asks for awareness and steady self-care, not a smaller life. With the right rhythm of nutrition, movement, sleep, and clinical support, your goals stay firmly within reach.",
  "Let's bust the weight resistance myth.":
    "The idea that you simply need to 'eat less and move more' ignores how PMOS works. Elevated insulin can make the body hold onto fat and resist loss, so identical effort can produce different results than it would for someone without PMOS. This is biology, not a lack of discipline — and strategies that target insulin and stress often matter more than calorie restriction alone.",
}
