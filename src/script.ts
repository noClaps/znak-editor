import "katex";
import render from "./scripts/markdown";
import saveFile from "./scripts/save";

const main = document.querySelector("main")!;
const output = document.getElementById("output")!;

main.addEventListener("keyup", async () => {
  await render(main, output);
});
main.addEventListener("keydown", (e) => {
  saveFile(e, main);
});
