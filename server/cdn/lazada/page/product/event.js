const lazadaProductChannel = new BroadcastChannel("lazada-product");
const lazadaCheckoutChannel = new BroadcastChannel("lazada-checkout");

// Auto refresh after verify recaptcha
lazadaProductChannel.onmessage = ({ data }) => {
    switch (data.type) {
      case "ping":
        if (document.querySelector(".J_MIDDLEWARE_FRAME_WIDGET") || document.querySelector(".baxia-dialog-content")) {
          console.log("refresh event triggered");
          window.location.reload();
        }
        break;
    }
  };