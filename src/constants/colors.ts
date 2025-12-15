/**
 * Color Palette for Instituto Recicla Mais
 * 
 * This file contains the project's color palette definitions.
 * Import and use these colors throughout the application for consistent styling.
 */

export const colors = {
  fluid: "#98ddb6", // mata-300
  sustentabilidade: "#c6ecd6", // mata-200
  mata: "#113623",
  sky: "#77b6ec",
  ocean: "#012338",
  vida: "#db5925",
} as const;

// Type for color names
export type ColorName = keyof typeof colors;

// Helper function to get a color by name
export const getColor = (name: ColorName): string => {
  return colors[name];
};

// Export individual colors for convenience
export const {
  fluid,
  sustentabilidade,
  mata,
  sky,
  ocean,
  vida,
} = colors;

