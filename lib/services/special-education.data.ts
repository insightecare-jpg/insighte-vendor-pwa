import { ServicePageData } from "@/types/services";

export const specialEducationData: ServicePageData = {
  hero: {
    headline: "Remedial & Special Education in Bangalore",
    subheadline: "Bridging the academic gap with personalized IEPs and innovative teaching methods tailored to your child's unique brain.",
    trustBadge: "50+ School Partnerships",
    primaryCTA: {
      text: "Get IEP Assessment",
      href: "/booking/checkout?type=consultation&service=special-education",
    },
    secondaryCTA: {
      text: "Compare Specialists",
      href: "/specialists?category=Special%20Education",
    },
  },
  signs: [
    { id: "reading", text: "Struggles to Read", icon: "📖" },
    { id: "numbers", text: "Math Confusion", icon: "🔢" },
    { id: "writing", text: "Reversing Letters", icon: "✍️" },
    { id: "slow", text: "Slow Academic Progress", icon: "📉" },
  ],
  conditions: [
    {
      id: "dyslexia",
      title: "Dyslexia (Reading)",
      description: "Specialized phonics and multisensory reading instruction to build literacy.",
      icon: "🔤",
    },
    {
      id: "dysgraphia",
      title: "Dysgraphia (Writing)",
      description: "Strategies to overcome motor and cognitive hurdles in writing and composition.",
      icon: "🖌️",
    },
    {
      id: "dyscalculia",
      title: "Dyscalculia (Math)",
      description: "Building conceptual number sense through visual and tactile learning.",
      icon: "🧮",
    },
    {
      id: "slow-learner",
      title: "Slow Learners / LD",
      description: "Patience-first teaching that adapts the curriculum to the child's pace.",
      icon: "🐢",
    },
  ],
  ageGroups: [
    {
      id: "foundation",
      title: "Foundation Years",
      ageRange: "4 - 7 Years",
      description: "Establishing pre-literacy and pre-numeracy skills with multi-sensory tools.",
      focusPoints: ["Letter sounds", "Number recognition", "Social play"],
      icon: "🧱",
    },
    {
      id: "primary-ed",
      title: "Middle School Support",
      ageRange: "8 - 13 Years",
      description: "Mastering reading comprehension, math procedures, and study habits.",
      focusPoints: ["Reading fluency", "Paragraph writing", "Problem solving"],
      icon: "📚",
    },
    {
      id: "nios",
      title: "NIOS / Board Prep",
      ageRange: "14+ Years",
      description: "Alternative board path support for students pursuing NIOS or vocational streams.",
      focusPoints: ["Exam prep", "Vocational training", "Functional literacy"],
      icon: "🎓",
    },
  ],
  steps: [
    { title: "Academic Audit", description: "Mapping the exact gaps between the child's current level and grade expectations." },
    { title: "IEP Design", description: "Creating a roadmap with defined, measurable goals for the next 6 months." },
    { title: "Bridge Learning", description: "1-on-1 sessions that focus on teaching 'how to learn' alongside 'what to learn'." },
  ],
  valueProps: [
    { title: "Multi-Sensory", description: "We use sight, sound, touch, and motion to make concepts stick permanently.", icon: "🌈" },
    { title: "Flexible Boarding", description: "Expert guidance for NIOS and inclusive board accommodations.", icon: "🏛️" },
    { title: "Confidence First", description: "We build the child's self-esteem by starting with what they CAN do.", icon: "💪" },
  ],
  faqs: [
    { question: "Can remedial therapy happen after school?", answer: "Yes, most of our students take remedial sessions in the evenings or on weekends." },
    { question: "Do you help with school integration?", answer: "Yes, we often liaise with schools to implement accommodations and shadow support." },
    { question: "How is it different from tuition?", answer: "Tuition helps with homework; special education fixes the foundational processing gaps." },
  ],
  pricing: {
    basePrice: 900,
    currency: "INR",
    description: "Per 60-minute remedial session",
  },
  therapists: [
    {
      id: "exp-7",
      name: "Mrs. Shanti Devi",
      tagline: "Special Educator",
      category: "Special Education",
      avatar_url: "/images/experts/special_educator.png",
      experience_years: 15,
      rating: 5.0,
      review_count: 61,
      specializations: ["IEP Design", "Learning Support", "Dyslexia"],
      first_session_price: 900,
      is_verified: true,
      bio: "Senior educator focused on inclusive schooling and personalized curriculum adaptation for diverse learning needs.",
      booking_count: 180,
    },
    {
      id: "exp-8",
      name: "Sonia Kuruvilla",
      tagline: "Remedial Educator",
      category: "Special Education",
      avatar_url: "/images/experts/behavioral_specialist.png",
      experience_years: 9,
      rating: 4.9,
      review_count: 112,
      specializations: ["Math Support", "Phonics"],
      first_session_price: 1100,
      is_verified: true,
      bio: "Master of multi-sensory teaching techniques with a passion for unlocking reading and math potential.",
      booking_count: 140,
    },
  ],
  metadata: {
    title: "Special Education & Remedial Therapy Bangalore | Dyslexia & NIOS",
    description: "Personalized special education and remedial therapy in Bangalore. Expert support for dyslexia, dyscalculia, ADHD, and NIOS board preparation. Building academic confidence.",
    keywords: ["Special education Bangalore", "Remedial therapy near me", "Dyslexia specialist Bangalore", "NIOS board coaching"],
  }
};
