import { ServicePageData } from "@/types/services";

export const speechTherapyData: ServicePageData = {
  hero: {
    headline: "Speech Therapy for Children in Bangalore",
    subheadline: "Helping late talkers, stuttering, and communication challenges — with neuro-affirmative care that celebrates your child's voice.",
    trustBadge: "500+ Happy Families in Bangalore",
    primaryCTA: {
      text: "Book a Session",
      href: "/book?service=speech-therapy",
    },
    secondaryCTA: {
      text: "Chat on WhatsApp",
      href: "https://wa.me/91XXXXXXXXXX",
    },
  },
  signs: [
    { id: "late-talking", text: "Late Talking", icon: "👶" },
    { id: "stuttering", text: "Stuttering", icon: "👄" },
    { id: "articulation", text: "Hard to Understand", icon: "❓" },
    { id: "social", text: "Difficulty with Social Cues", icon: "🤝" },
  ],
  conditions: [
    {
      id: "speech-delay",
      title: "Speech & Language Delay",
      description: "When a child isn't hitting verbal milestones at the expected age, we help bridge the gap efficiently.",
      icon: "📣",
    },
    {
      id: "stammering",
      title: "Stammering / Stuttering",
      description: "Building fluency and confidence through gentle, evidence-based communication strategies.",
      icon: "💬",
    },
    {
      id: "asd-comm",
      title: "Autism-Related Communication",
      description: "Supporting neurodivergent children in expressing their needs and navigating social interactions.",
      icon: "🧩",
    },
    {
      id: "social-comm",
      title: "Social Communication",
      description: "Helping children understand social nuances, body language, and the 'whys' of conversation.",
      icon: "🎭",
    },
  ],
  ageGroups: [
    {
      id: "early-intervention",
      title: "Early Intervention",
      ageRange: "0 - 3 Years",
      description: "Critical window for brain development. We focus on play-based communication and parent training.",
      focusPoints: ["Late talking", "Joint attention", "First words", "Responsive feeding"],
      icon: "🐣",
    },
    {
      id: "preschool",
      title: "The Preschoolers",
      ageRange: "3 - 5 Years",
      description: "Focusing on sentence structure, vocabulary expansion, and preparing for the school environment.",
      focusPoints: ["Pronunciation", "Following multi-step instructions", "Sentence building"],
      icon: "🎒",
    },
    {
      id: "school-age",
      title: "School Age",
      ageRange: "6+ Years",
      description: "Addressing complex language processing, reading readiness, and social-emotional confidence.",
      focusPoints: ["Social skills", "Public speaking", "Grammar & Narratives", "Reading support"],
      icon: "🏫",
    },
  ],
  steps: [
    { title: "Select a Specialist", description: "Choose from our pool of 48+ verified experts based on your location and child's needs." },
    { title: "Initial Assessment", description: "A detailed session to understand your child's current level and create a personalized roadmap." },
    { title: "Ongoing Sessions", description: "Fun, engaging, and results-oriented therapy delivered at home or online." },
  ],
  valueProps: [
    { title: "Hyper-Personalized", description: "Every child is unique. Our therapy plans are custom-built for your child's specific brain type.", icon: "🎯" },
    { title: "Home or Online", description: "Skip the Bangalore traffic. Get world-class therapy in the comfort of your living room.", icon: "🏠" },
    { title: "Parent-First", description: "We coach you to be the primary support, ensuring progress continues between sessions.", icon: "❤️" },
  ],
  faqs: [
    { question: "When should we start therapy?", answer: "Early intervention is key. If you notice your child isn't reaching milestones by 18-24 months, an assessment is highly recommended." },
    { question: "How long is a session?", answer: "Standard sessions are 45 minutes of direct therapy, followed by a 15-minute briefing for parents." },
    { question: "Can we do online and offline sessions?", answer: "Yes! Many families prefer a hybrid model for flexibility and continuity." },
  ],
  pricing: {
    basePrice: 1200,
    currency: "INR",
    description: "Per 60-minute session (Assessment + Plan)",
  },
  therapists: [
    {
      id: "1",
      name: "Lakshmy Balachandran",
      avatar_url: "/experts/lakshmy.jpg",
      experience_years: 6,
      rating: 4.8,
      review_count: 121,
      specializations: ["Speech Delay", "Early Intervention"],
      first_session_price: 1200,
    },
    {
      id: "2",
      name: "Dr. Sandeep Singh",
      avatar_url: "/experts/sandeep.jpg",
      experience_years: 12,
      rating: 4.9,
      review_count: 345,
      specializations: ["Stuttering Specialist", "Fluency"],
      first_session_price: 1500,
    },
    {
      id: "3",
      name: "Priyanaka Murthy",
      avatar_url: "/experts/priyanka.jpg",
      experience_years: 8,
      rating: 4.7,
      review_count: 89,
      specializations: ["Autism Communication", "Social Skills"],
      first_session_price: 1300,
    },
  ],
};
