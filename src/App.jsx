import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import CrashCourse from "./pages/CrashCourse";
import Survey from "./pages/Survey";
import Tracker from "./pages/Tracker";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "course", label: "Crash Course", icon: "📚" },
  { id: "survey", label: "Card Finder", icon: "🎯" },
  { id: "tracker", label: "Tracker", icon: "💰" },
];

function AppInner() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "course":  return <CrashCourse />;
      case "survey":  return <Survey />;
      case "tracker": return <Tracker />;
      default:        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="app-layout">
      <nav className="app-nav">
        <div className="nav-inner">
          <a className="nav-logo" href="#" onClick={() => setPage("home")}>
            💳 <span>FinanceLit</span>
          </a>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      <main className="page-content">{renderPage()}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
