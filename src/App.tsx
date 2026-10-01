import { useCallback } from "react"
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router"
import { LearningAppShell, type LearningView } from "@/components/learning-app-shell"
import { HomePage } from "@/features/learning/home-page"
import { PracticeLibraryPage } from "@/features/tenses/practice-library-page"
import { QuickReference } from "@/features/tenses/quick-reference"
import { ReviewPage } from "@/features/tenses/review-page"
import { TenseCatalogPage } from "@/features/tenses/tense-catalog-page"
import { TenseLessonPage } from "@/features/tenses/lesson-page"
import {
  getLessonQuestions,
  getTenseLessonById,
  tenseLessons,
  type TenseLesson,
} from "@/features/tenses/lesson-data"
import { allProgressQuestionIds } from "@/features/tenses/mixed-practice-data"
import { useLearningProgress } from "@/hooks/use-learning-progress"
import type { LearningProgress } from "@/lib/progress-storage"

type RecordAnswer = ReturnType<typeof useLearningProgress>["recordAnswer"]

interface LearningRouteContext {
  activeLesson: TenseLesson
  activeLessonId: string
  activeLessonSolvedCount: number
  activeLessonComplete: boolean
  completedLessons: number
  completionPercent: number
  navigateView: (view: LearningView) => void
  openLesson: (lessonId: string) => void
  progress: LearningProgress
  recordAnswer: RecordAnswer
  returnFromReview: () => void
  reviewReturnPath: string
  solvedCount: number
}

const firstLessonId = tenseLessons[0].id

