import React from "react";

/**
 * Alfred AI — FileDropzone
 * The drop target for connecting data — a dashed, rounded surface with an upload mark,
 * a title and hint, that warms to orange while a file is dragged over it. Pass a `files`
 * array to show what's attached, each with name, size and an optional sync status. Calls
 * `onFiles(FileList)` on drop or pick. Presentational — wire it to your own upload.
 */
export function FileDropzone({
  title = "Drop files to connect, or browse",
  hint = "CSV, XLSX or JSON · up to 50 MB",
  accept,
  multiple = true,
  files = [],
  onFiles,
  dragActive,               // force the active state (else managed internally)
  style = {},
}) {
  const [over, setOver] = React.useState(false);
  const active = dragActive != null ? dragActive : over;
  const inputId = React.useId().replace(/:/g, "");

  const emit = (list) => { if (list && list.length && onFiles) onFiles(list); };

  const STATUS = {
    done: { color: "var(--success-500)", label: "Connected" },
    uploading: { color: "var(--warning-500)", label: "Uploading" },
    error: { color: "var(--danger-500)", label: "Failed" },
  };

  return (
    <div style={{ width: "100%", fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column", gap: 12, ...style }}>
      <label
        htmlFor={inputId}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); emit(e.dataTransfer && e.dataTransfer.files); }}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
          padding: "30px 24px", textAlign: "center", cursor: "pointer",
          borderRadius: "var(--radius-2xl)", border: `2px dashed ${active ? "var(--border-focus)" : "var(--border-default)"}`,
          background: active ? "var(--accent-soft)" : "var(--surface-sunken)",
          transition: "border-color var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)",
        }}
      >
        <span aria-hidden="true" style={{
          width: 44, height: 44, borderRadius: "var(--radius-md)", background: "var(--surface-card)",
          border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-xs)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)"
            strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 16V4M7 9l5-5 5 5" /><path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
          </svg>
        </span>
        <span style={{ fontSize: "var(--text-base)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{title}</span>
        {hint && <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{hint}</span>}
        <input id={inputId} type="file" accept={accept} multiple={multiple} onChange={(e) => emit(e.target.files)} style={{ display: "none" }} />
      </label>

      {Array.isArray(files) && files.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {files.map((f, i) => {
            const st = STATUS[f.status] || STATUS.done;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                borderRadius: "var(--radius-md)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
              }}>
                <span aria-hidden="true" style={{
                  width: 30, height: 30, flex: "none", borderRadius: "var(--radius-sm)", background: "var(--surface-sunken)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)"
                    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 3v5h5" /><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  </svg>
                </span>
                <span style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
                  {f.size && <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{f.size}</span>}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, flex: "none" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "var(--radius-pill)", background: st.color }} />
                  <span style={{ fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: st.color }}>{st.label}</span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
