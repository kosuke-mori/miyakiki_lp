// Per-session stable option-order shuffle for randomized survey questions.
// The shuffled order is persisted in sessionStorage so refresh/back within a
// session shows the same order; a fresh session gets a fresh shuffle.
// Deliberately NOT cleared by clearAnswers().

import type { SurveyOption } from '@/app/components/survey/types'

const STORAGE_KEY = 'testkiki_option_order'

type StoredOrders = Record<string, string[]>

function readOrders(): StoredOrders {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeOrder(questionId: string, order: string[]): void {
  if (typeof window === 'undefined') return
  try {
    const orders = readOrders()
    orders[questionId] = order
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  } catch {
    // storage unavailable — order just won't be stable across refreshes
  }
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// Returns the question's options in this session's stable shuffled order:
// non-pinned options shuffled once per session, pinned options appended in
// authored order. If the stored order no longer matches the current option
// set (mid-session deploy changed the options), it reshuffles.
export function getStableOptionOrder(
  questionId: string,
  options: SurveyOption[]
): SurveyOption[] {
  if (typeof window === 'undefined') return options

  const byId = new Map(options.map(o => [o.id, o]))
  const stored = readOrders()[questionId]
  if (
    stored &&
    stored.length === options.length &&
    stored.every(id => byId.has(id))
  ) {
    return stored.map(id => byId.get(id)!)
  }

  const ordered = [
    ...shuffle(options.filter(o => !o.pinned)),
    ...options.filter(o => o.pinned)
  ]
  writeOrder(questionId, ordered.map(o => o.id))
  return ordered
}
