import { $ } from "bun";

await $`mkdir -p dist`;
await $`cp src/index.html dist/`;
await $`cp src/style.css dist/`;

// KaTeX
await $`mkdir -p dist/katex`;
await $`cp node_modules/katex/dist/katex.min.css dist/katex/katex.css`;
await $`cp -r node_modules/katex/dist/fonts dist/katex/`;

// Hyperscript
await $`mkdir -p dist/hyperscript`;
await $`cp node_modules/hyperscript.org/dist/_hyperscript.min.js dist/hyperscript/hyperscript.js`;

// Highlight.js
await $`mkdir -p dist/highlight`;
await $`cp node_modules/highlight.js/styles/github-dark.min.css dist/highlight/highlight.css`;

Bun.build({
  entrypoints: ["src/script.ts"],
  outdir: "dist",
  minify: Bun.env.NODE_ENV === "production",
});
