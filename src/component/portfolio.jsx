import { useState, useEffect, useRef, useCallback } from "react";


const T = {
  bg:       "#0F172A",
  surface:  "#1E293B",
  surface2: "#263348",
  primary:  "#6366F1",
  secondary:"#8B5CF6",
  accent:   "#94A3B8",
  text:     "#F8FAFC",
  subtext:  "#CBD5E1",
  border:   "#334155",
  borderFaint: "rgba(51,65,85,0.6)",
};

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = {
  Backend: [
    { name: "Java",      level: 85, tag: "JVM" },
    { name: "Django",    level: 80, tag: "Python" },
    { name: "FastAPI",   level: 78, tag: "Python" },
    { name: "REST APIs", level: 88, tag: "HTTP" },
  ],
  Frontend: [
    { name: "JavaScript",  level: 82, tag: "ES2024" },
    { name: "React.js",    level: 79, tag: "SPA" },
    { name: "HTML / CSS",  level: 90, tag: "Web" },
    { name: "TailwindCSS", level: 75, tag: "Utility" },
  ],
  Databases: [
    { name: "PostgreSQL", level: 83, tag: "SQL" },
    { name: "MongoDB",    level: 76, tag: "NoSQL" }
  ],
  Tools: [
    { name: "Git / GitHub", level: 88, tag: "VCS" },
  ],
};

const PROJECTS = [
  {
    title: "LearnHub",
    subtitle: "Learning Management Platform",
    desc: "Full-featured LMS with course creation,progress tracking, QR Based Attendance, and multi-role auth for students, instructors, and admins.",
    tags: ["ExpressJS", "React.js", "MongoDB", "TailWindCSS"],
    accent: "#6366F1",
    repoUrl:"https://github.com/Nejat-33/Full-Stack-Learning-Platform-.git",
    icon: "📚",
  },
  {
    title: "SpendSmart",
    subtitle: "AI-Powered Expense Tracker",
    desc: "Intelligent expense tracker that auto-categorizes transactions, manage category-specific budgets, and leverages Machine Learning to automatically classify spending and detect unusual transactional anomalies.",
    tags: ["Django", "Postgress", "SkitLearn"],
    accent: "#8B5CF6",
    repoUrl: "https://github.com/Nejat-33/Spent-Wisely-Using-Django.git",
    icon: "🤖",
  },
  {
    title: "NexShop",
    subtitle: "E-Commerce Platform",
    desc: "Built Modern e-commerce Frontend Product listing and UI similar to AliExpress full frontend E-commerce Website",
    tags: ["React","TypeScript", "TailWindCSS",],
    accent: "#06B6D4",
    repoUrl: "https://github.com/Nejat-33/E-commerce.git",
    icon: "🛒",
  },
  {
    title: "TalentBridge",
    subtitle: "Job Portal System",
    desc: "Connects job seekers with employers through smart job matching, application tracking, and recruiter analytics.",
    tags: ["FastAPI",  "PostgreSQL"],
    accent: "#F59E0B",
    repoUrl: "https://github.com/Nejat-33/Job-Portal.git",
    icon: "💼",
  },
  {
    title: "ServeNet",
    subtitle: "Volunteer Service Platform",
    desc: "The system allows organizations to post volunteering opportunities and enables volunteers to discover, apply, and participate in community activities..",
    tags: [ "React.js", "MongoDB", "TailwindCSS", "Express.JS"],
    accent: "#10B981",
    repoUrl: "https://github.com/Nejat-33/Voluntary-Service-Platform.git",
    icon: "🌍",
  },
];

const TYPING_WORDS = [
  "Full Stack Developer",
  "Backend Engineer",
  "Problem Solver",
  "CS Student",
];

const TECH_STACK = [
  "Java","JavaScript","Python","React.js",
  "Django","FastAPI","PostgreSQL","MongoDB",
  "Git","Postman","REST API",
];


function SectionLabel({ label, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
      <span style={{ color: T.primary, fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1 }}>
        {label}.
      </span>
      <h2 style={{ color: T.text, fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: -0.5, margin: 0 }}>
        {title}
      </h2>
      <div style={{ flex: 1, height: 1, background: T.border, marginLeft: 8 }} />
    </div>
  );
}