export default function App() {
  return (
    <Routes>
      <Route element={<LearningRouteLayout />}>
        <Route index element={<HomeRoute />} />
        <Route path="tenses" element={<CatalogRoute />} />
        <Route path="tenses/:lessonId" element={<LessonRoute />} />
        <Route path="practice" element={<PracticeRoute />} />
        <Route path="review" element={<ReviewRoute />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Route>
    </Routes>
  )
}

function LearningRouteLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const routeLessonMatch = useMatch("/tenses/:lessonId")
  const routeLesson = getTenseLessonById(routeLessonMatch?.params.lessonId ?? "")
  const {
    progress,
    recordAnswer,
    solvedCount,
    completionPercent,
  } = useLearningProgress()

  const activeLessonId =
    routeLesson?.id ?? getStateLessonId(location.state) ?? firstLessonId
  const activeLesson = getTenseLessonById(activeLessonId) ?? tenseLessons[0]
  const activeLessonQuestionIds = getLessonQuestions(activeLesson).map(
    (question) => question.id,
  )
  const activeLessonSolvedCount = activeLessonQuestionIds.filter((questionId) =>
    progress.solvedQuestionIds.includes(questionId),
  ).length
  const activeLessonComplete = activeLessonSolvedCount === activeLessonQuestionIds.length
  const completedLessons = tenseLessons.filter((lesson) =>
    getLessonQuestions(lesson).every((question) =>
      progress.solvedQuestionIds.includes(question.id),
    ),
  ).length
  const activeView = getLearningView(location.pathname)
  const reviewReturnPath = getReviewReturnPath(
    location.state,
    `/tenses/${activeLessonId}`,
  )

  const navigateView = useCallback(
    (nextView: LearningView) => {
      if (nextView === "review") {
        if (location.pathname === "/review") return
        navigate("/review", {
          state: { returnTo: location.pathname, activeLessonId },
        })
      } else {
        navigate(pathForView(nextView, activeLessonId), {
          state: { activeLessonId },
        })
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
    [activeLessonId, location.pathname, navigate],
  )

  const openLesson = useCallback(
    (lessonId: string) => {
      if (!getTenseLessonById(lessonId)) return
      navigate(`/tenses/${encodeURIComponent(lessonId)}`, {
        state: { activeLessonId: lessonId },
      })
      window.scrollTo({ top: 0, behavior: "instant" })
    },
    [navigate],
  )

  const returnFromReview = useCallback(() => {
    navigate(reviewReturnPath, { state: { activeLessonId } })
    if (reviewReturnPath.startsWith("/tenses/")) {
      window.setTimeout(() => {
        document.getElementById("lesson-top")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 40)
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [activeLessonId, navigate, reviewReturnPath])

  const context: LearningRouteContext = {
    activeLesson,
    activeLessonId,
    activeLessonSolvedCount,
    activeLessonComplete,
    completedLessons,
    completionPercent,
    navigateView,
    openLesson,
    progress,
    recordAnswer,
    returnFromReview,
    reviewReturnPath,
    solvedCount,
  }

  return (
    <LearningAppShell
      activeView={activeView}
      activeLessonId={activeLessonId}
      missedCount={Object.keys(progress.missedQuestions).length}
      rightAside={activeView === "lesson" ? <QuickReference lesson={activeLesson} /> : undefined}
    >
      <Outlet context={context} />
    </LearningAppShell>
  )
}

function HomeRoute() {
  const context = useLearningRouteContext()
  const location = useLocation()
  const legacyRedirect = getLegacyRedirect(location.search)

  if (legacyRedirect) {
    return <Navigate to={legacyRedirect.to} state={legacyRedirect.state} replace />
  }

  return (
    <HomePage
      completedLessons={context.completedLessons}
      totalLessons={tenseLessons.length}
      solvedQuestions={context.solvedCount}
      totalQuestions={allProgressQuestionIds.length}
      onOpenTenses={() => context.navigateView("catalog")}
    />
  )
}

function CatalogRoute() {
  const context = useLearningRouteContext()
  return (
    <TenseCatalogPage
      progress={context.progress}
      onSelectLesson={context.openLesson}
    />
  )
}

function LessonRoute() {
  const context = useLearningRouteContext()
  const { lessonId } = useParams()
  const lesson = getTenseLessonById(lessonId ?? "")

  if (!lesson) {
    return <Navigate to={`/tenses/${firstLessonId}`} replace />
  }

  return (
    <TenseLessonPage
      key={lesson.id}
      lesson={lesson}
      progress={context.progress}
      solvedCount={context.activeLessonSolvedCount}
      isLessonComplete={context.activeLessonComplete}
      onAttempt={context.recordAnswer}
      onReviewMistakes={() => context.navigateView("review")}
      onBackToCatalog={() => context.navigateView("catalog")}
    />
  )
}

function PracticeRoute() {
  const context = useLearningRouteContext()
  return (
    <PracticeLibraryPage
      onAttempt={context.recordAnswer}
      onOpenReview={() => context.navigateView("review")}
      onBackToCatalog={() => context.navigateView("catalog")}
    />
  )
}

function ReviewRoute() {
  const context = useLearningRouteContext()
  return (
    <ReviewPage
      progress={context.progress}
      completionPercent={context.completionPercent}
      onAttempt={context.recordAnswer}
      returnLabel={reviewReturnLabel(context.reviewReturnPath)}
      onReturnToLesson={context.returnFromReview}
    />
  )
}

function NotFoundRoute() {
  const location = useLocation()
  const legacyRedirect = getLegacyRedirect(location.search)

  if (legacyRedirect) {
    return <Navigate to={legacyRedirect.to} state={legacyRedirect.state} replace />
  }

  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <p className="not-found-page__code">404</p>
      <h1 id="not-found-title">这个页面不存在</h1>
      <p>检查一下地址，或回到学习首页继续。</p>
      <Link className="not-found-page__link" to="/">
        回到学习首页
      </Link>
    </section>
  )
}

function useLearningRouteContext() {
  return useOutletContext<LearningRouteContext>()
}

function getLearningView(pathname: string): LearningView {
  if (pathname === "/tenses") return "catalog"
  if (pathname.startsWith("/tenses/")) return "lesson"
  if (pathname === "/practice") return "practice"
  if (pathname === "/review") return "review"
  return "home"
}

function pathForView(view: LearningView, lessonId: string): string {
  if (view === "home") return "/"
  if (view === "catalog") return "/tenses"
  if (view === "lesson") return `/tenses/${encodeURIComponent(lessonId)}`
  if (view === "practice") return "/practice"
  return "/review"
}

function getLegacyRedirect(search: string): {
  to: string
  state: { activeLessonId: string }
} | null {
  const params = new URLSearchParams(search)
  const requestedView = params.get("view")
  if (!requestedView) return null

  const requestedLessonId = params.get("lesson")
  const activeLessonId =
    requestedLessonId && getTenseLessonById(requestedLessonId)
      ? requestedLessonId
      : firstLessonId
  let to = "/"

  if (requestedView === "catalog" || requestedView === "tenses") to = "/tenses"
  if (requestedView === "lesson") {
    to = `/tenses/${encodeURIComponent(activeLessonId)}`
  }
  if (requestedView === "practice") to = "/practice"
  if (requestedView === "review") to = "/review"

  return { to, state: { activeLessonId } }
}

function getStateLessonId(state: unknown): string | null {
  if (!state || typeof state !== "object" || !("activeLessonId" in state)) {
    return null
  }
  const lessonId = state.activeLessonId
  return typeof lessonId === "string" && getTenseLessonById(lessonId)
    ? lessonId
    : null
}

function getReviewReturnPath(state: unknown, fallback: string): string {
  if (!state || typeof state !== "object" || !("returnTo" in state)) {
    return fallback
  }

  const returnTo = state.returnTo
  if (returnTo === "/" || returnTo === "/tenses" || returnTo === "/practice") {
    return returnTo
  }
  if (typeof returnTo === "string") {
    const lessonMatch = returnTo.match(/^\/tenses\/([^/?#]+)$/)
    if (lessonMatch && getTenseLessonById(lessonMatch[1])) return returnTo
  }
  return fallback
}

function reviewReturnLabel(path: string): string {
  if (path === "/practice") return "回到练习库"
  if (path === "/tenses") return "回到时态目录"
  if (path === "/") return "回到学习首页"
  return "回到课程"
}
