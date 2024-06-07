function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function saveSubscription(subscription) {
  const res = await fetch("http://localhost:3000/save_subscription", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(subscription),
  });
  return res.json();
}

self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BPwVfYduULFiBvqu_tKFJcWkUJr7f42zI-DV9vGyWoOBapaYL_CApkc5ynwiPEGTSHRPj1geAViLxnIfJk_nCjY"
    ),
  });
  console.log(subscription);

  const res = await saveSubscription(subscription);
  console.log(res);
});

self.addEventListener("push", (e) => {
  self.registration.showNotification("Wohoo!!", { body: e.data.text() });
});

// Public Key:
// BPwVfYduULFiBvqu_tKFJcWkUJr7f42zI-DV9vGyWoOBapaYL_CApkc5ynwiPEGTSHRPj1geAViLxnIfJk_nCjY

// Private Key:
// RFdShtMbHXPzCeziV4hBJTYJ9ZB6qGJQmaqsQ6GT0Hw
