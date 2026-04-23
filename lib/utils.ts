import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}…`;
}

export const normalizeCategory = (cat: string) => {
  if (!cat) return "Consultant";
  const c = cat.toLowerCase();
  if (c === "ot" || c === "occupational therapist" || c === "occupational therapy (ot)") return "Occupational Therapy";
  if (c === "aba" || c === "applied behavior analysis") return "Behavior Therapy";
  if (c === "slp" || c === "speech language pathologist") return "Speech Therapy";
  return cat;
};

export function getExpertImage(provider: any): string {
  if (!provider) return "/images/placeholder-expert.png";
  
  // 1. Check direct image fields
  // Handle empty strings or nulls
  if (provider.avatar_url && provider.avatar_url.trim() !== "") return provider.avatar_url;
  if (provider.profile_image && provider.profile_image.trim() !== "") return provider.profile_image;
  
  // 2. Category-based fallback
  // Collect all potential category descriptors
  const specs = [...(provider.specializations || []), ...(provider.specialisations || []), ...(provider.services || [])]
    .map(s => typeof s === 'string' ? s : (s.title || s.name || ""))
    .join(" ")
    .toLowerCase();
    
  const catDescription = (
    (provider.category || "") + " " + 
    (provider.provider_type || "") + " " + 
    specs
  ).toLowerCase();
  
  if (catDescription.includes("speech") || catDescription.includes("slp") || catDescription.includes("language")) 
    return "/images/experts/speech_therapist.png";
  
  if (catDescription.includes("autism") || catDescription.includes("aba") || catDescription.includes("behavior")) 
    return "/images/experts/autism_specialist.png";
  
  if (catDescription.includes("counsel") || catDescription.includes("psycholog") || catDescription.includes("mental")) 
    return "/images/experts/behavioral_specialist.png";
    
  if (catDescription.includes("occupational") || catDescription.includes("ot") || catDescription.includes("sensory")) 
    return "/images/experts/occupational_therapy.png";

  if (catDescription.includes("physio")) 
    return "/images/experts/physiotherapist.png";
    
  if (catDescription.includes("special ed") || catDescription.includes("tutor") || catDescription.includes("teacher") || catDescription.includes("learn")) 
    return "/images/experts/special_educator.png";
  
  // 3. Final default
  return "/images/experts/special_educator.png";
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};
