

export const SERVICE_GROUPS = [
  {
    name: "Therapy",
    color: "#D3C4B5",
    services: ["Special Education", "Behavior Therapy", "Speech Therapy", "Occupational Therapy", "Early Intervention", "Play Therapy", "Physiotherapy"]
  },
  {
    name: "Counselling",
    color: "#C8C4DB",
    services: ["Children's Counselling", "Online Counselling", "Family Counselling", "Career Counselling", "Parental Guidance", "Support Groups"]
  },
  {
    name: "Tutoring",
    color: "#BACCB3",
    services: [
      "English", "Maths", "Science", "Social Studies", "Hindi", "Kannada", "French", "German",
      "Pre-Primary", "Junior", "High School", "Graduation", "CBSE", "ICSE", "IB", "State Board", "Cambridge board", "NIOS", "Homework Support"
    ]
  },
  {
    name: "Extra Curricular",
    color: "#D3C4B5",
    services: ["Dance", "Music", "Yoga", "Drawing or Painting", "Singing", "Sports Trainer", "General Physical Training"]
  },
  {
    name: "Modern Skills",
    color: "#BACCB3",
    services: ["Coding (C/C++, Python, JAVA)", "Digital Art", "Soft Skills", "Public Speaking", "Other Language"]
  },
  {
    name: "Specialist Roles",
    color: "#C8C4DB",
    services: ["Special Educator", "Shadow Teacher", "Home Tutor", "Therapist"]
  }
];

export const ALL_CATEGORIES = [
  "All",
  ...SERVICE_GROUPS.flatMap(group => group.services)
];

export const TOP_LEVEL_FILTERS = [
  "All",
  "Therapy",
  "Counselling",
  "Tutoring",
  "Extra Curricular",
  "Modern Skills",
  "Specialist Roles"
];

export const AGE_GROUPS = [
  "Toddlers (2-4)",
  "Pre-Primary (4-6)",
  "Primary (6-10)",
  "Adolescents (10+)",
  "Young Adults (19+)"
];

