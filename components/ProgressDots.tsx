"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "cover",
  "about",
  "capabilities",
  "experience",
  "freelance",
  "work",
  "how",
  "contact",
];

export default function ProgressDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTION_IDS.indexOf(entry.target.id);
            if (idx > -1) setActive(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="progress-dot">
      {SECTION_IDS.map((id, i) => (
        <button
          key={id}
          className={`pd${i === active ? " active" : ""}`}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label={`Jump to ${id}`}
        />
      ))}
    </div>
  );
}
