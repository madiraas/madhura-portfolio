"use client";

export default function PrintButton() {
  return (
    <button className="resume-bar-btn solid" onClick={() => window.print()}>
      Save as PDF
    </button>
  );
}
