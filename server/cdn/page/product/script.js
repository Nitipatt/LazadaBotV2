/*product page
Rate limit elimination
*/
console.log("bot init");

const TIME_OUT = 800;
const startTime = new Date().getTime();

let retries = 0;

const xhr = () => {
  const intervalId = setInterval(() => {

    const startFetch = new Date().getTime();
    const timeOutID = setTimeout(() => {
      const endFetch = new Date().getTime();
      console.log(`Reach rate limit in ${((endFetch - startTime - TIME_OUT)/1000).toFixed(3)} senconds`);
      clearTimeout(timeOutID);
      clearInterval(intervalId);
      window.location.reload();
    }, TIME_OUT);


    window.fetchData(() => {
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
      clearTimeout(timeOutID);
      console.log(dataList);
      retries++;
      console.log("retries:", retries);
    });



  }, 100);
};

xhr();





