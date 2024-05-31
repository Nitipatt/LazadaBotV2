/* page/products */

(async () => {
  if (window.location.search.includes("bot=y")) {
    if (window.location.pathname.startsWith("/products/")) {
      await importScript("/lazada/page/product/script.js");
      await importScript("/lazada/page/product/event.js");
    } else if (
      window.location.pathname.startsWith("/wow/gcp/th/trade/shipping")
    ) {
      console.log("Bot: router detected checkout");
      await importScript("/lazada/page/checkout/script.js");
      await importScript("/lazada/page/checkout/event.js");
    }
  }
})();
