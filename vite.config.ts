import vue from '@vitejs/plugin-vue';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
          "@": "src"
      }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `import "${path.resolve('src/assets/style/main.scss')}";`
            }
        }
    }
})
