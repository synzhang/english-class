import { useEffect, useRef, useState } from "react"
import {
  ArrowLeft,
  BookOpenText,
  Clock3,
  Pencil,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PracticeQuestion } from "@/features/tenses/practice-question"
import { getLessonQuestions, type TenseLesson } from "@/features/tenses/lesson-data"
import type { LearningProgress } from "@/lib/progress-storage"

interface TenseLessonPageProps {
  lesson: TenseLesson
  progress: LearningProgress
  solvedCount: number
  isLessonComplete: boolean
  onAttempt: (
    questionId: string,
    selectedOptionId: string,
    isCorrect: boolean,
  ) => void
  onReviewMistakes: () => void
  onBackToCatalog: () => void
}

export function TenseLessonPage({
  lesson,
  progress,
  solvedCount,
  isLessonComplete,
  onAttempt,
  onReviewMistakes,
  onBackToCatalog,
}: TenseLessonPageProps) {
  const questions = getLessonQuestions(lesson)
  const firstUnsolvedQuestion = questions.find(
    (question) => !progress.solvedQuestionIds.includes(question.id),
  )
  const [currentQuestionId, setCurrentQuestionId] = useState(
    () => firstUnsolvedQuestion?.id ?? questions[questions.length - 1].id,
  )
  const questionRegionRef = useRef<HTMLDivElement>(null)
  const previousQuestionId = useRef(currentQuestionId)
  const currentQuestionIndex = Math.max(
    0,
    questions.findIndex((question) => question.id === currentQuestionId),
  )
  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex >= questions.length - 1
  const nextQuestion = isLastQuestion ? undefined : questions[currentQuestionIndex + 1]
  const isTransferQuestion = isLastQuestion

  useEffect(() => {
    if (previousQuestionId.current === currentQuestionId) return
    questionRegionRef.current?.focus()
    previousQuestionId.current = currentQuestionId
  }, [currentQuestionId])

  return (
    <div className="lesson-page" id="lesson-top">
      <Button
        className="lesson-back-link"
        variant="ghost"
        onClick={onBackToCatalog}
      >
        <ArrowLeft aria-hidden="true" size={17} /> 回到时态目录
      </Button>

      <section
        className="lesson-heading lesson-section"
        id="lesson-scene"
        aria-labelledby="lesson-title"
      >
        <h1 id="lesson-title">{lesson.title}</h1>
        <p className="lesson-subtitle">{lesson.summary}。读懂语境，再把这个形式用在新的例子里。</p>
        <div className="lesson-meta">
          <span>
            <Clock3 size={15} aria-hidden="true" />
            约 {lesson.durationMinutes} 分钟
          </span>
          <span>{lesson.level} · {lesson.englishTitle}</span>
        </div>
      </section>

      <section className="lesson-section lesson-focus-section" id="lesson-comparison">
        <div className="lesson-section-heading">
          <div>
            <h2>什么时候用？</h2>
            <p>{lesson.useDetail}</p>
          </div>
          <span className="lesson-focus-tag">{lesson.use}</span>
        </div>

        <div className="lesson-forms-example">
          <div className="lesson-form-list" aria-label={`${lesson.title}句式结构`}>
            <h3>句式结构</h3>
            <dl>
              <div>
                <dt>肯定句</dt>
                <dd>{lesson.forms.affirmative}</dd>
              </div>
              <div>
                <dt>否定句</dt>
                <dd>{lesson.forms.negative}</dd>
              </div>
              <div>
                <dt>疑问句</dt>
                <dd>{lesson.forms.question}</dd>
              </div>
            </dl>
          </div>

          <figure className="lesson-example">
            <figcaption>{lesson.example.name}</figcaption>
            <p className="lesson-example__sentence">
              {lesson.example.before}
              <strong>{lesson.example.highlighted}</strong>
              {lesson.example.after}
            </p>
            <p className="lesson-example__translation">{lesson.example.translation}</p>
          </figure>
        </div>

        <p className="lesson-quick-tip">{lesson.quickTip}</p>
      </section>

      <section className="lesson-section practice-section" id="lesson-practice">
        <div className="section-heading">
          <div>
            <h2 className="practice-heading-title">
              <Pencil aria-hidden="true" size={25} strokeWidth={2} />
              练习与应用
            </h2>
            <p>逐题判断目标形式；前四题答对后继续，最后一题换到新语境，答完即完成本课。</p>
          </div>
          <span className="exercise-progress">
            第 {currentQuestionIndex + 1} / {questions.length} 题 · 已完成 {solvedCount} / {questions.length}
          </span>
        </div>

        <Progress
          className="lesson-exercise-progress"
          value={(solvedCount / questions.length) * 100}
          aria-label="本课练习进度"
        />

        <Card className="practice-card">
          <CardContent>
            <div
              ref={questionRegionRef}
              className="practice-question-focus"
              role="group"
              aria-label={`第 ${currentQuestionIndex + 1} 题`}
              tabIndex={-1}
            >
              <PracticeQuestion
                key={currentQuestion.id}
                question={currentQuestion}
                variant={isTransferQuestion ? "transfer" : "guided"}
                solved={progress.solvedQuestionIds.includes(currentQuestion.id)}
                previousAttempts={progress.missedQuestions[currentQuestion.id]?.attempts}
                onAttempt={onAttempt}
                onContinue={
                  nextQuestion && !isLessonComplete
                    ? () => setCurrentQuestionId(nextQuestion.id)
                    : undefined
                }
                continueLabel="下一题"
              />
            </div>
          </CardContent>
        </Card>

        {isLessonComplete ? (
          <div className="lesson-complete" role="status" aria-live="polite">
            <span className="lesson-complete__icon">
              <BookOpenText size={23} aria-hidden="true" />
            </span>
            <div className="lesson-complete__copy">
              <strong>本课完成</strong>
              <p>你已经在新语境里练习了{lesson.title}。</p>
            </div>
            <Button variant="outline" onClick={onReviewMistakes}>
              查看错题
            </Button>
          </div>
        ) : (
          <div className="lesson-progress-note">
            <span>答错时可以重新选择；最后一题答对后，本课就完成了。</span>
          </div>
        )}
      </section>
    </div>
  )
}
