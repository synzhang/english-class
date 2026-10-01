---
name: English Class
description: A Chinese-first English-learning platform that connects clear explanations with use in new contexts.
colors:
  background: "oklch(0.979 0.009 248)"
  ink: "oklch(0.255 0.048 258)"
  panel-white: "oklch(1 0 0)"
  textbook-blue: "oklch(0.58 0.2 255)"
  button-text: "oklch(0.99 0.006 250)"
  blue-wash: "oklch(0.946 0.025 249)"
  blue-ink: "oklch(0.31 0.08 257)"
  muted-text: "oklch(0.47 0.04 257)"
  border-rule: "oklch(0.89 0.024 250)"
  home-paper: "oklch(0.995 0.003 248)"
  planned-wash: "oklch(0.951 0.014 249)"
  study-yellow: "oklch(0.84 0.14 88)"
  feedback-green-wash: "oklch(0.95 0.035 153)"
  feedback-green-ink: "oklch(0.33 0.09 153)"
  feedback-rose-wash: "oklch(0.96 0.03 28)"
  feedback-rose-ink: "oklch(0.39 0.11 28)"
  practice-paper: "oklch(0.992 0.004 249)"
typography:
  display:
    fontFamily: "Noto Sans SC Variable, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(34px, 4.4vw, 53px)"
    fontWeight: 720
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist Variable, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "22px"
    fontWeight: 720
    lineHeight: 1.3
    letterSpacing: "-0.022em"
  body:
    fontFamily: "Geist Variable, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  example:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(17px, 1.7vw, 21px)"
    fontWeight: 500
    lineHeight: 1.55
  choice:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.35
  button:
    fontFamily: "Geist Variable, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "14px"
    fontWeight: 600
  navigation:
    fontFamily: "Geist Variable, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "16px"
    fontWeight: 600
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "13px"
  pill: "9999px"
  circle: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.textbook-blue}"
    textColor: "{colors.button-text}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "8px 17px"
    height: "46px"
  active-module-card:
    backgroundColor: "{colors.home-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "22px 24px"
  planned-status:
    backgroundColor: "{colors.planned-wash}"
    textColor: "{colors.muted-text}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "4px 8px"
  navigation-current:
    backgroundColor: "{colors.background}"
    textColor: "{colors.textbook-blue}"
    typography: "{typography.navigation}"
    rounded: "0"
    padding: "0 18px"
    height: "82px"
  roadmap-item:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "19px 20px"
  course-row:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "13px 10px"
    height: "83px"
  answer-option:
    backgroundColor: "{colors.panel-white}"
    textColor: "{colors.ink}"
    typography: "{typography.choice}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
    height: "62px"
  answer-feedback-retry:
    backgroundColor: "{colors.feedback-rose-wash}"
    textColor: "{colors.feedback-rose-ink}"
    rounded: "{rounded.sm}"
    padding: "12px 13px"
  answer-feedback-correct:
    backgroundColor: "{colors.feedback-green-wash}"
    textColor: "{colors.feedback-green-ink}"
    rounded: "{rounded.sm}"
    padding: "12px 13px"
  practice-card:
    backgroundColor: "{colors.practice-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "19px 22px"
  quick-reference:
    backgroundColor: "{colors.panel-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "21px 17px 18px"
  review-item:
    backgroundColor: "{colors.panel-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "17px 19px 19px"
---

# Design System: English Class

## Overview

**Creative North Star: “清晰的英语学习课堂”**

English Class is a calm, restrained, bookish learning tool: easy to scan, clear about the next action, and organized around familiar course-directory patterns. Cool paper surfaces and navy text carry the reading experience; textbook blue marks interaction, while sticky-note yellow appears in small study cues. Thin borders and light tonal shifts create structure, with restrained shadows.

The platform begins at a learning home, with Tenses as its first active module. Learners move from the four-group Tenses directory into a contextual lesson, compare form and meaning, answer five questions one at a time in a shared exercise area, transfer the pattern in its final new-context question, and revisit mistakes across the module. Home roadmap entries for vocabulary, listening, reading, speaking, and writing are explicitly marked as planned; they are not implemented modules.

**Current shipped scope:** the Tenses directory contains 16 separate lesson records/routes: four present forms, four past forms, four future-time forms, and four future-in-the-past forms. Each lesson has a contextual example, affirmative/negative/question patterns, one guided question, three consolidation questions, and one transfer question. The five questions appear one at a time in a shared exercise area, with four plausible options and answer-specific feedback for each. Progress is local to the browser, persists across courses, and the v2 store migrates existing v1 progress. The future-time group teaches several future expressions, not a distinct English future inflection. The future-in-the-past group teaches later events from a past reference point through would + aspect combinations; it is a learning taxonomy, not four additional inflected tenses.

The previous 12-form scope received a **ship** review. For the 16-form expansion, the complete catalog and one representative future-in-the-past lesson were inspected at 1440px and 390px CSS viewport widths. The latest five-question lesson layout has also been inspected in a live desktop Chrome viewport. The existing lesson full-page captures predate this question expansion; there is no updated full-page mobile capture yet. Home and Review captures remain from the previous scope because those surfaces did not change. The review captures show the empty review state; the cross-course missed-question list is also implemented.

