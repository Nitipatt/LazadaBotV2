const placeOrder = (message) => {
  console.log("Bot: Item sku found", message);
  const intervalId = setInterval(() => {
    const btn = document.querySelector(".i-button-content")?.parentNode;
    console.log("Bot: Finding btn");
    if (btn) {
      console.log("Bot: Found btn", new Date().toLocaleTimeString());
      if (!btn.disabled) {
        btn.click();
        console.log("Bot: Clicked");
        clearInterval(intervalId);
      } else {
        window.sessionStorage.setItem("isBuying", "true");
        window.location.href = `https://www.lazada.co.th/wow/gcp/th/trade/shipping?spm=a2o4m.pdp_revamp.main_page.bottom_bar_main_button&buyParams=${encodeURIComponent(JSON.stringify({items:[{...itemDetail, quantity: message?.quantity ?? itemDetail.quantity}]}))}&from_pdp_buy_now=1&pwa_true_login=1&bot=y`
      }
    } else if (document.querySelector(".J_MIDDLEWARE_FRAME_WIDGET")) {
      console.log("Bot: Banned");
      clearInterval(intervalId);
    }
  }, 50);
};

if (window.sessionStorage.getItem("isBuying") || window.location.search.includes("auto=y")) {
  placeOrder();
}
