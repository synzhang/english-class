# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React and pnpm are user-confirmed. shadcn/ui is approved for interface components. The current client stores learning progress locally; there is no account or backend requirement yet.

## Users

Chinese-speaking teens and adults who study English independently. The intended starting proficiency is beginner to intermediate.

## Product Purpose

Build an expandable English-learning platform that helps learners understand English and use it in new contexts. Tenses is the first complete learning module. Vocabulary, listening, reading, speaking, and writing are planned as later modules.

## Positioning

Use familiar course-directory conventions to make the learning path easy to scan. Each lesson moves from meaning and context through form, guided practice, three increasingly demanding consolidation questions, and a transfer question in a new context. All five questions share one practice area and appear one at a time; learners continue after each correct answer, and answering the final transfer question completes the lesson. Explanations are Chinese-first; English examples remain natural, visible, and useful beyond memorization.

## Current Feature: Tenses

- Provide an entry page for the wider English-learning platform and a complete 16-course Tenses directory.
- Teach four learner-facing forms each for present time, past time, future-time expression, and future-in-the-past expression.
- Every course includes when to use the form, affirmative/negative/question patterns, a contextual example, one guided question, three consolidation questions, and one new-context transfer question. All five questions have four plausible options with option-specific explanations and appear sequentially in one exercise area.
- Track solved questions by stable question IDs and keep missed questions available across the full Tenses module.
- Preserve progress from `english-class:tenses-progress:v1` when the v2 schema is first loaded.
- Explain that “16 common learning forms” is the chosen teaching taxonomy, not a count of distinct inflected English tenses. English expresses future time through several structures; future-in-the-past forms describe a later event from a past reference point.

## Selected Visual Direction

- Direction: 常见语法目录.
- Reference comp: `.impeccable/mocks/decision/canon.png`.
- North Star: 清晰的英语学习课堂.
- Use a cool white and navy workbook palette, restrained textbook-blue controls, and a small warm study marker. Keep surfaces separated by thin rules and tonal changes, with restrained shadows.
- The platform home introduces the learning modules; the Tenses directory organizes lessons by time group; each lesson keeps a left step rail, a central teaching sequence, and a compact form reference.
- Keep the presentation conventional, readable, and easy to extend as new English-learning modules are added.

## Tense Teaching Taxonomy

Use a familiar learner-facing 16-form convention, grouped as follows:

- Present: present simple, present continuous, present perfect, present perfect continuous.
- Past: past simple, past continuous, past perfect, past perfect continuous.
- Future-time forms: future simple with *will*, future continuous, future perfect, future perfect continuous.
- Future-in-the-past forms: future simple, continuous, perfect, and perfect continuous in the past, taught with *would*, *would be*, *would have*, and *would have been* constructions.

Treat future time as a learning group, not as a claim that English has a separate future inflection. The future-in-the-past group looks forward from a past reference point; *was / were going to* and the past continuous are also used for past plans and expectations. Teach *will*, *be going to*, present continuous, and present simple schedules as context-dependent future expressions in the relevant lessons or follow-up references.

## Reference Patterns

- [British Council LearnEnglish Grammar](https://learnenglish.britishcouncil.org/free-resources/grammar): level-aware explanations, examples, and practice.
- [Cambridge Grammar Today: Tenses and time](https://dictionary.cambridge.org/uk/grammar/british-grammar/tenses-and-time): distinguish grammatical tense from ways of expressing future time.
- [Cambridge Grammar Today: Present simple or present continuous?](https://dictionary.cambridge.org/uk/grammar/british-grammar/present-simple-or-present-continuous): explain form contrasts with contextual examples.
- [Cambridge Grammar Today: Future in the past](https://dictionary.cambridge.org/grammar/british-grammar/future-in-the-past): explain later events from a past reference point.
- [British Council LearnEnglish: Talking about the past](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/talking-about-past): cover *would*, *was / were going to*, and past continuous for future-in-the-past meanings.
- Adapt reference patterns for Chinese-first explanations and a required transfer check; do not copy their lesson text.

## Evidence on Hand

- `docs/tenses/verb-tenses-summary.png`
- `docs/tenses/tenses-chart.png`
- `docs/tenses/一眼秒懂16大时态.jpeg`
- Official grammar references listed above. The supplied charts are visual references, not authoritative lesson copy; reconcile them with the teaching taxonomy and grammar sources before publishing content.

## Product Principles

- Teach meaning and context before asking learners to memorize a form.
- Make the first practice prompt use a different sentence and scenario from the lesson example, so learners must apply the form.
- Explain why an answer fits and why a tempting alternative does not.
- Use time words as clues, not as automatic answer keys.
- Sequence common distinctions before less frequent or more complex forms.
- Keep explanations Chinese-first and examples natural in English.
- Keep future learning expressions accurate while using familiar course labels.
- Make completed and planned learning modules distinguishable; do not present a planned module as working functionality.
