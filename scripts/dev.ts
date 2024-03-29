import { $ } from "bun";
import { watch } from "fs";

async function serve() {
  await $`bun ${import.meta.dir}/build.ts`;

  Bun.serve({
    fetch({ url }) {
      const path = new URL(url).pathname;

      if (path === "/")
        return new Response(Bun.file(`${import.meta.dir}/../dist/index.html`));

      return new Response(Bun.file(`${import.meta.dir}/../dist${path}`));
    },
    reusePort: true,
  });
}

await serve().then(() => {
  console.log("Server started at http://localhost:3000");
});

watch(
  `${import.meta.dir}/../src`,
  { recursive: true },
  async (event, filename) => {
    console.log(`Detected ${event} on ${filename}.`);
    await serve().then(() => {
      console.log("Reloaded.");
    });
  },
);
