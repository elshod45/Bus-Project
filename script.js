// 1️⃣ Xarita yaratish
let map = L.map("map").setView([37.2242, 67.2783], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap",
}).addTo(map);

// 2️⃣ O'zgaruvchilar
let polyline;
let markers = [];

// 3️⃣ Avtobus marshrutlari
const routes = {
  1: [
    ["Aeroport", 37.232, 67.272],
    ["Avtovokzal", 37.228, 67.276],
    ["Markaz", 37.224, 67.281],
    ["Yangi bozor", 37.221, 67.286],
  ],
  2: [
    ["Temir yo‘l vokzali", 37.229, 67.27],
    ["Shifoxona", 37.226, 67.274],
    ["Markaz", 37.224, 67.281],
  ],
  3: [
    ["Manguzar", 37.215, 67.26],
    ["Yashil bozor", 37.217, 67.265],
    ["Bozor", 37.224, 67.284],
  ],
  5: [
    ["Sanoat zonasi", 37.21, 67.25],
    ["Yangi uylar", 37.218, 67.26],
    ["Markaz", 37.224, 67.281],
  ],
  7: [
    ["Qadimiy Termiz", 37.21, 67.27],
    ["Markaz", 37.224, 67.281],
  ],
  15: [
    ["Temir yo‘l vokzali", 37.229, 67.27],
    ["Markaz", 37.224, 67.281],
  ],
  222: [
    ["Sanoat zonasi", 37.21, 67.25],
    ["Markaz", 37.224, 67.281],
  ],
};

// 4️⃣ Avtobus bosilganda
document.querySelectorAll(".bus").forEach((bus) => {
  bus.onclick = function () {
    let busNumber = this.dataset.bus;
    drawRoute(routes[busNumber]);
  };
});

// 5️⃣ Marshrut chizish
function drawRoute(stops) {
  if (polyline) map.removeLayer(polyline);
  markers.forEach((m) => map.removeLayer(m));
  markers = [];

  let line = [];
  let list = document.getElementById("stopsList");
  list.innerHTML = "";

  stops.forEach((stop) => {
    line.push([stop[1], stop[2]]);

    let marker = L.marker([stop[1], stop[2]]).addTo(map).bindPopup(stop[0]);

    markers.push(marker);

    let li = document.createElement("li");
    li.textContent = "📍 " + stop[0];
    list.appendChild(li);
  });

  polyline = L.polyline(line, {
    color: "#0d6efd",
    weight: 5,
  }).addTo(map);

  map.fitBounds(polyline.getBounds());

  setTimeout(() => map.invalidateSize(), 300);
}

// 6️⃣ Qidiruv
document.getElementById("search").oninput = function () {
  let value = this.value;
  document.querySelectorAll(".bus").forEach((b) => {
    b.style.display = b.textContent.includes(value) ? "block" : "none";
  });
};

// 7️⃣ Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
