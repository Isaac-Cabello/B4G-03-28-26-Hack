import { useState, useEffect } from "react";
import { AppContext, defaultBudget } from "./appContext";

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [courseProgress, setCourseProgress] = useState(() =>
    loadFromStorage("courseProgress", { completed: [], current: 0 })
  );
  const [surveyAnswers, setSurveyAnswers] = useState(() =>
    loadFromStorage("surveyAnswers", null)
  );
  const [recommendations, setRecommendations] = useState(() =>
    loadFromStorage("recommendations", [])
  );
  const [budget, setBudget] = useState(() =>
    loadFromStorage("budget", defaultBudget)
  );
  const [transactions, setTransactions] = useState(() =>
    loadFromStorage("transactions", [])
  );
  const [creditCards, setCreditCards] = useState(() =>
    loadFromStorage("creditCards", [])
  );
  const [cardCredits, setCardCredits] = useState(() =>
    loadFromStorage("cardCredits", [])
  );

  useEffect(() => {
    localStorage.setItem("courseProgress", JSON.stringify(courseProgress));
  }, [courseProgress]);

  useEffect(() => {
    localStorage.setItem("surveyAnswers", JSON.stringify(surveyAnswers));
  }, [surveyAnswers]);

  useEffect(() => {
    localStorage.setItem("recommendations", JSON.stringify(recommendations));
  }, [recommendations]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("creditCards", JSON.stringify(creditCards));
  }, [creditCards]);

  useEffect(() => {
    localStorage.setItem("cardCredits", JSON.stringify(cardCredits));
  }, [cardCredits]);

  function updateBudget(newBudget) {
    setBudget(newBudget);
  }

  function updateCategoryBudget(categoryId, amount) {
    setBudget((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === categoryId ? { ...c, budget: Number(amount) } : c
      ),
    }));
  }

  function addTransaction(tx) {
    const newTx = {
      ...tx,
      id: Date.now().toString(),
      date: tx.date || new Date().toISOString().split("T")[0],
    };
    setTransactions((prev) => [newTx, ...prev]);
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function addCreditCard(card) {
    setCreditCards((prev) => [
      ...prev,
      { ...card, id: Date.now().toString() },
    ]);
  }

  function deleteCreditCard(id) {
    setCreditCards((prev) => prev.filter((c) => c.id !== id));
    setCardCredits((prev) => prev.filter((c) => c.cardId !== id));
  }

  function addCardCredit(credit) {
    setCardCredits((prev) => [
      ...prev,
      { ...credit, id: Date.now().toString(), used: credit.used || false },
    ]);
  }

  function toggleCreditUsed(id) {
    setCardCredits((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              used: !c.used,
              usedDate: !c.used ? new Date().toISOString().split("T")[0] : null,
            }
          : c
      )
    );
  }

  function deleteCardCredit(id) {
    setCardCredits((prev) => prev.filter((c) => c.id !== id));
  }

  function getSpendingByCategory() {
    const spending = {};
    budget.categories.forEach((c) => {
      spending[c.id] = 0;
    });
    transactions.forEach((tx) => {
      if (tx.category && spending[tx.category] !== undefined) {
        spending[tx.category] += Number(tx.amount);
      }
    });
    return spending;
  }

  function getTotalCashback() {
    return transactions.reduce(
      (sum, tx) => sum + (Number(tx.cashback) || 0),
      0
    );
  }

  function getCreditsExpiringSoon(days = 30) {
    const now = new Date();
    const cutoff = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return cardCredits.filter((c) => {
      if (c.used) return false;
      if (!c.deadline) return false;
      const deadline = new Date(c.deadline);
      return deadline <= cutoff;
    });
  }

  function markLessonComplete(lessonId) {
    setCourseProgress((prev) => ({
      ...prev,
      completed: prev.completed.includes(lessonId)
        ? prev.completed
        : [...prev.completed, lessonId],
    }));
  }

  const value = {
    courseProgress,
    setCourseProgress,
    markLessonComplete,
    surveyAnswers,
    setSurveyAnswers,
    recommendations,
    setRecommendations,
    budget,
    updateBudget,
    updateCategoryBudget,
    transactions,
    addTransaction,
    deleteTransaction,
    creditCards,
    addCreditCard,
    deleteCreditCard,
    cardCredits,
    addCardCredit,
    toggleCreditUsed,
    deleteCardCredit,
    getSpendingByCategory,
    getTotalCashback,
    getCreditsExpiringSoon,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
