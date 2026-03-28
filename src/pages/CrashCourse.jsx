import { useState } from "react";
import { crashCourseLessons } from "../data/crashCourse";
import { useApp } from "../context/useApp";
import "./CrashCourse.css";

export default function CrashCourse() {
  const { courseProgress, markLessonComplete } = useApp();
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  const completedCount = courseProgress.completed.length;
  const total = crashCourseLessons.length;
  const pct = Math.round((completedCount / total) * 100);

  function openLesson(lesson) {
    setActiveLesson(lesson);
    setActiveSectionIdx(0);
  }

  function closeLesson() {
    setActiveLesson(null);
    setActiveSectionIdx(0);
  }

  function nextSection() {
    if (activeSectionIdx < activeLesson.sections.length - 1) {
      setActiveSectionIdx((i) => i + 1);
    } else {
      markLessonComplete(activeLesson.id);
      closeLesson();
    }
  }

  function prevSection() {
    if (activeSectionIdx > 0) setActiveSectionIdx((i) => i - 1);
  }

  if (activeLesson) {
    const section = activeLesson.sections[activeSectionIdx];
    const isLast = activeSectionIdx === activeLesson.sections.length - 1;
    return (
      <div className="lesson-overlay">
        <div className="lesson-modal">
          <div className="lesson-header">
            <div>
              <span className="lesson-icon">{activeLesson.icon}</span>
              <h2>{activeLesson.title}</h2>
              <p className="text-muted text-sm mt-1">
                Step {activeSectionIdx + 1} of {activeLesson.sections.length}
              </p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={closeLesson}>✕ Close</button>
          </div>

          <div className="lesson-progress-bar">
            <div
              className="lesson-progress-fill"
              style={{ width: `${((activeSectionIdx + 1) / activeLesson.sections.length) * 100}%` }}
            />
          </div>

          <div className="lesson-body">
            <h3 className="lesson-section-heading">{section.heading}</h3>
            <div className="lesson-section-body">
              {section.body.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <br key={i} />;
                // Render bold markdown
                const parts = trimmed.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={j}>{part.slice(2, -2)}</strong>;
                  }
                  return part;
                });
                return (
                  <p key={i} className={trimmed.startsWith("•") ? "bullet-point" : ""}>
                    {parts}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="lesson-footer">
            <button
              className="btn btn-ghost"
              onClick={prevSection}
              disabled={activeSectionIdx === 0}
            >
              ← Back
            </button>
            <button className="btn btn-primary" onClick={nextSection}>
              {isLast ? "✅ Complete Lesson" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="hero">
        <h1>📚 Financial Literacy Crash Course</h1>
        <p>
          Six essential lessons to master credit cards and build lasting financial
          health. Work through each lesson at your own pace.
        </p>
      </div>

      {/* Progress */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Your Progress</span>
          <span className="badge badge-primary">{completedCount} / {total} Lessons</span>
        </div>
        <div className="progress-bar-wrapper">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-muted mt-2">{pct}% complete</p>
      </div>

      {/* Lesson Grid */}
      <div className="lesson-grid">
        {crashCourseLessons.map((lesson) => {
          const done = courseProgress.completed.includes(lesson.id);
          return (
            <div key={lesson.id} className={`lesson-card ${done ? "done" : ""}`}>
              <div className="lesson-card-icon">{lesson.icon}</div>
              <div className="lesson-card-content">
                <h3>{lesson.title}</h3>
                <p className="text-sm text-muted mt-1">
                  {lesson.sections.length} sections
                </p>
                {done && (
                  <span className="badge badge-success mt-2">✓ Completed</span>
                )}
              </div>
              <button
                className={`btn btn-sm ${done ? "btn-ghost" : "btn-primary"}`}
                onClick={() => openLesson(lesson)}
              >
                {done ? "Review" : "Start →"}
              </button>
            </div>
          );
        })}
      </div>

      {completedCount === total && (
        <div className="alert alert-success mt-6">
          🎉 <strong>Congratulations!</strong> You've completed the full crash course. Head over to the Survey to get your personalized card recommendations!
        </div>
      )}
    </div>
  );
}
