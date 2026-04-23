import { ServicePageData } from "@/types/services";

export const academicTutoringData: ServicePageData = {
  hero: {
    headline: "Academic Tutoring & Exam Prep in Bangalore",
    subheadline: "Bridging learning gaps and building confidence for CBSE, ICSE, and IB students with personalized 1:1 support.",
    trustBadge: "130+ Expert Tutors",
    primaryCTA: { text: "Find a Tutor", href: "/booking/checkout?type=consultation&service=academic-tutoring" },
    secondaryCTA: { text: "View Subjects", href: "#subjects" },
  },
  signs: [
    { id: "grades", text: "Dropping Grades", icon: "📉" },
    { id: "motivation", text: "Low Motivation", icon: "🥱" },
    { id: "exam-stress", text: "Exam Anxiety", icon: "😰" },
    { id: "gaps", text: "Concept Gaps", icon: "🧩" },
  ],
  conditions: [
    { id: "math-science", title: "Math & Science", description: "Foundational clarity for difficult concepts in STEM subjects.", icon: "📐" },
    { id: "humanities", title: "English & Humanities", description: "Developing critical thinking, writing, and analytical skills.", icon: "📚" },
    { id: "test-prep", title: "Test Preparation", description: "Strategic prep for Board exams, SATs, and entrance tests.", icon: "✍️" },
  ],
  ageGroups: [
    { id: "primary", title: "Primary", ageRange: "Class 1 - 5", description: "Building strong foundations in numeracy and literacy.", focusPoints: ["Reading", "Basic Math", "Curiosity"], icon: "🖍️" },
    { id: "middle", title: "Middle School", ageRange: "Class 6 - 8", description: "Transitioning to complex subjects and study habits.", focusPoints: ["Science", "Algebra", "Study Skills"], icon: "🧪" },
    { id: "high", title: "High School", ageRange: "Class 9 - 12", description: "Focusing on board exams and competitive applications.", focusPoints: ["Physics", "Economics", "Exam strategy"], icon: "🎓" },
  ],
  steps: [
    { title: "Matching", description: "We match your child with a tutor who understands their specific curriculum and learning style." },
    { title: "Assessment", description: "Identify specific knowledge gaps and learning preferences." },
    { title: "Targeted Learning", description: "Personalized sessions focused on conceptual clarity and confidence." },
  ],
  valueProps: [
    { title: "Custom Fit", description: "Tutors matched to your child's personality and pace.", icon: "🤝" },
    { title: "Home or Online", description: "Learn where your child is most comfortable.", icon: "🏠" },
    { title: "Verified Experts", description: "Top 5% of tutors from premium institutions.", icon: "🏅" },
  ],
  faqs: [
    { question: "Do you offer home tutoring?", answer: "Yes, we have a large network of tutors who provide in-home sessions across Bangalore and Delhi." },
    { question: "Can we change tutors if not a good match?", answer: "Absolutely. Finding the right connection is key to our success. We provide replacements if needed." },
  ],
  pricing: { basePrice: 800, currency: "INR", description: "Per hour of personalized tutoring" },
  therapists: [],
  metadata: {
    title: "Math Tutor & Academic Tutoring in Bangalore | CBSE, ICSE, IB",
    description: "Find expert academic tutors in Bangalore for CBSE, ICSE, and IB students. Maths, Science, English, and more. In-home, online, and centre-based sessions.",
    keywords: ["Academic tutoring Bangalore", "Math tutor near me", "CBSE coaching", "IB tutor Bangalore"],
  }
};

