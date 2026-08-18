import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getPublicSiteData } from "@/lib/data";
import PrintButton from "@/components/PrintButton";

export const revalidate = 0;

export default async function ResumePage() {
  const supabase = createClient();
  const data = await getPublicSiteData(supabase);
  const s = data.settings;
  const featuredProjects = data.projects.filter(
    (p) => p.featured && p.status === "published"
  );

  const resumeExpRows = (
    list: { org: string; role: string; dates: string; responsibilities: string }[]
  ) =>
    list.map((e, i) => (
      <div className="r-exp-item" key={i}>
        <div className="r-exp-head">
          <div className="r-exp-left">
            <b>{e.org}</b>
            <span>{e.role}</span>
          </div>
          <span className="r-exp-dates">{e.dates}</span>
        </div>
        <p>{e.responsibilities}</p>
      </div>
    ));

  return (
    <div>
      <div className="resume-bar">
        <Link href="/" className="resume-bar-btn">
          ← Back to portfolio
        </Link>
        <PrintButton />
      </div>
      <div className="resume-page">
        <h1 className="r-name">{s.name}</h1>
        <div className="r-tag">{s.tagline}</div>
        <div className="r-role">{s.professionalTitle.toUpperCase()}</div>
        <div className="r-contact">
          {s.email} &nbsp;·&nbsp; {s.phone} &nbsp;·&nbsp; {s.location}
        </div>

        <div className="r-section">
          <h4>Profile</h4>
          <p className="r-profile">{data.about.paragraphs[0] || ""}</p>
        </div>

        <div className="r-section">
          <h4>Core Capabilities</h4>
          <div className="r-caps">
            {data.capabilities.map((c, i) => (
              <span className="r-cap-pill" key={i}>
                {c.title}
              </span>
            ))}
          </div>
        </div>

        <div className="r-section">
          <h4>Experience</h4>
          {resumeExpRows(data.experience)}
        </div>

        {data.freelance.length > 0 && (
          <div className="r-section">
            <h4>Freelance Work</h4>
            {resumeExpRows(data.freelance)}
          </div>
        )}

        <div className="r-section">
          <h4>Selected Project Experience</h4>
          {featuredProjects.map((p) => (
            <div className="r-exp-item" key={p.id}>
              <div className="r-exp-head">
                <b>{p.title}</b>
              </div>
              <p>{p.output || p.short_desc || ""}</p>
            </div>
          ))}
        </div>

        <div className="r-two-col">
          <div className="r-section">
            <h4>Education</h4>
            {data.education.map((e, i) => (
              <div className="r-edu-item" key={i}>
                <b>{e.degree}</b>
                <span>{e.institution}</span>
              </div>
            ))}
          </div>
          <div className="r-section">
            <h4>Tools</h4>
            <div className="r-tools">
              {data.tools.map((t, i) => (
                <span key={i}>
                  {t}
                  {i < data.tools.length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p
        className="resume-print-hint"
        style={{
          textAlign: "center",
          fontFamily: "var(--mono)",
          fontSize: "11.5px",
          color: "var(--muted)",
          maxWidth: 400,
          margin: "0 auto 40px",
        }}
      >
        Tap &quot;Save as PDF&quot; above, then choose &quot;Save as PDF&quot;
        or &quot;Print to PDF&quot; in the sheet that opens.
      </p>
    </div>
  );
}
