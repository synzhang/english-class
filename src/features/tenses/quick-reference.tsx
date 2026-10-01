import { BookmarkCheck, Lightbulb } from "lucide-react"
import type { TenseLesson } from "@/features/tenses/lesson-data"

interface QuickReferenceProps {
  lesson: TenseLesson
}

export function QuickReference({ lesson }: QuickReferenceProps) {
  return (
    <div className="quick-reference">
      <div className="quick-reference__heading">
        <span className="quick-reference__bookmark" aria-hidden="true">
          <BookmarkCheck size={18} strokeWidth={1.8} />
        </span>
        <div>
          <h2>句式速查</h2>
          <p>{lesson.title}</p>
        </div>
      </div>

      <dl className="quick-form-list">
        <div>
          <dt>肯定</dt>
          <dd>{lesson.forms.affirmative}</dd>
        </div>
        <div>
          <dt>否定</dt>
          <dd>{lesson.forms.negative}</dd>
        </div>
        <div>
          <dt>疑问</dt>
          <dd>{lesson.forms.question}</dd>
        </div>
      </dl>

      <div className="quick-reference__tip">
        <Lightbulb size={17} aria-hidden="true" />
        <div>
          <strong>先判断句意</strong>
          <p>{lesson.quickTip}</p>
          <p className="quick-reference__reminder">
            时间词是线索之一；需要结合动作含义和整句关系判断。
          </p>
        </div>
      </div>
    </div>
  )
}