// Add more as needed for arts, sports, college
export const autismSupportData: ServicePageData = {
    hero: {
      headline: "Autism & Neurodiversity Support in Bangalore",
      subheadline: "Empowering neurodivergent children through strength-based, neuro-affirmative care that honors their unique perspective.",
      trustBadge: "30+ Neuro-Affirmative Specialists",
      primaryCTA: { text: "Book Assessment", href: "/booking/checkout?type=consultation&service=autism-support" },
      secondaryCTA: { text: "Meet Experts", href: "/booking/checkout?type=consultation&service=autism-support" },
    },
    signs: [
      { id: "sensory", text: "Sensory Needs", icon: "🌈" },
      { id: "social", text: "Social Navigation", icon: "🤝" },
      { id: "routine", text: "Routine Focus", icon: "📅" },
      { id: "interests", text: "Deep Interests", icon: "⭐" },
    ],
    conditions: [
      { id: "aba", title: "ABA & Early Steps", description: "Evidence-based behavioral support focused on functional life skills.", icon: "🧩" },
      { id: "sensory-int", title: "Sensory Integration", description: "Helping children manage environmental stimuli and regulation.", icon: "🌀" },
      { id: "social-comm", title: "Social Communication", description: "Navigating social nuances in a neuro-affirmative way.", icon: "💬" },
    ],
    ageGroups: [
        { id: "early", title: "Early Intervention", ageRange: "0 - 5 Years", description: "Focusing on foundational milestones and parent coaching.", focusPoints: ["Joint attention", "Play", "Communication"], icon: "🍼" },
        { id: "school", title: "School Support", ageRange: "6 - 12 Years", description: "Inclusive education support and classroom management.", focusPoints: ["Friendships", "Regulation", "Learning"], icon: "🎒" },
        { id: "teen", title: "Transition Support", ageRange: "13+ Years", description: "Building independence and self-advocacy skills.", focusPoints: ["Independence", "Interests", "Self-advocacy"], icon: "🚲" },
    ],
    steps: [
      { title: "Observation", description: "Understanding the child's strengths and support needs in their environment." },
      { title: "Inclusive Plan", description: "Collaborative goal setting with parents and educators." },
      { title: "Consistent Support", description: "Regular sessions at home or in centers for steady growth." },
    ],
    valueProps: [
      { title: "Neuro-Affirmative", description: "We believe in differences, not deficits.", icon: "🌈" },
      { title: "Family-Centered", description: "Supporting the entire family ecosystem.", icon: "🏠" },
      { title: "Expert Pool", description: "Verified BCBAs and special educators.", icon: "🏅" },
    ],
    faqs: [
      { question: "Is ABA therapy only for autism?", answer: "While often used for autism, its principles help with ADHD and other neurodivergent profiles too." },
      { question: "Do you provide school shadow teachers?", answer: "Yes, we specialize in providing trained shadow teachers for inclusive education." },
    ],
    pricing: { basePrice: 1500, currency: "INR", description: "Per specialized support session" },
    therapists: [],
    metadata: {
        title: "Autism Support Specialist in Bangalore | ABA, Early Intervention, Sensory",
        description: "Find autism & neurodiversity specialists in Bangalore and online. Covering ABA therapy, early intervention, ADHD, sensory processing, and inclusive education support.",
    }
};

