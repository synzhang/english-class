import {
  closeDistractorsByQuestion,
  guidedQuestionsByLesson,
  practiceQuestionsByLesson,
} from "@/features/tenses/practice-sets"

export type TenseGroupId = "present" | "past" | "future" | "future-in-past"

export interface TenseGroup {
  id: TenseGroupId
  title: string
  englishTitle: string
  description: string
  note?: string
}

export interface TenseExample {
  name: string
  before: string
  highlighted: string
  after: string
  translation: string
}

export interface AnswerOption {
  id: string
  label: string
}

export interface LessonQuestion {
  id: string
  lessonId: string
  context: string
  before: string
  after: string
  options: AnswerOption[]
  correctOptionId: string
  feedbackByOption: Record<string, string>
  practiceStage?: string
}

export interface TenseForms {
  affirmative: string
  negative: string
  question: string
}

export interface TenseLesson {
  id: string
  group: TenseGroupId
  title: string
  englishTitle: string
  level: "初级" | "初中级" | "中级"
  durationMinutes: number
  summary: string
  use: string
  useDetail: string
  forms: TenseForms
  example: TenseExample
  guidedQuestion: LessonQuestion
  practiceQuestions: LessonQuestion[]
  transferQuestion: LessonQuestion
  quickTip: string
}

export const tenseGroups: TenseGroup[] = [
  {
    id: "present",
    title: "现在时间",
    englishTitle: "Present forms",
    description: "习惯、此刻正在发生，以及与现在有关的经历和持续状态。",
  },
  {
    id: "past",
    title: "过去时间",
    englishTitle: "Past forms",
    description: "已发生的动作、过去某一刻的背景，以及过去事件之间的先后。",
  },
  {
    id: "future",
    title: "将来时间表达",
    englishTitle: "Future-time forms",
    description: "描述预期中的动作、某个未来时刻的活动，或截止时间前完成的事。",
    note: "这是便于学习的表达分类。英语常用 will、be going to、现在时等结构表达将来时间，并没有独立的动词将来时词形。",
  },
  {
    id: "future-in-past",
    title: "过去将来表达",
    englishTitle: "Future-in-the-past forms",
    description: "从过去的视角描述当时预期、计划或安排在之后发生的事。",
    note: "四种常见教学形式以 would 组合呈现；was / were going to 和过去进行时也能按语境表达过去的计划或预期。",
  },
]

