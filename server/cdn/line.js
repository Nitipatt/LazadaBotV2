import fetch from "node-fetch";
const sendLineNotify = async (message) => {
    try {
      var details = {
        message: self.displayDateTime() + message.trim(),
      }
      var formBody = []
      for (var property in details) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(details[property])
        formBody.push(encodedKey + "=" + encodedValue)
      }
      formBody = formBody.join("&")
      console.log(message)
      return fetch("https://notify-api.line.me/api/notify", {
        method: "POST",
        headers: {
          Authorization:"Bearer gVtdLVRqT1Rb0tBbiHz1MSAmR2JGhKSwzAiwDFGOyM6",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      })
    } catch (error) {
      console.log(error)
    }
  }
  const displayDateTime = () => {
    const date = new Date();
    const hour = `${date.getHours()}`.padStart(2, '0');
    const minute = `${date.getMinutes()}`.padStart(2, '0');
    const second = `${date.getSeconds()}`.padStart(2, '0');
    const year = `${date.getFullYear()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }

  export {sendLineNotify, displayDateTime}

