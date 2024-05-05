document.addEventListener("fetchEventInit", () => {
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
      const fetchEvent = new CustomEvent("fetchEventCallback", {
        detail: dataList,
      });
      document.dispatchEvent(fetchEvent);
    });
  });
  console.log("bot init");