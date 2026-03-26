import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			// Proxy API pour contourner le CORS en développement
			'/api': {
				target: 'https://api.marcheci.chalenge14.com',
				changeOrigin: true,
				secure: true
			}
		}
	}
});
