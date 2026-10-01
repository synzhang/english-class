import { useCallback, useEffect, useMemo, useState } from "react"
import { requiredQuestionIds } from "@/features/tenses/lesson-data"
import { allProgressQuestionIds } from "@/features/tenses/mixed-practice-data"
import {
  emptyProgress,
  readLearningProgress,
  writeLearningProgress,
  type LearningProgress,
} from "@/lib/progress-storage"

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(readLearningProgress)

  useEffect(() => {
    writeLearningProgress(progress)
  }, [progress])

  const recordAnswer = useCallback(
    (questionId: string, selectedOptionId: string, isCorrect: boolean) => {
      setProgress((current) => {
        const solved = new Set(current.solvedQuestionIds)
        const missedQuestions = { ...current.missedQuestions }

        if (isCorrect) {
          solved.add(questionId)
          delete missedQuestions[questionId]
        } else {
          const previous = missedQuestions[questionId]
          missedQuestions[questionId] = {
            lastSelectedOptionId: selectedOptionId,
            attempts: (previous?.attempts ?? 0) + 1,
          }
        }

        return {
          version: 2,
          solvedQuestionIds: [...solved],
          missedQuestions,
        }
      })
    },
    [],
  )

  const solvedCount = useMemo(
    () =>
      allProgressQuestionIds.filter((questionId) =>
        progress.solvedQuestionIds.includes(questionId),
      ).length,
    [progress.solvedQuestionIds],
  )
  const courseSolvedCount = useMemo(
    () =>
      requiredQuestionIds.filter((questionId) =>
        progress.solvedQuestionIds.includes(questionId),
      ).length,
    [progress.solvedQuestionIds],
  )

  const completionPercent = Math.round(
    (solvedCount / allProgressQuestionIds.length) * 100,
  )

  const isCourseComplete = courseSolvedCount === requiredQuestionIds.length

  const resetProgress = useCallback(() => setProgress(emptyProgress), [])

  return {
    progress,
    recordAnswer,
    solvedCount,
    completionPercent,
    isCourseComplete,
    resetProgress,
  }
}
