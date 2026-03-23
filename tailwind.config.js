import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const tailwindcssAnimate = require("tailwindcss-animate");

/** @param {{ addBase: (rules: Record<string, unknown>) => void; theme: (path: string) => unknown }} param0 */
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--surface-foreground))",
        },
        "on-surface": "hsl(var(--on-surface))",
        "on-surface-variant": "hsl(var(--on-surface-variant))",
        outline: "hsl(var(--outline))",
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        elevation1:
          "0px 1px 2px 0px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)",
        elevation2:
          "0px 1px 2px 0px rgba(0,0,0,0.3), 0px 2px 6px 2px rgba(0,0,0,0.15)",
        elevation3:
          "0px 1px 3px 0px rgba(0,0,0,0.3), 0px 4px 8px 3px rgba(0,0,0,0.15)",
        fab: "0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)",
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors, tailwindcssAnimate],
};
