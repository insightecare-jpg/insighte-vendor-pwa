"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search, SlidersHorizontal, X, MapPin, User,
  Video, ChevronDown, Sparkles, Globe, HelpCircle,
  ShieldCheck, ArrowRight, Zap, Target
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn, normalizeCategory } from "@/lib/utils";
import { ProviderCard } from "@/components/ui/provider-card";
import { SERVICE_GROUPS, TOP_LEVEL_FILTERS } from "@/lib/constants";
import { UnifiedSearchBar } from "@/components/shared/UnifiedSearchBar";
import { ZONES } from "@/lib/geo";
import { Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─── AMBIENT BACKGROUND (Unified with home) ───
const AmbientCanvas = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8b7ff0]/5 blur-[200px] rounded-full" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#5dcaa5]/3 blur-[200px] rounded-full" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
  </div>
);

// ─── URL PARAM CATEGORY MAP ───────────────────────────────────────────────────
const CATEGORY_PARAM_MAP: Record<string, string> = {
  "speech therapy":           "Speech Therapy",
  "speech+therapy":           "Speech Therapy",
  "autism":                   "Autism",
  "occupational therapy":     "Occupational Therapy",
  "occupational+therapy":     "Occupational Therapy",
  "child counselling":        "Child Counselling",
  "child+counselling":        "Child Counselling",
  "behavior therapy":         "Behavior Therapy",
  "behavior+therapy":         "Behavior Therapy",
  "behaviour therapy":        "Behavior Therapy",
  "special education":        "Special Education",
  "special+education":        "Special Education",
  "tutoring":                 "Tutoring",
  "arts":                     "Arts",
  "developmental pediatrics": "Developmental Pediatrics",
  "developmental+pediatrics": "Developmental Pediatrics",
  "school inclusion":         "School Inclusion",
  "school+inclusion":         "School Inclusion",
};

const AGE_PARAM_MAP: Record<string, string> = {
  "toddler":        "Toddlers (2-4)",
  "toddlers":       "Toddlers (2-4)",
  "preschool":      "Pre-Primary (4-6)",
  "pre-primary":    "Pre-Primary (4-6)",
  "primary":        "Primary (6-10)",
  "adolescent":     "Adolescents (10+)",
  "adolescents":    "Adolescents (10+)",
  "teen":           "Adolescents (10+)",
  "adult":          "Young Adults (19+)",
  "adults":         "Young Adults (19+)",
};

const AGE_GROUPS = [
  "Toddlers (2-4)", "Pre-Primary (4-6)", "Primary (6-10)",
  "Adolescents (10+)", "Young Adults (19+)",
];

const CITIES = ["Bangalore", "Delhi", "Mumbai", "Kochi", "Trivandrum", "Chennai", "Hyderabad", "Pune", "Online"];

export default function SpecialistsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0b14] flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#8b7ff0] font-black text-[10px] uppercase tracking-[0.4em]"
        >
          Aligning Clinical Data...
        </motion.div>
      </div>
    }>
      <SpecialistsContent />
    </Suspense>
  );
}

