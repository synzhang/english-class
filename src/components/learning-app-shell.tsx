import type { MouseEvent, ReactNode } from "react"
import { BookOpenText, ClipboardList, House, ListChecks } from "lucide-react"
import { Link, NavLink, useLocation } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type LearningView = "home" | "catalog" | "lesson" | "practice" | "review"

interface LearningAppShellProps {
  activeView: LearningView
  activeLessonId: string
  children: ReactNode
  rightAside?: ReactNode
  missedCount: number
}

export function LearningAppShell({
  activeView,
  activeLessonId,
  children,
  rightAside,
  missedCount,
}: LearningAppShellProps) {
  const location = useLocation()
  const reviewLinkState =
    location.pathname === "/review"
      ? { ...location.state, activeLessonId }
      : { returnTo: location.pathname, activeLessonId }
  const routeLinkState = { activeLessonId }

  return (
    <div className="app-surface">
      <header className="app-header">
        <Link
          className="brand-lockup"
          to="/"
          state={routeLinkState}
          onClick={scrollToPageTop}
          aria-label="English Class 学习首页"
        >
          <span className="brand-bookmark" aria-hidden="true">
            <BookOpenText size={22} strokeWidth={1.8} />
          </span>
          <span className="brand-name">English Class</span>
        </Link>

        <nav className="primary-nav" aria-label="主导航">
          <Button asChild variant="ghost" className="nav-button">
            <NavLink to="/" end state={routeLinkState} onClick={scrollToPageTop}>
              <House aria-hidden="true" size={18} strokeWidth={1.9} />
              学习首页
            </NavLink>
          </Button>
          <Button asChild variant="ghost" className="nav-button">
            <NavLink to="/practice" state={routeLinkState} onClick={scrollToPageTop}>
              <ListChecks aria-hidden="true" size={19} strokeWidth={1.9} />
              练习库
            </NavLink>
          </Button>
          <Button asChild variant="ghost" className="nav-button nav-button--review">
            <NavLink to="/review" state={reviewLinkState} onClick={scrollToPageTop}>
              <ClipboardList aria-hidden="true" size={19} strokeWidth={1.9} />
              错题复习
              {missedCount > 0 && (
                <Badge className="nav-count" variant="outline">
                  {missedCount}
                </Badge>
              )}
            </NavLink>
          </Button>
        </nav>

      </header>

      <div
        className={`learning-layout${activeView === "review" ? " learning-layout--review" : ""}${activeView === "lesson" ? " learning-layout--lesson" : " learning-layout--single"}`}
      >
        <main className="main-content" id="main-content" tabIndex={-1}>
          {children}
        </main>
        {rightAside && (
          <aside className="reference-aside" aria-label="本课句式速查">
            {rightAside}
          </aside>
        )}
      </div>

      <footer className="app-footer">
        <span>从理解语言开始，在新的情境里练习使用。</span>
        <Link to="/" state={routeLinkState} onClick={scrollToPageTop}>
          回到学习首页 <House aria-hidden="true" size={14} />
        </Link>
      </footer>
    </div>
  )
}

function scrollToPageTop(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }

  window.scrollTo({ top: 0, behavior: "smooth" })
}
