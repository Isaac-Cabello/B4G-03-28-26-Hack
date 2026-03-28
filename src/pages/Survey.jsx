import { useState } from "react";
import { useApp } from "../context/useApp";
import { getRecommendations } from "../data/cardRecommendations";
import "./Survey.css";

const STEPS = [
  {
    id: "spendingType",
    question: "What's your primary spending category?",
    description: "This helps us match you with the best bonus categories.",
    type: "single",
    options: [
      { value: "dining", label: "🍽️ Dining & Restaurants", desc: "Eating out, food delivery, cafes" },
      { value: "groceries", label: "🛒 Groceries", desc: "Supermarkets, warehouse clubs" },
      { value: "travel", label: "✈️ Travel", desc: "Flights, hotels, rental cars" },
      { value: "everyday", label: "💳 Everyday / Everything", desc: "No single dominant category" },
      { value: "amazon", label: "📦 Online Shopping", desc: "Amazon, e-commerce" },
      { value: "rent", label: "🏠 Rent", desc: "Monthly apartment or house rent" },
      { value: "gas", label: "⛽ Gas & Fuel", desc: "Gas stations, EV charging" },
    ],
  },
  {
    id: "primaryGoal",
    question: "What's your main goal with a credit card?",
    description: "Understanding your goal helps us prioritize the right benefits.",
    type: "single",
    options: [
      { value: "travel", label: "✈️ Earn Free Travel", desc: "Points, miles, lounge access" },
      { value: "cash_back", label: "💵 Earn Cash Back", desc: "Simple money back on purchases" },
      { value: "build_credit", label: "📈 Build My Credit Score", desc: "Establish or improve credit history" },
      { value: "perks", label: "🎁 Get Premium Perks", desc: "Travel protections, credits, status" },
    ],
  },
  {
    id: "annualFee",
    question: "How do you feel about annual fees?",
    description: "Annual fee cards can be worth it if the benefits outweigh the cost.",
    type: "single",
    options: [
      { value: "no_fee", label: "🚫 No Annual Fee", desc: "I want $0/year cost, period" },
      { value: "low_fee", label: "💰 Low Fee OK ($95–$99/yr)", desc: "Fine if the rewards clearly exceed the fee" },
      { value: "any", label: "💎 Open to Any", desc: "I'll pay more if the benefits are there ($250–$695/yr)" },
    ],
  },
  {
    id: "preferredAirlines",
    question: "Do you have preferred airlines?",
    description: "Select all that apply. This helps match transfer partner value.",
    type: "multi",
    options: [
      { value: "united", label: "🇺🇸 United" },
      { value: "american", label: "🇺🇸 American" },
      { value: "delta", label: "🇺🇸 Delta" },
      { value: "southwest", label: "🇺🇸 Southwest" },
      { value: "alaska", label: "🇺🇸 Alaska" },
      { value: "flying_blue", label: "🌍 Air France / KLM" },
      { value: "british_airways", label: "🇬🇧 British Airways" },
      { value: "singapore", label: "🌏 Singapore Airlines" },
      { value: "none", label: "🚫 No Preference" },
    ],
  },
  {
    id: "preferredHotels",
    question: "Do you have preferred hotel chains?",
    description: "Select all that apply.",
    type: "multi",
    options: [
      { value: "hyatt", label: "🏨 Hyatt" },
      { value: "marriott", label: "🏨 Marriott / Bonvoy" },
      { value: "hilton", label: "🏨 Hilton" },
      { value: "ihg", label: "🏨 IHG" },
      { value: "wyndham", label: "🏨 Wyndham" },
      { value: "none", label: "🚫 No Preference" },
    ],
  },
  {
    id: "complexity",
    question: "How much complexity can you handle?",
    description: "Be honest — a simple card you use well beats a complex card you misuse.",
    type: "single",
    options: [
      { value: "low", label: "😌 Keep It Simple", desc: "One card, straightforward rewards, no tracking" },
      { value: "medium", label: "🤔 Some Complexity OK", desc: "Willing to track a couple of cards and bonus categories" },
      { value: "high", label: "🤓 I Love Optimizing", desc: "Happy to manage multiple cards, transfer partners, and credit calendars" },
    ],
  },
];

