const importScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.referrerpolicy = "unsafe-url";
    script.crossorigin = "";
    script.src = "http://localhost:5678/cdn" + url;
    document.head.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
  });
};

const importReact = () => {
  return new Promise(async (resolve, reject) => {
    await importScript("/lib/react.development.js");
    await importScript("/lib/react-dom.development.js");
    await importScript("/lib/babel.js");
    resolve();
  });
};

if (window.location.origin === "https://www.lazada.co.th") {
  importScript("/lazada/router.js");
}
