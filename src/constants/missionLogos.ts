/**
 * Logo Configuration and Helper Functions
 * 
 * This module provides a flexible system for managing logos from multiple sources:
 * 1. React Icons (from react-icons library)
 * 2. External image URLs
 * 3. Local asset files (from /assets folder)
 * 
 * QUICK START EXAMPLES:
 * 
 * 1. Using React Icons (existing method):
 *    import { SiNike } from "react-icons/si";
 *    const logo = createLogoFromIcon(SiNike, "Nike");
 * 
 * 2. Using external URL:
 *    const logo = createLogoFromUrl("https://example.com/logo.png", "Company Name");
 * 
 * 3. Using local asset (from public/assets/):
 *    const logo = createLogoFromAsset("/assets/logo/partner.png", "Partner Name");
 * 
 * 4. Creating a custom logo array with mixed sources:
 *    const customLogos: LogoItem[] = [
 *      createLogoFromIcon(SiNike, "Nike"),
 *      createLogoFromUrl("https://example.com/logo.png", "Example Co"),
 *      createLogoFromAsset("/assets/logo/partner.png", "Partner Inc"),
 *    ];
 * 
 * See individual function documentation below for more details.
 */

import { PiRecycleDuotone } from "react-icons/pi";
import { GiRecycle } from "react-icons/gi";

import type { IconType } from "react-icons";

/**
 * Logo source types supported by the system
 */
export type LogoSourceType = "icon" | "url" | "asset";

/**
 * LogoItem type supporting multiple source types:
 * - "icon": React Icons (IconType from react-icons)
 * - "url": External image URLs
 * - "asset": Local assets from /assets folder
 * 
 * @example
 * // Using React Icons (existing method)
 * const logo1: LogoItem = {
 *   sourceType: "icon",
 *   Icon: SiNike,
 *   name: "Nike"
 * };
 * 
 * @example
 * // Using external URL with custom size
 * const logo2: LogoItem = {
 *   sourceType: "url",
 *   imageUrl: "https://example.com/logo.png",
 *   name: "Example Company",
 *   size: "h-12 md:h-16" // Optional: Tailwind classes for height
 * };
 * 
 * @example
 * // Using local asset with custom size
 * const logo3: LogoItem = {
 *   sourceType: "asset",
 *   imagePath: "/assets/logo/partner-logo.png",
 *   name: "Partner Name",
 *   size: "h-10 md:h-14" // Optional: Tailwind classes for height
 * };
 */
export type LogoItem =
  | {
      sourceType: "icon";
      Icon: IconType;
      name: string;
    }
  | {
      sourceType: "url";
      imageUrl: string;
      name: string;
      size?: string; // Optional: Tailwind classes for height (e.g., "h-10 md:h-12")
    }
  | {
      sourceType: "asset";
      imagePath: string;
      name: string;
      size?: string; // Optional: Tailwind classes for height (e.g., "h-10 md:h-12")
    };

export type RibbonLogos = {
  top: LogoItem[];
  bottom: LogoItem[];
  all: LogoItem[];
};

const topLogos: LogoItem[] = [
  { sourceType: "icon", Icon: GiRecycle, name: "Parceira" },
  { sourceType: "icon", Icon: PiRecycleDuotone, name: "Parceiro" },
  { sourceType: "icon", Icon: GiRecycle, name: "Parceiro" },
  { sourceType: "icon", Icon: PiRecycleDuotone, name: "Parceira" },
  { sourceType: "icon", Icon: GiRecycle, name: "Parceiro" },
  { sourceType: "icon", Icon: PiRecycleDuotone, name: "Parceiro" },
  { sourceType: "icon", Icon: GiRecycle, name: "Parceira" },
];