export const shadowTeachingData: ServicePageData = {
    hero: {
      headline: "Professional Shadow Teachers for Inclusive Education",
      subheadline: "Dedicated 1:1 support for neurodivergent children in regular school environments, bridging the gap between inclusion and individual learning.",
      trustBadge: "60+ Verified School Shadows",
      primaryCTA: { text: "Book an Interview", href: "/booking/checkout?type=consultation&service=shadow-teaching" },
      secondaryCTA: { text: "Learn Process", href: "/booking/checkout?type=consultation&service=shadow-teaching" },
    },
    signs: [
      { id: "distraction", text: "Easily Distracted", icon: "🦋" },
      { id: "social", text: "Social Gaps", icon: "🤝" },
      { id: "task-init", text: "Task Initiation", icon: "🚀" },
      { id: "behavior", text: "Impulse Control", icon: "🛑" },
    ],
    conditions: [
      { id: "classroom-mgmt", title: "Classroom Management", description: "Helping the child follow school routines and teacher instructions.", icon: "🏫" },
      { id: "peer-interaction", title: "Peer Interaction", description: "Facilitating positive social connections during recess and group work.", icon: "💬" },
      { id: "curriculum-mod", title: "Instruction Simplification", description: "Adapting complex class instructions to the child's processing level.", icon: "🧩" },
    ],
    ageGroups: [
        { id: "kinder", title: "Kindergarten", ageRange: "3 - 6 Years", description: "Early school integration and routine setting.", focusPoints: ["Separation", "Basic Rules", "Focus"], icon: "🧸" },
        { id: "primary", title: "Primary School", ageRange: "6 - 12 Years", description: "Academic focus and complex social dynamics.", focusPoints: ["Self-regulation", "Note-taking", "Friendships"], icon: "🎒" },
        { id: "middle", title: "Middle School", ageRange: "12+ Years", description: "Fostering independence and self-advocacy.", focusPoints: ["Independence", "Executive Function", "Self-advocacy"], icon: "🚲" },
    ],
    steps: [
      { title: "Compatibility Match", description: "We match shadows based on the school's requirements and the child's personality." },
      { title: "Shadow Training", description: "Intensive training for the shadow teacher on the specific child's BP." },
      { title: "School Liaison", description: "Regular coordination between parents, teachers, and specialists." },
    ],
    valueProps: [
      { title: "Verified Profiles", description: "Thorough background and clinical verification.", icon: "🛡️" },
      { title: "Continuous Monitoring", description: "Quarterly progress reviews with our clinical head.", icon: "📊" },
      { title: "Replacement Guarantee", description: "Ensuring continuity of support if a shadow moves.", icon: "🔄" },
    ],
    faqs: [
      { question: "Does the school need to permit a shadow?", answer: "Yes, most mainstream schools in Bangalore require formal permission to allow a private shadow teacher." },
      { question: "Who pays the shadow teacher?", answer: "Usually, the parents pay for the shadow teacher directly through Insighte's managed platform." },
    ],
    pricing: { basePrice: 12000, currency: "INR", description: "Monthly managed shadow teaching support" },
    therapists: [],
    metadata: {
        title: "Shadow Teacher for Schools in Bangalore | Private Support Tutor",
        description: "Hire professional shadow teachers in Bangalore for 1:1 school support. Specialized in Autism, ADHD, and Learning Disabilities. Inclusive education experts.",
    }
};

export const musicArtsData: ServicePageData = {
    hero: {
      headline: "Therapeutic Music & Expressive Arts",
      subheadline: "Unlocking expression through melody, rhythm, and color. Sensory-friendly lessons for neurodivergent and gifted young minds.",
      trustBadge: "85+ Creative Instructors",
      primaryCTA: { text: "Book a Trial", href: "/booking/checkout?type=consultation&service=music-arts" },
      secondaryCTA: { text: "Explore Gallery", href: "/booking/checkout?type=consultation&service=music-arts" },
    },
    signs: [
      { id: "sensory", text: "Sensory Seeking", icon: "🌈" },
      { id: "comm", text: "Non-verbal Expression", icon: "🎹" },
      { id: "motor", text: "Fine Motor Gaps", icon: "🎨" },
      { id: "anxiety", text: "High Anxiety", icon: "🌊" },
    ],
    conditions: [
      { id: "piano-guitar", title: "Adaptive Instruments", description: "Piano, Guitar, and Drums taught with sensory needs in mind.", icon: "🎸" },
      { id: "visual-arts", title: "Visual Arts", description: "Painting, sketching, and digital art as a medium for focus.", icon: "🖌️" },
      { id: "rhythm", title: "Rhythm Therapy", description: "Using percussion to improve motor planning and coordination.", icon: "🥁" },
    ],
    ageGroups: [
        { id: "early", title: "Early Years", ageRange: "4 - 8 Years", description: "Sensory play through sound and color.", focusPoints: ["Coordination", "Joy", "Rhythm"], icon: "🎈" },
        { id: "junior", title: "Junior Artists", ageRange: "8 - 14 Years", description: "Skill building and emotional expression.", focusPoints: ["Technique", "Patience", "Focus"], icon: "🖼️" },
        { id: "advanced", title: "Advanced", ageRange: "14+ Years", description: "Specialized training and creative outlets.", focusPoints: ["Mastery", "Portfolio", "Performance"], icon: "🎭" },
    ],
    steps: [
      { title: "Artistic Assessment", description: "Understanding sensory triggers and artistic interest." },
      { title: "Trial Session", description: "A low-pressure introduction to the instrument or medium." },
      { title: "Creative Journey", description: "Adaptive curriculum building confidence through creation." },
    ],
    valueProps: [
      { title: "Sensory Friendly", description: "Adjusted light, volume, and texture for comfort.", icon: "🧘" },
      { title: "Skill-Based", description: "Real musical and artistic progress, not just play.", icon: "🏆" },
      { title: "Verified Artists", description: "Instructors trained in neurodiversity.", icon: "🏅" },
    ],
    faqs: [
      { question: "Do we need the instrument at home?", answer: "For music, having an instrument for practice is highly recommended after the trial." },
      { question: "Can this help with speech?", answer: "Yes, music therapy is often used to stimulate language and vocalization." },
    ],
    pricing: { basePrice: 600, currency: "INR", description: "Per hour of 1:1 creative session" },
    therapists: [],
    metadata: {
        title: "Music Therapy & Art Lessons for Children in Bangalore",
        description: "Enrol in sensory-friendly music and art lessons in Bangalore. Piano, Guitar, Painting, and more for neurodivergent children. Therapeutic creative arts.",
    }
};

