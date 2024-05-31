/*product page
Rate limit elimination
*/
console.log("Bot: Init");

const TIME_OUT = 1000;
const DELAY = 0;

let retries = 0;
let timeOutID = null;
let averageFetchTime = 0;
const startTime = new Date().getTime();

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

const xhr = async () => {
  const startFetch = new Date().getTime();

  let callBack = async () => {
    const skuInfo = __moduleData__.data.root.fields.skuInfos;
    const dataList = Object.keys(skuInfo).map((key) => {
      const current = skuInfo[key];
      return {
        sku: key,
        limit: current.quantity.limit,
        type: current.quantity.type,
        stock: current.stock,
      };
    });

    retries++;
    clearTimeout(timeOutID);
    lazadaProductChannel.postMessage({ type: "ping", message: "ping" });

    const endFetch = new Date().getTime();
    const fetchTime = endFetch - startFetch;
    averageFetchTime = (averageFetchTime * (retries - 1) + fetchTime) / retries;

    console.log(dataList);
    console.log("Bot: Retries:", retries);

    // Send buy request
    const filteredDataList = dataList.filter(({ stock }) => stock > 0);
    filteredDataList.forEach(({ stock, sku, type, limit }) => {
      if (stock > 0) {
        const quantity = Math.min(limit.max, stock);
        console.log(`Bot: Buy ${quantity}/${stock} of ${sku}`);
        lazadaCheckoutChannel.postMessage({
          type: sku,
          message: { sku, quantity, type },
        });
        redirectToCheckout(true);
      }
    });

    if (filteredDataList.length === 0) {
      await delay(DELAY);
      xhr();
    }
  };

  timeOutID = !!retries
    ? setTimeout(() => {
        const endFetch = new Date().getTime();
        console.log(
          `Bot: Reach rate limit in ${(
            (endFetch - startTime - TIME_OUT) /
            1000
          ).toFixed(3)} senconds`
        );
        console.log("Bot: AverageFetchTime:", averageFetchTime);
        clearTimeout(timeOutID);

        /* Cancel the request */
        callBack = null;
        window.location.reload();
      }, TIME_OUT + averageFetchTime)
    : null;

  const saleTime = new Date("2024-05-31 08:59:59");
  console.log("Bot: Sale time", saleTime);

  const getCountDownIntervalDelay = () => {
    const currentTime = new Date();
    const timeLeft = (saleTime - currentTime) / 1000; // time left in seconds
    if (timeLeft > 0) {
      return 1000;
    } else if (timeLeft <= -30) {
      return 5000;
    }
    return 0;
  };

  const countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = (saleTime - currentTime) / 1000; // time left in seconds

    if (timeLeft > 0) {
      console.log(`Bot: Countdown ${Math.ceil(timeLeft)} seconds remaining`);
    } else {
      console.log("Bot: Sale time reached, triggering fetchData");
      clearInterval(countdownInterval);
      window.fetchData(callBack);
    }
  }, getCountDownIntervalDelay());
};

const redirectToCheckout = (isAuto) => {
  const quantity = 1;
  const value = document.querySelectorAll(
    "#module_cart_concern input[name=buyParams]"
  )?.[0]?.value;
  let json = { items: [{}] };
  try {
    json = JSON.parse(value);
  } catch (error) {
    console.log(error);
  }
  json.items[0].quantity = quantity;
  window.location.href = `https://www.lazada.co.th/wow/gcp/th/trade/shipping?spm=a2o4m.pdp_revamp.main_page.bottom_bar_main_button&buyParams=${encodeURIComponent(
    JSON.stringify(json)
  )}&from_pdp_buy_now=1&pwa_true_login=1&bot=y&auto=${isAuto ? "y" : "n"}`;
};

xhr();
