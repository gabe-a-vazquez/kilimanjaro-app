/**
 * Design tokens and variables for the Kilimanjaro Training app
 */

export const colors = {
  // Base colors
  alpineBlue: "#2a6eb8",
  summitGreen: "#3a9d6b",
  brightGreen: "#5cba47",
  sunriseOrange: "#ff8c5a",
  mountainGray: "#707070",
  snowWhite: "#f8f8f8",
  charcoal: "#333333",
  skyBlue: "#2196f3",

  // Premium gradient palette
  bgGradientStart: "#0a2518",
  bgGradientEnd: "#153626",
  cardGradientStart: "#1a4534",
  cardGradientEnd: "#0c2c1d",
  highlightGradientStart: "#3a9d6b",
  highlightGradientEnd: "#1f5a3d",
  orangeGradientStart: "#ff9967",
  orangeGradientEnd: "#ff7440",
};

export const glassmorphism = {
  glassBg: "hsla(146, 40%, 18%, 0.7)",
  glassBgDarker: "hsla(146, 50%, 13%, 0.85)",
  glassBgLighter: "hsla(146, 30%, 25%, 0.6)",
  glassBorder: "hsla(146, 30%, 40%, 0.2)",
  glassHighlight: "hsla(146, 30%, 60%, 0.1)",
  backdropBlur: "blur(20px)",
};

export const neumorphism = {
  neuBg: "#0e3623",
  neuBgDark: "#092c1a",
  neuBgLight: "#1a5238",
  neuShadowDark: "rgba(6, 25, 14, 0.8)",
  neuShadowLight: "rgba(40, 120, 80, 0.2)",
  neuOrange: "#ff8c5a",
  neuOrangeLight: "#ffaa85",
  neuOrangeDark: "#e06a3b",
};

export const effects = {
  // Glow effects
  glowGreen: "0 0 20px rgba(58, 157, 107, 0.5)",
  glowOrange: "0 0 25px rgba(255, 127, 80, 0.5)",
  glowWhite: "0 0 15px rgba(255, 255, 255, 0.3)",

  // Shadow effects
  shadowSoft: "0 8px 16px rgba(0, 0, 0, 0.2)",
  shadowStrong: "0 12px 24px rgba(0, 0, 0, 0.4)",
  shadowInset: "inset 0 2px 6px rgba(0, 0, 0, 0.2)",
};

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  xxl: "3rem",
};

export const borderRadius = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "1rem",
  xl: "1.5rem",
  circle: "50%",
};

export const typography = {
  fontFamily: {
    sans: '"Geist", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"Geist Mono", monospace',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    xxl: "2rem",
    xxxl: "3rem",
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    loose: 1.8,
  },
};

export const zIndices = {
  base: 0,
  overlay: 10,
  modal: 20,
  toast: 30,
};

export const transitions = {
  fast: "150ms ease",
  normal: "300ms ease",
  slow: "500ms ease",
};

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1536px",
};

export const gradients = {
  primaryGreen: `linear-gradient(145deg, ${colors.highlightGradientStart}, ${colors.highlightGradientEnd})`,
  primaryOrange: `linear-gradient(145deg, ${colors.orangeGradientStart}, ${colors.orangeGradientEnd})`,
  background: `linear-gradient(135deg, ${colors.bgGradientStart}, ${colors.bgGradientEnd})`,
  card: `linear-gradient(145deg, ${colors.cardGradientStart}, ${colors.cardGradientEnd})`,
};

export const images = {
  kilimanjaroBackground:
    "https://images.unsplash.com/photo-1573146500785-c8f95e66b7ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
  tanzaniaWildlife:
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
};

const theme = {
  colors,
  glassmorphism,
  neumorphism,
  effects,
  spacing,
  borderRadius,
  typography,
  zIndices,
  transitions,
  breakpoints,
  gradients,
  images,
};

export default theme;