const bottomLogos: LogoItem[] = [
  { sourceType: "icon", Icon: GiRecycle, name: "Parceira" },
  { sourceType: "icon", Icon: PiRecycleDuotone, name: "Parceiro" },
  { sourceType: "icon", Icon: GiRecycle, name: "Parceiro" },
  { sourceType: "icon", Icon: PiRecycleDuotone, name: "Parceira" },
  { sourceType: "icon", Icon: GiRecycle, name: "Parceira" },
  { sourceType: "icon", Icon: PiRecycleDuotone, name: "Parceiro" },
  { sourceType: "icon", Icon: GiRecycle, name: "Parceiro" },
  { sourceType: "icon", Icon: PiRecycleDuotone, name: "Parceira" },
  {
    sourceType: "asset",
    imagePath: "/assets/logo/green-partner.png",
    name: "Green Partner",
    size: "h-6 md:h-[1.875rem]",
  },
  // Example: Logo from external URL with custom size
  // {
  //   sourceType: "url",
  //   imageUrl: "https://www.rts.com/wp-content/uploads/2021/03/RTS-Logo-No-Tagline-White-and-Green.png",
  //   name: "RTS",
  //   size: "h-12 md:h-16", // Custom size for this logo
  // },
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

/**
 * Helper Functions for Creating Logos
 * 
 * These functions make it easy to create logos from different sources.
 * Use them to build your own logo arrays or add individual logos.
 */

/**
 * Creates a logo from a React Icon (from react-icons library)
 * 
 * @param icon - The IconType component from react-icons
 * @param name - Display name for the logo
 * @returns LogoItem with sourceType "icon"
 * 
 * @example
 * import { SiNike } from "react-icons/si";
 * const nikeLogo = createLogoFromIcon(SiNike, "Nike");
 */
export const createLogoFromIcon = (
  icon: IconType,
  name: string
): LogoItem => {
  return {
    sourceType: "icon",
    Icon: icon,
    name,
  };
};

/**
 * Creates a logo from an external image URL
 * 
 * @param url - Full URL to the image (e.g., "https://example.com/logo.png")
 * @param name - Display name for the logo
 * @param size - Optional: Tailwind classes for height (e.g., "h-10 md:h-12"). Defaults to "h-10 md:h-12"
 * @returns LogoItem with sourceType "url"
 * 
 * @example
 * const partnerLogo = createLogoFromUrl(
 *   "https://example.com/partner-logo.png",
 *   "Partner Company"
 * );
 * 
 * @example
 * // With custom size
 * const largeLogo = createLogoFromUrl(
 *   "https://example.com/logo.png",
 *   "Company Name",
 *   "h-16 md:h-20"
 * );
 */
export const createLogoFromUrl = (
  url: string,
  name: string,
  size?: string
): LogoItem => {
  return {
    sourceType: "url",
    imageUrl: url,
    name,
    size,
  };
};

/**
 * Creates a logo from a local asset file
 * 
 * @param path - Path to the asset relative to public folder (e.g., "/assets/logo/partner.png")
 *               Note: Path should start with "/" and reference files in the public folder
 * @param name - Display name for the logo
 * @param size - Optional: Tailwind classes for height (e.g., "h-10 md:h-12"). Defaults to "h-6 md:h-8"
 * @returns LogoItem with sourceType "asset"
 * 
 * @example
 * // For a logo in public/assets/logo/partner.png
 * const partnerLogo = createLogoFromAsset(
 *   "/assets/logo/partner.png",
 *   "Partner Name"
 * );
 * 
 * @example
 * // With custom size
 * const largeLogo = createLogoFromAsset(
 *   "/assets/logo/partner.png",
 *   "Partner Name",
 *   "h-12 md:h-16"
 * );
 */
export const createLogoFromAsset = (
  path: string,
  name: string,
  size?: string
): LogoItem => {
  return {
    sourceType: "asset",
    imagePath: path,
    name,
    size,
  };
};

/**
 * Example: Creating a mixed logo array with all three source types
 * 
 * @example
 * const mixedLogos: LogoItem[] = [
 *   // React Icon
 *   createLogoFromIcon(SiNike, "Nike"),
 *   
 *   // External URL
 *   createLogoFromUrl("https://example.com/logo.png", "Example Co"),
 *   
 *   // Local asset
 *   createLogoFromAsset("/assets/logo/partner.png", "Partner Inc"),
 * ];
 */

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
