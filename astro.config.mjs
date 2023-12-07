import { defineConfig } from 'astro/config';
// https://astro.build/config
//export default defineConfig({});

export default defineConfig({
  site: 'https://CaptWhite.github.io',
  base: '/newsletter',
  build: {
    inlineStylesheets: 'always'
  }
})