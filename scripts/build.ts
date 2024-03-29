import { $ } from "bun";

await $`mkdir -p ${import.meta.dir}/../dist`;
await $`cp ${import.meta.dir}/../src/index.html ${import.meta.dir}/../dist/`;
await $`cp ${import.meta.dir}/../src/style.css ${import.meta.dir}/../dist/`;

// KaTeX
await $`mkdir -p ${import.meta.dir}/../dist/katex`;
await $`cp node_modules/katex/dist/katex.min.css ${import.meta.dir}/../dist/katex/katex.css`;
await $`cp -r node_modules/katex/dist/fonts ${import.meta.dir}/../dist/katex/`;

// Hyperscript
await $`mkdir -p ${import.meta.dir}/../dist/hyperscript`;
await $`cp node_modules/hyperscript.org/dist/_hyperscript.min.js ${import.meta.dir}/../dist/hyperscript/hyperscript.js`;

// Highlight.js
await $`mkdir -p ${import.meta.dir}/../dist/highlight`;
await $`cp node_modules/highlight.js/styles/github-dark.min.css ${import.meta.dir}/../dist/highlight/highlight.css`;

Bun.build({
  entrypoints: [`${import.meta.dir}/../src/script.ts`],
  outdir: `${import.meta.dir}/../dist`,
  minify: true,
});
