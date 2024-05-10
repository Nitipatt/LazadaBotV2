/*product page
Rate limit elimination
*/
console.log("bot init");

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
    console.log("retries:", retries);

    await delay(DELAY);
    xhr();
  };

  timeOutID = !!retries
    ? setTimeout(() => {
        const endFetch = new Date().getTime();
        console.log(
          `Reach rate limit in ${(
            (endFetch - startTime - TIME_OUT) /
            1000
          ).toFixed(3)} senconds`
        );
        console.log("averageFetchTime:", averageFetchTime);
        clearTimeout(timeOutID);

        /* Cancel the request */
        callBack = null;
        window.location.reload();
      }, TIME_OUT + averageFetchTime)
    : null;

  window.fetchData(callBack);
};

xhr();