export const codingStemData: ServicePageData = {
    hero: {
      headline: "Coding & STEM for Logical Thinkers",
      subheadline: "Empowering young innovators through Python, Scratch, and Robotics. Building logical structures for the neuro-diverse future.",
      trustBadge: "50+ Tech Mentors",
      primaryCTA: { text: "Join Coding Camp", href: "/booking/checkout?type=consultation&service=coding-stem" },
      secondaryCTA: { text: "See Projects", href: "/booking/checkout?type=consultation&service=coding-stem" },
    },
    signs: [
      { id: "patterns", text: "Loves Patterns", icon: "🔢" },
      { id: "logical", text: "Logical Thinker", icon: "🧩" },
      { id: "screen", text: "High Screen Affinity", icon: "💻" },
      { id: "detail", text: "Detail Oriented", icon: "🔍" },
    ],
    conditions: [
      { id: "visual-prog", title: "Visual Programming", description: "Using Scratch to learn logic without the frustration of syntax.", icon: "🐱" },
      { id: "web-dev", title: "Web & Python", description: "Real-world programming for adolescents building apps.", icon: "🐍" },
      { id: "robotics", title: "Robotics & STEM", description: "Hands-on engineering and physical computing.", icon: "🤖" },
    ],
    ageGroups: [
        { id: "explorers", title: "Explorers", ageRange: "7 - 10 Years", description: "Logic games and block-based coding.", focusPoints: ["Sequence", "Loops", "Fun"], icon: "🕹️" },
        { id: "creators", title: "Creators", ageRange: "11 - 15 Years", description: "Building websites and simple algorithms.", focusPoints: ["Syntax", "UI/UX", "Logic"], icon: "🏗️" },
        { id: "innovators", title: "Innovators", ageRange: "15+ Years", description: "Advanced Python and data science for teens.", focusPoints: ["APIs", "Data", "Projects"], icon: "🚀" },
    ],
    steps: [
      { title: "Tech Intake", description: "Assessing logical baseline and hardware setup." },
      { title: "Project Selection", description: "Picking a goal (Game, App, Robot) to work towards." },
      { title: "Skill Building", description: "Iterative sessions focusing on problem-solving." },
    ],
    valueProps: [
      { title: "Executive Function", description: "Coding naturally trains planning and debugging.", icon: "🧠" },
      { title: "High Retention", description: "Gamified learning keeps interest high.", icon: "⭐" },
      { title: "Future Ready", description: "Building skills for the technology-driven world.", icon: "🌐" },
    ],
    faqs: [
      { question: "Is this suitable for ADHD?", answer: "Yes, coding's immediate feedback loop is highly engaging for children with ADHD." },
      { question: "Do you provide laptops?", answer: "For home sessions, children usually use their own devices for continuity." },
    ],
    pricing: { basePrice: 800, currency: "INR", description: "Per session of specialized tech mentoring" },
    therapists: [],
    metadata: {
        title: "Coding Classes for Kids in Bangalore | Python, Scratch, STEM",
        description: "Discover specialized coding and STEM classes for kids in Bangalore. Python, Scratch, Robotics, and logic-building for neurodiverse learners.",
    }
};

