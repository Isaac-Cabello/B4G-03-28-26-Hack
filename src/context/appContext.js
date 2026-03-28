import { createContext } from "react";

export const AppContext = createContext();

export const defaultBudget = {
  income: 0,
  categories: [
    { id: "housing", name: "Housing", budget: 0, icon: "🏠" },
    { id: "groceries", name: "Groceries", budget: 0, icon: "🛒" },
    { id: "dining", name: "Dining Out", budget: 0, icon: "🍽️" },
    { id: "transportation", name: "Transportation", budget: 0, icon: "🚗" },
    { id: "utilities", name: "Utilities", budget: 0, icon: "💡" },
    { id: "entertainment", name: "Entertainment", budget: 0, icon: "🎬" },
    { id: "shopping", name: "Shopping", budget: 0, icon: "🛍️" },
    { id: "health", name: "Health", budget: 0, icon: "🏥" },
    { id: "travel", name: "Travel", budget: 0, icon: "✈️" },
    { id: "other", name: "Other", budget: 0, icon: "📦" },
  ],
};