**Key Characteristics:**
- English Class platform shell with one active learning module and clearly planned future modules.
- A scan-friendly 16-course Tenses directory grouped by present, past, future-time, and future-in-the-past expression.
- Chinese-first teaching with readable English examples and explicit answer feedback.
- Local, cross-course progress and mistake review.

## Colors

The palette is a cool, lightly blue-tinted paper field with navy ink and a restrained textbook-blue interaction color. Pale blue organizes related content; sticky-note yellow and answer-feedback colors are reserved for small semantic cues.

### Primary
- **Textbook Blue** (`textbook-blue`): primary buttons, active navigation, links, focus accents, and progress fills.

### Secondary
- **Pale Blue Wash** (`blue-wash`): selected, grouped, and supporting surfaces.
- **Blue Ink** (`blue-ink`): secondary-control text and compact emphasis.

### Tertiary
- **Study Marker Yellow** (`study-yellow`): the quick-reference bookmark and restrained example emphasis.
- **Feedback Green Wash** (`feedback-green-wash`): correct-answer and completion states.
- **Feedback Rose Wash** (`feedback-rose-wash`): retry feedback.

### Neutral
- **Cool Paper** (`background`): the page canvas and open list surfaces.
- **Ink Navy** (`ink`): default text and headings.
- **Notebook White** (`panel-white`): module, practice, reference, and review cards.
- **Exercise Paper** (`practice-paper`): the lightly tinted card for the one-at-a-time lesson practice flow.
- **Quiet Slate** (`muted-text`): descriptions, metadata, and helper text.
- **Fine Rule** (`border-rule`): row dividers, table rules, and panel outlines.
- **Button White** (`button-text`): text on the primary blue action.

**The Small Marker Rule.** Keep yellow to a brief bookmark or inline example cue; blue remains the interaction color.

## Typography

**Display Font:** Noto Sans SC Variable (with PingFang SC, Microsoft YaHei, sans-serif fallback)
**Body Font:** Geist Variable (with PingFang SC, Microsoft YaHei, sans-serif fallback)
**Reading Font:** Lora (with Georgia, serif fallback)

**Character:** Geist keeps Chinese guidance clear and compact. Noto Sans SC Variable carries large Chinese page titles. Lora distinguishes English examples, grammatical forms, and answer choices from the Chinese explanation layer.

### Hierarchy
- **Display** (720, `clamp(34px, 4.4vw, 53px)`, 1.2): home and catalog hero headings; lesson titles use a similar responsive scale.
- **Headline** (720, 20–25px, about 1.3): module, group, and lesson-section headings.
- **Body** (400, 15px, 1.55): Chinese explanation and default page copy.
- **Example** (500, `clamp(17px, 1.7vw, 21px)`, 1.55): English contextual example sentences.
- **Choice** (600, 18px, 1.35): English multiple-choice options.
- **Label** (600–700, 10–14px): navigation, course metadata, statuses, and form labels.

**The Language Pair Rule.** Use the UI sans for Chinese instruction and Lora for English examples and answer options.

## Layout

The desktop shell has an 82px sticky header with the English Class wordmark, primary navigation, and Tenses-wide practice progress. Lesson pages center a teaching column capped at 940px. On ultra-wide layouts, a 310px form-reference rail sits to its right; on narrower layouts, the reference follows the lesson. Lessons do not use a left step rail. The single-column home, catalog, and review surfaces use wider centered containers.

The platform home leads with the learning proposition, then a bordered active-module card with completion information and a clear Tenses-directory action. The module roadmap is an open two-column list separated by fine rules; planned entries carry a visible “规划中” status. The Tenses catalog uses four time groups and open course rows. Each row places the Chinese and English form names beside a short use summary, affirmative formula, duration/level, progress, and a forward action.

Each lesson keeps a central sequence and quick reference. The teaching sequence is a use explanation, three form patterns, an English example, and one shared practice area. That area shows one question at a time across a guided item, three increasingly difficult consolidation items, and a final new-context transfer item. Review is a single-column surface spanning missed questions from all Tenses courses, with course labels and prior-attempt context; its empty state is centered in a white bordered panel.

At 1675px and below, the quick reference moves below the teaching column. At 1150px the single-view container tightens and lesson rows reflow. At 820px the header navigation moves to a horizontally scrollable second row and home/catalog/review stay single-column. At 600px course-row formulas hide in favor of the compact metadata layout, lesson forms and examples stack, and answer options become one column. The document body preserves a 320px minimum width. The observed spacing rhythm uses 8, 12, 16, 24, and 32px steps with smaller 2–6px alignment gaps.

The full-page Catalog captures cover the 16-course scope at 1440px and 390px CSS widths. Stored lesson captures show the earlier two-question layout. The current lesson was inspected in live desktop Chrome DOM: the combined exercise area renders one active question and the rail has three steps. The next-question interaction and an updated full-page mobile capture have not been reviewed. Home and Review captures remain from the earlier scope; populated review entries use the same cross-course card layout as the empty-state screenshots.

