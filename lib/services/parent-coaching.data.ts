import { ServicePageData } from "@/types/services";

export const parentCoachingData: ServicePageData = {
  hero: {
    headline: "Parent Coaching: Stop Managing, Start Connecting",
    subheadline: "You are your child's best therapist. We provide the strategies, emotional support, and tools you need to navigate neurodivergence with confidence.",
    trustBadge: "Trusted by 1000+ Parents Nationwide",
    primaryCTA: {
      text: "Book Discovery Call",
      href: "/booking/checkout?type=consultation&service=parent-coaching",
    },
    secondaryCTA: {
      text: "Join Parent Community",
      href: "/community",
    },
  },
  signs: [
    { id: "overwhelmed", text: "Feeling Overwhelmed", icon: "🤯" },
    { id: "burned-out", text: "Parental Burnout", icon: "🕯️" },
    { id: "guilt", text: "Constant Parent Guilt", icon: "😔" },
    { id: "isolation", text: "Feeling Alone in the Journey", icon: "🤝" },
  ],
  conditions: [
    {
      id: "behavior-management",
      title: "Behavior Management",
      description: "Learning how to de-escalate meltdowns and understand the sensory needs behind challenging actions.",
      icon: "🫂",
    },
    {
      id: "self-care",
      title: "Parental Resilience",
      description: "Preserving your own mental health while caring for a child with high support needs.",
      icon: "🧘",
    },
    {
      id: "school-advocacy",
      title: "School Advocacy",
      description: "How to work with schools to ensure your child's IEP/needs are actually being met.",
      icon: "🏫",
    },
    {
      id: "communication",
      title: "Connection Strategies",
      description: "Building a relationship based on trust and safety rather than just compliance and rules.",
      icon: "💬",
    },
  ],
  ageGroups: [
    {
      id: "new-diagnosis",
      title: "Newly Diagnosed",
      ageRange: "All Ages",
      description: "Processing the diagnosis and building a roadmap for the first 12 months.",
      focusPoints: ["Grief processing", "Therapy planning", "Understanding labels"],
      icon: "🗞️",
    },
    {
      id: "toddlers-parents",
      title: "Toddler Parents",
      ageRange: "2 - 6 Years",
      description: "Managing early behaviors, feeding challenges, and sleep-related stressors.",
      focusPoints: ["Sleep hygiene", "Feeding support", "Play skills"],
      icon: "🧸",
    },
    {
      id: "teens-parents",
      title: "Teen/Adult Parents",
      ageRange: "13+ Years",
      description: "Transitioning to independence, vocational planning, and puberty-related support.",
      focusPoints: ["Puberty support", "Vocational prep", "Safeguarding"],
      icon: "🔑",
    },
  ],
  steps: [
    { title: "Personal Audit", description: "A 1-on-1 session to identify your biggest daily stressors and family dynamics." },
    { title: "Weekly Strategy", description: "Actionable, easy-to-implement changes to yours and your child's routine." },
    { title: "Direct Coaching", description: "Real-time feedback via video or in-person as you interact with your child." },
  ],
  valueProps: [
    { title: "Evidence-Based", description: "We use science-backed methods like NDBI and Positive Parenting (Triple P).", icon: "🔬" },
    { title: "Judgement-Free Zone", description: "We've seen it all. There is no 'wrong' way to feel as a parent.", icon: "🕊️" },
    { title: "Sustainability", description: "We build systems that work for YOUR lifestyle, not just ideal scenarios.", icon: "♻️" },
  ],
  faqs: [
    { question: "Is this like therapy for me?", answer: "It's coaching. While we support your mental health, the focus is on practical strategies for your child's needs." },
    { question: "Can both parents attend?", answer: "Highly recommended! Continuity between caregivers is the biggest predictor of success." },
    { question: "How often are the sessions?", answer: "Usually once a week for 8-12 weeks, with check-ins as needed thereafter." },
  ],
  pricing: {
    basePrice: 2000,
    currency: "INR",
    description: "Per 60-minute intensive coaching session",
  },
  therapists: [
    {
      id: "exp-9",
      name: "Sujatha Menon",
      tagline: "Parent Coach & Psychologist",
      category: "Parent Coaching",
      avatar_url: "/images/experts/counselor.png",
      experience_years: 15,
      rating: 5.0,
      review_count: 540,
      specializations: ["Neuro-Affirmative Parenting", "Burnout Recovery"],
      first_session_price: 2000,
      is_verified: true,
      bio: "Helping families shift from 'surviving' the diagnosis to 'thriving' together as a neuro-inclusive unit.",
      booking_count: 890,
    },
    {
      id: "exp-11",
      name: "Lakshmi Iyer",
      tagline: "Family & Child Psychologist",
      category: "Parent Coaching",
      avatar_url: "/images/experts/expert_1.png",
      experience_years: 10,
      rating: 4.8,
      review_count: 142,
      specializations: ["Behavioral Support", "Sibling Dynamics"],
      first_session_price: 1800,
      is_verified: true,
      bio: "Creating a bridge of understanding between parents and children through empathetic communication.",
      booking_count: 310,
    },
  ],
  metadata: {
    title: "Parent Coaching & Support Bangalore | Neuro-Affirmative Guidance",
    description: "Practical parent coaching for neurodivergent families. Manage behaviors, reduce burnout, and build stronger connections with your child. Judgement-free expert support.",
    keywords: ["Parent coaching Bangalore", "Neurodivergent parenting support", "Autism parent training", "Special needs parenting tools"],
  }
};
