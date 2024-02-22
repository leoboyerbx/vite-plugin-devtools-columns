# Vite Plugin Devtools Outline

A dead-simple Vite plugin that adds a hotkey to toggle column helpers during dev only.

> During build, this module will be an empty string, making it dev-only.

## Usage

Install the package

npm

```bash
npm i -D vite-plugin-devtools-columns
```

pnpm

```bash
pnpm i -D vite-plugin-devtools-columns
```

In `vite.config.ts`

```typescript
import { presetColumns } from "vite-plugin-devtools-columns";

export default defineConfig({
  // ...
  plugins: [devtoolsColumns()],
  // ...
});
```

And in your `main.ts` or anywhere else in your code:

```javascript
import "virtual:devtools-columns";
```

Then you can use ctrl+G or shift+G to toggle columnss.
