import { useEffect, useId, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  CircleHelp,
  RotateCcw,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  tenseGroups,
  tenseLessons,
  type LessonQuestion,
} from "@/features/tenses/lesson-data"
import { createMixedPracticeRound } from "@/features/tenses/mixed-practice-data"

interface PracticeLibraryPageProps {
  onAttempt: (
    questionId: string,
    selectedOptionId: string,
    isCorrect: boolean,
  ) => void
  onOpenReview: () => void
  onBackToCatalog: () => void
}

interface AttemptRecord {
  selectedOptionId: string
  isCorrect: boolean
}

export function PracticeLibraryPage({
  onAttempt,
  onOpenReview,
  onBackToCatalog,
}: PracticeLibraryPageProps) {
  const [round, setRound] = useState<LessonQuestion[] | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState<Record<string, AttemptRecord>>({})
  const questionRef = useRef<HTMLElement>(null)
  const choiceGroupId = useId()
  const currentQuestion = round?.[questionIndex]
  const isRoundComplete = Boolean(round && questionIndex >= round.length)

  useEffect(() => {
    if (!round || isRoundComplete) return
    questionRef.current?.focus()
  }, [questionIndex, isRoundComplete, round])

  function startRound() {
    setRound(createMixedPracticeRound())
    setQuestionIndex(0)
    setSelectedOptionId("")
    setSubmitted(false)
    setAnswers({})
  }

  function submitAnswer() {
    if (!currentQuestion || !selectedOptionId || submitted) return

    const isCorrect = selectedOptionId === currentQuestion.correctOptionId
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: { selectedOptionId, isCorrect },
    }))
    onAttempt(currentQuestion.id, selectedOptionId, isCorrect)
    setSubmitted(true)
  }

  function continueRound() {
    if (!round || !submitted) return
    setQuestionIndex((current) => current + 1)
    setSelectedOptionId("")
    setSubmitted(false)
  }

  if (!round) {
    return (
      <div className="practice-library-page" id="practice-library-top">
        <Button
          className="practice-library-back"
          variant="ghost"
          onClick={onBackToCatalog}
        >
          <ArrowLeft aria-hidden="true" size={17} /> 回到时态目录
        </Button>

        <header className="practice-library-heading">
          <div>
            <h1>时态练习库</h1>
            <p>
              不看课程提示，从语境中判断该用哪一种形式。每题作答后即时查看解析，整轮结束后回顾成绩。
            </p>
          </div>
          <Badge variant="outline">16 种形式 · 混合测验</Badge>
        </header>

        <section className="practice-library-start" aria-labelledby="mixed-test-title">
          <div className="practice-library-start__copy">
            <span className="practice-library-start__icon" aria-hidden="true">
              <BookOpenText size={22} strokeWidth={1.8} />
            </span>
            <div>
              <h2 id="mixed-test-title">16 时态混合测验</h2>
              <p>
                每轮 16 题，每种形式各抽 1 题。题目和选项会重新排序，答题前不显示时态名称或正确答案。
              </p>
            </div>
          </div>
          <div className="practice-library-facts" aria-label="测验说明">
            <div>
              <strong>{tenseLessons.length}</strong>
              <span>种学习形式</span>
            </div>
            <div>
              <strong>80</strong>
              <span>道独立新题</span>
            </div>
            <div>
              <strong>16</strong>
              <span>题 / 每轮</span>
            </div>
          </div>
          <Button className="practice-library-start__button" onClick={startRound}>
            开始混合测验 <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
          <p className="practice-library-start__note">
            首次选择计入本轮成绩；答错的题会加入错题复习。
          </p>
        </section>

        <section className="practice-library-groups" aria-labelledby="practice-groups-title">
          <div className="practice-library-section-heading">
            <div>
              <h2 id="practice-groups-title">覆盖范围</h2>
              <p>每轮都会从下面四组中各抽取四种形式。</p>
            </div>
            <span>每种形式 5 道新题</span>
          </div>
          <div className="practice-library-group-list">
            {tenseGroups.map((group) => {
              const groupLessons = tenseLessons.filter(
                (lesson) => lesson.group === group.id,
              )

              return (
                <section className="practice-library-group" key={group.id}>
                  <div className="practice-library-group__heading">
                    <h3>{group.title}</h3>
                    <span>{groupLessons.length} 种形式</span>
                  </div>
                  <ul>
                    {groupLessons.map((lesson) => (
                      <li key={lesson.id}>
                        <span>{lesson.title}</span>
                        <span>{lesson.englishTitle}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        </section>
      </div>
    )
  }

  if (isRoundComplete) {
    const correctCount = round.filter((question) => answers[question.id]?.isCorrect).length
    const missedCount = round.length - correctCount

    return (
      <div className="practice-library-page" id="practice-library-top">
        <Button
          className="practice-library-back"
          variant="ghost"
          onClick={() => setRound(null)}
        >
          <ArrowLeft aria-hidden="true" size={17} /> 回到练习库
        </Button>

        <header className="practice-results-heading">
          <div>
            <h1>本轮结果</h1>
            <p>每种形式各 1 题；以下解析对应你提交的第一次选择。</p>
          </div>
          <div className="practice-results-score" aria-label={`答对 ${correctCount} 题，共 ${round.length} 题`}>
            <strong>{correctCount}<span> / {round.length}</span></strong>
            <span>首次答对</span>
          </div>
        </header>

        <section className="practice-results-groups" aria-labelledby="practice-results-groups-title">
          <div className="practice-library-section-heading">
            <div>
              <h2 id="practice-results-groups-title">按形式查看</h2>
              <p>找出还需要再辨析的时间关系。</p>
            </div>
          </div>
          <ul>
            {tenseGroups.map((group) => {
              const groupLessons = tenseLessons.filter(
                (lesson) => lesson.group === group.id,
              )
              const groupQuestions = round.filter((question) =>
                groupLessons.some((lesson) => lesson.id === question.lessonId),
              )
              const groupCorrect = groupQuestions.filter(
                (question) => answers[question.id]?.isCorrect,
              ).length
              const percent = Math.round((groupCorrect / groupQuestions.length) * 100)

              return (
                <li className="practice-results-group" key={group.id}>
                  <div className="practice-results-group__label">
                    <strong>{group.title}</strong>
                    <span>{groupCorrect} / {groupQuestions.length} 题</span>
                  </div>
                  <Progress value={percent} aria-label={`${group.title}答对 ${groupCorrect} 题，共 ${groupQuestions.length} 题`} />
                </li>
              )
            })}
          </ul>
        </section>

        <section className="practice-results-review" aria-labelledby="practice-results-review-title">
          <div className="practice-library-section-heading">
            <div>
              <h2 id="practice-results-review-title">逐题解析</h2>
              <p>看清上下文中的时间参照，再对照各形式的含义。</p>
            </div>
            <Badge variant="outline">{missedCount} 题待复习</Badge>
          </div>
          <ol className="practice-results-question-list">
            {round.map((question, index) => {
              const answer = answers[question.id]
              const selectedOption = question.options.find(
                (option) => option.id === answer?.selectedOptionId,
              )
              const correctOption = question.options.find(
                (option) => option.id === question.correctOptionId,
              )
              const lesson = tenseLessons.find((item) => item.id === question.lessonId)
              const isCorrect = answer?.isCorrect === true

              return (
                <li
                  className={`practice-results-question${isCorrect ? " is-correct" : " is-missed"}`}
                  key={question.id}
                >
                  <div className="practice-results-question__topline">
                    <span className="practice-results-question__number">{String(index + 1).padStart(2, "0")}</span>
                    <Badge variant="secondary">{lesson?.title ?? "时态练习"}</Badge>
                    <span className="practice-results-question__status">
                      {isCorrect ? (
                        <><Check size={15} aria-hidden="true" /> 首次答对</>
                      ) : (
                        <><X size={15} aria-hidden="true" /> 需要复习</>
                      )}
                    </span>
                  </div>
                  <p className="practice-results-question__context">{question.context}</p>
                  <p className="practice-results-question__sentence">
                    {question.before}<strong>{correctOption?.label}</strong>{question.after}
                  </p>
                  <p className="practice-results-question__answer">
                    你的选择：<strong>{selectedOption?.label ?? "未记录"}</strong>
                    {!isCorrect && <span>正确形式：<strong>{correctOption?.label}</strong></span>}
                  </p>
                  <p className="practice-results-question__explanation">
                    {question.feedbackByOption[answer?.selectedOptionId ?? question.correctOptionId]}
                  </p>
                </li>
              )
            })}
          </ol>
        </section>

        <div className="practice-results-actions">
          <Button onClick={startRound}>
            <RotateCcw aria-hidden="true" /> 再做一轮
          </Button>
          {missedCount > 0 && (
            <Button variant="outline" onClick={onOpenReview}>
              复习错题 <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    )
  }

  const answeredCount = questionIndex + (submitted ? 1 : 0)
  const selectedOption = currentQuestion?.options.find(
    (option) => option.id === selectedOptionId,
  )
  const correctOption = currentQuestion?.options.find(
    (option) => option.id === currentQuestion.correctOptionId,
  )
  const currentLesson = tenseLessons.find(
    (lesson) => lesson.id === currentQuestion?.lessonId,
  )
  const isCurrentAnswerCorrect =
    currentQuestion?.correctOptionId === selectedOptionId

  return (
    <div className="practice-library-page" id="practice-library-top">
      <Button
        className="practice-library-back"
        variant="ghost"
        onClick={() => setRound(null)}
      >
        <ArrowLeft aria-hidden="true" size={17} /> 退出本轮
      </Button>

      <header className="practice-round-heading">
        <div>
          <h1>16 时态混合测验</h1>
          <p>根据语境选择最合适的动词形式，每题提交后立即查看结果和解析。</p>
        </div>
        <Badge variant="outline">{questionIndex + 1} / {round.length}</Badge>
      </header>

      <div className="practice-round-progress">
        <div className="practice-round-progress__label">
          <span>已完成 {answeredCount} 题</span>
          <span>{round.length - answeredCount} 题待作答</span>
        </div>
        <Progress value={(answeredCount / round.length) * 100} aria-label={`已提交 ${answeredCount} 题，共 ${round.length} 题`} />
      </div>

      {currentQuestion && (
        <section
          className="practice-round-question"
          aria-labelledby="practice-round-prompt"
          aria-describedby="practice-round-context"
          ref={questionRef}
          tabIndex={-1}
        >
          <div className="practice-round-question__context">
            <CircleHelp size={18} aria-hidden="true" />
            <p id="practice-round-context">{currentQuestion.context}</p>
          </div>
          <p className="practice-round-question__sentence" id="practice-round-prompt">
            <span>{currentQuestion.before}</span>
            <strong>{submitted ? correctOption?.label : "______"}</strong>
            <span>{currentQuestion.after}</span>
          </p>

          <RadioGroup
            value={selectedOptionId}
            onValueChange={setSelectedOptionId}
            disabled={submitted}
            aria-label="选择最合适的动词形式"
            className="practice-round-options"
          >
            {currentQuestion.options.map((option, optionIndex) => {
              const optionId = `${choiceGroupId}-${optionIndex}`

              return (
                <label
                  className={[
                    "practice-round-option",
                    selectedOptionId === option.id ? "is-selected" : "",
                    submitted && option.id === currentQuestion.correctOptionId
                      ? "is-correct"
                      : "",
                    submitted &&
                    option.id === selectedOptionId &&
                    !isCurrentAnswerCorrect
                      ? "is-incorrect"
                      : "",
                  ].filter(Boolean).join(" ")}
                  htmlFor={optionId}
                  key={option.id}
                >
                  <RadioGroupItem id={optionId} value={option.id} />
                  <span>{option.label}</span>
                  {submitted && option.id === currentQuestion.correctOptionId && (
                    <span className="practice-round-option__result">正确答案</span>
                  )}
                  {submitted &&
                    option.id === selectedOptionId &&
                    !isCurrentAnswerCorrect && (
                      <span className="practice-round-option__result">你的选择</span>
                    )}
                </label>
              )
            })}
          </RadioGroup>

          {submitted && currentQuestion && (
            <div
              className={`practice-round-feedback ${isCurrentAnswerCorrect ? "is-correct" : "is-incorrect"}`}
              role="status"
              aria-live="polite"
            >
              {isCurrentAnswerCorrect ? (
                <Check aria-hidden="true" size={19} />
              ) : (
                <X aria-hidden="true" size={19} />
              )}
              <div>
                <strong>
                  {currentLesson?.title} · {isCurrentAnswerCorrect ? "回答正确" : "需要复习"}
                </strong>
                {!isCurrentAnswerCorrect && (
                  <p className="practice-round-feedback__answer">
                    你的选择：{selectedOption?.label}；正确形式：{correctOption?.label}
                  </p>
                )}
                <p>{currentQuestion.feedbackByOption[selectedOptionId]}</p>
              </div>
            </div>
          )}

          <div className="practice-round-question__actions">
            {!submitted ? (
              <Button disabled={!selectedOptionId} onClick={submitAnswer}>
                确认本题 <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
            ) : (
              <>
                <Button onClick={continueRound}>
                  {questionIndex === round.length - 1 ? "查看本轮结果" : "下一题"}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Button>
              </>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
