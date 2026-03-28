export const cardDatabase = [
  // No Annual Fee Cards
  {
    id: "chase-freedom-unlimited",
    name: "Chase Freedom Unlimited®",
    issuer: "Chase",
    annualFee: 0,
    rewards: "1.5% cash back on all purchases, 3% on dining & drugstores, 5% on travel via Chase",
    bestFor: ["everyday", "dining", "cash_back"],
    complexity: "low",
    transferPartners: [],
    partnerAirlines: ["united"],
    partnerHotels: ["hyatt", "ihg", "marriott"],
    signUpBonus: "$200 after $500 in first 3 months",
    pros: ["No annual fee", "Simple flat-rate rewards", "Part of Chase ecosystem", "No expiration on rewards"],
    cons: ["Lower base rate than some competitors", "Best value when combined with Sapphire"],
    creditRequired: "Good (670+)",
    tag: "Best No-Fee Everyday",
  },
  {
    id: "citi-double-cash",
    name: "Citi Double Cash® Card",
    issuer: "Citi",
    annualFee: 0,
    rewards: "2% cash back on all purchases (1% when you buy, 1% when you pay)",
    bestFor: ["everyday", "cash_back", "simplicity"],
    complexity: "low",
    transferPartners: ["flying_blue", "turkish", "singapore"],
    partnerAirlines: [],
    partnerHotels: [],
    signUpBonus: "$200 after $1,500 in first 6 months",
    pros: ["Highest flat-rate cash back with no fee", "ThankYou points transferable with Strata Premier", "Simple rewards structure"],
    cons: ["No bonus categories", "3% foreign transaction fee"],
    creditRequired: "Good (670+)",
    tag: "Best Flat-Rate No-Fee",
  },
  {
    id: "discover-it-cash-back",
    name: "Discover it® Cash Back",
    issuer: "Discover",
    annualFee: 0,
    rewards: "5% on rotating quarterly categories (up to $1,500/quarter), 1% on all else. First-year Cashback Match.",
    bestFor: ["cash_back", "groceries", "gas", "dining"],
    complexity: "medium",
    transferPartners: [],
    partnerAirlines: [],
    partnerHotels: [],
    signUpBonus: "Cashback Match™ — Discover matches all cash back earned in year 1",
    pros: ["Effectively 10% on categories in year 1", "No annual fee", "Great for credit builders"],
    cons: ["Requires activation each quarter", "Categories rotate and may not match your spending", "Limited acceptance outside US"],
    creditRequired: "Fair (580+)",
    tag: "Best for First-Year Value",
  },
  // Mid-Tier Cards
  {
    id: "chase-sapphire-preferred",
    name: "Chase Sapphire Preferred®",
    issuer: "Chase",
    annualFee: 95,
    rewards: "3x dining, 3x streaming, 3x online groceries, 2x other travel, 1x everything else",
    bestFor: ["travel", "dining", "points"],
    complexity: "medium",
    transferPartners: ["united", "southwest", "british_airways", "singapore", "air_france", "hyatt", "marriott", "ihg"],
    partnerAirlines: ["united", "southwest", "british_airways", "singapore", "air_france", "aer_lingus"],
    partnerHotels: ["hyatt", "marriott", "ihg"],
    signUpBonus: "60,000 points after $4,000 in first 3 months (~$750 in travel)",
    pros: ["Excellent transfer partners", "25% more value through Chase Travel", "$50 hotel credit", "Strong travel protections", "10% anniversary point bonus"],
    cons: ["$95 annual fee", "Points not as valuable as Amex MR for some redemptions"],
    creditRequired: "Good-Excellent (690+)",
    tag: "Best All-Around Travel Card",
  },
  {
    id: "amex-gold",
    name: "American Express® Gold Card",
    issuer: "American Express",
    annualFee: 250,
    rewards: "4x at restaurants (worldwide), 4x at U.S. supermarkets (up to $25k/yr), 3x on flights, 1x everything else",
    bestFor: ["dining", "groceries", "travel", "foodies"],
    complexity: "high",
    transferPartners: ["delta", "british_airways", "singapore", "air_france", "emirates", "jetblue", "hilton", "marriott"],
    partnerAirlines: ["delta", "british_airways", "singapore", "air_france", "emirates", "jetblue"],
    partnerHotels: ["hilton", "marriott"],
    signUpBonus: "60,000–90,000 points after $6,000 in first 6 months",
    pros: ["Best card for dining & groceries", "Amex MR points highly valuable", "Up to $120 dining credits/yr", "Up to $120 Uber Cash/yr", "Rose gold aesthetic"],
    cons: ["$250 annual fee", "Must use credits to justify fee", "No lounge access", "Foreign transaction fee on some purchases"],
    creditRequired: "Good-Excellent (690+)",
    tag: "Best for Foodies & Grocery Shoppers",
  },
  {
    id: "capital-one-venture",
    name: "Capital One Venture Rewards",
    issuer: "Capital One",
    annualFee: 95,
    rewards: "2x miles on all purchases, 5x on hotels and rental cars via Capital One Travel",
    bestFor: ["travel", "everyday", "simplicity"],
    complexity: "low",
    transferPartners: ["flying_blue", "turkish", "singapore", "avianca", "british_airways"],
    partnerAirlines: ["turkish", "flying_blue", "singapore", "avianca", "british_airways"],
    partnerHotels: ["wyndham", "choice"],
    signUpBonus: "75,000 miles after $4,000 in first 3 months (~$750 in travel)",
    pros: ["Simple 2x on everything", "TSA PreCheck/Global Entry credit ($100)", "Good transfer partners", "Flexible redemption"],
    cons: ["Fewer luxury transfer partners than Chase/Amex", "Transfer ratios vary (some 1:1, some 2:1.5)"],
    creditRequired: "Good (670+)",
    tag: "Best Simple Travel Card",
  },
  {
    id: "citi-strata-premier",
    name: "Citi Strata Premier℠ Card",
    issuer: "Citi",
    annualFee: 95,
    rewards: "3x on hotels, air travel, restaurants, supermarkets, gas stations, and EVs",
    bestFor: ["travel", "dining", "groceries", "gas"],
    complexity: "medium",
    transferPartners: ["flying_blue", "turkish", "singapore", "thai", "qantas", "jetblue"],
    partnerAirlines: ["flying_blue", "turkish", "singapore", "thai", "qantas", "jetblue"],
    partnerHotels: ["choice"],
    signUpBonus: "60,000 points after $4,000 in first 3 months",
    pros: ["Best 3x bonus categories of any mid-tier card", "Excellent transfer partners for international travel", "$100 annual hotel credit"],
    cons: ["Fewer hotel transfer partners", "Citi ThankYou less popular than Chase UR"],
    creditRequired: "Good (670+)",
    tag: "Best Multi-Category Card",
  },
  // Premium Cards
  {
    id: "chase-sapphire-reserve",
    name: "Chase Sapphire Reserve®",
    issuer: "Chase",
    annualFee: 550,
    rewards: "3x on travel/dining (after $300 travel credit), 10x on hotels/rental cars via Chase Travel",
    bestFor: ["travel", "dining", "premium", "lounge_access"],
    complexity: "high",
    transferPartners: ["united", "southwest", "british_airways", "singapore", "air_france", "hyatt", "marriott", "ihg"],
    partnerAirlines: ["united", "southwest", "british_airways", "singapore", "air_france"],
    partnerHotels: ["hyatt", "marriott", "ihg"],
    signUpBonus: "60,000 points after $4,000 in first 3 months (~$900 in travel)",
    pros: ["$300 annual travel credit", "Priority Pass lounge access", "1.5x more value in Chase Travel portal", "Trip delay/cancel insurance", "Strong travel protections", "Hertz Presidents Circle status"],
    cons: ["$550 annual fee", "Must travel frequently to justify", "Less valuable for non-travelers"],
    creditRequired: "Excellent (740+)",
    tag: "Best Premium Travel Card",
  },
  {
    id: "amex-platinum",
    name: "The Platinum Card® from American Express",
    issuer: "American Express",
    annualFee: 695,
    rewards: "5x on flights (directly with airlines), 5x on prepaid hotels via Amex Travel, 1x everything else",
    bestFor: ["travel", "luxury", "lounge_access", "premium"],
    complexity: "high",
    transferPartners: ["delta", "british_airways", "singapore", "air_france", "emirates", "jetblue", "hilton", "marriott"],
    partnerAirlines: ["delta", "british_airways", "singapore", "air_france", "emirates"],
    partnerHotels: ["hilton", "marriott", "fine_hotels"],
    signUpBonus: "80,000–150,000 points after $6,000–8,000 in first 6 months",
    pros: ["Best airport lounge access (Centurion + Priority Pass)", "$200 airline fee credit", "$200 hotel credit", "$200 Uber Cash", "$155 Walmart+ credit", "Global Entry credit", "Fine Hotels & Resorts access"],
    cons: ["$695 annual fee — must use credits", "Poor earning on non-flight purchases", "Credits can be hard to use"],
    creditRequired: "Excellent (740+)",
    tag: "Best for Luxury Travel & Lounge Access",
  },
  // Specialty Cards
  {
    id: "bilt-mastercard",
    name: "Bilt Mastercard®",
    issuer: "Wells Fargo",
    annualFee: 0,
    rewards: "1x on rent (no fee!), 3x on dining, 2x on travel, 1x everything else",
    bestFor: ["rent", "dining", "travel", "renters"],
    complexity: "medium",
    transferPartners: ["united", "american", "alaska", "flying_blue", "hyatt", "marriott", "hilton"],
    partnerAirlines: ["united", "american", "alaska", "flying_blue"],
    partnerHotels: ["hyatt", "marriott", "hilton"],
    signUpBonus: "No standard bonus (earn points on rent from day 1)",
    pros: ["Only card to earn points on rent with no fee", "Excellent transfer partners", "No annual fee", "Rent Day (1st of month) 2x bonus on everything"],
    cons: ["Must use card 5x/month to earn rent points", "No traditional sign-up bonus"],
    creditRequired: "Good (670+)",
    tag: "Best for Renters",
  },
  {
    id: "amazon-prime-visa",
    name: "Amazon Prime Visa",
    issuer: "Chase",
    annualFee: 0,
    rewards: "5% at Amazon/Whole Foods (Prime members), 2% restaurants/gas/local transit, 1% everywhere else",
    bestFor: ["amazon", "groceries", "everyday"],
    complexity: "low",
    transferPartners: [],
    partnerAirlines: [],
    partnerHotels: [],
    signUpBonus: "$100 Amazon gift card instantly upon approval",
    pros: ["5% back at Amazon makes it pay for itself", "No foreign transaction fees", "Simple cash back"],
    cons: ["Requires Amazon Prime membership", "Less valuable without Prime", "No travel benefits"],
    creditRequired: "Good (670+)",
    tag: "Best for Amazon Shoppers",
  },
];

