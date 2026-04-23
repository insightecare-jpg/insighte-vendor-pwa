import { ServicePageData } from "@/types/services";

export const remedialEducationData: ServicePageData = {
  hero: {
    headline: "Remedial Education: Bridging the Academic Gap",
    subheadline: "Every child learns differently. Our remedial educators in Bangalore specialize in Dyslexia, Dysgraphia, and Dyscalculia support to help your child excel in school.",
    trustBadge: "Expert Special Educators",
    primaryCTA: {
      text: "Book Assessment",
      href: "/booking/checkout?type=consultation&service=remedial-education",
    },
    secondaryCTA: {
      text: "Explore Programs",
      href: "#programs",
    },
  },
  signs: [
    { id: "reading", text: "Struggling to Read", icon: "📖" },
    { id: "writing", text: "Messy/Slow Writing", icon: "✍️" },
    { id: "math", text: "Difficulty with Numbers", icon: "🔢" },
    { id: "exam-anxiety", text: "High Exam Anxiety", icon: "😰" },
  ],
  conditions: [
    {
      id: "dyslexia",
      title: "Dyslexia Support",
      description: "Specialized phonics-based reading support to help children decode words and improve fluency.",
      icon: "📚",
    },
    {
      id: "dyscalculia",
      title: "Math Support",
      description: "Visual and hands-on methods to understand number relationships and mathematical logic.",
      icon: "🧮",
    },
    {
      id: "adhd-academic",
      title: "Executive Function",
      description: "Techniques for organization, planning, and focus for students who struggle to 'get started'.",
      icon: "📁",
    },
    {
      id: "learning-gaps",
      title: "Academic Catch-up",
      description: "Targeted support for children who have fallen behind due to illness, school changes, or anxiety.",
      icon: "🪜",
    },
  ],
  ageGroups: [
    {
      id: "primary",
      title: "Primary Years",
      ageRange: "6 - 10 Years",
      description: "Foundational literacy and numeracy skills using multisensory techniques.",
      focusPoints: ["Phonics", "Number sense", "Handwriting"],
      icon: "🖍️",
    },
    {
      id: "middle-school",
      title: "Middle School",
      ageRange: "11 - 14 Years",
      description: "Focus on reading comprehension, essay writing, and independent study habits.",
      focusPoints: ["Report writing", "Summarizing", "Memory techniques"],
      icon: "📔",
    },
    {
      id: "board-prep",
      title: "High School / NIOS",
      ageRange: "15+ Years",
      description: "Exam strategies, accommodations support, and alternative schooling pathways like NIOS.",
      focusPoints: ["NIOS support", "Study planning", "Career guidance"],
      icon: "🎓",
    },
  ],
  steps: [
    { title: "Skill Baseline", description: "Standardized testing to identify the exact academic 'blockages' in literacy and math." },
    { title: "Individualized Plan", description: "A roadmap that focuses on the child's strengths to overcome their academic hurdles." },
    { title: "School Collaboration", description: "We work with your child's teachers to implement accommodations in the classroom." },
  ],
  valueProps: [
    { title: "Multisensory Learning", description: "VAK (Visual, Auditory, Kinesthetic) methods that match your child's learning profile.", icon: "🖌️" },
    { title: "Strength-Based", description: "We make learning fun again by incorporating the child's interests into the curriculum.", icon: "🚀" },
    { title: "Confidence First", description: "We rebuild the self-esteem often damaged by a traditional 'one-size-fits-all' education.", icon: "💪" },
  ],
  faqs: [
    { question: "Is this the same as tuition?", answer: "No. Tuitions follow the school curriculum; Remedial Education builds the foundational skills (like phonics or logic) needed to *follow* any curriculum." },
    { question: "Do you support NIOS?", answer: "Yes! We specialize in supporting students registered under the National Institute of Open Schooling (NIOS)." },
    { question: "How long does it take?", answer: "Remediation is a process. Most children show significant improvement in 6-12 months of consistent support." },
  ],
  pricing: {
    basePrice: 1000,
    currency: "INR",
    description: "Per 60-minute specialized remedial session",
  },
  therapists: [
    {
      id: "exp-10",
      name: "Anupama Shastry",
      tagline: "Remedial Educator",
      category: "Remedial Education",
      avatar_url: "/images/experts/special_educator.png",
      experience_years: 12,
      rating: 4.9,
      review_count: 234,
      specializations: ["Dyslexia Specialist", "Orton-Gillingham"],
      first_session_price: 1100,
      is_verified: true,
      bio: "Helping students 'crack the code' of reading and writing through scientifically proven multisensory methods.",
      booking_count: 560,
    },
    {
      id: "exp-12",
      name: "Sarthak Verma",
      tagline: "Special Educator",
      category: "Remedial Education",
      avatar_url: "/images/experts/expert_2.png",
      experience_years: 8,
      rating: 4.7,
      review_count: 95,
      specializations: ["Dysgraphia Support", "Math Logic"],
      first_session_price: 1000,
      is_verified: true,
      bio: "Making academic concepts accessible and engaging for students with diverse learning needs.",
      booking_count: 180,
    },
  ],
  metadata: {
    title: "Remedial Education Bangalore | Support for Dyslexia & Learning Gaps",
    description: "Specialized remedial education in Bangalore for children with Dyslexia, ADHD, and learning gaps. Multisensory learning techniques to rebuild academic confidence.",
    keywords: ["Remedial education Bangalore", "Dyslexia support for kids", "Learning disability help", "Academic catch-up sessions"],
  }
};
