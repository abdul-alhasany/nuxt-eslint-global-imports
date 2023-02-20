Create eslint globals file for nuxt.

When you use nuxt.js, many functions/variables/objects are defined globally so you can use them with importing. This will cause eslint to complain about undefined variables. This package will create a file that contains all the globals to include them in eslint config and hide the errors.

The file is called `eslintrc-auto-import.json` and it will be created in .nuxt folder.

## Installation

```bash
pnpm install nuxt-eslint-global-imports -D

-- or --
npm install nuxt-eslint-global-imports -D
```

## Usage
First add this package to your nuxt config under modules section:

```js
export default defineNuxtConfig({
	...
	modules: [
		....
		'nuxt-eslint-global-imports',
	],
};
```

Then in you eslint config add this line to `extends` array:
```js
module.exports = {
	...
	extends: [
		.....
		'./.nuxt/.eslintrc-auto-import.json',
	],
};
```

## Development
If you would like to develop this package, you can use clone it and run these commands:

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm dev:prepare

# Develop with the playground
pnpm dev

# Build the playground
pnpm dev:build

# Compile the package
pnpm prepack
```

