# EvidenceLedger

A compact audit for an Alfred claim. It keeps supporting evidence, contradictory evidence, source freshness, and overall confidence visible in one surface.

## Use it when

Use `EvidenceLedger` beside a recommendation, forecast, or anomaly explanation when the user needs to inspect the evidence without leaving the current decision.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `claim?` | `ReactNode` | LinkedIn ABM claim | The conclusion under review. |
| `evidence?` | `EvidenceLedgerItem[]` | Sample marketing evidence | Evidence rows with a stance, finding, and freshness. |
| `confidence?` | `number` | `82` | Overall evidence confidence from 0 to 100. |
| `updated?` | `string` | `6 min ago` | Freshness shown in the header. |
| `onSourceOpen?` | `(item) => void` | none | Makes each source row actionable. |

## Usage

```jsx
<EvidenceLedger
  claim="LinkedIn ABM is now the most efficient place to add budget."
  evidence={[
    { source: "LinkedIn Ads", stance: "supports", finding: "Pipeline per dollar improved 24%." },
    { source: "Finance plan", stance: "contradicts", finding: "Search would fall below its floor." },
  ]}
  confidence={82}
/>
```

Keep contradictions visible. The component is designed to show why a claim might be wrong, not only why Alfred believes it.
