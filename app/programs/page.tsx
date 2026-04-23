import { getPrograms } from "@/lib/actions/programs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ProgramsRedesign from "./ProgramsRedesign";

export const metadata = {
  title: "Clinical Programs & Support Groups | Insighte Care",
  description: "Explore our neuro-affirming care pathways including home therapy, shadow teaching, clinical courses, and community support groups.",
};

export default async function ProgramsPage() {
  // We fetch programs to keep them in background if needed, 
  // but the redesign uses the refined editorial content requested.
  const allPrograms = (await getPrograms()) || [];

  return (
    <>
      <ProgramsRedesign />
    </>
  );
}
