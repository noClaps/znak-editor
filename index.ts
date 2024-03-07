const script = (
  await Bun.build({
    entrypoints: ["src/script.ts"],
    minify: true,
  })
).outputs[0].text();

Bun.serve({
  async fetch(request) {
    const path = new URL(request.url).pathname;

    if (path.startsWith("/fonts")) {
      return new Response(Bun.file(`node_modules/katex/dist${path}`));
    }

    switch (path) {
      case "/style.css":
        return new Response(Bun.file("src/style.css"));

      case "/script.js":
        return new Response(await script, {
          headers: {
            "Content-Type": "application/javascript",
          },
        });

      case "/katex.css":
        return new Response(Bun.file("node_modules/katex/dist/katex.min.css"));

      default:
        return new Response(Bun.file("src/index.html"));
    }
  },
});

console.log(`Server is running at http://localhost:3000`);

export {};
