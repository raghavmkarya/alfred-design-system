# Alfred Campaign Motion Toolkit

Status: EP-601 through EP-617 complete
Interactive master: [`campaign/motion/index.html`](campaign/motion/index.html)
Timeline source:
[`data/campaigns/motion-timelines.json`](data/campaigns/motion-timelines.json)

## Motion personality

Campaign motion is calm, confident, and explanatory. Motion communicates hierarchy, causality,
feedback, or state change. It does not loop for decoration.

The default behavior is critically damped:

- Default damping: `1.0`.
- Default response: `0.4` seconds.
- Momentum damping: `0.8`.
- Momentum response: `0.4` seconds.
- Transition curve: `cubic-bezier(0.22, 1, 0.36, 1)`.

The interactive timeline can be paused, scrubbed, retargeted, and resumed from its current visual
state. Scrubbing interrupts playback immediately. Input remains available during transitions.

## Sequence library

The toolkit contains 11 sequences:

1. Logo reveal and close.
2. Decision-intelligence category reveal.
3. Kinetic headline.
4. Signal to evidence to recommendation to action.
5. Alfred Core memory.
6. Product-window entrance and annotation.
7. Metric and chart reveal.
8. Founder quote and lower-third treatment.
9. Press quote and publication treatment.
10. Funding-announcement end card.
11. Story and reel title treatment.

All sequences except the funding end card are campaign-independent. The funding end card is
launch-specific because it inherits public or restricted funding state.

## Timeline masters

The system defines 6, 10, 15, and 30 second timelines. Cues stay within each duration and can be
recomposed without rebuilding the individual sequence implementations.

Every timeline can render at:

- Horizontal, 1280 by 720.
- Square, 1080 by 1080.
- Portrait, 1080 by 1350.
- Vertical, 1080 by 1920.

Vertical and portrait masters reorganize the decision flow and product window rather than cropping a
horizontal composition.

## Static poster frames

Exact-size poster frames are generated at:

[`campaign/generated/alfred-flagship-launch/motion-posters/`](campaign/generated/alfred-flagship-launch/motion-posters/)

Every poster contains a complete identity, CTA, and funding-visibility state. The current safe
fixture states that funding details remain restricted.

## Reduced motion and photosensitivity

Reduced-motion mode:

- Removes transform transitions.
- Uses short opacity cross-fades.
- Removes moving glow transforms.
- Preserves the complete static message.

The motion manifest disallows loops and flashes. No sequence uses abrupt full-frame brightness
changes or perpetual oscillation.

## Verification

Run:

```sh
npm run verify:motion-toolkit
```

The gate checks:

- All 11 sequences.
- All four timeline durations.
- All four aspect ratios.
- Cue timing within duration.
- No loops or flashes.
- Critically damped default behavior.
- Exact poster-frame dimensions.
- Complete static messages.
- Playback progress.
- Scrubber interruption and retargeting.
- Reduced-motion opacity fallback with no transform transition.
