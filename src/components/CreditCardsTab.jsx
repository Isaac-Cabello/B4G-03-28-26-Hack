import { useState } from "react";
import { useApp } from "../context/useApp";

const EMPTY_FORM = {
  name: "",
  issuer: "",
  annualFee: "",
  baseCashback: "1",
  cashbackRates: {
    dining: "",
    groceries: "",
    travel: "",
    gas: "",
    shopping: "",
    entertainment: "",
  },
  statementDate: "",
  dueDate: "",
  creditLimit: "",
  notes: "",
};

export default function CreditCardsTab() {
  const { creditCards, addCreditCard, deleteCreditCard, cardCredits } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleRateChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      cashbackRates: { ...prev.cashbackRates, [name]: value },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    addCreditCard({ ...form, annualFee: Number(form.annualFee) || 0 });
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">My Credit Cards</h2>
          <p className="section-sub" style={{ margin: 0 }}>Add your cards to track rewards and auto-calculate cash back on transactions.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "✕ Cancel" : "+ Add Card"}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <h3 className="font-bold mb-3">Add Credit Card</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2 gap-4">
              <div className="form-group">
                <label>Card Name *</label>
                <input name="name" placeholder="e.g. Chase Sapphire Preferred" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Issuer</label>
                <input name="issuer" placeholder="e.g. Chase, Amex, Citi" value={form.issuer} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Annual Fee ($)</label>
                <input name="annualFee" type="number" placeholder="0" value={form.annualFee} onChange={handleChange} min="0" />
              </div>
              <div className="form-group">
                <label>Base Cash Back Rate (%)</label>
                <input name="baseCashback" type="number" step="0.1" placeholder="1" value={form.baseCashback} onChange={handleChange} min="0" />
              </div>
              <div className="form-group">
                <label>Credit Limit ($)</label>
                <input name="creditLimit" type="number" placeholder="e.g. 5000" value={form.creditLimit} onChange={handleChange} min="0" />
              </div>
              <div className="form-group">
                <label>Statement Closing Date (day of month)</label>
                <input name="statementDate" type="number" placeholder="e.g. 15" value={form.statementDate} onChange={handleChange} min="1" max="31" />
              </div>
              <div className="form-group">
                <label>Payment Due Date (day of month)</label>
                <input name="dueDate" type="number" placeholder="e.g. 10" value={form.dueDate} onChange={handleChange} min="1" max="31" />
              </div>
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label>Notes</label>
                <input name="notes" placeholder="e.g. Primary travel card" value={form.notes} onChange={handleChange} />
              </div>
            </div>

            <h4 className="font-semibold mt-4 mb-2" style={{ fontSize: "0.9rem" }}>Bonus Category Rates (% cash back)</h4>
            <div className="grid-3 gap-3">
              {Object.keys(form.cashbackRates).map((cat) => (
                <div className="form-group" key={cat} style={{ marginBottom: 0 }}>
                  <label style={{ textTransform: "capitalize" }}>{cat}</label>
                  <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
                    <input
                      name={cat}
                      type="number"
                      step="0.1"
                      placeholder="—"
                      value={form.cashbackRates[cat]}
                      onChange={handleRateChange}
                      style={{ border: "none", boxShadow: "none", flex: 1, padding: "0.5rem" }}
                      min="0"
                    />
                    <span style={{ padding: "0.5rem", background: "var(--bg)", color: "var(--text-muted)", fontSize: "0.85rem" }}>%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">Save Card</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {creditCards.length === 0 ? (
        <div className="card text-center" style={{ padding: "3rem" }}>
          <p style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💳</p>
          <p className="font-bold mb-2">No cards added yet</p>
          <p className="text-muted text-sm mb-4">Add your credit cards to track rewards and auto-calculate cash back.</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add Your First Card</button>
        </div>
      ) : (
        <div className="grid-2">
          {creditCards.map((card) => {
            const credits = cardCredits.filter((c) => c.cardId === card.id);
            const unusedCredits = credits.filter((c) => !c.used);
            const unusedValue = unusedCredits.reduce((s, c) => s + Number(c.value || 0), 0);
            return (
              <div key={card.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold">{card.name}</h3>
                    <p className="text-sm text-muted">
                      {card.issuer && `${card.issuer} · `}
                      {card.annualFee === 0 ? "No Annual Fee" : `$${card.annualFee}/yr`}
                    </p>
                  </div>
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ color: "var(--danger)" }}
                    onClick={() => deleteCreditCard(card.id)}
                  >
                    🗑
                  </button>
                </div>

                <div className="grid-2 gap-2 mb-3">
                  <div style={{ background: "var(--bg)", borderRadius: 8, padding: "0.6rem 0.8rem" }}>
                    <p className="text-xs text-muted">Base Rate</p>
                    <p className="font-bold">{card.baseCashback || 1}%</p>
                  </div>
                  {card.creditLimit && (
                    <div style={{ background: "var(--bg)", borderRadius: 8, padding: "0.6rem 0.8rem" }}>
                      <p className="text-xs text-muted">Credit Limit</p>
                      <p className="font-bold">${Number(card.creditLimit).toLocaleString()}</p>
                    </div>
                  )}
                </div>

                {/* Bonus rates */}
                {card.cashbackRates && (
                  <div className="tag-list mb-3">
                    {Object.entries(card.cashbackRates)
                      .filter(([, v]) => v)
                      .map(([cat, rate]) => (
                        <span key={cat} className="tag">
                          {cat}: {rate}%
                        </span>
                      ))}
                  </div>
                )}

                {(card.statementDate || card.dueDate) && (
                  <p className="text-xs text-muted mb-2">
                    📅 Statement: day {card.statementDate} · Due: day {card.dueDate}
                  </p>
                )}

                {unusedCredits.length > 0 && (
                  <div className="alert alert-warning" style={{ margin: 0, padding: "0.5rem 0.75rem" }}>
                    <span>🎁</span>
                    <p className="text-xs">
                      {unusedCredits.length} unused perk{unusedCredits.length > 1 ? "s" : ""} worth ${unusedValue.toFixed(0)}
                    </p>
                  </div>
                )}

                {card.notes && (
                  <p className="text-xs text-muted mt-2 italic">{card.notes}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
