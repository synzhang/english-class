import { useId, useState } from "react"
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import type { LessonQuestion } from "@/features/tenses/lesson-data"

type QuestionVariant = "guided" | "transfer" | "review"

interface PracticeQuestionProps {
  question: LessonQuestion
  variant: QuestionVariant
  solved: boolean
  previousAttempts?: number
  onAttempt: (
    questionId: string,
    selectedOptionId: string,
    isCorrect: boolean,
  ) => void
  onContinue?: () => void
  continueLabel?: string
}

interface AnswerResult {
  isCorrect: boolean
  message: string
}

const variantLabels: Record<QuestionVariant, string> = {
  guided: "随堂练习",
  transfer: "新语境",
  review: "错题重练",
}

export function PracticeQuestion({
  question,
  variant,
  solved,
  previousAttempts = 0,
  onAttempt,
  onContinue,
  continueLabel = "继续下一题",
}: PracticeQuestionProps) {
  const groupId = useId()
  const [selectedOptionId, setSelectedOptionId] = useState(
    solved ? question.correctOptionId : "",
  )
  const [result, setResult] = useState<AnswerResult | null>(() =>
    solved
      ? {
          isCorrect: true,
          message: question.feedbackByOption[question.correctOptionId],
        }
      : null,
  )

  const isCorrect = solved || result?.isCorrect === true

  function checkAnswer() {
    if (!selectedOptionId) return
    const correct = selectedOptionId === question.correctOptionId
    onAttempt(question.id, selectedOptionId, correct)
    setResult({
      isCorrect: correct,
      message: question.feedbackByOption[selectedOptionId],
    })
  }

  function handleSelection(value: string) {
    if (isCorrect) return
    setSelectedOptionId(value)
    setResult(null)
  }

  return (
    <section
      className={`question-block question-block--${variant}${isCorrect ? " is-solved" : ""}`}
      aria-labelledby={`${groupId}-sentence`}
      aria-describedby={`${groupId}-context`}
    >
      <div className="question-context">
        <Badge variant={variant === "guided" ? "secondary" : "outline"}>
          {question.practiceStage ?? variantLabels[variant]}
        </Badge>
        <p id={`${groupId}-context`}>{question.context}</p>
      </div>

      <p
        className="question-sentence"
        id={`${groupId}-sentence`}
        aria-label={`${question.before}填空${question.after}`}
      >
        <span aria-hidden="true">{question.before}</span>
        <span className="question-blank" aria-hidden="true">
          {isCorrect
            ? question.options.find(
                (option) => option.id === question.correctOptionId,
              )?.label
            : "______"}
        </span>
        <span aria-hidden="true">{question.after}</span>
      </p>

      <RadioGroup
        value={selectedOptionId}
        onValueChange={handleSelection}
        disabled={isCorrect}
        aria-label="选择动词形式"
        className="answer-options"
      >
        {question.options.map((option) => {
          const optionId = `${groupId}-${option.id}`
          const checked = selectedOptionId === option.id

          return (
            <label
              className={`answer-option${checked ? " is-selected" : ""}${isCorrect && checked ? " is-correct" : ""}`}
              htmlFor={optionId}
              key={option.id}
            >
              <RadioGroupItem id={optionId} value={option.id} />
              <span>{option.label}</span>
            </label>
          )
        })}
      </RadioGroup>

      <div className="question-actions">
        {!isCorrect && (
          <Button
            className="check-answer-button"
            disabled={!selectedOptionId}
            onClick={checkAnswer}
          >
            {result && !result.isCorrect ? "重新检查" : "检查答案"}
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        )}

        {isCorrect && variant === "guided" && onContinue && (
          <Button variant="outline" className="continue-button" onClick={onContinue}>
            {continueLabel} <ArrowRight aria-hidden="true" />
          </Button>
        )}

        {result && !result.isCorrect && (
          <span className="retry-hint">
            {previousAttempts > 0
              ? `这道题已错过 ${previousAttempts} 次，再看一眼语境。`
              : "再看一眼语境，换一个答案试试。"}
          </span>
        )}
      </div>

      {result && (
        <div
          className={`answer-feedback${result.isCorrect ? " answer-feedback--correct" : " answer-feedback--retry"}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {result.isCorrect ? (
            <CheckCircle2 size={19} aria-hidden="true" />
          ) : (
            <XCircle size={19} aria-hidden="true" />
          )}
          <div>
            <strong>{result.isCorrect ? "判断正确" : "还差一点"}</strong>
            <p>{result.message}</p>
          </div>
          {result.isCorrect && variant === "review" && (
            <span className="review-resolved">
              <RotateCcw size={14} aria-hidden="true" /> 已移出错题
            </span>
          )}
        </div>
      )}
    </section>
  )
}