export const chessStrategyData: ServicePageData = {
    hero: {
      headline: "Chess & Cognitive Strategy",
      subheadline: "Developing patience, foresight, and impulse control through the ancient game of kings. Mental training for real-world decisions.",
      trustBadge: "30+ Chess Masters",
      primaryCTA: { text: "Book a Game", href: "/booking/checkout?type=consultation&service=chess-strategy" },
      secondaryCTA: { text: "Learn Rules", href: "/booking/checkout?type=consultation&service=chess-strategy" },
    },
    signs: [
      { id: "impulse", text: "High Impulsivity", icon: "🏃" },
      { id: "focus", text: "Low Focus", icon: "👁️" },
      { id: "aggression", text: "Low Frustration Tolerance", icon: "🔥" },
      { id: "planning", text: "Poor Planning", icon: "🗺️" },
    ],
    conditions: [
      { id: "opening", title: "Strategic Openings", description: "Teaching the importance of the first steps and planning.", icon: "♟️" },
      { id: "endgame", title: "Focus & Patience", description: "Endgame training to maintain concentration till completion.", icon: "⏳" },
      { id: "cognitive", title: "Cognitive Transfer", description: "Relating chess moves to real-life social and academic choices.", icon: "💡" },
    ],
    ageGroups: [
        { id: "beginners", title: "Pawn Pushers", ageRange: "5 - 8 Years", description: "Learning piece moves and basic respect for rules.", focusPoints: ["Rules", "Movement", "Fun"], icon: "👶" },
        { id: "intermediate", title: "Tacticians", ageRange: "9 - 14 Years", description: "Understanding combinations and multiple steps.", focusPoints: ["Tactics", "Planning", "Patience"], icon: "⚔️" },
        { id: "advanced", title: "Strategists", ageRange: "14+ Years", description: "Deep analysis and tournament preparation.", focusPoints: ["Strategy", "Psychology", "Mastery"], icon: "👑" },
    ],
    steps: [
      { title: "Skill Assessment", description: "Determining current chess knowledge and cognitive focus." },
      { title: "Curriculum Design", description: "Customizing puzzles and games for the child's level." },
      { title: "Weekly Mastery", description: "Progressive sessions building mental stamina." },
    ],
    valueProps: [
      { title: "Impulse Control", description: "A forced pause between thought and action.", icon: "🧘" },
      { title: "Social Learning", description: "Graceful winning and resilient losing.", icon: "🤝" },
      { title: "Cognitive Boost", description: "Improving memory and analytical horsepower.", icon: "⚡" },
    ],
    faqs: [
      { question: "Can a beginner join?", answer: "Yes, we teach from absolute zero up to competitive levels." },
      { question: "Is this online or offline?", answer: "Both. Chess works wonderfully online with interactive boards." },
    ],
    pricing: { basePrice: 500, currency: "INR", description: "Per session of 1:1 chess mentoring" },
    therapists: [],
    metadata: {
        title: "Chess Coaching for Kids in Bangalore | Cognitive Strategy",
        description: "Improve focus and cognitive skills with chess coaching in Bangalore. Specialized strategy training for neurodiverse children and gifted learners.",
    }
};
