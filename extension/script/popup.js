let interval = () => {};

async function callFunction(type, data) {
  const body = data
  console.log(body)
  let query = { active: true, currentWindow: true }
  chrome.tabs.query(query,function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type, ...body }, function (response) {
      console.log(response)
    })
  })
}

function setStatus(status) {
  if (status == "start") {
    document.getElementsByClassName("logo")[0].className = "logo glow"
    document.getElementById("btnStart").disabled = true
    document.getElementById("btnStop").disabled = false
    localStorage.setItem("status", "start")
    interval = setInterval(() => {
      callFunction(
        "start",
        'buy'
      )
    }, 50);
  } else {
    document.getElementsByClassName("logo")[0].className = "logo"
    document.getElementById("btnStart").disabled = false
    document.getElementById("btnStop").disabled = true
    localStorage.removeItem("status")
  }
}

window.onload = function () {
  setStatus(localStorage.getItem("status"))

  document.getElementById("btnStart").onclick = function ($event) {
    setStatus("start")
    callFunction("start")
  }
  document.getElementById("btnStop").onclick = function ($event) {
    setStatus("stop")
    callFunction("stop")
  }



}
