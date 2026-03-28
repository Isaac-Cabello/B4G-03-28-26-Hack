import { useApp } from "../context/useApp";

export default function HomePage({ setPage }) {
  const { courseProgress, surveyAnswers, transactions } = useApp();
  const lessonsCompleted = courseProgress.completed.length;

  return (
    <div>
      <div className="hero" style={{ marginBottom: "2rem" }}>
        <h1>💳 FinanceLit</h1>
        <p>
          Your all-in-one app for financial literacy education, credit card
          discovery, and spending tracking. Built for the real world.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
          <button
            className="btn"
            style={{ background: "white", color: "var(--primary)", fontWeight: 700 }}
            onClick={() => setPage("course")}
          >
            📚 Start Learning
          </button>
          <button
            className="btn"
            style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "2px solid rgba(255,255,255,0.4)" }}
            onClick={() => setPage("tracker")}
          >
            💰 Open Tracker
          </button>
        </div>
      </div>

      {/* Three pillars */}
      <div className="grid-3 mb-8">
        <div
          className="card"
          style={{ cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", borderTop: "4px solid var(--primary)" }}
          onClick={() => setPage("course")}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📚</div>
          <h3 className="font-bold mb-1">Crash Course</h3>
          <p className="text-sm text-muted mb-3">
            Learn how credit works, how to build a strong score, and how to use
            credit cards to your advantage — in 6 bite-sized lessons.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div className="progress-bar-wrapper" style={{ flex: 1 }}>
              <div
                className="progress-bar-fill"
                style={{ width: `${(lessonsCompleted / 6) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted">{lessonsCompleted}/6</span>
          </div>
          <span className="btn btn-outline btn-sm" style={{ width: "100%", justifyContent: "center" }}>
            {lessonsCompleted === 0 ? "Start Course →" : lessonsCompleted === 6 ? "Review →" : "Continue →"}
          </span>
        </div>

        <div
          className="card"
          style={{ cursor: "pointer", transition: "transform 0.2s", borderTop: "4px solid var(--secondary)" }}
          onClick={() => setPage("survey")}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎯</div>
          <h3 className="font-bold mb-1">Card Finder</h3>
          <p className="text-sm text-muted mb-3">
            Answer 6 questions about your spending habits and goals. We'll
            match you with the best credit cards from our database.
          </p>
          {surveyAnswers ? (
            <span className="badge badge-success mb-3">✓ Survey Completed</span>
          ) : (
            <span className="badge badge-warning mb-3">Not started</span>
          )}
          <br />
          <span className="btn btn-outline btn-sm" style={{ width: "100%", justifyContent: "center", marginTop: "0.75rem" }}>
            {surveyAnswers ? "View Results →" : "Take Survey →"}
          </span>
        </div>

        <div
          className="card"
          style={{ cursor: "pointer", transition: "transform 0.2s", borderTop: "4px solid var(--success)" }}
          onClick={() => setPage("tracker")}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>💰</div>
          <h3 className="font-bold mb-1">Financial Tracker</h3>
          <p className="text-sm text-muted mb-3">
            Budget by category, log transactions, track cash back rewards, and
            never let a credit card perk go unused.
          </p>
          {transactions.length > 0 ? (
            <span className="badge badge-success mb-3">✓ {transactions.length} transactions</span>
          ) : (
            <span className="badge badge-info mb-3">Ready to use</span>
          )}
          <br />
          <span className="btn btn-outline btn-sm" style={{ width: "100%", justifyContent: "center", marginTop: "0.75rem" }}>
            Open Tracker →
          </span>
        </div>
      </div>

      {/* Why this app */}
      <div className="card">
        <h2 className="font-bold mb-4" style={{ fontSize: "1.2rem" }}>Why FinanceLit?</h2>
        <div className="grid-2 gap-4">
          {[
            { icon: "🎓", title: "Education First", desc: "Most people never learned personal finance in school. We fix that with practical, no-nonsense lessons." },
            { icon: "💳", title: "Personalized Card Picks", desc: "Not every card is right for everyone. Our survey matches your actual spending to the cards with the best returns." },
            { icon: "📊", title: "Track Every Dollar", desc: "Know exactly where your money goes with per-category budgets and transaction logging." },
            { icon: "🎁", title: "Maximize Every Perk", desc: "Premium cards offer hundreds in annual credits. Our tracker ensures you never leave that money on the table." },
          ].map((item) => (
            <div key={item.title} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <strong>{item.title}</strong>
                <p className="text-sm text-muted mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
