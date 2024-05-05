/*product page
Rate limit elimination
*/
let limit = 0;

const main = () => {
  setInterval(() => {
    // Dispatch fetch event
    const fetchEvent = new CustomEvent("fetchEventInit", {
      detail: { message: "Data fetch initiated" },
    });
    document.dispatchEvent(fetchEvent);
  }, 100);
};

// Listen fetch event
document.addEventListener("fetchEventCallback", ({ detail: dataList }) => {
  console.log(dataList);
  limit++;
  console.log("limit", limit);
});

if (
  new URL(window.location.pathname, window.location.origin).href.startsWith("https://www.lazada.co.th/products/") &&
  window.location.search.includes("bot=y")
) {
  const script = document.createElement('script');
  script.referrerpolicy = "unsafe-url";
  script.crossorigin = "";
  script.src = "http://localhost:5678/cdn/event-register.js";
  document.head.appendChild(script);
  script.onload = () => {
    main();
  };
}