export const FEATURED_EXPERTS = [
  {
    id: "1",
    name: "Dr. Jyoti B.",
    provider_type: "Autism Specialist",
    category: "Autism",
    specializations: ["ABA Therapy", "Early Intervention"],
    rating_avg: 4.9,
    review_count: 124,
    city: "Bangalore",
    avatar_url: "/images/experts/autism_specialist.png",
    experience_years: 12,
    total_bookings: 340,
    bio: "Clinical psychologist specializing in neuro-developmental support and family guidance through evidence-based ABA therapy.",
    consultation_fee: 1500,
    is_verified: true,
    mode: "In-Person",
    session_modes: ["IN_PERSON", "ONLINE"],
    slug: "jyoti-b",
    suitability_notes: "Specializes in high-density neuro-affirmative design and behavioral engineering for complex developmental profiles.",
    verified_sessions_count: 340
  },
  {
    id: "2",
    name: "Arjun M.",
    provider_type: "Special Educator",
    category: "Special Education",
    specializations: ["IEP Design", "Learning Support"],
    rating_avg: 5.0,
    review_count: 61,
    city: "Mumbai",
    avatar_url: "/images/experts/special_educator.png",
    experience_years: 15,
    total_bookings: 180,
    bio: "Senior educator focused on inclusive schooling and personalized curriculum adaptation for diverse learning needs.",
    consultation_fee: 900,
    is_verified: true,
    mode: "In-Person",
    session_modes: ["IN_PERSON"],
    slug: "arjun-m",
    suitability_notes: "Senior expert in IEP design and academic scaffolding for primary schoolers.",
    verified_sessions_count: 180
  },
  {
    id: "3",
    name: "Ayesha K.",
    provider_type: "Speech Therapist",
    category: "Speech Therapy",
    specializations: ["Articulation", "Language Delay"],
    rating_avg: 4.8,
    review_count: 98,
    city: "Delhi",
    avatar_url: "/images/experts/speech_therapist.png",
    experience_years: 8,
    total_bookings: 210,
    bio: "Dedicated speech-language pathologist helping children overcome communication hurdles with fun, engaging virtual sessions.",
    consultation_fee: 1200,
    is_verified: true,
    mode: "Online",
    session_modes: ["ONLINE"],
    slug: "ayesha-k",
    suitability_notes: "Expert in play-based speech intervention and non-verbal communication strategies.",
    verified_sessions_count: 210
  },
  {
    id: "4",
    name: "Samuel D.",
    provider_type: "Child Counsellor",
    category: "Child Counselling",
    specializations: ["CBT", "Social Skills"],
    rating_avg: 4.9,
    review_count: 87,
    city: "Kochi",
    avatar_url: "/images/experts/behavioral_specialist.png",
    experience_years: 10,
    total_bookings: 290,
    bio: "Specialist in ADHD management and emotional regulation, helping children build long-term resilience and focus.",
    consultation_fee: 1800,
    is_verified: true,
    mode: "In-Person",
    session_modes: ["IN_PERSON", "ONLINE"],
    slug: "samuel-d",
    suitability_notes: "Focuses on CBT-based emotional regulation and social skills training for adolescents.",
    verified_sessions_count: 290
  },
  {
    id: "5",
    name: "Kavita S.",
    provider_type: "Occupational Therapist",
    category: "Occupational Therapy",
    specializations: ["Sensory Integration", "Motor Skills"],
    rating_avg: 4.9,
    review_count: 75,
    city: "Bangalore",
    avatar_url: "/images/experts/occupational_therapy.png",
    experience_years: 7,
    total_bookings: 156,
    bio: "Expert OT with a passion for sensory-friendly environments and functional independence in early childhood.",
    consultation_fee: 1100,
    is_verified: true,
    mode: "In-Clinic",
    session_modes: ["IN_PERSON"],
    slug: "kavita-s",
    suitability_notes: "Specializes in sensory diet implementation and fine motor milestone bridging.",
    verified_sessions_count: 156
  },
  {
    id: "6",
    name: "Meera Nayak",
    provider_type: "Behavioral Specialist",
    category: "Behavior Therapy",
    specializations: ["Positive Behavior Support", "Social Stories"],
    rating_avg: 4.8,
    review_count: 52,
    city: "Mangalore",
    avatar_url: "/images/experts/behavioral_specialist.png",
    experience_years: 9,
    total_bookings: 142,
    bio: "Behavioral analyst focusing on compassionate, neuro-affirming strategies for social-emotional growth.",
    consultation_fee: 1000,
    is_verified: true,
    mode: "Online",
    session_modes: ["ONLINE"],
    slug: "meera-nayak",
    suitability_notes: "Expert in social stories and school-based behavioral integration.",
    verified_sessions_count: 142
  },
  {
    id: "7",
    name: "Dr. Omar Farooq",
    provider_type: "Neuropsychologist",
    category: "Child Counselling",
    specializations: ["Cognitive Assessment", "Parental Guidance"],
    rating_avg: 4.9,
    review_count: 31,
    city: "Hyderabad",
    avatar_url: "/images/experts/autism_specialist.png",
    experience_years: 14,
    total_bookings: 89,
    bio: "Providing clinical insights into cognitive profiles and designing neurological roadmaps for balanced growth.",
    consultation_fee: 2000,
    is_verified: true,
    mode: "In-Person",
    session_modes: ["IN_PERSON"],
    slug: "omar-farooq",
    suitability_notes: "Specializes in complex neurological assessments and longitudinal care planning.",
    verified_sessions_count: 89
  },
  {
    id: "8",
    name: "Thivya R.",
    provider_type: "Special Educator",
    category: "Special Education",
    specializations: ["Remedial Tutoring", "Dyslexia Support"],
    rating_avg: 4.7,
    review_count: 45,
    city: "Chennai",
    avatar_url: "/images/experts/special_educator.png",
    experience_years: 6,
    total_bookings: 110,
    bio: "Passionate about literacy and numeracy through multi-sensory teaching tools and adaptive pedagogy.",
    consultation_fee: 850,
    is_verified: true,
    mode: "In-Clinic",
    session_modes: ["IN_PERSON"],
    slug: "thivya-r",
    suitability_notes: "Expert in Orton-Gillingham inspired methodologies for reading support.",
    verified_sessions_count: 110
  }
];
