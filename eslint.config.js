import eslintConfig from '@kalimahapps/eslint-config';
export default [
	{
		ignores: ['dist', 'node_modules'],
	},
	...eslintConfig,
];