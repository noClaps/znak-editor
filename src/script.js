import { codeToHtml } from "https://esm.sh/shiki";
import { marked } from "https://esm.sh/marked";
import { markedHighlight } from "https://esm.sh/marked-highlight";
import "https://esm.sh/katex";
import renderMathInElement from "https://esm.sh/katex/contrib/auto-render";

marked.use(
  markedHighlight({
    async: true,
    async highlight(code, lang) {
      return await codeToHtml(code, {
        lang,
        theme: "github-dark",
      });
    },
  }),
);

const main = document.querySelector("main");
if (!main) throw new Error("Main element not found");

const output = document.getElementById("output");
if (!output) throw new Error("Output (aside) element not found");

main.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "s") {
    e.preventDefault();

    const blob = new Blob([main.innerText]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${document.title}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
});

main.addEventListener("keyup", async () => {
  output.innerHTML = await marked.parse(main.innerText);
  renderMathInElement(output, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
  });

  if (
    output.firstChild &&
    output.firstChild.nodeName &&
    output.firstChild.nodeName === "H1"
  ) {
    document.title = output.firstChild.innerText;
  } else {
    document.title = "Znak";
  }
});
