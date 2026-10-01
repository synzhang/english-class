export interface MissedQuestion {
  lastSelectedOptionId: string
  attempts: number
}

export interface LearningProgress {
  version: 2
  solvedQuestionIds: string[]
  missedQuestions: Record<string, MissedQuestion>
}

const STORAGE_KEY = "english-class:tenses-progress:v2"
const LEGACY_STORAGE_KEY = "english-class:tenses-progress:v1"

export const emptyProgress: LearningProgress = {
  version: 2,
  solvedQuestionIds: [],
  missedQuestions: {},
}

function parseProgress(serialized: string | null): LearningProgress | null {
  if (!serialized) return null

  const parsed = JSON.parse(serialized) as {
    version?: number
    solvedQuestionIds?: unknown
    missedQuestions?: unknown
  }
  if (
    !Array.isArray(parsed.solvedQuestionIds) ||
    (parsed.version !== 1 && parsed.version !== 2)
  ) {
    return null
  }

  const missedQuestions: Record<string, MissedQuestion> = {}
  if (parsed.missedQuestions && typeof parsed.missedQuestions === "object") {
    for (const [questionId, value] of Object.entries(parsed.missedQuestions)) {
      if (
        value &&
        typeof value.lastSelectedOptionId === "string" &&
        typeof value.attempts === "number"
      ) {
        missedQuestions[questionId] = {
          lastSelectedOptionId: value.lastSelectedOptionId,
          attempts: value.attempts,
        }
      }
    }
  }

  return {
    version: 2,
    solvedQuestionIds: parsed.solvedQuestionIds.filter(
      (questionId): questionId is string => typeof questionId === "string",
    ),
    missedQuestions,
  }
}

export function readLearningProgress(): LearningProgress {
  if (typeof window === "undefined") return emptyProgress

  try {
    const current = parseProgress(window.localStorage.getItem(STORAGE_KEY))
    if (current) return current

    const legacy = parseProgress(window.localStorage.getItem(LEGACY_STORAGE_KEY))
    if (!legacy) return emptyProgress

    writeLearningProgress(legacy)
    return legacy
  } catch {
    return emptyProgress
  }
}

export function writeLearningProgress(progress: LearningProgress): void {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...progress, version: 2 }),
    )
  } catch {
    // Keep the lesson usable when browser storage is unavailable.
  }
}
