# R3F Drei Demo App

A demo application built with **React**, **TypeScript**, **Vite**, and **react-three-fiber** (R3F) using Drei helpers. This project showcases interactive 3D scenes, custom shaders, and advanced material effects.

## Features

- Fast development with Vite and hot module replacement
- 3D rendering using [react-three-fiber](https://docs.pmnd.rs/react-three-fiber)
- Helpers from [@react-three/drei](https://github.com/pmndrs/drei)
- Custom GLSL shaders and materials
- TypeScript for type safety
- ESLint and Prettier for code quality

## Project Structure

```
public/
  assets/
    images/
    models/
src/
  components/
  materials/
  models/
  shaders/
  App.tsx
  Scene.tsx
  main.tsx
```

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start the development server:**

   ```sh
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code with ESLint

## Linting & Formatting

- ESLint is set up for TypeScript and React.
- To enable type-aware linting, update `eslint.config.js` as follows:
  ```js
  export default tseslint.config({
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // ...other config
  });
  ```
- For React-specific linting, install `eslint-plugin-react` and add:
  ```js
  import react from "eslint-plugin-react";
  export default tseslint.config({
    settings: { react: { version: "detect" } },
    plugins: { react },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
    },
  });
  ```

## Custom Shaders & Materials

- See `src/materials/` and `src/shaders/` for custom GLSL and material logic.
- Example: `WatercolorShaderMaterial.tsx`, `FlowmapShaderMaterial.tsx`

## Assets

- 3D models: `public/assets/models/`
- Images: `public/assets/images/`
