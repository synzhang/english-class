import { ArrowRight, CircleCheck, CirclePlay, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { LearningProgress } from "@/lib/progress-storage"
import {
  getLessonQuestions,
  tenseGroups,
  tenseLessons,
  type TenseLesson,
} from "@/features/tenses/lesson-data"

interface TenseCatalogPageProps {
  progress: LearningProgress
  onSelectLesson: (lessonId: string) => void
}

function getLessonProgress(lesson: TenseLesson, progress: LearningProgress) {
  const questions = getLessonQuestions(lesson)
  const solved = questions.filter((question) =>
    progress.solvedQuestionIds.includes(question.id),
  ).length
  return { solved, percent: Math.round((solved / questions.length) * 100) }
}

export function TenseCatalogPage({
  progress,
  onSelectLesson,
}: TenseCatalogPageProps) {
  const completedLessons = tenseLessons.filter(
    (lesson) => getLessonProgress(lesson, progress).percent === 100,
  ).length

  return (
    <div className="tense-catalog-page" id="catalog-top">
      <header className="catalog-heading">
        <div>
          <h1>选择一种时态，开始学会使用。</h1>
          <p className="catalog-heading__summary">
            先读懂动作发生的时间和语境，再观察结构，最后到新情境里练习。
          </p>
        </div>
        <div className="catalog-summary" aria-label={`已完成 ${completedLessons} 节，共 ${tenseLessons.length} 节`}>
          <strong>{completedLessons}<span> / {tenseLessons.length}</span></strong>
          <span>节课已完成</span>
        </div>
      </header>

      <div className="catalog-groups">
        {tenseGroups.map((group, groupIndex) => {
          const lessons = tenseLessons.filter((lesson) => lesson.group === group.id)
          const doneCount = lessons.filter(
            (lesson) => getLessonProgress(lesson, progress).percent === 100,
          ).length

          return (
            <section
              className="catalog-group"
              id={`catalog-${group.id}`}
              key={group.id}
              aria-labelledby={`catalog-${group.id}-title`}
            >
              <div className="catalog-group__heading">
                <div>
                  <div className="catalog-group__title-line">
                    <span className="catalog-group__marker" aria-hidden="true">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <h2 id={`catalog-${group.id}-title`}>{group.title}</h2>
                    <span className="catalog-group__english">{group.englishTitle}</span>
                  </div>
                  <p>{group.description}</p>
                  {group.note && <p className="catalog-group__note">{group.note}</p>}
                </div>
                <Badge variant="outline">{doneCount} / {lessons.length} 已完成</Badge>
              </div>

              <ol className="tense-course-list">
                {lessons.map((lesson, lessonIndex) => {
                  const { solved, percent } = getLessonProgress(lesson, progress)
                  const isComplete = percent === 100
                  return (
                    <li key={lesson.id}>
                      <button
                        className={`tense-course-row${isComplete ? " is-complete" : ""}`}
                        onClick={() => onSelectLesson(lesson.id)}
                        aria-label={`打开${lesson.title}课程，${solved} 道练习已完成`}
                      >
                        <span className="tense-course-row__index" aria-hidden="true">
                          {String(groupIndex * 4 + lessonIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="tense-course-row__main">
                          <span className="tense-course-row__title-line">
                            <strong>{lesson.title}</strong>
                            <span>{lesson.englishTitle}</span>
                          </span>
                          <span className="tense-course-row__summary">
                            {lesson.summary}
                          </span>
                        </span>
                        <span className="tense-course-row__formula">
                          {lesson.forms.affirmative}
                        </span>
                        <span className="tense-course-row__meta">
                          <span>
                            <Clock3 size={14} aria-hidden="true" />
                            {lesson.durationMinutes} 分钟
                          </span>
                          <span>{lesson.level}</span>
                        </span>
                        <span className="tense-course-row__progress">
                          <span className="tense-course-row__progress-label">
                            {isComplete ? (
                              <><CircleCheck size={15} aria-hidden="true" /> 已完成</>
                            ) : solved > 0 ? (
                              <><CirclePlay size={15} aria-hidden="true" /> 继续学习</>
                            ) : (
                              "开始学习"
                            )}
                            <span>{percent}%</span>
                          </span>
                          <Progress value={percent} aria-hidden="true" />
                        </span>
                        <ArrowRight
                          className="tense-course-row__arrow"
                          aria-hidden="true"
                          size={18}
                        />
                      </button>
                    </li>
                  )
                })}
              </ol>
            </section>
          )
        })}
      </div>

      <p className="catalog-footer-note">
        课程进度保存在当前浏览器中；完成课程后，你可以在错题复习中继续练习。
      </p>
    </div>
  )
}