const lessonContent: Omit<TenseLesson, "practiceQuestions" | "guidedQuestion">[] = [
  {
    id: "present-simple",
    group: "present",
    title: "一般现在时",
    englishTitle: "Present simple",
    level: "初级",
    durationMinutes: 9,
    summary: "习惯、事实与固定安排",
    use: "反复发生的习惯、普遍事实和固定时刻表。",
    useDetail: "重点看动作是否经常发生或是否属于稳定事实；he、she、it 作主语时，肯定句动词通常加 -s。",
    forms: {
      affirmative: "主语 + 动词原形（he / she / it + -s）",
      negative: "主语 + do / does not + 动词原形",
      question: "Do / Does + 主语 + 动词原形？",
    },
    example: {
      name: "日常习惯",
      before: "Maya ",
      highlighted: "walks",
      after: " to school every day.",
      translation: "Maya 每天步行上学。",
    },
    transferQuestion: {
      id: "transfer-routine",
      lessonId: "present-simple",
      context: "这是 Leo 每个上学日固定会做的事。",
      before: "Leo ",
      after: " basketball after school on weekdays.",
      options: [
        { id: "habit", label: "plays" },
        { id: "now", label: "is playing" },
        { id: "past", label: "played" },
      ],
      correctOptionId: "habit",
      feedbackByOption: {
        habit: "正确。固定习惯用一般现在时；Leo 是第三人称单数，所以 play 变成 plays。",
        now: "is playing 描述眼前正在发生的动作；这句话说的是 Leo 每个上学日的安排，应选 plays。",
        past: "played 表示过去发生的动作；这句话说的是 Leo 的固定习惯，应选 plays。",
      },
    },
    quickTip: "every day 是线索之一；先确认句子表达的是固定习惯，再看主语决定动词形式。",
  },
  {
    id: "present-continuous",
    group: "present",
    title: "现在进行时",
    englishTitle: "Present continuous",
    level: "初级",
    durationMinutes: 9,
    summary: "此刻正在发生或暂时进行",
    use: "说话时正在发生的动作、暂时状态，也常用于已安排好的近期计划。",
    useDetail: "动作可以正在眼前发生，也可以处于一段暂时时期；不要只凭 right now 一个词判断。",
    forms: {
      affirmative: "主语 + am / is / are + 动词-ing",
      negative: "主语 + am / is / are not + 动词-ing",
      question: "Am / Is / Are + 主语 + 动词-ing？",
    },
    example: {
      name: "正在发生",
      before: "Maya ",
      highlighted: "is walking",
      after: " to school right now.",
      translation: "Maya 现在正在步行上学。",
    },
    transferQuestion: {
      id: "transfer-action-now",
      lessonId: "present-continuous",
      context: "比赛正在进行，朋友们看见 Leo 正准备投篮。",
      before: "Look! Leo ",
      after: " a three-point shot.",
      options: [
        { id: "habit", label: "takes" },
        { id: "now", label: "is taking" },
        { id: "past", label: "took" },
      ],
      correctOptionId: "now",
      feedbackByOption: {
        habit: "takes 常用于日常习惯；这里朋友们正看着 Leo 出手，应选 is taking。",
        now: "正确。投篮正在眼前发生，用 be + -ing；Leo 对应 is，take 变成 taking。",
        past: "took 表示过去发生的动作；这里比赛这一刻正在进行，应选 is taking。",
      },
    },
    quickTip: "be 动词要随主语变化；动作动词再变成 -ing。部分动词的拼写会有变化。",
  },
  {
    id: "present-perfect",
    group: "present",
    title: "现在完成时",
    englishTitle: "Present perfect",
    level: "初中级",
    durationMinutes: 10,
    summary: "过去发生，结果或经历与现在相关",
    use: "谈到现在仍重要的结果、人生经历，或尚未结束时间段内的完成情况。",
    useDetail: "重点不是过去的具体时刻，而是这件事与现在的联系；说出明确结束的过去时间时通常改用一般过去时。",
    forms: {
      affirmative: "主语 + have / has + 过去分词",
      negative: "主语 + have / has not + 过去分词",
      question: "Have / Has + 主语 + 过去分词？",
    },
    example: {
      name: "现在的结果",
      before: "I ",
      highlighted: "have lost",
      after: " my keys, so I can't open the door.",
      translation: "我把钥匙弄丢了，所以现在打不开门。",
    },
    transferQuestion: {
      id: "transfer-present-perfect-so-far",
      lessonId: "present-perfect",
      context: "今天还没有结束；Nina 现在已经读完了其中三章。",
      before: "Nina ",
      after: " three chapters so far today.",
      options: [
        { id: "perfect", label: "has read" },
        { id: "past", label: "read" },
        { id: "continuous", label: "is reading" },
      ],
      correctOptionId: "perfect",
      feedbackByOption: {
        perfect: "正确。so far today 把已完成的数量连到尚未结束的今天；Nina 用 has。",
        past: "read 可用于已结束的过去时间段；这里今天仍在继续，而且强调目前完成的数量。",
        continuous: "is reading 表示此刻正在读；句子强调今天到目前为止已经读完三章。",
      },
    },
    quickTip: "现在完成时常把过去和现在连起来；若句子明确说了 yesterday、last year 等结束时间，通常考虑一般过去时。",
  },
  {
    id: "present-perfect-continuous",
    group: "present",
    title: "现在完成进行时",
    englishTitle: "Present perfect continuous",
    level: "中级",
    durationMinutes: 11,
    summary: "动作从过去持续到现在，强调过程或时长",
    use: "强调持续到现在的活动过程，或刚停止但现在仍有迹象的活动。",
    useDetail: "常与 for、since 等时长线索搭配；状态动词通常不用于进行形式，具体选择还要看句子强调过程还是结果。",
    forms: {
      affirmative: "主语 + have / has been + 动词-ing",
      negative: "主语 + have / has not been + 动词-ing",
      question: "Have / Has + 主语 + been + 动词-ing？",
    },
    example: {
      name: "持续活动",
      before: "Ava ",
      highlighted: "has been studying",
      after: " since 7 a.m., and she hasn't taken a break.",
      translation: "Ava 从早上 7 点一直在学习，而且没有休息。",
    },
    transferQuestion: {
      id: "transfer-present-perfect-continuous-rain",
      lessonId: "present-perfect-continuous",
      context: "一早到现在都在下雨，地面湿了；重点是持续的降雨过程。",
      before: "The ground is wet because it ",
      after: " all morning.",
      options: [
        { id: "perfect-continuous", label: "has been raining" },
        { id: "past", label: "rained" },
        { id: "future", label: "will rain" },
      ],
      correctOptionId: "perfect-continuous",
      feedbackByOption: {
        "perfect-continuous": "正确。all morning 表示降雨持续了一段时间，并解释现在地面湿的原因。",
        past: "rained 把下雨放在过去；这里持续到现在的时间段和眼前结果都很重要。",
        future: "will rain 表示将来会下雨；句子解释的是已经持续一早上的降雨。",
      },
    },
    quickTip: "have / has been + -ing 把持续活动连到现在；和现在完成时相比，它更突出过程或时长。",
  },
  {
    id: "past-simple",
    group: "past",
    title: "一般过去时",
    englishTitle: "Past simple",
    level: "初级",
    durationMinutes: 9,
    summary: "过去某个时间发生并结束",
    use: "叙述过去已经完成的动作、事件或过去的状态。",
    useDetail: "常在故事中与明确的过去时间连用；动词用过去式，疑问和否定句通常由 did 承担过去标记。",
    forms: {
      affirmative: "主语 + 动词过去式",
      negative: "主语 + did not + 动词原形",
      question: "Did + 主语 + 动词原形？",
    },
    example: {
      name: "已结束的事件",
      before: "Mina ",
      highlighted: "wrote",
      after: " a letter to her cousin last Saturday.",
      translation: "Mina 上周六给表亲写了一封信。",
    },
    transferQuestion: {
      id: "transfer-past-simple-concert",
      lessonId: "past-simple",
      context: "音乐会昨晚七点开始，整场活动现在已经结束。",
      before: "The concert ",
      after: " at seven yesterday.",
      options: [
        { id: "past", label: "started" },
        { id: "continuous", label: "was starting" },
        { id: "present", label: "starts" },
      ],
      correctOptionId: "past",
      feedbackByOption: {
        past: "正确。yesterday 给出已经结束的过去时间，叙述开始这一事件用 started。",
        continuous: "was starting 更像描述过去某个时刻正在发生的过程；这里是完整事件。",
        present: "starts 可用于规律或固定安排；句子说的是昨晚发生的事。",
      },
    },
    quickTip: "规则动词通常加 -ed，不规则动词要记过去式；did 后面恢复动词原形。",
  },
  {
    id: "past-continuous",
    group: "past",
    title: "过去进行时",
    englishTitle: "Past continuous",
    level: "初中级",
    durationMinutes: 10,
    summary: "过去某一时刻正在进行",
    use: "描写过去某一时刻的进行中的动作，或为另一件事提供背景。",
    useDetail: "常用 was / were + -ing；较短事件可以打断背景动作，也可以与另一持续动作并行。",
    forms: {
      affirmative: "主语 + was / were + 动词-ing",
      negative: "主语 + was / were not + 动词-ing",
      question: "Was / Were + 主语 + 动词-ing？",
    },
    example: {
      name: "过去的某一刻",
      before: "At eight last night, I ",
      highlighted: "was doing",
      after: " my homework.",
      translation: "昨晚八点，我正在做作业。",
    },
    transferQuestion: {
      id: "transfer-past-continuous-setting-table",
      lessonId: "past-continuous",
      context: "汤还在炖的时候，Hana 正在摆餐具；两个动作同时进行。",
      before: "While the soup simmered, Hana ",
      after: " the table.",
      options: [
        { id: "continuous", label: "was setting" },
        { id: "simple", label: "set" },
        { id: "future", label: "will set" },
      ],
      correctOptionId: "continuous",
      feedbackByOption: {
        continuous: "正确。摆餐具与炖汤同时进行，was setting 把它呈现为过去的背景活动。",
        simple: "set 会把摆餐具作为完整事件来叙述；这里强调与炖汤同时进行。",
        future: "will set 指向将来；句子中的汤当时正在炖，场景在过去。",
      },
    },
    quickTip: "was / were 说明过去的观察点，-ing 呈现当时进行中的活动。",
  },
  {
    id: "past-perfect",
    group: "past",
    title: "过去完成时",
    englishTitle: "Past perfect",
    level: "中级",
    durationMinutes: 10,
    summary: "在另一个过去时刻之前已完成",
    use: "从一个过去观察点回看更早发生或已完成的动作。",
    useDetail: "结构是 had + 过去分词；只有当先后关系需要明确时才用，叙事顺序已经清楚时不必机械地给每个早先动作加 had。",
    forms: {
      affirmative: "主语 + had + 过去分词",
      negative: "主语 + had not + 过去分词",
      question: "Had + 主语 + 过去分词？",
    },
    example: {
      name: "过去的过去",
      before: "By the time we arrived, the film ",
      highlighted: "had started",
      after: ".",
      translation: "我们到达时，电影已经开始了。",
    },
    transferQuestion: {
      id: "transfer-past-perfect-report",
      lessonId: "past-perfect",
      context: "经理打电话询问时，Nora 的报告已经发出去了。",
      before: "Nora ",
      after: " the report before her manager called.",
      options: [
        { id: "past-perfect", label: "had sent" },
        { id: "past-simple", label: "sent" },
        { id: "continuous", label: "was sending" },
      ],
      correctOptionId: "past-perfect",
      feedbackByOption: {
        "past-perfect": "正确。报告发出早于经理来电，had sent 清楚标出较早的过去动作。",
        "past-simple": "sent 可以叙述过去动作，但这里需要强调报告在来电前已发出。",
        continuous: "was sending 表示来电时可能还在发送过程中，与已经发出的语境不符。",
      },
    },
    quickTip: "had + 过去分词把一个动作放在过去参照点之前；常和 by the time、before 等搭配。",
  },
  {
    id: "past-perfect-continuous",
    group: "past",
    title: "过去完成进行时",
    englishTitle: "Past perfect continuous",
    level: "中级",
    durationMinutes: 11,
    summary: "某活动持续到过去的一个时刻",
    use: "强调一项活动在过去某个时点之前持续了多久，或解释当时出现的结果。",
    useDetail: "通常以 had been + -ing 构成；若要强调完成数量或结果，过去完成时可能更合适。",
    forms: {
      affirmative: "主语 + had been + 动词-ing",
      negative: "主语 + had not been + 动词-ing",
      question: "Had + 主语 + been + 动词-ing？",
    },
    example: {
      name: "过去时点前的时长",
      before: "Before the bus came, we ",
      highlighted: "had been waiting",
      after: " for twenty minutes.",
      translation: "公交车来之前，我们已经等了二十分钟。",
    },
    transferQuestion: {
      id: "transfer-past-perfect-continuous-garden",
      lessonId: "past-perfect-continuous",
      context: "到中午时 Liam 已经在花园忙了三个小时，显得很累。",
      before: "By noon, Liam ",
      after: " in the garden for three hours.",
      options: [
        { id: "past-perfect-continuous", label: "had been working" },
        { id: "past-simple", label: "worked" },
        { id: "future-perfect", label: "will have worked" },
      ],
      correctOptionId: "past-perfect-continuous",
      feedbackByOption: {
        "past-perfect-continuous": "正确。中午是过去参照点；工作持续了三个小时，也解释了 Liam 为什么很累。",
        "past-simple": "worked 不突出中午之前活动持续的时长；此处需要表达持续过程。",
        "future-perfect": "will have worked 指向未来；句子回顾的是今天中午这个过去时点。",
      },
    },
    quickTip: "had been + -ing 同时标出过去参照点之前的持续过程；for 常引出持续时长。",
  },
  {
    id: "future-simple",
    group: "future",
    title: "一般将来时（will）",
    englishTitle: "Future simple with will",
    level: "初级",
    durationMinutes: 9,
    summary: "预测、承诺与当下决定",
    use: "作预测、作承诺，或在说话当下决定要做某事。",
    useDetail: "will 是情态动词；其他表达将来的方式还包括 be going to、现在进行时和一般现在时，具体选择取决于语境。",
    forms: {
      affirmative: "主语 + will + 动词原形",
      negative: "主语 + will not (won't) + 动词原形",
      question: "Will + 主语 + 动词原形？",
    },
    example: {
      name: "当下决定",
      before: "The phone is ringing. I ",
      highlighted: "will get",
      after: " it.",
      translation: "电话响了，我来接。",
    },
    transferQuestion: {
      id: "transfer-future-will-window",
      lessonId: "future-simple",
      context: "朋友看起来很冷；说话的人当场决定关上窗户。",
      before: "You look cold. I ",
      after: " the window for you.",
      options: [
        { id: "will", label: "will close" },
        { id: "past", label: "closed" },
        { id: "present", label: "close" },
      ],
      correctOptionId: "will",
      feedbackByOption: {
        will: "正确。说话的人根据眼前情况作出即时帮助的决定，用 will close。",
        past: "closed 表示窗户已经在过去关上；当前语境里决定还没执行。",
        present: "close 可描述习惯或规律；这里是现在作出的单次决定。",
      },
    },
    quickTip: "will + 动词原形可表达预测、承诺或即时决定；计划安排也可能更适合 be going to 或现在进行时。",
  },
  {
    id: "future-continuous",
    group: "future",
    title: "将来进行时",
    englishTitle: "Future continuous",
    level: "中级",
    durationMinutes: 10,
    summary: "未来某一时刻正在进行",
    use: "想象某个未来时刻正在进行的活动，也可用于询问或描述预期安排。",
    useDetail: "由 will be + -ing 构成；它把未来某一时刻当作观察点，重点是当时活动正在进行。",
    forms: {
      affirmative: "主语 + will be + 动词-ing",
      negative: "主语 + will not be + 动词-ing",
      question: "Will + 主语 + be + 动词-ing？",
    },
    example: {
      name: "未来观察点",
      before: "This time tomorrow, we ",
      highlighted: "will be flying",
      after: " to Kyoto.",
      translation: "明天这个时候，我们将正在飞往京都的途中。",
    },
    transferQuestion: {
      id: "transfer-future-continuous-study",
      lessonId: "future-continuous",
      context: "今晚九点时，Ella 预计还在为考试学习。",
      before: "At nine tonight, Ella ",
      after: " for her exam.",
      options: [
        { id: "future-continuous", label: "will be studying" },
        { id: "present-simple", label: "studies" },
        { id: "past-simple", label: "studied" },
      ],
      correctOptionId: "future-continuous",
      feedbackByOption: {
        "future-continuous": "正确。今晚九点是未来的具体观察点；学习当时预计仍在进行。",
        "present-simple": "studies 更像习惯或固定事实；此处描写某个未来时刻的活动。",
        "past-simple": "studied 把学习放在过去；句子说的是今晚的计划情景。",
      },
    },
    quickTip: "will be + -ing 把活动放在未来某一时刻的进行过程中。",
  },
  {
    id: "future-perfect",
    group: "future",
    title: "将来完成时",
    englishTitle: "Future perfect",
    level: "中级",
    durationMinutes: 10,
    summary: "在未来某个时点之前完成",
    use: "从未来的截止点回看，到那时已经完成的动作或达到的结果。",
    useDetail: "常见结构是 will have + 过去分词；by Friday、by the time 等短语常给出未来参照点。",
    forms: {
      affirmative: "主语 + will have + 过去分词",
      negative: "主语 + will not have + 过去分词",
      question: "Will + 主语 + have + 过去分词？",
    },
    example: {
      name: "未来截止点前完成",
      before: "By Friday, I ",
      highlighted: "will have finished",
      after: " the project.",
      translation: "到星期五之前，我会完成这个项目。",
    },
    transferQuestion: {
      id: "transfer-future-perfect-dinner",
      lessonId: "future-perfect",
      context: "客人预计稍后抵达；主人打算在他们到之前把晚餐准备好。",
      before: "By the time the guests arrive, we ",
      after: " dinner.",
      options: [
        { id: "future-perfect", label: "will have prepared" },
        { id: "present-simple", label: "prepare" },
        { id: "past-continuous", label: "were preparing" },
      ],
      correctOptionId: "future-perfect",
      feedbackByOption: {
        "future-perfect": "正确。客人到达是未来参照点，晚餐预计会在那之前准备完成。",
        "present-simple": "prepare 可用于一般事实或时间从句；主句表达未来到达前已完成的结果。",
        "past-continuous": "were preparing 指过去正在进行；这里说的是未来的安排。",
      },
    },
    quickTip: "will have + 过去分词从未来时点向前回看，强调到那时动作已经完成。",
  },
  {
    id: "future-perfect-continuous",
    group: "future",
    title: "将来完成进行时",
    englishTitle: "Future perfect continuous",
    level: "中级",
    durationMinutes: 11,
    summary: "到未来某时，活动已经持续一段时间",
    use: "强调某项活动到未来参照点时将持续了多久。",
    useDetail: "由 will have been + -ing 构成；它突出活动的持续过程，通常与 for 引出的时长一起使用。",
    forms: {
      affirmative: "主语 + will have been + 动词-ing",
      negative: "主语 + will not have been + 动词-ing",
      question: "Will + 主语 + have been + 动词-ing？",
    },
    example: {
      name: "未来参照点前的时长",
      before: "By July, they ",
      highlighted: "will have been living",
      after: " here for five years.",
      translation: "到七月时，他们住在这里就满五年了。",
    },
    transferQuestion: {
      id: "transfer-future-perfect-continuous-driving",
      lessonId: "future-perfect-continuous",
      context: "长途旅行还在继续；到下午六点时，Maya 已经开了八小时车。",
      before: "At six p.m., Maya ",
      after: " for eight hours.",
      options: [
        { id: "future-perfect-continuous", label: "will have been driving" },
        { id: "future-simple", label: "will drive" },
        { id: "past-perfect", label: "had driven" },
      ],
      correctOptionId: "future-perfect-continuous",
      feedbackByOption: {
        "future-perfect-continuous": "正确。下午六点是未来参照点，for eight hours 强调到那时驾驶已持续的时间。",
        "future-simple": "will drive 表示未来会开车；此处需要表达截至未来时点的持续时长。",
        "past-perfect": "had driven 需要一个过去参照点；句子把观察点放在未来下午六点。",
      },
    },
    quickTip: "will have been + -ing 强调到未来时点时，某项活动已经持续了多久。",
  },
  {
    id: "future-in-past-simple",
    group: "future-in-past",
    title: "一般过去将来时",
    englishTitle: "Future simple in the past",
    level: "中级",
    durationMinutes: 9,
    summary: "从过去看，之后会发生的动作",
    use: "站在过去某一时点，表达当时认为之后会发生或已安排的事。",
    useDetail: "常见结构是 would + 动词原形。这里的 would 表示相对过去的未来，不是过去习惯或条件用法。",
    forms: {
      affirmative: "主语 + would + 动词原形",
      negative: "主语 + would not + 动词原形",
      question: "Would + 主语 + 动词原形？",
    },
    example: {
      name: "过去视角的预期",
      before: "Maya thought the snow ",
      highlighted: "would stop",
      after: " by morning.",
      translation: "Maya 昨晚认为雪到早上会停。",
    },
    transferQuestion: {
      id: "transfer-future-in-past-simple-call",
      lessonId: "future-in-past-simple",
      context: "昨天午饭时，Nina 答应下课后给我打电话。",
      before: "At lunch yesterday, Nina promised she ",
      after: " after class.",
      options: [
        { id: "would-call", label: "would call" },
        { id: "called", label: "called" },
        { id: "had-called", label: "had called" },
      ],
      correctOptionId: "would-call",
      feedbackByOption: {
        "would-call": "正确。promise 发生在过去；电话安排在那个承诺之后，所以用 would call 表达过去视角的未来。",
        called: "called 把打电话说成已经发生的过去动作；句子说的是当时作出的后续承诺。",
        "had-called": "had called 表示打电话早于另一个过去参照点；这里的电话安排在承诺之后。",
      },
    },
    quickTip: "在过去的 thought、said、promised 等参照点之后，would 常用来表达当时看来还在未来的动作。",
  },
  {
    id: "future-in-past-continuous",
    group: "future-in-past",
    title: "过去将来进行时",
    englishTitle: "Future continuous in the past",
    level: "中级",
    durationMinutes: 10,
    summary: "从过去看，之后某刻正在进行",
    use: "站在过去的时点，描述当时预计在更晚某个时刻正在进行的活动。",
    useDetail: "由 would be + 动词-ing 构成；重点是后续参照时刻里的进行状态，而不是截至该时刻已完成的结果。",
    forms: {
      affirmative: "主语 + would be + 动词-ing",
      negative: "主语 + would not be + 动词-ing",
      question: "Would + 主语 + be + 动词-ing？",
    },
    example: {
      name: "过去预期中的进行活动",
      before: "Their Monday plan said they ",
      highlighted: "would be hiking",
      after: " at three on Tuesday.",
      translation: "他们周一制定的计划显示，周二下午三点时大家还在徒步途中。",
    },
    transferQuestion: {
      id: "transfer-future-in-past-continuous-drive",
      lessonId: "future-in-past-continuous",
      context: "昨天六点，Nina 说一小时后她还会开车回家，预计九点才能到。",
      before: "At six yesterday, Nina said she ",
      after: " home at seven.",
      options: [
        { id: "would-still-be-driving", label: "would still be driving" },
        { id: "would-have-driven", label: "would have driven" },
        { id: "had-driven", label: "had driven" },
      ],
      correctOptionId: "would-still-be-driving",
      feedbackByOption: {
        "would-still-be-driving": "正确。昨天六点是说话时点；Nina 预计七点回家途中仍在开车。",
        "would-have-driven": "would have driven 更像是到某时前已完成驾驶；语境强调七点仍在路上。",
        "had-driven": "had driven 指向过去参照点之前已开过车；七点在昨天六点之后。",
      },
    },
    quickTip: "would be + -ing 把活动放到过去视角中的较晚时刻，强调那时正在进行。",
  },
  {
    id: "future-in-past-perfect",
    group: "future-in-past",
    title: "过去将来完成时",
    englishTitle: "Future perfect in the past",
    level: "中级",
    durationMinutes: 10,
    summary: "从过去看，之后某时前已经完成",
    use: "站在过去的时点，表达当时预计某动作会在更晚的参照点之前完成。",
    useDetail: "由 would have + 过去分词构成；它从过去的预期点看向更晚时刻，突出届时已经完成的结果。",
    forms: {
      affirmative: "主语 + would have + 过去分词",
      negative: "主语 + would not have + 过去分词",
      question: "Would + 主语 + have + 过去分词？",
    },
    example: {
      name: "过去预期中的截止点",
      before: "On Monday, Sam expected he ",
      highlighted: "would have finished",
      after: " the draft by Wednesday's review.",
      translation: "周一时，Sam 预计自己会在周三评审前完成草稿。",
    },
    transferQuestion: {
      id: "transfer-future-in-past-perfect-edit",
      lessonId: "future-in-past-perfect",
      context: "周四，编辑确信自己会在下周一的截止时间之前改完终稿；这里强调届时已完成。",
      before: "On Thursday, the editor expected she ",
      after: " the final draft before Monday's deadline.",
      options: [
        { id: "would-have-edited", label: "would have edited" },
        { id: "would-still-be-editing", label: "would still be editing" },
        { id: "had-edited", label: "had edited" },
      ],
      correctOptionId: "would-have-edited",
      feedbackByOption: {
        "would-have-edited": "正确。周四是过去的预期点，周一截止时间在后；这里强调终稿届时已经改完。",
        "would-still-be-editing": "would still be editing 表示到截止时间时还在修改，和“之前已经改完”的语境不同。",
        "had-edited": "had edited 表示修改早于一个过去参照点；这里说的是周四之后的周一截止时间。",
      },
    },
    quickTip: "would have + 过去分词从过去的预期点回看更晚时刻，强调届时之前已完成。",
  },
  {
    id: "future-in-past-perfect-continuous",
    group: "future-in-past",
    title: "过去将来完成进行时",
    englishTitle: "Future perfect continuous in the past",
    level: "中级",
    durationMinutes: 11,
    summary: "从过去看，之后某时已持续一段时间",
    use: "站在过去的时点，强调某活动到更晚参照点时已经持续了多久。",
    useDetail: "由 would have been + 动词-ing 构成；它突出截至较晚时刻的持续过程或时长，常与 for 连用。",
    forms: {
      affirmative: "主语 + would have been + 动词-ing",
      negative: "主语 + would not have been + 动词-ing",
      question: "Would + 主语 + have been + 动词-ing？",
    },
    example: {
      name: "过去预期中的持续时长",
      before: "In April, Lena expected that by October she ",
      highlighted: "would have been studying",
      after: " English for six months.",
      translation: "四月时，Lena 预计到十月她学英语就满六个月了。",
    },
    transferQuestion: {
      id: "transfer-future-in-past-perfect-continuous-bridge",
      lessonId: "future-in-past-perfect-continuous",
      context: "三月时，施工队预计到十一月时桥梁工程已持续八个月，而且仍未完工。",
      before: "In March, the crew expected they ",
      after: " on the bridge for eight months by November.",
      options: [
        { id: "would-have-been-working", label: "would have been working" },
        { id: "would-have-worked", label: "would have worked" },
        { id: "had-been-working", label: "had been working" },
      ],
      correctOptionId: "would-have-been-working",
      feedbackByOption: {
        "would-have-been-working": "正确。三月是过去的预期点，十一月在后；仍未完工且给出时长，强调届时持续进行的工程。",
        "would-have-worked": "would have worked 把这八个月当作截至十一月的一段时长；语境强调到那时工程仍在继续。",
        "had-been-working": "had been working 指向过去时点之前的持续活动；十一月是三月之后的预计参照点。",
      },
    },
    quickTip: "would have been + -ing 从过去的预期点看向更晚时刻，突出活动届时已持续的时长。",
  },
]

function addCloseDistractor(question: LessonQuestion): LessonQuestion {
  const [id, label, feedback] = closeDistractorsByQuestion[question.id]
  return {
    ...question,
    options: [...question.options, { id, label }],
    feedbackByOption: { ...question.feedbackByOption, [id]: feedback },
  }
}

export const tenseLessons: TenseLesson[] = lessonContent.map((lesson) => ({
  ...lesson,
  guidedQuestion: guidedQuestionsByLesson[lesson.id],
  practiceQuestions: practiceQuestionsByLesson[lesson.id],
  transferQuestion: addCloseDistractor(lesson.transferQuestion),
}))

export function getLessonQuestions(lesson: TenseLesson): LessonQuestion[] {
  return [lesson.guidedQuestion, ...lesson.practiceQuestions, lesson.transferQuestion]
}

export const allLessonQuestions = tenseLessons.flatMap(getLessonQuestions)

export const requiredQuestionIds = allLessonQuestions.map((question) => question.id)

export function getTenseLessonById(lessonId: string): TenseLesson | undefined {
  return tenseLessons.find((lesson) => lesson.id === lessonId)
}

export function getQuestionById(questionId: string): LessonQuestion | undefined {
  return allLessonQuestions.find((question) => question.id === questionId)
}
