import {
  SiNike,
  Si3M,
  SiAbstract,
  SiAdobe,
  SiAirtable,
  SiAmazon,
  SiBox,
  SiBytedance,
  SiChase,
  SiCloudbees,
  SiBurton,
  SiBmw,
  SiHeroku,
  SiBuildkite,
  SiCouchbase,
  SiDailymotion,
  SiDeliveroo,
  SiEpicgames,
  SiGenius,
  SiGodaddy,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type LogoItem = {
  Icon: IconType;
  name: string;
};

export type RibbonLogos = {
  top: LogoItem[];
  bottom: LogoItem[];
  all: LogoItem[];
};

const topLogos: LogoItem[] = [
  { Icon: SiNike, name: "Nike" },
  { Icon: Si3M, name: "3M" },
  { Icon: SiAbstract, name: "Abstract" },
  { Icon: SiAdobe, name: "Adobe" },
  { Icon: SiAirtable, name: "Airtable" },
  { Icon: SiAmazon, name: "Amazon" },
  { Icon: SiBox, name: "Box" },
  { Icon: SiBytedance, name: "Bytedance" },
  { Icon: SiChase, name: "Chase" },
  { Icon: SiCloudbees, name: "Cloudebees" },
];

const bottomLogos: LogoItem[] = [
  { Icon: SiBmw, name: "BMW" },
  { Icon: SiBurton, name: "Burton" },
  { Icon: SiBuildkite, name: "Buildkite" },
  { Icon: SiCouchbase, name: "Couchbase" },
  { Icon: SiDailymotion, name: "Dailymotion" },
  { Icon: SiDeliveroo, name: "deliveroo" },
  { Icon: SiEpicgames, name: "Epic Games" },
  { Icon: SiGenius, name: "Genius" },
  { Icon: SiGodaddy, name: "GoDaddy" },
  { Icon: SiHeroku, name: "Heroku" },
];

// Combined all logos for easy access
const allLogos: LogoItem[] = [...topLogos, ...bottomLogos];

// Main export object with all ribbon logo data
export const ribbonLogos: RibbonLogos = {
  top: topLogos,
  bottom: bottomLogos,
  all: allLogos,
};

// Individual exports for backward compatibility
export { topLogos, bottomLogos, allLogos };

// Helper function to get all logos
export const getAllLogos = (): LogoItem[] => allLogos;

// Helper function to get logos by position
export const getLogosByPosition = (position: "top" | "bottom"): LogoItem[] => {
  return position === "top" ? topLogos : bottomLogos;
};

// Helper function to get logo by name
export const getLogoByName = (name: string): LogoItem | undefined => {
  return allLogos.find(
    (logo) => logo.name.toLowerCase() === name.toLowerCase()
  );
};
