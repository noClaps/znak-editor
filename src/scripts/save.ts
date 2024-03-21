export default function saveFile(e: KeyboardEvent, main: HTMLElement) {
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
}