function TypingText() {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx,   setWordIdx]   = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    const word = TYPING_WORDS[wordIdx];
    let t;
    if (!deleting && charIdx < word.length)      t = setTimeout(() => setCharIdx(c => c + 1), 75);
    else if (!deleting && charIdx === word.length) t = setTimeout(() => setDeleting(true), 2000);
    else if (deleting  && charIdx > 0)             t = setTimeout(() => setCharIdx(c => c - 1), 38);
    else { setDeleting(false); setWordIdx(w => (w + 1) % TYPING_WORDS.length); }
    setDisplayed(word.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx]);

  return (
    <span style={{ color: T.primary }}>
      {displayed}
      <span style={{ borderRight: `2px solid ${T.primary}`, animation: "blink 0.9s step-end infinite", marginLeft: 1 }} />
    </span>
  );
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, height: 2,
      width: `${pct}%`,
      background: `linear-gradient(90deg, ${T.primary}, ${T.secondary})`,
      zIndex: 9999, transition: "width 0.08s linear",
    }} />
  );
}

function Navbar({ active, onNav }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      height: 60,
      padding: "0 6%",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(15,23,42,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
      transition: "background 0.3s, border-color 0.3s",
    }}>
      <button
        onClick={() => onNav("Home")}
        style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          fontSize: 15, fontWeight: 700,
          color: T.text, letterSpacing: -0.3,
          display: "flex", alignItems: "center", gap: 8,
        }}
      >
        <span style={{
          width: 28, height: 28, borderRadius: 7,
          background: `linear-gradient(135deg, ${T.primary}, ${T.secondary})`,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 800, color: "#fff",
        }}>N</span>
        Nejat
      </button>

      <ul className="nav-desktop" style={{
        display: "flex", gap: 4, listStyle: "none", margin: 0, padding: 0,
      }}>
        {NAV_LINKS.map(n => (
          <li key={n}>
            <button onClick={() => onNav(n)} style={{
              background: active === n ? `rgba(99,102,241,0.12)` : "none",
              border: "none", cursor: "pointer",
              color: active === n ? T.primary : T.subtext,
              fontSize: 13, fontWeight: active === n ? 600 : 400,
              fontFamily: "'Inter', sans-serif",
              padding: "6px 14px", borderRadius: 6,
              transition: "all 0.18s",
            }}
            onMouseEnter={e => { if (active !== n) e.currentTarget.style.color = T.text; }}
            onMouseLeave={e => { if (active !== n) e.currentTarget.style.color = T.subtext; }}
            >
              {n}
            </button>
          </li>
        ))}
      </ul>

      <button 
  onClick={() => onNav("Contact")} 
  className="nav-desktop" 
  style={{
    background: T.primary,
    border: "none", 
    borderRadius: 7,
    padding: "7px 18px",
    color: "#fff", 
    fontSize: 13, 
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    transition: "opacity 0.18s",
  }}
  onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
>
  Let's connect
