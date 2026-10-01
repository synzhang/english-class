import { ArrowRight, BookOpenText, Check, Clock3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { learningModules } from "@/features/learning/module-registry"

interface HomePageProps {
  completedLessons: number
  totalLessons: number
  solvedQuestions: number
  totalQuestions: number
  onOpenTenses: () => void
}

export function HomePage({
  completedLessons,
  totalLessons,
  solvedQuestions,
  totalQuestions,
  onOpenTenses,
}: HomePageProps) {
  const activeModule = learningModules.find((module) => module.id === "tenses")!
  const ActiveIcon = activeModule.icon
  const plannedModules = learningModules.filter(
    (module) => module.status === "planned",
  )

  return (
    <div className="platform-home" id="home-top">
      <section className="home-intro" aria-labelledby="home-title">
        <div className="home-intro__copy">
          <h1 id="home-title">把英语，学会也用出来。</h1>
          <p>
            从语法、词汇到听说读写，一步步建立能带进真实交流的英语能力。
          </p>
        </div>
        <div className="home-notebook" aria-label="学习方法：理解、练习、迁移">
          <span>理解</span>
          <span aria-hidden="true" />
          <span>练习</span>
          <span aria-hidden="true" />
          <span>迁移</span>
        </div>
      </section>

      <section className="home-current" aria-labelledby="current-module-title">
        <div className="home-current__heading home-current__heading--progress-only">
          <span className="home-current__progress">
            <Check aria-hidden="true" size={15} />
            {completedLessons} / {totalLessons} 课完成
          </span>
        </div>
        <div className="home-current__body">
          <div className="home-current__intro">
            <span className="home-current__icon" aria-hidden="true">
              <ActiveIcon size={25} strokeWidth={1.8} />
            </span>
            <div className="home-current__copy">
              <h2 id="current-module-title">{activeModule.title}</h2>
              <p>{activeModule.description}</p>
            </div>
          </div>
          <div className="home-current__details">
            <div className="home-current__meta">
              <span>
                <BookOpenText size={15} aria-hidden="true" />
                {totalLessons} 种常见学习形式
              </span>
              <span>
                <Clock3 size={15} aria-hidden="true" />
                已完成 {solvedQuestions} / {totalQuestions} 道练习
              </span>
            </div>
            <Button className="home-current__action" onClick={onOpenTenses}>
              打开时态目录 <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <section className="home-modules" aria-labelledby="modules-title">
        <div className="home-modules__heading">
          <div>
            <h2 id="modules-title">英语学习</h2>
            <p>学习模块会围绕理解与实际运用逐步展开。</p>
          </div>
          <span>学习路线持续扩展</span>
        </div>
        <ul className="module-roadmap">
          {plannedModules.map((module) => {
            const Icon = module.icon
            return (
              <li className="module-roadmap__item" key={module.id}>
                <span className="module-roadmap__icon" aria-hidden="true">
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
                <span className="module-roadmap__status">规划中</span>
              </li>
            )
          })}
        </ul>
      </section>

      <p className="home-footnote">
        每节课从具体语境开始，并用新的例子确认你能把知识用出来。
      </p>
    </div>
  )
}
