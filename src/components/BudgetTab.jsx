import { useState } from "react";
import { useApp } from "../context/useApp";

export default function BudgetTab() {
  const { budget, updateBudget, updateCategoryBudget, getSpendingByCategory } = useApp();
  const [income, setIncome] = useState(budget.income || "");
  const spending = getSpendingByCategory();

  function handleIncomeChange(e) {
    const val = e.target.value;
    setIncome(val);
    updateBudget({ ...budget, income: Number(val) });
  }

  const totalBudgeted = budget.categories.reduce((s, c) => s + Number(c.budget), 0);
  const remaining = Number(income) - totalBudgeted;

  return (
    <div>
      <h2 className="section-title">Budget Planner</h2>
      <p className="section-sub">Set monthly spending limits per category. We'll warn you when you're close to the limit.</p>

      {/* 50/30/20 tip */}
      <div className="alert alert-info mb-6">
        <span>💡</span>
        <div>
          <strong>The 50/30/20 Rule:</strong> Allocate 50% of income to needs (housing, groceries, utilities), 30% to wants (dining, entertainment, shopping), and 20% to savings & debt repayment.
        </div>
      </div>

      {/* Income input */}
      <div className="card mb-4">
        <div className="grid-2 gap-4 items-center">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Monthly Take-Home Income ($)</label>
            <input
              type="number"
              placeholder="e.g. 4000"
              value={income}
              onChange={handleIncomeChange}
              min="0"
            />
          </div>
          <div className="budget-summary-pills">
            <div className="budget-pill">
              <span className="budget-pill-label">Budgeted</span>
              <span className="budget-pill-value">${totalBudgeted.toLocaleString()}</span>
            </div>
            <div className="budget-pill">
              <span className="budget-pill-label">Remaining</span>
              <span className={`budget-pill-value ${remaining < 0 ? "text-danger" : "text-success"}`}>
                ${remaining.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category budgets */}
      <div className="card">
        <h3 className="font-bold mb-4">Monthly Category Limits</h3>
        <div className="budget-categories">
          {budget.categories.map((cat) => {
            const spent = spending[cat.id] || 0;
            const budgeted = Number(cat.budget) || 0;
            const pct = budgeted > 0 ? Math.min(100, (spent / budgeted) * 100) : 0;
            const over = budgeted > 0 && spent > budgeted;
            return (
              <div key={cat.id} className="budget-category-row">
                <div className="budget-cat-label">
                  <span className="budget-cat-icon">{cat.icon}</span>
                  <span className="text-sm font-semibold">{cat.name}</span>
                </div>
                <div className="budget-cat-input">
                  <span className="budget-dollar-sign">$</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={cat.budget || ""}
                    onChange={(e) => updateCategoryBudget(cat.id, e.target.value)}
                    min="0"
                  />
                </div>
                {budgeted > 0 && (
                  <div className="budget-cat-bar">
                    <div className="progress-bar-wrapper" style={{ flex: 1 }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: over
                            ? "var(--danger)"
                            : pct > 80
                            ? "var(--warning)"
                            : undefined,
                        }}
                      />
                    </div>
                    <span
                      className={`text-xs ${over ? "text-danger font-bold" : "text-muted"}`}
                      style={{ whiteSpace: "nowrap", minWidth: 70, textAlign: "right" }}
                    >
                      ${spent.toFixed(0)} / ${budgeted}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .budget-summary-pills { display: flex; gap: 1rem; flex-wrap: wrap; }
        .budget-pill { display: flex; flex-direction: column; gap: 0.1rem; }
        .budget-pill-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }
        .budget-pill-value { font-size: 1.3rem; font-weight: 800; }
        .budget-categories { display: flex; flex-direction: column; gap: 0.6rem; }
        .budget-category-row { display: flex; align-items: center; gap: 1rem; padding: 0.6rem 0; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
        .budget-category-row:last-child { border-bottom: none; }
        .budget-cat-label { display: flex; align-items: center; gap: 0.5rem; min-width: 140px; }
        .budget-cat-icon { font-size: 1.2rem; }
        .budget-cat-input { display: flex; align-items: center; border: 1.5px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; min-width: 110px; }
        .budget-dollar-sign { padding: 0.5rem 0.5rem; background: var(--bg); color: var(--text-muted); font-weight: 600; font-size: 0.9rem; }
        .budget-cat-input input { border: none; box-shadow: none; width: 70px; padding: 0.5rem 0.5rem; }
        .budget-cat-input input:focus { outline: none; }
        .budget-cat-bar { display: flex; align-items: center; gap: 0.75rem; flex: 1; min-width: 180px; }
      `}</style>
    </div>
  );
}
