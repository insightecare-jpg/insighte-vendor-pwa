"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Calendar, 
  Users, 
  Settings,
  MessageSquare,
  Sparkles,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/parent/dashboard" },
  { icon: Calendar, label: "Sessions", href: "/parent/sessions" },
  { icon: Sparkles, label: "Book Care", href: "/specialists", highlight: true },
  { icon: Users, label: "Children", href: "/parent/children" },
  { icon: UserCircle, label: "Account", href: "/parent/profile" },
];

export function ParentBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[calc(80px+env(safe-area-inset-bottom))] bg-[#0d0f1a]/80 backdrop-blur-3xl border-t border-white/10 md:hidden z-50 px-6 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-between h-20 max-w-lg mx-auto relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/parent/dashboard" && pathname.startsWith(item.href));
          
          if (item.highlight) {
            return (
              <Link key={item.href} href={item.href} className="relative -top-6">
                <div className="h-16 w-16 rounded-full bg-[#8b7ff0] flex items-center justify-center shadow-xl shadow-[#8b7ff0]/20 hover:scale-110 active:scale-95 transition-all">
                  <item.icon className="h-7 w-7 text-[#0d0f1a] fill-current" />
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest text-[#8b7ff0] italic">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all duration-500",
                isActive ? "text-white" : "text-white/40"
              )}
            >
              <div className="relative">
                <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5px] text-[#8b7ff0]")} />
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-[#8b7ff0]"
                  />
                )}
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest italic">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
