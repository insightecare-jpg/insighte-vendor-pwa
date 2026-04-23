"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Calendar, Menu, X, Heart, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/ui/search-bar";

import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Experts", href: "/specialists" },
  { name: "Services", href: "/services" },
  { name: "Programs", href: "/programs" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 transition-all duration-500">
      <nav
        className={cn(
          "mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between rounded-[2.5rem] px-6 md:px-10 transition-all duration-700 backdrop-blur-3xl shadow-2xl",
          isScrolled
            ? "bg-[#0d0f1a]/80 border border-white/10 scale-[0.99] shadow-[#000]/40"
            : "bg-white/[0.03] border border-white/10"
        )}
      >
        <div className="flex items-center gap-8 md:gap-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#8b7ff0] text-[#0a0b14] transition-all group-hover:rotate-[10deg] shadow-lg shadow-[#8b7ff0]/20">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white italic font-dm-serif">
              Insighte
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#8b7ff0] transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          {/* Global Search - Integrated */}
          {pathname !== "/" && (
            <div className="hidden lg:block">
              <SearchBar variant="nav" />
            </div>
          )}

          <div className="hidden sm:flex items-center gap-6">
            <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all">
              Login
            </Link>
            <Link href="/triage">
              <Button className="h-14 rounded-2xl bg-white/5 text-white border border-white/10 px-8 font-black text-[10px] uppercase tracking-widest hover:bg-[#8b7ff0] hover:text-[#0a0b14] hover:border-none transition-all shadow-xl active:scale-95 flex items-center gap-3">
                Get Matched <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-white/60" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#0a0b14]/fb backdrop-blur-[60px] p-8"
          >
            <button
              className="absolute top-8 right-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-7 w-7 text-white/60" />
            </button>

            <div className="flex flex-col items-center gap-10 text-center w-full max-w-sm">
              <div className="space-y-6 w-full">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-4xl font-black tracking-tighter text-white hover:text-[#8b7ff0] transition-colors italic font-dm-serif"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="h-px w-24 bg-white/10" />
              
              <div className="w-full space-y-4">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full h-16 text-white/60 font-black text-xs uppercase tracking-widest">
                    Existing User Login
                  </Button>
                </Link>
                <Link href="/triage" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full h-20 rounded-3xl bg-[#8b7ff0] text-[#0a0b14] font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 shadow-2xl shadow-[#8b7ff0]/20">
                    Get Matched <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
