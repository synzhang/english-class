import {
  BookOpenText,
  Headphones,
  Languages,
  MessageCircle,
  PenLine,
  BookText,
  type LucideIcon,
} from "lucide-react"

export type LearningModuleId =
  | "tenses"
  | "vocabulary"
  | "listening"
  | "reading"
  | "speaking"
  | "writing"

export interface LearningModule {
  id: LearningModuleId
  title: string
  englishTitle: string
  description: string
  icon: LucideIcon
  status: "active" | "planned"
}

export const learningModules: LearningModule[] = [
  {
    id: "tenses",
    title: "语法与时态",
    englishTitle: "Grammar & Tenses",
    description: "从清晰的语法目录进入课程，在新语境里练习表达。",
    icon: BookOpenText,
    status: "active",
  },
  {
    id: "vocabulary",
    title: "词汇",
    englishTitle: "Vocabulary",
    description: "按主题整理单词，在句子和真实场景中记忆。",
    icon: Languages,
    status: "planned",
  },
  {
    id: "listening",
    title: "听力",
    englishTitle: "Listening",
    description: "用分级音频练习听辨、理解与信息捕捉。",
    icon: Headphones,
    status: "planned",
  },
  {
    id: "reading",
    title: "阅读",
    englishTitle: "Reading",
    description: "从短文中积累表达，并练习理解上下文。",
    icon: BookText,
    status: "planned",
  },
  {
    id: "speaking",
    title: "口语",
    englishTitle: "Speaking",
    description: "围绕生活话题组织想法，逐步练习口头表达。",
    icon: MessageCircle,
    status: "planned",
  },
  {
    id: "writing",
    title: "写作",
    englishTitle: "Writing",
    description: "从句子到段落，练习清楚、有条理地写英语。",
    icon: PenLine,
    status: "planned",
  },
]

export const activeModules = learningModules.filter(
  (module) => module.status === "active",
)
