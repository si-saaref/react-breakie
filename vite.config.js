import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// ! Ref Config => https://plainenglish.io/blog/step-by-step-guide-to-dockerize-react-app-created-using-vite#step-5-build-the-dockerfile
	server: {
		host: '0.0.0.0',
		strictPort: true,
		watch: {
			usePolling: true,
		},
		hmr: {
			port: '6050',
		},
		port: '2374',
	},
});
