import { useState } from "react";
import { useApp } from "../context/useApp";
import BudgetTab from "../components/BudgetTab";
import TransactionsTab from "../components/TransactionsTab";
import CreditCardsTab from "../components/CreditCardsTab";
import CreditsTab from "../components/CreditsTab";
import "./Tracker.css";

const TABS = [
  { id: "overview", label: "📊 Overview", title: "Dashboard" },
  { id: "budget", label: "📋 Budget", title: "Budget Planner" },
  { id: "transactions", label: "💳 Transactions", title: "Spending Tracker" },
  { id: "cards", label: "🪪 My Cards", title: "My Credit Cards" },
  { id: "credits", label: "🎁 Perks & Credits", title: "Card Perks & Credits Tracker" },
];

export default function Tracker() {
  const [activeTab, setActiveTab] = useState("overview");
  const {
    budget,
    transactions,
    creditCards,
    cardCredits,
    getSpendingByCategory,
    getTotalCashback,
    getCreditsExpiringSoon,
  } = useApp();

  const spending = getSpendingByCategory();
  const totalSpent = Object.values(spending).reduce((s, v) => s + v, 0);
  const totalBudgeted = budget.categories.reduce((s, c) => s + Number(c.budget), 0);
  const totalCashback = getTotalCashback();
  const expiringSoon = getCreditsExpiringSoon(30);
  const unusedCreditsValue = cardCredits
    .filter((c) => !c.used)
    .reduce((s, c) => s + Number(c.value || 0), 0);

  const renderTab = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab />;
      case "budget": return <BudgetTab />;
      case "transactions": return <TransactionsTab />;
      case "cards": return <CreditCardsTab />;
      case "credits": return <CreditsTab />;
      default: return null;
    }
  };

  function OverviewTab() {
    return (
      <div>
        {/* Stats row */}
        <div className="grid-4 mb-6">
          <div className="stat-card">
            <span className="stat-label">Total Spent (This Month)</span>
            <span className="stat-value">${totalSpent.toFixed(2)}</span>
            <span className="stat-sub">
              {totalBudgeted > 0
                ? `of $${totalBudgeted.toFixed(0)} budgeted`
                : "No budget set yet"}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Cash Back Earned</span>
            <span className="stat-value" style={{ color: "var(--success)" }}>
              ${totalCashback.toFixed(2)}
            </span>
            <span className="stat-sub">From {transactions.filter(t => t.cashback > 0).length} transactions</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Unused Perk Value</span>
            <span className="stat-value" style={{ color: "var(--warning)" }}>
              ${unusedCreditsValue.toFixed(0)}
            </span>
            <span className="stat-sub">{cardCredits.filter(c => !c.used).length} credits available</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Active Cards</span>
            <span className="stat-value">{creditCards.length}</span>
            <span className="stat-sub">{transactions.length} transactions logged</span>
          </div>
        </div>

        {/* Expiring credits alert */}
        {expiringSoon.length > 0 && (
          <div className="alert alert-warning mb-6">
            <span>⚠️</span>
            <div>
              <strong>Credits expiring soon!</strong>
              <p className="mt-1 text-sm">
                You have {expiringSoon.length} credit{expiringSoon.length > 1 ? "s" : ""} expiring within 30 days worth ${expiringSoon.reduce((s,c) => s + Number(c.value||0), 0).toFixed(0)}.{" "}
                <button
                  className="btn btn-sm btn-ghost"
                  style={{ display: "inline-flex", padding: "0.1rem 0.5rem", marginLeft: "0.3rem" }}
                  onClick={() => setActiveTab("credits")}
                >
                  View Credits →
                </button>
              </p>
            </div>
          </div>
        )}

        <div className="grid-2 gap-4">
          {/* Spending by category */}
          <div className="card">
            <h3 className="font-bold mb-4">Spending by Category</h3>
            {budget.categories.map((cat) => {
              const spent = spending[cat.id] || 0;
              const budgeted = Number(cat.budget) || 0;
              const pct = budgeted > 0 ? Math.min(100, (spent / budgeted) * 100) : 0;
              const over = budgeted > 0 && spent > budgeted;
              if (spent === 0 && budgeted === 0) return null;
              return (
                <div key={cat.id} className="category-row">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">
                      {cat.icon} {cat.name}
                    </span>
                    <span className={`text-sm ${over ? "text-danger font-bold" : "text-muted"}`}>
                      ${spent.toFixed(0)}{budgeted > 0 ? ` / $${budgeted}` : ""}
                    </span>
                  </div>
                  {budgeted > 0 && (
                    <div className="progress-bar-wrapper">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: over ? "var(--danger)" : undefined,
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            {totalSpent === 0 && (
              <p className="text-sm text-muted">No transactions logged yet.</p>
            )}
          </div>

          {/* Recent transactions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Recent Transactions</h3>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setActiveTab("transactions")}
              >
                View All
              </button>
            </div>
            {transactions.slice(0, 6).map((tx) => {
              const cat = budget.categories.find((c) => c.id === tx.category);
              return (
                <div key={tx.id} className="tx-row">
                  <span className="tx-icon">{cat?.icon || "💳"}</span>
                  <div className="tx-info">
                    <span className="text-sm font-semibold">{tx.description}</span>
                    <span className="text-xs text-muted">{tx.date} · {cat?.name || "Uncategorized"}</span>
                  </div>
                  <div className="tx-amounts">
                    <span className="text-sm font-bold">-${Number(tx.amount).toFixed(2)}</span>
                    {tx.cashback > 0 && (
                      <span className="text-xs text-success">+${Number(tx.cashback).toFixed(2)} cb</span>
                    )}
                  </div>
                </div>
              );
            })}
            {transactions.length === 0 && (
              <p className="text-sm text-muted">No transactions yet.</p>
            )}
          </div>
        </div>

        {/* Getting started checklist */}
        {(creditCards.length === 0 || totalBudgeted === 0 || transactions.length === 0) && (
          <div className="card mt-6">
            <h3 className="font-bold mb-3">🚀 Getting Started</h3>
            <div className="checklist">
              <div className={`checklist-item ${totalBudgeted > 0 ? "done" : ""}`}>
                <span>{totalBudgeted > 0 ? "✅" : "⬜"}</span>
                <div>
                  <strong>Set up your budget</strong>
                  <p className="text-xs text-muted">Go to the Budget tab and set monthly limits per category.</p>
                </div>
                {totalBudgeted === 0 && (
                  <button className="btn btn-sm btn-primary" onClick={() => setActiveTab("budget")}>Go →</button>
                )}
              </div>
              <div className={`checklist-item ${creditCards.length > 0 ? "done" : ""}`}>
                <span>{creditCards.length > 0 ? "✅" : "⬜"}</span>
                <div>
                  <strong>Add your credit cards</strong>
                  <p className="text-xs text-muted">Track each card's benefits and cashback rates.</p>
                </div>
                {creditCards.length === 0 && (
                  <button className="btn btn-sm btn-primary" onClick={() => setActiveTab("cards")}>Go →</button>
                )}
              </div>
              <div className={`checklist-item ${transactions.length > 0 ? "done" : ""}`}>
                <span>{transactions.length > 0 ? "✅" : "⬜"}</span>
                <div>
                  <strong>Log your first transaction</strong>
                  <p className="text-xs text-muted">Track every purchase to stay on budget.</p>
                </div>
                {transactions.length === 0 && (
                  <button className="btn btn-sm btn-primary" onClick={() => setActiveTab("transactions")}>Go →</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="hero">
        <h1>💰 Financial Tracker</h1>
        <p>Track your spending, maximize your credit card benefits, and stay on budget.</p>
      </div>

      {/* Tab bar */}
      <div className="tracker-tabs mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tracker-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderTab()}
    </div>
  );
}
