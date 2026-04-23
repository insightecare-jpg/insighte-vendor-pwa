import { Zone } from "@/lib/geo";

// Suggestions data
export const ALL_SUGGESTIONS = [
  {
    icon: "🧑‍🏫", text: "Special Educator near me", tag: "Education",
    category: "Special Education", ageGroup: "All Ages",
    keywords: ["special", "educator", "remedial", "teaching", "tutor", "learning", "support"],
    color: "rgba(133,183,235,0.12)",
  },
  {
    icon: "💬", text: "Child Counselling sessions", tag: "Clinical",
    category: "Child Counselling", ageGroup: "Adolescent",
    keywords: ["counsell", "psycholog", "anxiety", "behavior", "emotional", "trauma"],
    color: "rgba(216,90,48,0.12)",
  },
  {
    icon: "🗣️", text: "Speech delay support", tag: "Therapy",
    category: "Speech Therapy", ageGroup: "3-6 yrs",
    keywords: ["speech", "delay", "talk", "language", "words", "speech therapy", "stammer"],
    color: "rgba(139,127,240,0.12)",
  },
  {
    icon: "🎓", text: "Shadow teacher for school", tag: "Education",
    category: "Special Education", ageGroup: "School-age",
    keywords: ["shadow", "teacher", "school", "inclusion", "aide", "mainstream", "classroom"],
    color: "rgba(59,109,17,0.12)",
  },
  {
    icon: "📐", text: "Math & Science Tutor", tag: "Academic",
    category: "Academic", ageGroup: "Grade 1-12",
    keywords: ["math", "tutor", "science", "physics", "cbse", "icse", "exams", "study"],
    color: "rgba(240,153,123,0.12)",
  },
  {
    icon: "💻", text: "Coding for kids", tag: "STEM",
    category: "Academic", ageGroup: "6-15 yrs",
    keywords: ["coding", "programming", "python", "scratch", "logic", "stem"],
    color: "rgba(93,202,165,0.12)",
  },
  {
    icon: "🧩", text: "Occupational therapy", tag: "Rehab",
    category: "Occupational Therapy", ageGroup: "All Ages",
    keywords: ["occupational", "ot", "motor", "sensory", "handwriting", "dexterity"],
    color: "rgba(139,127,240,0.12)",
  },
  {
    icon: "🎹", text: "Piano / Music teacher", tag: "Hobbies",
    category: "Academic", ageGroup: "All Ages",
    keywords: ["piano", "guitar", "music", "singing", "ukulele", "keyboard"],
    color: "rgba(133,183,235,0.12)",
  },
];

export function getSmartSuggestions(query: string, zone: Zone | null) {
  const q = query.toLowerCase().trim();
  const locationLabel = zone && zone.id !== "online" ? zone.label.replace("Near ", "") : null;
  const city = zone && zone.id !== "online" ? zone.city : null;

  const ageTiers = [
    { label: "3-6 yrs", match: ["3", "4", "5", "6", "preschool", "toddler"] },
    { label: "School-age", match: ["7", "8", "9", "10", "11", "12", "school", "grade"] },
    { label: "Adolescent", match: ["13", "14", "15", "16", "17", "18", "teen"] }
  ];
  const detectedAge = ageTiers.find(a => a.match.some(m => q.includes(m)))?.label;

  const getUrl = (s: typeof ALL_SUGGESTIONS[0]) => {
    const params = new URLSearchParams();
    if (s.category) params.set("category", s.category);
    if (detectedAge || s.ageGroup) params.set("ageGroup", detectedAge || s.ageGroup);
    if (city) params.set("city", city);
    if (q && !s.keywords.some(k => k === q)) params.set("q", q);
    return `/specialists?${params.toString()}`;
  };

  if (!q || q.length < 2) {
    return ALL_SUGGESTIONS.slice(0, 5).map((s) => {
      let display = s.text;
      if (locationLabel) display += ` near ${locationLabel}`;
      return { ...s, displayText: display, href: getUrl(s) };
    });
  }

  const matched = ALL_SUGGESTIONS
    .filter((s) =>
      s.text.toLowerCase().includes(q) ||
      s.keywords.some((k) => q.includes(k) || k.includes(q))
    )
    .map((s) => {
      let display = s.text;
      if (detectedAge) display += ` (${detectedAge})`;
      else if (s.ageGroup) display += ` (${s.ageGroup})`;
      
      if (locationLabel) display += ` near ${locationLabel}`;

      return {
        ...s,
        displayText: display,
        href: getUrl(s)
      };
    });

  return matched.length > 0 ? matched.slice(0, 5) : [
    {
      icon: "🔍", text: `Search for "${query}"`, tag: "Direct Search",
      color: "rgba(255,255,255,0.05)",
      displayText: `Search for "${query}" ${locationLabel ? `in ${locationLabel}` : ""}`,
      href: `/specialists?q=${encodeURIComponent(query)}${city ? `&city=${city}` : ""}`
    }
  ];
}
