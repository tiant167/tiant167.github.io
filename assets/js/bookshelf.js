(function () {
  var shelf = document.querySelector(".shelf");
  if (!shelf) return;

  var links = Array.prototype.slice.call(shelf.querySelectorAll(".shelf-index a"));

  function articleForHash() {
    var id = (location.hash || "").replace(/^#/, "");
    var article = id ? document.getElementById(id) : null;
    if (!article || !article.classList.contains("shelf-note")) {
      article = shelf.querySelector(".shelf-note");
    }
    return article;
  }

  function reveal(link) {
    var scroller = shelf.querySelector(".shelf-index");
    if (!scroller || !link) return;
    var style = getComputedStyle(scroller);
    if (style.overflowY === "auto" || style.overflowY === "scroll") {
      var top = link.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
      scroller.scrollTo({ top: Math.max(0, top - (scroller.clientHeight - link.offsetHeight) / 2) });
    }
    if (style.overflowX === "visible") return;
    var left = link.offsetLeft - (scroller.clientWidth - link.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, left) });
  }

  function sync(moveFocus) {
    var article = articleForHash();
    if (!article) return;
    var notes = shelf.querySelectorAll(".shelf-note");
    Array.prototype.forEach.call(notes, function (note) {
      note.classList.toggle("is-current", note === article);
    });
    var current = null;
    links.forEach(function (link) {
      var on = link.getAttribute("href") === "#" + article.id;
      if (on) {
        link.setAttribute("aria-current", "true");
        current = link;
      } else {
        link.removeAttribute("aria-current");
      }
    });
    reveal(current);
    if (!moveFocus) return;
    var title = article.querySelector("h2");
    if (!title) return;
    title.setAttribute("tabindex", "-1");
    title.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", function () {
    sync(true);
  });
  sync(false);
})();