export default function Survey() {
  const { surveyAnswers, setSurveyAnswers, setRecommendations } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(
    surveyAnswers || {
      spendingType: null,
      primaryGoal: null,
      annualFee: null,
      preferredAirlines: [],
      preferredHotels: [],
      complexity: null,
    }
  );
  const [showResults, setShowResults] = useState(!!surveyAnswers);
  const [results, setResults] = useState(() =>
    surveyAnswers ? getRecommendations(surveyAnswers) : []
  );

  const currentStep = STEPS[step];
  const isMulti = currentStep.type === "multi";
  const currentAnswer = answers[currentStep.id];

  function handleSingleSelect(value) {
    setAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
  }

  function handleMultiToggle(value) {
    setAnswers((prev) => {
      const current = prev[currentStep.id] || [];
      if (value === "none") {
        return { ...prev, [currentStep.id]: ["none"] };
      }
      const without = current.filter((v) => v !== "none");
      const exists = without.includes(value);
      return {
        ...prev,
        [currentStep.id]: exists
          ? without.filter((v) => v !== value)
          : [...without, value],
      };
    });
  }

  function canProceed() {
    if (isMulti) return (currentAnswer || []).length > 0;
    return !!currentAnswer;
  }

  function handleNext() {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      const recs = getRecommendations(answers);
      setSurveyAnswers(answers);
      setRecommendations(recs);
      setResults(recs);
      setShowResults(true);
    }
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function handleReset() {
    setAnswers({
      spendingType: null,
      primaryGoal: null,
      annualFee: null,
      preferredAirlines: [],
      preferredHotels: [],
      complexity: null,
    });
    setStep(0);
    setShowResults(false);
    setSurveyAnswers(null);
    setRecommendations([]);
    setResults([]);
  }

  if (showResults) {
    return (
      <div>
        <div className="hero">
          <h1>🎯 Your Personalized Card Picks</h1>
          <p>Based on your spending habits and goals, here are our top 3 recommendations.</p>
        </div>
        <div className="results-grid">
          {results.map((card, idx) => (
            <div key={card.id} className={`result-card ${idx === 0 ? "top-pick" : ""}`}>
              {idx === 0 && <div className="top-pick-badge">⭐ Best Match</div>}
              <div className="result-card-header">
                <div>
                  <h3>{card.name}</h3>
                  <p className="text-sm text-muted">{card.issuer} · {card.annualFee === 0 ? "No Annual Fee" : `$${card.annualFee}/yr`}</p>
                </div>
                <span className="badge badge-primary">{card.tag}</span>
              </div>

              <div className="result-section">
                <strong>Rewards:</strong>
                <p className="text-sm mt-1">{card.rewards}</p>
              </div>

              <div className="result-section">
                <strong>Sign-Up Bonus:</strong>
                <p className="text-sm mt-1 text-primary">{card.signUpBonus}</p>
              </div>

              {card.reasons && card.reasons.length > 0 && (
                <div className="result-section">
                  <strong>Why it fits you:</strong>
                  <ul className="reasons-list">
                    {card.reasons.map((r, i) => (
                      <li key={i} className="text-sm">{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="result-pros-cons">
                <div>
                  <strong className="text-success">✓ Pros</strong>
                  <ul className="pros-list">
                    {card.pros.slice(0, 3).map((p, i) => (
                      <li key={i} className="text-sm">{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-danger">✗ Cons</strong>
                  <ul className="cons-list">
                    {card.cons.slice(0, 2).map((c, i) => (
                      <li key={i} className="text-sm">{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="result-footer">
                <span className="text-xs text-muted">Credit needed: {card.creditRequired}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button className="btn btn-outline" onClick={handleReset}>
            🔄 Retake Survey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-wrapper">
      <div className="survey-header">
        <div>
          <h1 className="section-title">💳 Credit Card Finder</h1>
          <p className="section-sub">Answer {STEPS.length} quick questions to get your perfect match.</p>
        </div>
        <span className="badge badge-primary">{step + 1} / {STEPS.length}</span>
      </div>

      <div className="progress-bar-wrapper mb-6">
        <div className="progress-bar-fill" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>

      <div className="card survey-card">
        <h2 className="survey-question">{currentStep.question}</h2>
        <p className="text-sm text-muted mb-4">{currentStep.description}</p>

        <div className="survey-options">
          {currentStep.options.map((opt) => {
            const selected = isMulti
              ? (currentAnswer || []).includes(opt.value)
              : currentAnswer === opt.value;
            return (
              <button
                key={opt.value}
                className={`survey-option ${selected ? "selected" : ""}`}
                onClick={() =>
                  isMulti ? handleMultiToggle(opt.value) : handleSingleSelect(opt.value)
                }
              >
                <div className="survey-option-inner">
                  <span className="survey-option-label">{opt.label}</span>
                  {opt.desc && <span className="survey-option-desc">{opt.desc}</span>}
                </div>
                {isMulti && (
                  <div className={`checkbox ${selected ? "checked" : ""}`}>
                    {selected ? "✓" : ""}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="survey-nav">
          <button
            className="btn btn-ghost"
            onClick={handleBack}
            disabled={step === 0}
          >
            ← Back
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {step === STEPS.length - 1 ? "🎯 Get My Recommendations" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