export function getRecommendations(surveyAnswers) {
  const { spendingType, annualFee, preferredAirlines, preferredHotels, complexity, primaryGoal } = surveyAnswers;

  let scored = cardDatabase.map((card) => {
    let score = 0;
    const reasons = [];

    // Annual fee preference
    if (annualFee === "no_fee" && card.annualFee === 0) {
      score += 30;
      reasons.push("No annual fee ✓");
    } else if (annualFee === "low_fee" && card.annualFee <= 95) {
      score += 20;
      reasons.push("Low annual fee ✓");
    } else if (annualFee === "any" && card.annualFee <= 95) {
      score += 10;
    } else if (annualFee === "any" && card.annualFee > 95) {
      score += 5;
    } else if (annualFee === "no_fee" && card.annualFee > 0) {
      score -= 20;
    }

    // Spending type match
    if (spendingType && card.bestFor.includes(spendingType)) {
      score += 25;
      reasons.push(`Great for ${spendingType} ✓`);
    }

    // Complexity match
    if (complexity === card.complexity) {
      score += 15;
      reasons.push("Matches your complexity preference ✓");
    } else if (complexity === "low" && card.complexity === "high") {
      score -= 20;
    } else if (complexity === "low" && card.complexity === "medium") {
      score -= 5;
    }

    // Partner airlines
    if (preferredAirlines && preferredAirlines.length > 0) {
      const airlineMatch = preferredAirlines.filter((a) =>
        card.transferPartners.includes(a) || card.partnerAirlines.includes(a)
      );
      if (airlineMatch.length > 0) {
        score += airlineMatch.length * 10;
        reasons.push(`Partners with your preferred airlines ✓`);
      }
    }

    // Partner hotels
    if (preferredHotels && preferredHotels.length > 0) {
      const hotelMatch = preferredHotels.filter((h) =>
        card.transferPartners.includes(h) || card.partnerHotels.includes(h)
      );
      if (hotelMatch.length > 0) {
        score += hotelMatch.length * 10;
        reasons.push(`Partners with your preferred hotels ✓`);
      }
    }

    // Primary goal
    if (primaryGoal === "travel" && card.bestFor.includes("travel")) {
      score += 15;
    } else if (primaryGoal === "cash_back" && card.bestFor.includes("cash_back")) {
      score += 15;
    } else if (primaryGoal === "build_credit" && card.creditRequired.includes("Fair")) {
      score += 20;
      reasons.push("Good for credit building ✓");
    }

    return { ...card, score, reasons };
  });

  // Sort by score, return top 3
  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}
