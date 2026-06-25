SignalCard — the site's decision-lifecycle status tile: uppercase eyebrow + dot, a bold statement, and a muted trace line.

```jsx
<SignalCard tone="truth" label="One source of truth"
  statement="Pipeline is down 12% this quarter." trace="Seen by Marketing, Sales & Finance" />
<SignalCard tone="signal" label="Signal detected"
  statement="Lead quality down 14% this week" trace="Traced to a new paid social" />
```

Tones: `truth` (periwinkle), `signal` (orange), `early` (amber), `action` (green). Works on light or dark surfaces.
