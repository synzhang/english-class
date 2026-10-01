import { ArrowLeft, BookOpen, RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PracticeQuestion } from "@/features/tenses/practice-question"
import {
  allLessonQuestions,
  getTenseLessonById,
} from "@/features/tenses/lesson-data"
import { mixedPracticeQuestions } from "@/features/tenses/mixed-practice-data"
import type { LearningProgress } from "@/lib/progress-storage"

interface ReviewPageProps {
  progress: LearningProgress
  completionPercent: number
  returnLabel?: string
  onAttempt: (
    questionId: string,
    selectedOptionId: string,
    isCorrect: boolean,
  ) => void
  onReturnToLesson: () => void
}

export function ReviewPage({
  progress,
  completionPercent,
  returnLabel = "回到课程",
  onAttempt,
  onReturnToLesson,
}: ReviewPageProps) {
  const missedQuestions = [...allLessonQuestions, ...mixedPracticeQuestions].filter((question) =>
    Object.hasOwn(progress.missedQuestions, question.id),
  )

  return (
    <div className="review-page" id="review-top">
      <Button
        className="back-to-lesson"
        variant="ghost"
        onClick={onReturnToLesson}
        >
          <ArrowLeft aria-hidden="true" /> {returnLabel}
      </Button>

      <div className="review-heading">
        <div>
          <h1>错题复习</h1>
          <p>再读一次语境，把容易混淆的时间关系理清。</p>
        </div>
        <Badge variant="outline">
          {missedQuestions.length === 0
            ? "暂无错题"
            : `${missedQuestions.length} 道待复习`}
        </Badge>
      </div>

      <div className="review-progress">
        <div className="review-progress__label">
          <span>时态练习进度</span>
          <strong>{completionPercent}%</strong>
        </div>
        <Progress value={completionPercent} aria-label="本课练习进度" />
      </div>

      {missedQuestions.length > 0 ? (
        <div className="review-question-list">
          {missedQuestions.map((question) => (
            <div className="review-question" key={question.id}>
              <div className="review-question__meta">
                <span>
                  <RotateCcw size={15} aria-hidden="true" />
                  曾错 {progress.missedQuestions[question.id]?.attempts ?? 1} 次
                </span>
                <Badge variant="secondary">
                  {question.id.startsWith("mixed-") ? "练习库 · " : ""}
                  {getTenseLessonById(question.lessonId)?.title ?? "时态课程"}
                </Badge>
                <p>
                  上次选择：
                  <strong>
                    {question.options.find(
                      (option) =>
                        option.id ===
                        progress.missedQuestions[question.id]
                          ?.lastSelectedOptionId,
                    )?.label ?? "未记录"}
                  </strong>
                </p>
              </div>
              <PracticeQuestion
                question={question}
                variant="review"
                solved={
                  progress.solvedQuestionIds.includes(question.id) &&
                  !progress.missedQuestions[question.id]
                }
                previousAttempts={
                  progress.missedQuestions[question.id]?.attempts
                }
                onAttempt={onAttempt}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="review-empty">
          <span className="review-empty__icon" aria-hidden="true">
            <BookOpen size={23} />
          </span>
          <h2>{completionPercent === 100 ? "做得很好" : "还没有错题"}</h2>
          <p>
            {completionPercent === 100
              ? "这一课的练习都已完成，可以继续复习对照例句。"
              : "先完成时态课程中的练习。答错的题会自动留在这里，方便你回头再练。"}
          </p>
          <Button onClick={onReturnToLesson}>
            {completionPercent === 100 ? "复习本课" : "开始练习"}
          </Button>
        </div>
      )}
    </div>
  )
}
