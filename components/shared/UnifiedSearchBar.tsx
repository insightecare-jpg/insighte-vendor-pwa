"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, MapPin, ArrowRight, Sparkles, HelpCircle, Navigation, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Zone, getUserZone, getCachedZone, setCachedZone, getPincodeZone, ZONES } from "@/lib/geo";
import { getSmartSuggestions } from "@/lib/services/search-utils";

interface UnifiedSearchBarProps {
  className?: string;
  initialQuery?: string;
  initialZone?: Zone | null;
  onSearch?: (query: string, zone: Zone | null) => void;
  onQueryChange?: (query: string) => void;
  placeholder?: string;
}

export function UnifiedSearchBar({ 
  className, 
  initialQuery = "", 
  initialZone = null,
  onSearch,
  onQueryChange,
  placeholder = "e.g. Speech delay 3 yrs · Shadow teacher · ADHD support…"
}: UnifiedSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [detectingStatus, setDetectingStatus] = useState<"idle" | "detecting" | "pincode" | "done">("idle");

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Initialize zone from cache or props
  useEffect(() => {
    if (initialZone) {
      setActiveZone(initialZone);
      setDetectingStatus("done");
      return;
    }
    const cached = getCachedZone();
    if (cached) {
      setActiveZone(cached);
      setDetectingStatus("done");
    }
  }, [initialZone]);

  // Sync internal query state with initialQuery prop
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Handle outside clicks
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = useCallback(() => {
    setShowSuggestions(false);
    setIsLocationOpen(false);
    
    if (onSearch) {
      onSearch(query, activeZone);
    } else {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (activeZone && activeZone.id !== "online") params.set("city", activeZone.city);
      router.push(`/specialists?${params.toString()}`);
    }
  }, [query, activeZone, onSearch, router]);

  const suggestions = getSmartSuggestions(query, activeZone);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") { 
      e.preventDefault(); 
      setHighlightedIndex((i) => Math.min(i + 1, suggestions.length - 1)); 
    }
    if (e.key === "ArrowUp") { 
      e.preventDefault(); 
      setHighlightedIndex((i) => Math.max(i - 1, -1)); 
    }
    if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        router.push(suggestions[highlightedIndex].href);
        setShowSuggestions(false);
      } else {
        handleSearch();
      }
    }
    if (e.key === "Escape") { 
      setShowSuggestions(false); 
      setHighlightedIndex(-1); 
    }
  };

  const handleDetectLocation = async () => {
    try { localStorage.removeItem("insighte_geo_zone"); } catch {}
    setActiveZone(null);
    setDetectingStatus("detecting");
    setIsLocationOpen(false);
    const detected = await getUserZone();
    if (detected) {
      setActiveZone(detected);
      setCachedZone(detected);
      setDetectingStatus("done");
    } else {
      setDetectingStatus("pincode");
      setIsLocationOpen(true);
    }
  };

  const handlePincodeSubmit = () => {
    setPincodeError("");
    const matched = getPincodeZone(pincode);
    if (matched) {
      setActiveZone(matched);
      setCachedZone(matched);
      setDetectingStatus("done");
      setIsLocationOpen(false);
    } else {
      setPincodeError("Pincode not found — try a nearby pincode or select city below.");
    }
  };

  // Ensure only one dropdown is open at a time
  const toggleLocation = () => {
    setIsLocationOpen(!isLocationOpen);
    if (!isLocationOpen) setShowSuggestions(false);
  };

  const toggleSuggestions = (val: boolean) => {
    setShowSuggestions(val);
    if (val) setIsLocationOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={searchRef}>
      <div className="flex flex-col md:flex-row items-center gap-3 w-full" style={{ zIndex: 1010, position: 'relative' }}>
        <div 
          className={`flex items-center gap-3 w-full transition-all duration-200 ${
            showSuggestions ? "border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.1)]" : "border-white/10 hover:border-white/20"
          }`}
          style={{
            background: "rgba(255,255,255,0.06)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "100px",
            padding: "6px 6px 6px 20px"
          }}
        >
          <Search className="text-zinc-500 shrink-0 w-4 h-4" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { 
                const newQuery = e.target.value;
                setQuery(newQuery); 
                toggleSuggestions(true); 
                setHighlightedIndex(-1); 
                if (onQueryChange) onQueryChange(newQuery);
            }}
            onFocus={() => toggleSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            className="flex-1 bg-transparent border-none outline-none font-inherit text-sm text-zinc-100 min-w-0 placeholder-zinc-600 focus:ring-0"
          />

          <div className="hidden md:block w-px h-5 bg-white/10 shrink-0" />

          {/* Location Toggle */}
          <div className="hidden md:flex shrink-0 relative" ref={locationRef}>
            <button
              onClick={toggleLocation}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 transition-colors ${
                activeZone ? "text-indigo-300" : "text-zinc-400 hover:text-zinc-200"
              }`}
              style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 500 }}
            >
              {detectingStatus === "detecting" ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  Detecting…
                </span>
              ) : activeZone ? (
                <>
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  {activeZone.label}
                </>
              ) : (
                <>
                  <MapPin className="w-3.5 h-3.5" />
                  Location ▾
                </>
              )}
            </button>

            {/* Location Dropdown */}
            {isLocationOpen && (
              <div 
                className="absolute top-[calc(100%+16px)] right-0 w-64 bg-[#1a1c2e] border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
                style={{ zIndex: 100000 }} // Higher than suggestion dropdown container logic if needed
              >
                <div className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-600 mb-4">Select Location</div>
                
                <button 
                  onClick={handleDetectLocation}
                  className="flex items-center gap-2 w-full p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold hover:bg-indigo-500/20 transition-all mb-4"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Use my current location
                </button>

                <div className="mb-4">
                  <div className="text-[10px] text-zinc-500 mb-2 font-bold uppercase tracking-wider">Or enter pincode</div>
                  <div className="flex gap-2">
                    <input
                      value={pincode} 
                      onChange={(e) => setPincode(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handlePincodeSubmit(); }}
                      placeholder="e.g. 560066"
                      maxLength={6}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-indigo-500/50"
                    />
                    <button 
                        onClick={handlePincodeSubmit}
                        className="bg-indigo-500 text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase hover:bg-indigo-600 shadow-lg shadow-indigo-500/20"
                    >
                        Go
                    </button>
                  </div>
                  {pincodeError && <p className="text-[10px] text-orange-400 mt-2 leading-relaxed">{pincodeError}</p>}
                </div>

                <div className="text-[10px] text-zinc-500 mb-2 font-bold uppercase tracking-wider">Popular Cities</div>
                <div className="flex flex-wrap gap-2">
                    {ZONES.filter(z => ["central-bangalore", "delhi-central", "mumbai-central", "online"].includes(z.id)).map(z => (
                        <button
                            key={z.id}
                            onClick={() => {
                                setActiveZone(z);
                                setCachedZone(z);
                                setDetectingStatus("done");
                                setIsLocationOpen(false);
                            }}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                                activeZone?.id === z.id 
                                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" 
                                : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {z.city === "India" ? "🌐 Online" : z.city}
                        </button>
                    ))}
                </div>

                {activeZone && (
                     <button 
                        onClick={() => { setActiveZone(null); setDetectingStatus("idle"); localStorage.removeItem("insighte_geo_zone"); }}
                        className="flex items-center gap-1.5 mt-4 text-[10px] text-zinc-600 hover:text-zinc-400 font-bold uppercase tracking-wider"
                    >
                        <X className="w-2.5 h-2.5" /> Clear filters
                    </button>
                )}
              </div>
            )}
          </div>

          {/* Search Button desktop */}
          <button 
            onClick={handleSearch}
            className="hidden md:flex items-center gap-2 bg-[#e8e2d8] text-[#0d0f1a] px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20"
          >
            Search
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Search Button */}
        <div className="md:hidden flex w-full gap-2">
            <button 
                onClick={handleSearch}
                className="flex-1 flex items-center justify-center gap-2 bg-[#e8e2d8] text-[#0d0f1a] py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl"
            >
                Search <ArrowRight className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* ─── SUGGESTIONS DROPDOWN (Global across versions) ─── */}
      {showSuggestions && (
        <div 
          className="absolute left-0 right-0 top-[calc(100%+12px)] bg-[#1a1c2e]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] py-4 shadow-2xl shadow-black/80 max-h-[450px] overflow-y-auto animate-in slide-in-from-top-2 duration-300"
          style={{ zIndex: 99999 }}
        >
          {/* AI Header */}
          <div className="flex items-center gap-2 px-6 py-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                {query.length > 1 ? "Matching Specializations" : "Popular Support Needs"}
                {activeZone && <span className="text-indigo-400"> · {activeZone.city}</span>}
            </span>
          </div>

          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => { setShowSuggestions(false); router.push(sug.href); }}
              className={`flex items-center gap-4 w-full px-6 py-3 text-left transition-colors ${
                i === highlightedIndex ? "bg-white/5" : "hover:bg-white/[0.02]"
              }`}
              onMouseEnter={() => setHighlightedIndex(i)}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: sug.color }}
              >
                {sug.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-zinc-300 font-medium leading-tight">
                    {query.length > 1 ? (
                        <>
                            {sug.displayText.split(new RegExp(`(${query})`, 'gi')).map((part, i) => 
                                part.toLowerCase() === query.toLowerCase() 
                                ? <span key={i} className="text-indigo-400 font-bold">{part}</span>
                                : part
                            )}
                        </>
                    ) : sug.displayText}
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-600 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                        {sug.tag}
                    </span>
                    <span className="text-[9px] text-zinc-500">• 98% Match</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-700 shrink-0" />
            </button>
          ))}

          {/* Guided Triage CTA */}
          <div className="px-6 pt-4 mt-2 border-t border-white/5">
            <button 
              onClick={() => router.push("/triage")}
              className="flex items-center gap-3 w-full p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 text-orange-400 hover:bg-orange-500/10 transition-all text-left group"
            >
              <HelpCircle className="w-5 h-5 shrink-0" />
              <div className="flex-1">
                 <p className="text-xs font-bold leading-tight">Confused about support types?</p>
                 <p className="text-[10px] text-zinc-500 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">Launch our matching flow to find the right clinical partner →</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
