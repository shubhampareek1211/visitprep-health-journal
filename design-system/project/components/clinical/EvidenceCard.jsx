import React from "react";

/**
 * EvidenceCard — ties an extracted signal back to its source. Shows the signal,
 * the verbatim journal snippet (with the matched phrase highlighted), the date,
 * and the deterministic match basis. This is the core trust primitive: every
 * signal is traceable to "Selected source evidence".
 */
export function EvidenceCard({ signal, level = "mild", date, snippet, match, injectionAdjacent, style, ...rest }) {
  // Highlight the matched phrase inside the snippet, if provided.
  let body = snippet;
  if (match && typeof snippet === "string") {
    const i = snippet.toLowerCase().indexOf(match.toLowerCase());
    if (i >= 0) {
      body = (
        <>
          {snippet.slice(0, i)}
          <mark style={{ background: "var(--accent-tint-2)", color: "var(--accent-text)", padding: "0 2px", borderRadius: 2 }}>
            {snippet.slice(i, i + match.length)}
          </mark>
          {snippet.slice(i + match.length)}
        </>
      );
    }
  }
  const levelColor = { none: "var(--gray-400)", mild: "var(--teal-500)", moderate: "var(--amber-500)", severe: "var(--red-500)" }[level];

  return (
    <div
      style={{
        background: "var(--surface)", border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)", padding: "12px 14px",
        display: "flex", flexDirection: "column", gap: 8, ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: levelColor, flex: "none" }} />
        <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)", textTransform: "capitalize" }}>{signal}</span>
        {injectionAdjacent && <i data-lucide="syringe" style={{ width: 12, height: 12, color: "var(--accent)" }}></i>}
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{date}</span>
      </div>
      <blockquote style={{
        margin: 0, paddingLeft: 10, borderLeft: "2px solid var(--border-strong)",
        fontSize: "var(--text-sm)", lineHeight: "var(--leading-snug)", color: "var(--text-body)",
        fontStyle: "italic",
      }}>
        "{body}"
      </blockquote>
      {match && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "var(--text-2xs)", color: "var(--text-subtle)" }}>
          <i data-lucide="search-check" style={{ width: 12, height: 12 }}></i>
          <span>Matched on <span style={{ fontFamily: "var(--font-mono)" }}>"{match}"</span> · local deterministic extraction</span>
        </div>
      )}
    </div>
  );
}
