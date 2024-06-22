import { defineNuxtModule, addTemplate } from '@nuxt/kit';

export default defineNuxtModule({
	meta: {
		name: 'nuxt-eslint-import-globals',
		configKey: 'nuxt-eslint-import-globals',
		compatibility: {
			nuxt: '^3.0.0',
		},
	},
	setup(moduleOptions, nuxt) {
		let globalDefs = {
			defineNuxtConfig: true,
			definePageMeta: true,
		};

		nuxt.hook('imports:context', async (sources) => {
			const imports = await sources.getImports();

			// Get all the names of the imports
			const names = imports.reduce((accumulator, importData) => {
				const { name, as } = importData;
				accumulator[as ?? name] = true;
				return accumulator;
			}, {} as Record<string, boolean>);

			globalDefs = {
				...globalDefs,
				...names,
			};
		});

		nuxt.hook('imports:extend', (imports) => {
			// Get all the names of the imports
			const names = imports.reduce((accumulator, importData) => {
				const { name } = importData;
				accumulator[name] = true;
				return accumulator;
			}, {} as Record<string, boolean>);

			globalDefs = {
				...globalDefs,
				...names,
			};

			// prepare the file content
			const fileContent = {
				globals: globalDefs,
			};

			// Write the file
			addTemplate({
				filename: '.eslintrc-auto-import.json',
				getContents: () => {
					return JSON.stringify(fileContent);
				},
				write: true,
			});
		});
	},
});