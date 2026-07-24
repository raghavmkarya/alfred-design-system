# DecisionFork

A strategic comparison surface for moments when there is no single obvious answer. Each path shows its outcome, confidence, reversibility, and honest tradeoffs.

## Use it when

Use `DecisionFork` after Alfred has narrowed a decision to two or three viable paths. Do not use it for simple settings or interchangeable plans.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title?` | `ReactNode` | Budget allocation question | The decision being made. |
| `context?` | `ReactNode` | Sample context | Explains what truly differs between the paths. |
| `options?` | `DecisionForkOption[]` | Two sample paths | Each option carries outcome, confidence, reversibility, and tradeoffs. |
| `selected?` | `string` | none | Controlled selected option. |
| `defaultSelected?` | `string` | recommended option | Initial uncontrolled selection. |
| `onSelect?` | `(id) => void` | none | Called when a path is selected. |
| `actionLabel?` | `string` | `Choose this path` | Label for an unselected path. |

## Usage

```jsx
<DecisionFork
  title="Where should the next $30K go?"
  options={[
    {
      id: "abm",
      label: "Scale LinkedIn ABM",
      outcome: "+$54K",
      confidence: 82,
      reversibility: "High",
      recommended: true,
      tradeoffs: ["Fastest projected gain", "Higher fatigue risk"],
    },
  ]}
  onSelect={(id) => saveDecision(id)}
/>
```

The recommendation is prominent, but the alternatives stay credible. Alfred should guide the decision without hiding uncertainty.
