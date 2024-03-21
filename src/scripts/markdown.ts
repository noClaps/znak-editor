import renderMathInElement from "katex/contrib/auto-render";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

marked.use(
  markedHighlight({
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

export default async function render(main: HTMLElement, output: HTMLElement) {
  output.innerHTML = await marked.parse(main.innerText);
  renderMathInElement(output, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
  });

  if (output.firstChild?.nodeName === "H1") {
    document.title = (output.firstChild as HTMLElement).innerText;
  } else {
    document.title = "Znak";
  }
}
