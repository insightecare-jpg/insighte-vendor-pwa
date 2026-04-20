import { Provider } from "./index";

export interface ServiceHero {
  headline: string;
  subheadline: string;
  trustBadge: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
}

export interface ServiceSign {
  id: string;
  text: string;
  icon: string;
}

export interface ServiceCondition {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AgeGroupPathway {
  id: string;
  title: string;
  ageRange: string;
  description: string;
  focusPoints: string[];
  icon: string;
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceValueProp {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServicePageData {
  hero: ServiceHero;
  signs: ServiceSign[];
  conditions: ServiceCondition[];
  ageGroups: AgeGroupPathway[];
  steps: ServiceStep[];
  valueProps: ServiceValueProp[];
  faqs: ServiceFAQ[];
  pricing: {
    basePrice: number;
    currency: string;
    description: string;
  };
  therapists: Partial<Provider>[];
}
