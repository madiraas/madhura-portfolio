import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getPublicSiteData } from "@/lib/data";
import Nav from "@/components/Nav";
import ProgressDots from "@/components/ProgressDots";
import Reveal from "@/components/Reveal";

export const revalidate = 0; // always fetch fresh from Supabase

export default async function HomePage() {
  const supabase = createClient();
  const data = await getPublicSiteData(supabase);
  const { settings: s, about, capabilities, problems, howIWork } = data;

  const featured = data.projects.filter((p) => p.featured);

  return (
    <>
      <Nav name={s.name || "Portfolio"} />
      <ProgressDots />

      <main>
        <section className="cover" id="cover">
          <div className="wrap">
            <div className="cover-kicker">
              <span className="dot" />
              <span>Freelance · {s.location || "—"}</span>
            </div>
            <h1 className="cover-title">
              I like being
              <br />
              in the <span className="accent-word">middle</span>
              <br />
              of things.
            </h1>
            <p className="cover-sub">
              {s.homepageTagline || "Content coming soon."}
            </p>
            <div className="cover-meta">
              <span>Name</span> {s.name || "—"} &nbsp; &nbsp;
              <span>Based</span> {s.location || "—"} &nbsp; &nbsp;
              <span>Status</span> Open to project work
            </div>
            <a
              className="cover-scroll"
              href="#about"
            >
              View my work <span className="arrow">↓</span>
            </a>
          </div>
        </section>

        <section id="about">
          <div className="wrap">
            <div className="eyebrow">
              <span className="num">01</span>
              <span className="label">About</span>
            </div>
            <Reveal as="h2" className="section-title">
              {about.heading || "About"}
            </Reveal>
            <div className="about-grid">
              <Reveal className="about-body">
                {about.paragraphs.length ? (
                  about.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className={
                        i === about.paragraphs.length - 1 ? "muted" : ""
                      }
                    >
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="muted">Nothing added yet.</p>
                )}
              </Reveal>
              <Reveal className="about-tag-list">
                {about.tags.map((t, i) => (
                  <div className="row" key={i}>
                    <span>{t.label}</span>
                    <b>{t.value}</b>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section id="capabilities">
          <div className="wrap">
            <div className="eyebrow">
              <span className="num">02</span>
              <span className="label">What can you hand me?</span>
            </div>
            <Reveal as="h2" className="section-title">
              Real problems, not service tiers.
            </Reveal>
            <Reveal className="problem-strip">
              {problems.map((p, i) => (
                <div className="problem" key={i}>
                  <span className="quote-mark">&quot;</span>
                  {p}
                </div>
              ))}
            </Reveal>
            <Reveal className="cap-grid">
              {capabilities.length ? (
                capabilities.map((c, i) => (
                  <div className="cap-card" key={i}>
                    <div className="cap-num">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                ))
              ) : (
                <div className="a-empty">No capabilities added yet.</div>
              )}
            </Reveal>
          </div>
        </section>

        <section id="experience">
          <div className="wrap">
            <div className="eyebrow">
              <span className="num">03</span>
              <span className="label">Experience</span>
            </div>
            <Reveal as="h2" className="section-title">
              Not a timeline. Proof.
            </Reveal>
            <Reveal className="exp-list">
              <ExpRows list={data.experience} />
            </Reveal>
          </div>
        </section>

        {data.freelance.length > 0 && (
          <section id="freelance">
            <div className="wrap">
              <div className="eyebrow">
                <span className="num">04</span>
                <span className="label">Freelance Work</span>
              </div>
              <Reveal as="h2" className="section-title">
                Taken on outside the day job.
              </Reveal>
              <Reveal className="exp-list">
                <ExpRows list={data.freelance} />
              </Reveal>
            </div>
          </section>
        )}

        <section id="work">
          <div className="wrap">
            <div className="eyebrow">
              <span className="num">05</span>
              <span className="label">Selected work</span>
            </div>
            <Reveal as="h2" className="section-title">
              A few things I&apos;ve actually done.
            </Reveal>
            <Reveal className="proj-grid">
              {featured.length ? (
                featured.map((p, i) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.slug}`}
                    className="proj-card"
                  >
                    <div className="p-num">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(featured.length).padStart(2, "0")}
                    </div>
                    {p.status === "coming-soon" && (
                      <span className="badge-soon">Coming soon</span>
                    )}
                    <h3>{p.title}</h3>
                    <div className="p-org">{p.org}</div>
                    <p className="p-desc">{p.short_desc}</p>
                    <div className="p-more">View project →</div>
                  </Link>
                ))
              ) : (
                <div className="a-empty">
                  No published projects yet — check back soon.
                </div>
              )}
            </Reveal>
          </div>
        </section>

        <section id="how">
          <div className="wrap">
            <div className="eyebrow">
              <span className="num">06</span>
              <span className="label">How I work</span>
            </div>
            <Reveal as="h2" className="section-title">
              Five steps. No surprises.
            </Reveal>
            <div className="how-list">
              {howIWork.map((h, i) => (
                <Reveal as="div" className="how-item" key={i}>
                  <div className="how-num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3>{h.title}</h3>
                    <p>{h.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="wrap">
            <div className="eyebrow">
              <span className="num">07</span>
              <span className="label">Contact</span>
            </div>
            <Reveal as="h2" className="contact-title">
              {s.contactCTA || "Got something messy that needs a hand?"}
            </Reveal>
            <Reveal as="p" className="contact-sub">
              I take on project-based work across operations, project
              coordination, hospitality, events, and creator/influencer
              campaigns.
            </Reveal>
            <Reveal className="contact-links">
              {s.email && (
                <a className="contact-link primary" href={`mailto:${s.email}`}>
                  Let&apos;s talk: Email
                </a>
              )}
              {s.phone && (
                <a
                  className="contact-link"
                  href={`tel:${s.phone.replace(/\s/g, "")}`}
                >
                  {s.phone}
                </a>
              )}
              {s.linkedin && (
                <a
                  className="contact-link"
                  href={s.linkedin}
                  target="_blank"
                  rel="noopener"
                >
                  LinkedIn ↗
                </a>
              )}
            </Reveal>
            <div className="contact-foot">
              <span>
                {s.name} · {s.location}
              </span>
              <Link href="/resume">View resume →</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ExpRows({
  list,
}: {
  list: { id: string; org: string; role: string; dates: string; context: string; responsibilities: string; demonstrates: string }[];
}) {
  if (!list.length) return <div className="a-empty">Nothing added yet.</div>;
  return (
    <>
      {list.map((e) => (
        <div className="exp-row" key={e.id}>
          <div>
            <div className="exp-org">{e.org}</div>
            <div className="exp-meta">
              <div className="exp-role">{e.role}</div>
              {e.dates && <div className="exp-dates">{e.dates}</div>}
            </div>
          </div>
          <div className="exp-detail">
            <p>
              <span className="label">Context</span>
              {e.context}
            </p>
            <p>
              <span className="label">Handled</span>
              {e.responsibilities}
            </p>
            <div className="demonstrates">{e.demonstrates}</div>
          </div>
        </div>
      ))}
    </>
  );
}
