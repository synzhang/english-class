# English Class

A Chinese-first English-learning web app for independent learners. The platform is designed to grow across grammar, vocabulary, listening, reading, speaking, and writing. The first available module is a complete Tenses learning path with 16 common learner-facing forms.

Each of the 16 Tenses lessons has five four-option questions: one guided question, three increasingly demanding consolidation questions, and one new-context transfer question. Every option receives an explanation tailored to the tense contrast. Future-time lessons explain that English expresses future time through several structures rather than a distinct future inflection. The directory also includes four future-in-the-past forms, which look forward from a past reference point.

## Run locally

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
pnpm preview
```

Lesson progress and missed answers are stored in the browser's local storage. Existing v1 Tenses progress is migrated to the v2 storage schema when available. The current version does not require an account or backend.
