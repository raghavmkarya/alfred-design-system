# RecommendationCard

Alfred's recommendation in the draft → approve → act loop. A soft card with a left priority rail (high = danger, opportunity = success, medium = orange), an "Alfred recommends" eyebrow + priority Badge, the title, reasoning and an emphasised projected-impact line, an optional inline ConfidenceMeter, and a footer of actions — defaulting to a primary "Approve" and a ghost "Dismiss".

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { RecommendationCard } = window.AlfredAIDesignSystem_1ce241;

<RecommendationCard />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
