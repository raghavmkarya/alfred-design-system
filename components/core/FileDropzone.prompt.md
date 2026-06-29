# FileDropzone

The drop target for connecting data — a dashed, rounded surface with an upload mark, a title and hint, that warms to orange while a file is dragged over it. Pass a `files` array to show what's attached, each with name, size and an optional sync status. Calls `onFiles(FileList)` on drop or pick. Presentational — wire it to your own upload.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title?` | `string` | — |  |
| `hint?` | `string` | — |  |
| `accept?` | `string` | — | Native file `accept` string, e.g. ".csv,.xlsx". |
| `multiple?` | `boolean` | `true` |  |
| `files?` | `DropzoneFile[]` | — | Attached files to list under the zone. |
| `onFiles?` | `(files: FileList) => void` | — | Receives the dropped/picked FileList. |
| `dragActive?` | `boolean` | — | Force the drag-active state; otherwise managed internally. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { FileDropzone } = window.AlfredAIDesignSystem_1ce241;

<FileDropzone onFiles={fs => upload(fs)}
  files={[{ name: "q3-spend.csv", size: "2.4 MB", status: "done" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
