/* page/products */

(async () => {
  if (
    window.location.pathname.startsWith("/products/") &&
    window.location.search.includes("bot=y")
  ) {
    importScript("/lazada/page/product/event.js")
    importScript("/lazada/page/product/script.js");
  }
})();

