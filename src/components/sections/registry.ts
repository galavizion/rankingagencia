import SectionHero from "./SectionHero.astro";
import SectionBenefits from "./SectionBenefits.astro";
import SectionProcess from "./SectionProcess.astro";
import SectionFAQ from "./SectionFAQ.astro";
import SectionCTA from "./SectionCTA.astro";

export const sectionRegistry: Record<string, any> = {
  sectionHero: SectionHero,
  sectionBenefits: SectionBenefits,
  sectionProcess: SectionProcess,
  sectionFAQ: SectionFAQ,
  sectionCTA: SectionCTA,
};