const createScript = (url) => {
    const script = document.createElement('script');
    script.referrerpolicy = "unsafe-url";
    script.crossorigin = "";
    script.src = url;
    document.head.appendChild(script);
}


// page/products
if (
    new URL(window.location.pathname, window.location.origin).href.startsWith("https://www.lazada.co.th/products/") &&
    window.location.search.includes("bot=y")
 ) {
    createScript("http://localhost:5678/cdn/page/product/script.js");
}

