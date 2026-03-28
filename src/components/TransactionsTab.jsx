import { useState } from "react";
import { useApp } from "../context/useApp";

const EMPTY_FORM = {
  description: "",
  amount: "",
  category: "dining",
  date: new Date().toISOString().split("T")[0],
  card: "",
  cashback: "",
  notes: "",
};

export default function TransactionsTab() {
  const { budget, transactions, addTransaction, deleteTransaction, creditCards } = useApp();
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleCardChange(e) {
    const cardId = e.target.value;
    setForm((prev) => ({ ...prev, card: cardId }));
    // Auto-calculate cashback if card has a rate for the category
    if (cardId && form.amount && form.category) {
      const card = creditCards.find((c) => c.id === cardId);
      if (card) {
        const rate = getCashbackRate(card, form.category);
        const cb = ((Number(form.amount) * rate) / 100).toFixed(2);
        setForm((prev) => ({ ...prev, card: cardId, cashback: cb }));
      }
    }
  }

  function getCashbackRate(card, category) {
    if (!card || !card.cashbackRates) return card?.baseCashback || 1;
    return card.cashbackRates[category] || card.baseCashback || 1;
  }

  function handleAmountChange(e) {
    const amt = e.target.value;
    setForm((prev) => {
      const newForm = { ...prev, amount: amt };
      if (prev.card && amt) {
        const card = creditCards.find((c) => c.id === prev.card);
        if (card) {
          const rate = getCashbackRate(card, prev.category);
          newForm.cashback = ((Number(amt) * rate) / 100).toFixed(2);
        }
      }
      return newForm;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.description.trim() || !form.amount) return;
    addTransaction({ ...form, amount: Number(form.amount), cashback: Number(form.cashback) || 0 });
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  // Filter and sort
  let filtered = [...transactions];
  if (filterCategory !== "all") {
    filtered = filtered.filter((t) => t.category === filterCategory);
  }
  filtered.sort((a, b) => {
    if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    if (sortBy === "amount") return Number(b.amount) - Number(a.amount);
    return 0;
  });

  const totalFiltered = filtered.reduce((s, t) => s + Number(t.amount), 0);
  const totalCashback = filtered.reduce((s, t) => s + Number(t.cashback || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">Spending Tracker</h2>
          <p className="section-sub" style={{ margin: 0 }}>Log every purchase and track your cash back automatically.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "✕ Cancel" : "+ Add Transaction"}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <h3 className="font-bold mb-3">New Transaction</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2 gap-4">
              <div className="form-group">
                <label>Description *</label>
                <input name="description" placeholder="e.g. Chipotle" value={form.description} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Amount ($) *</label>
                <input name="amount" type="number" step="0.01" placeholder="0.00" value={form.amount} onChange={handleAmountChange} required min="0.01" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {budget.categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input name="date" type="date" value={form.date} onChange={handleChange} />
              </div>
              {creditCards.length > 0 && (
                <div className="form-group">
                  <label>Card Used</label>
                  <select name="card" value={form.card} onChange={handleCardChange}>
                    <option value="">— Select card —</option>
                    {creditCards.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="form-group">
                <label>Cash Back Earned ($)</label>
                <input name="cashback" type="number" step="0.01" placeholder="0.00" value={form.cashback} onChange={handleChange} min="0" />
              </div>
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label>Notes (optional)</label>
                <input name="notes" placeholder="Any notes..." value={form.notes} onChange={handleChange} />
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button type="submit" className="btn btn-primary">Save Transaction</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Summary bar */}
      {transactions.length > 0 && (
        <div className="card mb-4" style={{ padding: "1rem 1.5rem" }}>
          <div className="flex gap-6 flex-wrap">
            <div>
              <span className="text-xs text-muted font-semibold uppercase">Total Shown</span>
              <p className="font-bold">${totalFiltered.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-xs text-muted font-semibold uppercase">Cash Back</span>
              <p className="font-bold text-success">+${totalCashback.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-xs text-muted font-semibold uppercase">Transactions</span>
              <p className="font-bold">{filtered.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{ padding: "0.4rem 0.7rem", borderRadius: 8, border: "1.5px solid var(--border)", fontSize: "0.85rem" }}
        >
          <option value="all">All Categories</option>
          {budget.categories.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "0.4rem 0.7rem", borderRadius: 8, border: "1.5px solid var(--border)", fontSize: "0.85rem" }}
        >
          <option value="date">Sort: Date</option>
          <option value="amount">Sort: Amount</option>
        </select>
      </div>

      {/* Transaction list */}
      {filtered.length === 0 ? (
        <div className="card text-center" style={{ padding: "3rem" }}>
          <p className="text-muted">No transactions yet. Click "+ Add Transaction" to get started.</p>
        </div>
      ) : (
        <div className="card">
          {filtered.map((tx) => {
            const cat = budget.categories.find((c) => c.id === tx.category);
            const card = creditCards.find((c) => c.id === tx.card);
            return (
              <div key={tx.id} className="tx-row">
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{cat?.icon || "💳"}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="font-semibold text-sm">{tx.description}</p>
                  <p className="text-xs text-muted">
                    {tx.date} · {cat?.name || "Uncategorized"}
                    {card ? ` · ${card.name}` : ""}
                    {tx.notes ? ` · ${tx.notes}` : ""}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                  <span className="font-bold text-sm">-${Number(tx.amount).toFixed(2)}</span>
                  {tx.cashback > 0 && (
                    <span className="text-xs text-success">+${Number(tx.cashback).toFixed(2)} cb</span>
                  )}
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ marginLeft: "0.5rem", color: "var(--danger)", borderColor: "transparent" }}
                  onClick={() => deleteTransaction(tx.id)}
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
