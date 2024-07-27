import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import ViteComponents from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/chart',
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    ViteComponents({
      resolvers: [
        PrimeVueResolver()
      ],
      dts: 'src/components.js', // 生成位置
      dirs: ['src/components', 'src/views/*/*'] // 指定要匯出的檔案位置
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', 'vitest', {
        'primevue/api': [
          'FilterMatchMode'
        ],
        '@vee-validate/zod': [
          'toTypedSchema'
        ],
        'vee-validate': [
          'useField', 'useForm'
        ]
      }],
      dts: 'src/auto-imports.js',
      dirs: [
        'src/stores/**',
        'src/directives/**',
        'src/api/**',
        'src/utils/**',
        'src/composable/**',
        'src/constants/**',
        'src/validation/**',
        'src/composables/**'
      ],
      eslintrc: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
