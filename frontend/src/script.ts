import Znak from "@noclaps/znak";

const input = document.querySelector<HTMLTextAreaElement>("#input");
if (!input) throw new Error("Textarea not found");

const output = document.querySelector<HTMLElement>("#output");
if (!output) throw new Error("Output not found");

const toggle = document.querySelector<HTMLInputElement>("#view-toggle input");
if (!toggle) throw new Error("Toggle button not found");

const ls = localStorage.getItem("znak-string");
if (ls) {
  input.value = ls;
}

input.addEventListener("input", () => {
  localStorage.setItem("znak-string", input.value);
});

toggle.addEventListener("change", async () => {
  if (toggle.checked) {
    output.innerHTML = await new Znak(input.value).renderToHTML();
  } else {
    output.innerHTML = "";
  }
});
