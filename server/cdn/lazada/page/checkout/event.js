const lazadaCheckoutChannel = new BroadcastChannel("lazada-checkout");

console.log("Bot: Lazada checkout event loaded");
const urlParams = new URLSearchParams(window.location.search);
const buyParams = urlParams.get('buyParams');
let itemDetail = ""
try {
  json = JSON.parse(decodeURIComponent(buyParams));
  itemDetail = json.items?.[0];
} catch (error) {
  console.log(error);
}

console.log("Bot: Subscribe on sku ", itemDetail.skuId);

// Auto refresh after verify recaptcha
lazadaCheckoutChannel.onmessage = ({ data }) => {
  switch (data.type) {
    case "ping":
      if (
        document.querySelector(".J_MIDDLEWARE_FRAME_WIDGET") ||
        document.querySelector(".baxia-dialog-content")
      ) {
        console.log("refresh event triggered");
        window.location.reload();
      }
      break;
    case itemDetail?.skuId:
      placeOrder(data.message);
      break;
  }
};