</button>

      <button className="hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu" style={{
        display: "none", background: "none", border: "none",
        color: T.subtext, fontSize: 22, cursor: "pointer",
      }}>
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div style={{
          position: "absolute", top: 60, left: 0, right: 0,
          background: "rgba(15,23,42,0.98)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${T.border}`,
          padding: "8px 6% 20px",
        }}>
          {NAV_LINKS.map(n => (
            <button key={n} onClick={() => { onNav(n); setMenuOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              color: active === n ? T.primary : T.subtext,
              fontFamily: "'Inter', sans-serif",
              fontSize: 15, padding: "12px 0",
              borderBottom: `1px solid ${T.borderFaint}`,
            }}>
              {n}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ onNav }) {
  return (
    <section id="Home" style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "100px 6% 60px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -200, left: "50%",
        transform: "translateX(-50%)",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        display: "flex", flexWrap: "wrap", gap: 64,
        alignItems: "center", justifyContent: "center",
        maxWidth: 1080, width: "100%",
      }}>
        <div style={{ flex: "1 1 420px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(99,102,241,0.1)",
            border: `1px solid rgba(99,102,241,0.25)`,
            borderRadius: 20, padding: "5px 14px",
            marginBottom: 28,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#10B981",
              boxShadow: "0 0 0 2px rgba(16,185,129,0.2)",
              display: "inline-block",
            }} />
            <span style={{ color: T.subtext, fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              Open to opportunities
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            fontWeight: 800, lineHeight: 1.12,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: -1.5,
            marginBottom: 14,
          }}>
            Hi, I'm{" "}
            <span style={{
              background: `linear-gradient(135deg, ${T.primary}, ${T.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Nejat Ebrahim
            </span>
          </h1>

          <h2 style={{
            fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
            fontWeight: 400, color: T.subtext,
            fontFamily: "'Inter', sans-serif",
            marginBottom: 20, minHeight: 32,
            letterSpacing: -0.2,
          }}>
            <TypingText />
          </h2>

          <p style={{
            color: T.accent, fontSize: 15, lineHeight: 1.75,
            maxWidth: 480, marginBottom: 36,
            fontFamily: "'Inter', sans-serif",
          }}>
            CS student passionate about building scalable backend systems
            and intuitive full-stack applications. I write clean code, solve
            hard problems, and ship products that matter.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
            <button onClick={() => onNav("Projects")} style={{
              background: T.primary, border: "none", borderRadius: 8,
              padding: "11px 26px", color: "#fff",
              fontWeight: 600, fontSize: 14,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer", letterSpacing: -0.2,
              boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
              transition: "opacity 0.18s, transform 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity="0.88"; e.currentTarget.style.transform="translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}
            >
              View Projects
            </button>

            <a href="#" style={{
              background: "none",
              border: `1px solid ${T.border}`,
              borderRadius: 8, padding: "11px 26px",
              color: T.subtext, fontWeight: 600, fontSize: 14,
              fontFamily: "'Inter', sans-serif",
              textDecoration: "none", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 7,
              transition: "border-color 0.18s, color 0.18s, transform 0.18s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = T.accent;
              e.currentTarget.style.color = T.text;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.color = T.subtext;
              e.currentTarget.style.transform = "translateY(0)";
            }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </a>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {[
              { label: "GitHub",   href: "https://github.com/Nejat-33",  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> },
              { label: "LinkedIn", href: "linkedin.com/in/nejat-ebrahim-14b5a1320",  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { label: "Email",    href: "mailto:nejatebrahim35@email.com", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
              { label: "Telegram", href: "https://t.me/embitterment",  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
            ].map(({ label, href, svg }) => (
              <a key={label} href={href} aria-label={label} title={label} style={{
                width: 36, height: 36, borderRadius: 8,
                border: `1px solid ${T.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: T.accent, textDecoration: "none",
                transition: "border-color 0.18s, color 0.18s, transform 0.18s",
                background: T.surface,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = T.primary;
                e.currentTarget.style.color = T.text;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.color = T.accent;
                e.currentTarget.style.transform = "translateY(0)";
              }}
              >
                {svg}
              </a>
            ))}
          </div>
        </div>

        <div style={{ flex: "0 0 auto" }}>
          <div style={{
            width: 280, height: 280,
            borderRadius: 24,
            background: `linear-gradient(145deg, ${T.surface}, ${T.surface2})`,
            border: `1px solid ${T.border}`,
            boxShadow: "0 24px 48px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.2)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            gap: 12,
          }}>
            <div style={{
              position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            }} />
            <div style={{ fontSize: 80, lineHeight: 1, userSelect: "none" }}>👩‍💻</div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: T.text, fontWeight: 700, fontFamily: "'Inter', sans-serif", fontSize: 16, letterSpacing: -0.4 }}>
                Nejat Ebrahim
              </p>
              <p style={{ color: T.subtext, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                Junior Full Stack Developer
              </p>
            </div>
           
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", padding: "0 20px" }}>
              {["Java","React","Django","FastAPI"].map(t => (
                <span key={t} style={{
                  background: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: 20, padding: "3px 10px",
                  color: "#A5B4FC", fontSize: 11,
                  fontFamily: "'Inter', sans-serif", fontWeight: 500,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="About" style={{ padding: "96px 6%", position: "relative" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel label="01" title="About Me" />
        <div style={{
          display: "flex", gap: 56, flexWrap: "wrap",
          alignItems: "flex-start", marginTop: 48,
        }}>
          <div style={{ flex: "1 1 380px" }}>
            <p style={{ color: T.text, fontSize: 16, lineHeight: 1.8, marginBottom: 18, fontFamily: "'Inter', sans-serif" }}>
              I'm <strong style={{ color: T.primary, fontWeight: 600 }}>Nejat Ebrahim</strong>, a
              Computer Science student with a strong focus on backend engineering and
              full-stack development. I take pride in writing maintainable, well-architected code
              that solves real problems.
            </p>
            <p style={{ color: T.subtext, fontSize: 15, lineHeight: 1.8, marginBottom: 18, fontFamily: "'Inter', sans-serif" }}>
              My stack spans Python (Django & FastAPI), and JavaScript/React.js. I care about
              system design, API quality, database performance, and the details that make software
              a pleasure to use.
            </p>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(2,1fr)",
              gap: 12, marginTop: 28,
            }}>
              {[
                { label: "Location",  value: "Ethiopia" },
                { label: "Focus",     value: "Backend & Full Stack" },
                { label: "Status",    value: "Open to Work ✓" },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10, padding: "14px 16px",
                }}>
                  <p style={{ color: T.accent, fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 500, marginBottom: 5, letterSpacing: 0.4 }}>
                    {label.toUpperCase()}
                  </p>
                  <p style={{ color: T.text, fontSize: 14, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 280px" }}>
            <p style={{ color: T.accent, fontSize: 11, letterSpacing: 1, fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: 18 }}>
              EDUCATION
            </p>
            <div style={{ borderLeft: `2px solid ${T.border}`, paddingLeft: 20, marginBottom: 40 }}>
              {[
                { degree: "B.Sc. Computer Science", school: "University of Gondar", year: "2021 – Present", active: true },
                { degree: "High School Diploma",     school: "Excellence Secondary School", year: "2018 – 2021", active: false },
              ].map(({ degree, school, year, active }) => (
                <div key={degree} style={{ marginBottom: 24, position: "relative" }}>
                  <div style={{
                    position: "absolute", left: -26, top: 5,
                    width: 10, height: 10, borderRadius: "50%",
                    background: active ? T.primary : T.border,
                    border: `2px solid ${active ? T.primary : T.border}`,
                    boxShadow: active ? `0 0 0 3px rgba(99,102,241,0.15)` : "none",
                  }} />
                  <p style={{ color: T.text, fontWeight: 600, fontSize: 15, fontFamily: "'Inter', sans-serif", marginBottom: 3 }}>
                    {degree}
                  </p>
                  <p style={{ color: T.subtext, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{school}</p>
                  <p style={{ color: active ? T.primary : T.accent, fontSize: 12, fontFamily: "'Inter', sans-serif", marginTop: 4, fontWeight: 500 }}>
                    {year}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
              {[
                { num: "5+",   label: "Projects" },
                { num: "7+",   label: "Technologies" },
                { num: "2+",   label: "Years Coding" },
                { num: "100%", label: "Dedication" },
              ].map(({ num, label }) => (
                <div key={label} style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10, padding: "16px 14px", textAlign: "center",
                }}>
                  <p style={{ color: T.primary, fontSize: 22, fontWeight: 800, fontFamily: "'Inter', sans-serif", letterSpacing: -0.5, marginBottom: 4 }}>
                    {num}
                  </p>
                  <p style={{ color: T.accent, fontSize: 12, fontFamily: "'Inter', sans-serif" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [tab, setTab] = useState("Backend");

  return (
    <section id="Skills" style={{
      padding: "96px 6%",
      background: T.surface,
      borderTop: `1px solid ${T.border}`,
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel label="02" title="Skills" />

        <div style={{
          display: "flex", gap: 6, marginTop: 36, marginBottom: 36,
          flexWrap: "wrap",
          background: T.bg, border: `1px solid ${T.border}`,
          borderRadius: 10, padding: 4,
          width: "fit-content",
        }}>
          {Object.keys(SKILLS).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? T.primary : "none",
              border: "none", borderRadius: 7,
              padding: "7px 18px",
              color: tab === t ? "#fff" : T.subtext,
              fontWeight: tab === t ? 600 : 400,
              fontSize: 13, fontFamily: "'Inter', sans-serif",
              cursor: "pointer", transition: "all 0.18s",
            }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {SKILLS[tab].map(s => <SkillCard key={s.name} skill={s} />)}
        </div>

        <div style={{ marginTop: 56 }}>
          <p style={{
            color: T.accent, fontSize: 11, letterSpacing: 1.5,
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
            textShadow: "none", textAlign: "center", marginBottom: 20,
          }}>
            TECHNOLOGIES
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {TECH_STACK.map(t => (
              <span key={t} style={{
                background: T.bg,
                border: `1px solid ${T.border}`,
                borderRadius: 6, padding: "5px 14px",
                color: T.subtext, fontSize: 13,
                fontFamily: "'Inter', sans-serif", fontWeight: 500,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill: { name, level, tag } }) {
  const [hov, setHov] = useState(false);
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? T.surface2 : T.bg,
        border: `1px solid ${hov ? T.accent : T.border}`,
        borderRadius: 12, padding: "18px 20px",
        transition: "all 0.2s",
        boxShadow: hov ? "0 4px 16px rgba(0,0,0,0.25)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <p style={{ color: T.text, fontWeight: 600, fontSize: 14, fontFamily: "'Inter', sans-serif", marginBottom: 3 }}>
            {name}
          </p>
          <span style={{
            background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 4, padding: "2px 7px",
            color: "#A5B4FC", fontSize: 10,
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
          }}>
            {tag}
          </span>
        </div>
        {/* <span style={{
          color: T.primary, fontSize: 13, fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
        }}>
          {level}%
        </span> */}
      </div>
      {/* <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: animated ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${T.primary}, ${T.secondary})`,
          borderRadius: 4,
          transition: "width 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
        }} />
      </div> */}
    </div>
  );
}


function ProjectCard({ project }) {
  const [hov, setHov] = useState(false);

  return (

    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.surface,
        border: `1px solid ${hov ? project.accent : T.border}`,
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.25s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? `0 12px 24px rgba(0,0,0,0.3)` : "none",
      }}
    >
      <a href={project.repoUrl} target="_blank" 
    rel="noopener noreferrer"
    >
      <div>
        <div style={{
          width: 42, height: 42, borderRadius: 10,
          background: `${project.accent}15`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, marginBottom: 16,
          border: `1px solid ${project.accent}30`
        }}>
          {project.icon}
        </div>
        <h3 style={{ color: T.text, fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 700, margin: "0 0 4px 0" }}>
          {project.title}
        </h3>
        <p style={{ color: project.accent, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, margin: "0 0 12px 0" }}>
          {project.subtitle}
        </p>
        <p style={{ color: T.accent, fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.6, margin: "0 0 20px 0" }}>
          {project.desc}
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map(t => (
          <span key={t} style={{
            background: T.bg,
            border: `1px solid ${T.border}`,
            borderRadius: 6, padding: "4px 8px",
            color: T.subtext, fontSize: 11,
            fontFamily: "'Inter', sans-serif",
          }}>
            {t}
          </span>
        ))}
      </div>
      </a>
    </div>
  );
}

function Projects() {
  return (
    <section id="Projects" style={{ padding: "96px 6%" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel label="03" title="Projects" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
          gap: 20, marginTop: 48,
        }}>
          {PROJECTS.map(p => <ProjectCard key={p.title} project={p} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    background: T.bg, border: `1px solid ${T.border}`,
    borderRadius: 8, padding: "11px 14px",
    color: T.text, fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    outline: "none", transition: "border-color 0.18s",
    marginBottom: 16
  };
  const CONTACTS = [
    { label: "Email",    val: "nejatebrahim35@email.com",          href: "mailto:nejatebrahim35@email.com",
      svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
    { label: "LinkedIn", val: "linkedin.com/in/nejat-ebrahim-14b5a1320",  href: "https://www.linkedin.com/in/nejat-ebrahim-14b5a1320",
      svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { label: "GitHub",   val: "github.com/Nejat-33",       href: "https://github.com/Nejat-33",
      svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> }
  ];

  return (
    <section id="Contact" style={{ padding: "96px 6%", background: T.surface }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionLabel label="04" title="Get In Touch" />
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", marginTop: 48 }}>
          <div style={{ flex: "1 1 340px" }}>
            <p style={{ color: T.text, fontSize: 16, lineHeight: 1.6, marginBottom: 24, fontFamily: "'Inter', sans-serif" }}>
              Let's build something beautiful together! Feel free to reach out via form or my socials.
            </p>
            {CONTACTS.map(c => (
              <a key={c.label} href={c.href} style={{
                display: "flex", alignItems: "center", gap: 12, color: T.subtext,
                textDecoration: "none", marginBottom: 16, fontFamily: "'Inter', sans-serif"
              }}>
                {c.svg} <span>{c.val}</span>
              </a>
            ))}
          </div>
          <div style={{ flex: "1 1 400px" }}>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} style={inputStyle} required />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={inputStyle} required />
              <textarea name="message" placeholder="Message" rows="5" value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: "none" }} required />
              <button type="submit" style={{
                background: T.primary, color: "#fff", border: "none", padding: "12px 24px",
                borderRadius: 8, fontWeight: 600, cursor: "pointer", width: "100%"
              }}>{sent ? "Message Sent! ✓" : "Send Message"}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("Home");

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ backgroundColor: T.bg, minHeight: "100vh", color: T.text, position: "relative" }}>
      <ScrollProgress />
      <Navbar active={activeSection} onNav={handleNavigation} />
      <Hero onNav={handleNavigation} />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}