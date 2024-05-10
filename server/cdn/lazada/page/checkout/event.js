const lazadaCheckoutChannel = new BroadcastChannel("lazada-checkout");


// Auto refresh after verify recaptcha
lazadaCheckoutChannel.onmessage = ({ data }) => {
    switch (data.type) {
      case "ping":
        if (document.querySelector(".J_MIDDLEWARE_FRAME_WIDGET") || document.querySelector(".baxia-dialog-content")) {
          console.log("refresh event triggered");
          window.location.reload();
        }
        break;
    }
  };