const PASSWORD = "hersupps2025";
function checkPassword() {
  const input = document.getElementById("accessPassword").value;
  if (input === PASSWORD) {
    document.getElementById("accessPassword").style.display = "none";
    document.querySelector("button").style.display = "none";
    document.getElementById("editorApp").style.display = "block";
    initEditor();
  } else {
    alert("Incorrect password");
  }
}
function initEditor() {
  document.getElementById("editorApp").innerHTML = "<p>Editor Loaded - Visual Quiz Funnel Creator</p>";
}