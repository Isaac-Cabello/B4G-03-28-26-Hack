import { useState } from "react";
import { useApp } from "../context/useApp";

const PERIODS = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "semi-annual", label: "Semi-Annual" },
  { value: "annual", label: "Annual" },
  { value: "one-time", label: "One-Time" },
];

const EMPTY_FORM = {
  cardId: "",
  name: "",
  value: "",
  period: "annual",
  deadline: "",
  description: "",
  category: "statement_credit",
};

const CREDIT_CATEGORIES = [
  { value: "statement_credit", label: "💳 Statement Credit" },
  { value: "travel_credit", label: "✈️ Travel Credit" },
  { value: "dining_credit", label: "🍽️ Dining Credit" },
  { value: "hotel_credit", label: "🏨 Hotel Credit" },
  { value: "subscription", label: "📱 Subscription Credit" },
  { value: "lounge", label: "🛋️ Lounge Access" },
  { value: "global_entry", label: "🛂 Global Entry / TSA Pre✓" },
  { value: "rideshare", label: "🚗 Rideshare Credit" },
  { value: "other", label: "🎁 Other" },
];

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function CreditsTab() {
  const { creditCards, cardCredits, addCardCredit, toggleCreditUsed, deleteCardCredit, getCreditsExpiringSoon } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filterCard, setFilterCard] = useState("all");
  const [filterStatus, setFilterStatus] = useState("unused");

  const expiringSoon = getCreditsExpiringSoon(30);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.value) return;
    addCardCredit({ ...form, value: Number(form.value) });
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  // Filter
  let filtered = cardCredits;
  if (filterCard !== "all") filtered = filtered.filter((c) => c.cardId === filterCard);
  if (filterStatus === "unused") filtered = filtered.filter((c) => !c.used);
  if (filterStatus === "used") filtered = filtered.filter((c) => c.used);

  const totalUnusedValue = cardCredits.filter((c) => !c.used).reduce((s, c) => s + Number(c.value || 0), 0);
  const totalUsedValue = cardCredits.filter((c) => c.used).reduce((s, c) => s + Number(c.value || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">Perks & Credits Tracker</h2>
          <p className="section-sub" style={{ margin: 0 }}>Track every credit card benefit and get reminded before they expire.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "✕ Cancel" : "+ Add Perk"}
        </button>
      </div>

      {/* Summary */}
      <div className="grid-3 mb-6">
        <div className="stat-card">
          <span className="stat-label">Available Credits</span>
          <span className="stat-value">${totalUnusedValue.toFixed(0)}</span>
          <span className="stat-sub">{cardCredits.filter((c) => !c.used).length} unused perks</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Credits Used</span>
          <span className="stat-value text-success">${totalUsedValue.toFixed(0)}</span>
          <span className="stat-sub">{cardCredits.filter((c) => c.used).length} used this cycle</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Expiring Soon</span>
          <span className="stat-value" style={{ color: expiringSoon.length > 0 ? "var(--warning)" : "var(--text)" }}>
            {expiringSoon.length}
          </span>
          <span className="stat-sub">within 30 days</span>
        </div>
      </div>

      {/* Expiring alerts */}
      {expiringSoon.length > 0 && (
        <div className="alert alert-warning mb-4">
          <span>⏰</span>
          <div>
            <strong>Expiring Soon!</strong>
            <ul className="mt-1">
              {expiringSoon.map((c) => {
                const card = creditCards.find((cc) => cc.id === c.cardId);
                const days = daysUntil(c.deadline);
                return (
                  <li key={c.id} className="text-sm">
                    <strong>{c.name}</strong>
                    {card ? ` (${card.name})` : ""} — ${c.value} — expires in {days} day{days !== 1 ? "s" : ""}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="card mb-4">
          <h3 className="font-bold mb-3">Add Perk / Credit</h3>
          {creditCards.length === 0 && (
            <div className="alert alert-info mb-3">
              💡 Add your credit cards first in the "My Cards" tab to link credits to them.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid-2 gap-4">
              {creditCards.length > 0 && (
                <div className="form-group">
                  <label>Card</label>
                  <select name="cardId" value={form.cardId} onChange={handleChange}>
                    <option value="">— No card selected —</option>
                    {creditCards.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="form-group">
                <label>Perk Name *</label>
                <input name="name" placeholder="e.g. $50 Hotel Credit" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Credit Value ($) *</label>
                <input name="value" type="number" step="0.01" placeholder="50" value={form.value} onChange={handleChange} required min="0.01" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {CREDIT_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Reset Period</label>
                <select name="period" value={form.period} onChange={handleChange}>
                  {PERIODS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Deadline / Use By Date</label>
                <input name="deadline" type="date" value={form.deadline} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label>Description / How to Use</label>
                <input name="description" placeholder="e.g. Book through Chase Travel to apply $50 credit" value={form.description} onChange={handleChange} />
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button type="submit" className="btn btn-primary">Save Perk</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <select
          value={filterCard}
          onChange={(e) => setFilterCard(e.target.value)}
          style={{ padding: "0.4rem 0.7rem", borderRadius: 8, border: "1.5px solid var(--border)", fontSize: "0.85rem" }}
        >
          <option value="all">All Cards</option>
          {creditCards.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <div className="flex gap-1" style={{ background: "var(--bg)", border: "1.5px solid var(--border)", borderRadius: 8, padding: "0.2rem" }}>
          {["all", "unused", "used"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: "0.25rem 0.7rem",
                borderRadius: 6,
                border: "none",
                background: filterStatus === s ? "var(--primary)" : "transparent",
                color: filterStatus === s ? "white" : "var(--text-muted)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Credits list */}
      {filtered.length === 0 ? (
        <div className="card text-center" style={{ padding: "3rem" }}>
          <p style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎁</p>
          <p className="font-bold mb-2">
            {cardCredits.length === 0 ? "No perks tracked yet" : "No perks match this filter"}
          </p>
          <p className="text-muted text-sm mb-4">
            {cardCredits.length === 0
              ? "Add your credit card perks and benefits to never leave money on the table."
              : "Try changing the filter above."}
          </p>
          {cardCredits.length === 0 && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add Your First Perk</button>
          )}
        </div>
      ) : (
        <div className="credits-list">
          {filtered.map((credit) => {
            const card = creditCards.find((c) => c.id === credit.cardId);
            const days = daysUntil(credit.deadline);
            const catInfo = CREDIT_CATEGORIES.find((c) => c.value === credit.category);
            const isUrgent = days !== null && days <= 7 && !credit.used;
            const isExpiringSoon = days !== null && days <= 30 && !credit.used;
            return (
              <div
                key={credit.id}
                className={`credit-card-item ${credit.used ? "used" : ""} ${isUrgent ? "urgent" : isExpiringSoon ? "expiring" : ""}`}
              >
                <div className="credit-icon">{catInfo?.label.split(" ")[0] || "🎁"}</div>
                <div className="credit-info">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold">{credit.name}</span>
                    {card && <span className="badge badge-primary" style={{ fontSize: "0.7rem" }}>{card.name}</span>}
                    {credit.used && <span className="badge badge-success" style={{ fontSize: "0.7rem" }}>✓ Used</span>}
                    {isUrgent && !credit.used && (
                      <span className="badge badge-danger" style={{ fontSize: "0.7rem" }}>⚡ {days}d left!</span>
                    )}
                    {isExpiringSoon && !isUrgent && !credit.used && (
                      <span className="badge badge-warning" style={{ fontSize: "0.7rem" }}>⏰ {days}d left</span>
                    )}
                  </div>
                  <div className="flex gap-3 mt-1 flex-wrap">
                    <span className="text-xs text-muted">{catInfo?.label || credit.category}</span>
                    {credit.period && <span className="text-xs text-muted">· {credit.period}</span>}
                    {credit.deadline && (
                      <span className="text-xs text-muted">
                        · By {credit.deadline}
                        {credit.used && credit.usedDate ? ` · Used ${credit.usedDate}` : ""}
                      </span>
                    )}
                  </div>
                  {credit.description && (
                    <p className="text-xs text-muted mt-1 italic">{credit.description}</p>
                  )}
                </div>
                <div className="credit-value">
                  <span className={`font-bold ${credit.used ? "text-muted" : "text-success"}`}>
                    ${Number(credit.value).toFixed(0)}
                  </span>
                </div>
                <div className="credit-actions">
                  <button
                    className={`btn btn-sm ${credit.used ? "btn-ghost" : "btn-success"}`}
                    onClick={() => toggleCreditUsed(credit.id)}
                    title={credit.used ? "Mark unused" : "Mark as used"}
                  >
                    {credit.used ? "↩ Undo" : "✓ Used"}
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ color: "var(--danger)" }}
                    onClick={() => deleteCardCredit(credit.id)}
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .credits-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .credit-card-item {
          background: var(--card-bg);
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          padding: 1rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          box-shadow: var(--shadow);
        }
        .credit-card-item.used {
          background: var(--bg);
          opacity: 0.7;
        }
        .credit-card-item.expiring {
          border-color: var(--warning);
          background: var(--warning-light);
        }
        .credit-card-item.urgent {
          border-color: var(--danger);
          background: var(--danger-light);
        }
        .credit-icon { font-size: 1.6rem; flex-shrink: 0; }
        .credit-info { flex: 1; min-width: 200px; }
        .credit-value { font-size: 1.2rem; flex-shrink: 0; min-width: 50px; text-align: right; }
        .credit-actions { display: flex; gap: 0.4rem; flex-shrink: 0; }
      `}</style>
    </div>
  );
}
