function checkPermission() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Support for service Worker");
  }
  if (!("Notification" in window)) {
    throw new Error("Notification not supported ");
  }
}

async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permission not granted");
  }
}

async function registerSw() {
  return await navigator.serviceWorker.register("notiSw.js");
}

async function Main() {
  checkPermission();
  await requestNotificationPermission();
  await registerSw();
}
