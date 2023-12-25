import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset';

export default defineConfig({
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    '@park-ui/panda-preset',
    createPreset({
      accentColor: 'neutral',
      grayColor: 'mauve',
      borderRadius: 'md',
    }),
  ],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: './src/styled-system',
})