## Elevation & Depth

Surface tone, thin borders, and whitespace provide most of the hierarchy. The sticky header uses a translucent white fill and 12px backdrop blur. Home, practice, reference, and review cards remain flat; primary actions may use a small shadow that strengthens on hover. Progress tracks use pale blue-gray tracks with a blue fill. Reduced-motion preferences remove the lesson entrance animation and UI transitions.

### Shadow Vocabulary
- **Primary action at rest** (`0 2px 5px oklch(0.35 0.13 255 / 18%)`): light separation from the surrounding card.
- **Primary action hover** (`0 4px 10px oklch(0.35 0.13 255 / 22%)`): a restrained enabled-state cue.

**The Flat Study Surface Rule.** Keep content cards flat at rest; use tonal contrast and fine rules before adding shadow.

## Shapes

Cards and lesson panels use softly rounded corners around 8–13px. The module roadmap and course catalog remain open rows rather than pill-shaped cards. Status badges and progress tracks use pill forms; lesson markers and small icons use circular forms. Use thin, cool blue-gray borders and reserve the yellow bookmark silhouette for the quick-reference rail.

## Components

### Buttons
- **Primary:** textbook blue with white text; the home module action is at least 46px high. The same action family is used for answer checks.
- **Navigation:** square-edged tabs with a short 3px underline on the current view; on mobile, keep the second-row navigation horizontally scrollable.
- **Focus:** keyboard focus receives a visible 3px blue outline with offset.

### Chips
- **Status and course badges:** compact pale-blue or outlined labels. Use “规划中” for planned modules and completion states for courses.

### Cards / Containers
- **Active module:** white, thin-bordered card with icon, description, course/answer progress, and one primary route into Tenses.
- **Practice / lesson example:** lightly tinted or white bordered panels; English examples remain the focal text.
- **Review item:** white bordered card containing course context, attempt history, and the reusable question interaction.

### Inputs / Fields
- **Answer choices:** full-row labels with a radio control, Lora answer text, pale-blue selected state, and clear success/retry feedback. On mobile the choices stack vertically.
- **No text-entry field** is part of the current learning flow.

### Navigation
- **Platform navigation:** Home, Tenses, and Review are the implemented destinations. Progress in the header is scoped to the Tenses practice set.
- **Tenses directory:** four grouped sections with 16 course rows and per-course progress.
- **Lesson navigation:** three steps on the left rail, converted to a three-column stepper at tablet widths and two columns on small screens.

### Signature Components
- **Course row:** an open, full-width directory row with bilingual name, summary, affirmative form, duration/level, progress, and arrow.
- **Form reference:** a right-rail card showing affirmative, negative, and question forms plus a lesson-specific usage tip.
- **Cross-course review:** a single-column list of missed questions with course badges and previous-answer context; a separate centered empty state appears when there are no misses.

### Raster Asset Provenance

No raster is bundled as application content. The app's icons are vector/Lucide elements; `public/` contains SVG assets. Raster files in source, reference, comp, or review folders are not imported into the application bundle.

- `src/assets/hero.png` — present in source but unused and unreferenced; app use is none. Creator and original-versus-generated status are **unconfirmed**.
- `docs/tenses/verb-tenses-summary.png`, `docs/tenses/tenses-chart.png`, and `docs/tenses/一眼秒懂16大时态.jpeg` — project-provided reference materials, not shipped. Use is limited to background planning; their images are not authoritative lesson copy. Original creator and generated-versus-original status are **unconfirmed**.
- `.impeccable/mocks/decision/canon.png` — non-shipping comp for the earlier two-form Tenses surface. Keep it as historical critique material, not as course-content authority; its original creator/source is **unconfirmed**.
- `.impeccable/review/desktop.png`, `mobile.png`, `catalog-desktop.png`, `catalog-mobile.png`, `lesson-desktop.png`, `lesson-mobile.png`, `review-desktop.png`, and `review-mobile.png` — local browser viewport captures from prior visual reviews; the lesson captures predate the five-question expansion. They are review evidence, not product imagery or shipped assets.

## Do's and Don'ts

### Do:
- **Do** distinguish the active Tenses module from roadmap modules that are still planned.
- **Do** keep the 16-course Tenses directory grouped by present, past, future-time, and future-in-the-past expression, with progress visible at course level.
- **Do** move from contextual meaning to forms, then present guided practice, progressively harder consolidation, and the final transfer prompt one question at a time in a shared exercise area.
- **Do** show why an answer fits, preserve missed questions across courses, and keep progress local to the browser.
- **Do** use textbook blue for interaction and a small amount of yellow for study cues.

### Don't:
- **Don't** present Vocabulary, Listening, Reading, Speaking, or Writing as implemented modules; the home roadmap marks them as planned.
- **Don't** describe future time as a distinct English inflection. The future-time and future-in-the-past groups organize learner-facing expressions relative to different reference points.
- **Don't** use the legacy two-form comp or unverified chart images as lesson-content authority.
- **Don't** invent a source or generation status for raster files whose provenance is unconfirmed.
