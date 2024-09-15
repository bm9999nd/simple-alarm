function winDrag(e) {
  if (e.buttons==0) return;

  const x = e.screenX + e.clientX;
  const y = e.screenY + e.clientY;
  if ('pywebview' in window) {
    window.pywebview.api.drag_window(e.screenX, e.screenY)
  }
}

function winClose() {
  if('pywebview' in window) {
    window.pywebview.api.close_window();
  }
}

(function cssWindow() {
  const winbar = $('#window-bar');
  winbar.addClass("d-flex justify-content-between bg-dark p-1");
  winbar.children()
    .css("width", "40px")
    .css("height", "40px");
})();
