import vue from '@vitejs/plugin-vue';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `import "${path.resolve('src/assets/style/main.scss')}";`
            }
        }
    }
})
