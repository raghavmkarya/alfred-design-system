import React from "react";
/**
 * Drop target for connecting data — a dashed surface that warms to orange on drag-over,
 * with an attached-files list. Presentational; wire `onFiles` to your own upload.
 * @startingPoint section="Core" subtitle="File drop target" viewport="700x300"
 */
export interface DropzoneFile {
  name: string;
  size?: string;
  /** @default "done" */
  status?: "done" | "uploading" | "error";
}
export interface FileDropzoneProps {
  title?: string;
  hint?: string;
  /** Native file `accept` string, e.g. ".csv,.xlsx". */
  accept?: string;
  /** @default true */
  multiple?: boolean;
  /** Attached files to list under the zone. */
  files?: DropzoneFile[];
  /** Receives the dropped/picked FileList. */
  onFiles?: (files: FileList) => void;
  /** Force the drag-active state; otherwise managed internally. */
  dragActive?: boolean;
  style?: React.CSSProperties;
}
/**
 * The drop target for connecting data — drag-over highlight and a file list.
 */
export function FileDropzone(props: FileDropzoneProps): JSX.Element;
