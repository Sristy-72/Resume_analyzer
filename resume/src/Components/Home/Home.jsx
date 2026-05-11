import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import styles from "./Home.module.css";
import heroimage from "./heroimage.png";
import { AuthContext } from "../../utils/AuthContext";


const Home = () => {
  const location = useLocation();
  const { isLogin } = useContext(AuthContext);
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAnalyzeClick = (event) => {
    if (!isLogin) {
      event.preventDefault();
      
      navigate("/login");
    }
  };

  const features = useMemo(
    () => [
      {
        title: "ATS Match Score",
        description:
          "Get a 0-100 score based on skills, keywords, projects, and experience relevance.",
      },
      {
        title: "Actionable Suggestions",
        description:
          "Clear fixes you can apply immediately to improve alignment with the job description.",
      },
      {
        title: "Missing Skills",
        description:
          "Identify the most important skills/keywords you should add or emphasize.",
      },
      {
        title: "Privacy Friendly",
        description:
          "Only your feedback is shown - your resume file is not stored anywhere.",
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        number: "01",
        title: "Upload Resume",
        description: "Upload your resume PDF (only .pdf is supported).",
      },
      {
        number: "02",
        title: "Paste Job Description",
        description: "Add the full job description for the role you want.",
      },
      {
        number: "03",
        title: "Get Insights",
        description: "Receive a match score, strengths, gaps, and suggestions.",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Does it store my resume?",
        a: "No. We only keep the score/feedback in your history when you're logged in.",
      },
      {
        q: "What file format is supported?",
        a: "Only PDF resumes (.pdf) are supported right now.",
      },
      {
        q: "Why do I need to paste the Job Description?",
        a: "The JD is used as the target to calculate keyword/skill alignment and relevance.",
      },
      {
        q: "Why is my score low even with experience?",
        a: "Often it's missing keywords/skills from the JD, or your bullets aren't specific/quantified.",
      },
    ],
    []
  );

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = location.hash.replace("#", "");
    const run = () => {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const t = setTimeout(run, 0);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <div className={styles.page}>
      <section className={styles.hero} id="top">
        <div className={styles.heroLeft}>
          <div className={styles.badge}>ResumeAI</div>

          <h1 className={styles.title}>Get Your Resume Score in Seconds</h1>

          <p className={styles.subtitle}>
            Upload your resume and job description to get an AI-powered score
            (0-100) and recruiter-style improvement suggestions.
          </p>

          <div className={styles.actions}>
            <Link
              className={styles.primaryBtn}
              to="/analyze"
              onClick={handleAnalyzeClick}
            >
              Analyze Resume
            </Link>
            <Link
              className={styles.secondaryBtn}
              to="/home#features"
              onClick={() => scrollToSection("features")}
            >
              View Features
            </Link>
          </div>

          <div className={styles.trustRow}>
            <div className={styles.trustItem}>PDF only</div>
            <div className={styles.dot} />
            <div className={styles.trustItem}>Fast feedback</div>
            <div className={styles.dot} />
            <div className={styles.trustItem}>ATS-friendly</div>
            <div className={styles.dot} />
            <div className={styles.trustItem}>Secured data</div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroCard}>
            <img src={heroimage} alt="Resume Analyzer Preview" />
          </div>
        </div>
      </section>

      <section className={styles.section} id="features">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <p className={styles.sectionSubtitle}>
            Everything you need to quickly improve your resume for a specific
            role.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.cardTitle}>{f.title}</div>
              <div className={styles.cardDesc}>{f.description}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt} id="how-it-works">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <p className={styles.sectionSubtitle}>
            Three steps - designed to be fast and simple.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((s) => (
            <div key={s.number} className={styles.stepCard}>
              <div className={styles.stepNumber}>{s.number}</div>
              <div className={styles.stepTitle}>{s.title}</div>
              <div className={styles.stepDesc}>{s.description}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} id="faqs">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>FAQs</h2>
          <p className={styles.sectionSubtitle}>
            Quick answers to the most common questions.
          </p>
        </div>

        <div className={styles.faqs}>
          {faqs.map((item, idx) => {
            const isOpen = idx === openFaq;
            return (
              <div key={item.q} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqQ}
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className={styles.faqIcon}>{isOpen ? "-" : "+"}</span>
                </button>

                {isOpen && <div className={styles.faqA}>{item.a}</div>}
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaText}>
            <div className={styles.ctaTitle}>Ready to improve your resume?</div>
            <div className={styles.ctaSubtitle}>
              Upload your PDF and paste the JD to get a score and suggestions.
            </div>
          </div>

          <Link
            className={styles.ctaBtn}
            to="/analyze"
            onClick={handleAnalyzeClick}
          >
            Start Analyzing
          </Link>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
