// src/theme.ts (or theme.js)
import { defineConfig, createSystem, defaultConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#faf5ff' },
          100: { value: '#f3e8ff' },
          200: { value: '#e9d5ff' },
          300: { value: '#d8b4fe' },
          400: { value: '#c084fc' },
          500: { value: '#a855f7' },
          600: { value: '#9333ea' },
          700: { value: '#641ba3' },
          800: { value: '#4a1772' },
          900: { value: '#2f0553' },
          950: { value: '#1a032e' }
        }
      }
    },
    semanticTokens: {
      colors: {
        brand: {
          // This tells Chakra: "Whenever I use 'brand', use the 'purple' scale"
          solid: { value: '{colors.purple.500}' },
          contrast: { value: '{colors.white}' },
          fg: { value: '{colors.purple.700}' },
          muted: { value: '{colors.purple.100}' }
        }
      }
    }
  }
})

export const system = createSystem(defaultConfig, config)
