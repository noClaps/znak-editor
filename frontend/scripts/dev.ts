import { $, type Serve } from "bun";
import { watch } from "fs";

const serverOptions: Serve = {
  async fetch({ url }) {
    const path = new URL(url).pathname;

    switch (path) {
      case "/":
        return new Response(Bun.file("src/index.html"));
      case "/style.css":
        return new Response(Bun.file("src/style.css"));
      case "/script.js":
        const script = await Bun.build({
          entrypoints: ["src/script.ts"],
        }).then((bo) => bo.outputs[0].text());
        return new Response(script, {
          headers: { "Content-Type": "application/javascript" },
        });
      case "/output.css":
        return new Response(Bun.file("src/output.css"));
      case "/favicon.png":
        return new Response(Bun.file("src/favicon.png"));
      case "/icon.png":
        return new Response(Bun.file("src/icon.png"));

      default:
        return new Response("Not found", { status: 404 });
    }
  },
};

const server = Bun.serve(serverOptions);
console.log(`Server started on ${server.url}`);

watch("src", (event, filename) => {
  console.log(`Detected ${event} on ${filename}`);
  server.reload(serverOptions);
  console.log("Reloaded!");
});
