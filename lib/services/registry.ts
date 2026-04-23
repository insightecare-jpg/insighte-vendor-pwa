import { ServicePageData } from "@/types/services";
import { speechTherapyData } from "./speech-therapy.data";
import { behaviorTherapyData } from "./behavior-therapy.data";
import { occupationalTherapyData } from "./occupational-therapy.data";
import { parentCoachingData } from "./parent-coaching.data";
import { earlyInterventionData } from "./early-intervention.data";
import { specialEducationData } from "./special-education.data";
import { physiotherapyData } from "./physiotherapy.data";
import { remedialEducationData } from "./remedial-education.data";
import { childCounselingData } from "./child-counseling.data";
import { 
  academicTutoringData, 
  autismSupportData,
  shadowTeachingData,
  musicArtsData,
  codingStemData,
  chessStrategyData
} from "./extended-services.data";

export const SERVICE_REGISTRY: Record<string, ServicePageData> = {
  "speech-therapy": speechTherapyData,
  "behavior-therapy": behaviorTherapyData,
  "occupational-therapy": occupationalTherapyData,
  "parent-coaching": parentCoachingData,
  "early-intervention": earlyInterventionData,
  "special-education": specialEducationData,
  "physiotherapy": physiotherapyData,
  "remedial-education": remedialEducationData,
  "child-counseling": childCounselingData, 
  "academic-tutoring": academicTutoringData,
  "autism-support": autismSupportData,
  "shadow-teaching": shadowTeachingData,
  "music-arts": musicArtsData,
  "coding-stem": codingStemData,
  "chess-strategy": chessStrategyData,

  // Aliases for UI consistency
  "math-science": academicTutoringData,
  "child-counselling": childCounselingData,
  "special-educator": specialEducationData,
  "developmental-support": earlyInterventionData,
};

export const getServiceBySlug = (slug: string): ServicePageData | undefined => {
  return SERVICE_REGISTRY[slug];
};