function SpecialistsContent() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const [providers, setProviders] = useState<any[]>([]);
  const [onlineProviders, setOnlineProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialised, setInitialised] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [selectedSubModules, setSelectedSubModules] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedMode, setSelectedMode] = useState<"all" | "offline" | "online">("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const q         = searchParams.get("q") || searchParams.get("query") || "";
    const city      = searchParams.get("city") || searchParams.get("location") || "All";
    const catRaw    = searchParams.get("category") || "";
    const ageRaw    = searchParams.get("ageGroup") || searchParams.get("age") || "";
    const condRaw   = searchParams.get("condition") || "";
    const modeRaw   = searchParams.get("mode") || "all";
    const boardRaw  = searchParams.get("board") || "";
    const typeRaw   = searchParams.get("type") || "";

    if (q) setSearchQuery(q);
    if (city && city !== "All") setSelectedCity(city);
    if (modeRaw === "online") setSelectedMode("online");

    const cats: string[] = [];
    if (catRaw) {
      const resolved = CATEGORY_PARAM_MAP[catRaw.toLowerCase()] || catRaw;
      cats.push(resolved);
    }
    if (condRaw) {
      const resolved = CATEGORY_PARAM_MAP[condRaw.toLowerCase()] || condRaw;
      if (!cats.includes(resolved)) cats.push(resolved);
    }
    if (cats.length > 0) setSelectedCategories(cats);

    const subs: string[] = [];
    if (typeRaw)  subs.push(typeRaw.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()));
    if (boardRaw) subs.push(boardRaw);
    if (subs.length > 0) setSelectedSubModules(subs);

    if (ageRaw) {
      const resolved = AGE_PARAM_MAP[ageRaw.toLowerCase()] || ageRaw;
      setSelectedAgeGroups([resolved]);
    }

    setInitialised(true);
  }, [searchParams]);

  useEffect(() => {
    if (!initialised) return;
    const handler = setTimeout(() => { fetchProviders(); }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, selectedCategories, selectedAgeGroups, selectedSubModules, selectedCity, selectedMode, initialised]);

  async function fetchProviders() {
    setLoading(true);
    const specs = [...selectedSubModules, ...selectedCategories];
    const targetCity = selectedCity === "All" ? null : selectedCity;

    const modes: string[] | null =
      selectedMode === "online"  ? ["Online"] :
      selectedMode === "offline" ? ["Home", "In-Clinic"] :
      null;

    const { data, error } = await supabase.rpc("search_partners", {
      search_term:      searchQuery,
      selected_specs:   specs.length > 0 ? specs : null,
      selected_modes:   modes,
      selected_ages:    selectedAgeGroups.length > 0 ? selectedAgeGroups : null,
      target_city:      targetCity,
      require_available: false,
    });

    if (error) {
      console.error("Search RPC error:", error);
      setProviders([]);
    } else {
      setProviders(data || []);

      if (targetCity && (data || []).length === 0 && selectedMode !== "online") {
        const { data: onlineData } = await supabase.rpc("search_partners", {
          search_term:      searchQuery,
          selected_specs:   specs.length > 0 ? specs : null,
          selected_modes:   ["Online"],
          selected_ages:    selectedAgeGroups.length > 0 ? selectedAgeGroups : null,
          target_city:      null,
          require_available: false,
        });
        setOnlineProviders(onlineData || []);
      } else {
        setOnlineProviders([]);
      }
    }
    setLoading(false);
  }

  const activeTags = useMemo(() => {
    const tags: { id: string; label: string; onRemove: () => void }[] = [];
    if (searchQuery) tags.push({ id: "q", label: `🔍 ${searchQuery}`, onRemove: () => setSearchQuery("") });
    if (selectedCity !== "All") tags.push({ id: "city", label: `📍 ${selectedCity}`, onRemove: () => setSelectedCity("All") });
    if (selectedMode !== "all") tags.push({ id: "mode", label: selectedMode === "online" ? "💻 Online" : "🏠 In-Person", onRemove: () => setSelectedMode("all") });
    selectedCategories.forEach((c) => tags.push({ id: `cat-${c}`, label: `🔖 ${c}`, onRemove: () => toggleCategory(c) }));
    selectedAgeGroups.forEach((a) => tags.push({ id: `age-${a}`, label: `🧒 ${a}`, onRemove: () => toggleAgeGroup(a) }));
    selectedSubModules.forEach((s) => tags.push({ id: `sub-${s}`, label: s, onRemove: () => toggleSubModule(s) }));
    return tags;
  }, [searchQuery, selectedCity, selectedMode, selectedCategories, selectedAgeGroups, selectedSubModules]);

  const activeZone = useMemo(() => {
    if (selectedMode === "online") return ZONES.find(z => z.id === "online") || null;
    if (selectedCity === "All") return null;
    return ZONES.find(z => z.city === selectedCity) || null;
  }, [selectedCity, selectedMode]);

  const handleUnifiedSearch = (q: string, zone: any) => {
    setSearchQuery(q);
    if (zone) {
      if (zone.id === "online") {
        setSelectedMode("online");
        setSelectedCity("All");
      } else {
        setSelectedCity(zone.city);
        setSelectedMode("all");
      }
    } else {
      setSelectedCity("All");
      setSelectedMode("all");
    }
  };

  const toggleCategory = (cat: string) => {
    const norm = normalizeCategory(cat);
    setSelectedCategories((prev) => 
      prev.includes(norm) ? prev.filter((c) => c !== norm) : [...prev, norm]
    );
  };

  const toggleSubModule = (sm: string) => {
    const norm = normalizeCategory(sm);
    setSelectedSubModules((prev) =>
      prev.includes(norm) ? prev.filter((s) => s !== norm) : [...prev, norm]
    );
  };

  const toggleAgeGroup = (age: string) => {
    setSelectedAgeGroups((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedAgeGroups([]);
    setSelectedSubModules([]);
    setSearchQuery("");
    setSelectedCity("All");
    setSelectedMode("all");
    router.replace("/specialists", { scroll: false });
  };

  return (
    <div className="min-h-screen">
      <AmbientCanvas />

      <main className="relative z-10 pt-32 pb-40">
        
        {/* ═══ MAGAZINE HEADER: HIGH DENSITY & ELEGANT ═══ */}
        <header className="max-w-7xl mx-auto px-6 mb-20">
          <div className="max-w-4xl space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-[#8b7ff0]" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#8b7ff0]">Clinical Resource Center</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black italic !leading-[0.9] tracking-tighter text-white font-dm-serif"
            >
              {selectedCategories.length > 0 ? selectedCategories[0] : "Bridge the gap."}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-[#8a8591] italic font-medium leading-relaxed max-w-2xl"
            >
              Connect with verified specialists dedicated to radical progress and neuro-affirming care. 
              <span className="text-[#5dcaa5]"> Trusted by over 120,000 families across India.</span>
            </motion.p>
          </div>

          {/* ═══ SEARCH & FILTERS (Desktop Marginalized) ═══ */}
          <div className="mt-16 space-y-10">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              {/* Limited width search container with margins */}
              <div className="w-full lg:max-w-3xl lg:mr-8">
                <UnifiedSearchBar 
                  initialQuery={searchQuery}
                  initialZone={activeZone}
                  onSearch={handleUnifiedSearch}
                  onQueryChange={(q) => setSearchQuery(q)}
                  placeholder="Search specialists, needs, or clinical expertise…"
                />
              </div>

              <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                {/* Mode Toggles */}
                <div className="flex bg-white/[0.03] p-1.5 rounded-3xl border border-white/5 backdrop-blur-3xl shrink-0">
                  {(["all", "online", "offline"] as const).map((m) => (
                    <button 
                      key={m}
                      onClick={() => setSelectedMode(m)}
                      className={cn(
                        "px-6 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap",
                        selectedMode === m 
                          ? "bg-[#8b7ff0] text-[#0a0b14] shadow-lg shadow-[#8b7ff0]/10" 
                          : "text-[#8a8591] hover:text-white"
                      )}
                    >
                      {m === "all" ? "All" : m === "online" ? "Online" : "In-Person"}
                    </button>
                  ))}
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "flex items-center gap-3 px-8 py-3.5 rounded-3xl text-[9px] font-black uppercase tracking-widest transition-all duration-500 border relative overflow-hidden group shrink-0",
                    showFilters 
                      ? "bg-[#8b7ff0]/10 border-[#8b7ff0]/30 text-[#8b7ff0]" 
                      : "bg-white/[0.03] border-white/5 text-[#8a8591] hover:text-white"
                  )}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filter parameters
                  {activeTags.length > 0 && (
                    <span className="ml-2 w-5 h-5 rounded-full bg-[#8b7ff0] text-[#0a0b14] flex items-center justify-center text-[9px] font-black">
                      {activeTags.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Expanded Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                      <div className="space-y-6">
                        <p className="text-[9px] uppercase font-black text-[#8b7ff0] tracking-[0.4em]">Core Discipline</p>
                        <div className="flex flex-wrap gap-2.5">
                          {TOP_LEVEL_FILTERS.filter(f => f !== "All").map(cat => (
                            <button 
                              key={cat} onClick={() => toggleCategory(cat)}
                              className={cn(
                                "px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all duration-300 border",
                                selectedCategories.includes(cat)
                                  ? "bg-[#8b7ff010] border-[#8b7ff030] text-[#8b7ff0]"
                                  : "bg-white/5 border-transparent text-[#8a8591] hover:text-white"
                              )}
                            >{cat}</button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <p className="text-[9px] uppercase font-black text-[#5dcaa5] tracking-[0.4em]">Age Focus</p>
                        <div className="flex flex-wrap gap-2.5">
                          {AGE_GROUPS.map(age => (
                            <button 
                              key={age} onClick={() => toggleAgeGroup(age)}
                              className={cn(
                                "px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all duration-300 border",
                                selectedAgeGroups.includes(age)
                                  ? "bg-[#5dcaa510] border-[#5dcaa530] text-[#5dcaa5]"
                                  : "bg-white/5 border-transparent text-[#8a8591] hover:text-white"
                              )}
                            >{age}</button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <p className="text-[9px] uppercase font-black text-[#ef9f27] tracking-[0.4em]">Sub-Specialty</p>
                        <div className="flex flex-wrap gap-2.5">
                          {Array.from(new Set(
                            SERVICE_GROUPS
                              .filter((g) => g.name === "All" || selectedCategories.includes(g.name) || selectedCategories.length === 0)
                              .flatMap((g) => g.services)
                              .map((s) => s === "OT" ? "Occupational Therapy" : s)
                          )).slice(0, 12).map(sm => (
                            <button 
                              key={sm} onClick={() => toggleSubModule(sm)}
                              className={cn(
                                "px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all duration-300 border",
                                selectedSubModules.includes(sm)
                                  ? "bg-[#ef9f2710] border-[#ef9f2730] text-[#ef9f27]"
                                  : "bg-white/5 border-transparent text-[#8a8591] hover:text-white"
                              )}
                            >{sm}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Param Tags */}
            <AnimatePresence>
              {activeTags.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <span className="text-[9px] font-black text-[#8a8591] uppercase tracking-[0.3em]">Precision Filters:</span>
                  {activeTags.map((tag) => (
                    <button 
                      key={tag.id}
                      onClick={tag.onRemove}
                      className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 text-[10px] font-black text-[#f0ece4]/80 hover:border-red-500/20 hover:text-red-400 transition-all duration-500"
                    >
                      {tag.label}
                      <X className="w-3 h-3 text-[#8a8591] group-hover:text-red-400 transition-colors" />
                    </button>
                  ))}
                  <button onClick={clearFilters} className="text-[10px] font-black text-[#8b7ff0] uppercase tracking-widest hover:text-white transition-colors ml-4 underline underline-offset-8 decoration-[#8b7ff0]/20">Reset System</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* ═══ RESULTS GRID: PREMIUM & HIGH-DENSITY ═══ */}
        <section className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[520px] rounded-[2.5rem] bg-white/[0.01] border border-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-24">
              {/* Result Meta Indicator */}
              <div className="flex items-center justify-between border-b border-white/5 pb-8">
                <div className="flex items-center gap-6">
                  <div className="h-10 w-px bg-gradient-to-b from-[#8b7ff0] to-transparent" />
                  <div>
                    <p className="text-3xl font-black italic tracking-tighter text-white">{providers.length}</p>
                    <p className="text-[9px] uppercase font-black text-[#8a8591] tracking-[0.3em]">Verified Specialists Identified</p>
                  </div>
                </div>
              </div>

              {providers.length > 0 ? (
                <motion.div 
                  initial="hidden" animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                >
                  {providers.map((provider) => (
                    <motion.div
                      key={provider.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ProviderCard provider={provider} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="py-40 text-center space-y-12">
                   <div className="relative inline-block">
                     <div className="absolute inset-0 bg-[#8b7ff0]/10 blur-[80px] rounded-full" />
                     <div className="relative h-24 w-24 rounded-[2rem] bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-10">
                       <Search className="w-10 h-10 text-[#8a8591]/40" />
                     </div>
                   </div>
                   <div className="space-y-4 max-w-xl mx-auto">
                      <h3 className="text-4xl font-black italic tracking-tight text-white/90 font-dm-serif">
                        {selectedCity !== "All" ? `Bridge required in ${selectedCity}` : "Zero clinical matches."}
                      </h3>
                      <p className="text-[#8a8591] italic font-medium text-lg leading-relaxed px-6">
                        {selectedCity !== "All" 
                          ? "We don't have physically present specialists in this zone yet. However, our Tele-Care platform secures clinical parity with nationwide experts."
                          : "Try broadening your search parameters or resetting the filters to bridge the gap."}
                      </p>
                   </div>
                   <div className="flex items-center justify-center gap-6 pt-6">
                      <button onClick={clearFilters} className="h-14 px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all">
                        Reset Filters
                      </button>
                      {selectedCity !== "All" && (
                        <button 
                          onClick={() => { setSelectedCity("All"); setSelectedMode("online"); }}
                          className="h-14 px-10 rounded-2xl bg-[#8b7ff0] text-[#0a0b14] font-black text-[11px] uppercase tracking-widest hover:bg-white active:scale-95 transition-all shadow-xl shadow-[#8b7ff0]/10"
                        >
                           Enable Online Access
                        </button>
                      )}
                   </div>
                </div>
              )}

              {/* Online Continuity if local is empty */}
              {providers.length === 0 && onlineProviders.length > 0 && (
                <div className="space-y-16">
                  <div className="p-12 rounded-[3.5rem] bg-gradient-to-br from-[#8b7ff0]/5 to-transparent border border-white/5 backdrop-blur-3xl flex flex-col md:flex-row items-center gap-12">
                    <div className="h-20 w-20 rounded-[2rem] bg-[#8b7ff0]/10 flex items-center justify-center flex-shrink-0 shadow-2xl">
                      <Globe className="w-8 h-8 text-[#8b7ff0]" />
                    </div>
                    <div className="flex-1 space-y-4 text-center md:text-left">
                       <h3 className="text-3xl font-black italic tracking-tight text-white font-dm-serif">Global Continuity Network</h3>
                       <p className="text-[#8a8591] italic font-medium leading-relaxed max-w-2xl">
                         Scientific research confirms that tele-intervention is a valid path for progress. These {onlineProviders.length} verified specialists are ready to secure your child's milestones today.
                       </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {onlineProviders.map((provider) => (
                      <ProviderCard key={provider.id} provider={provider} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
