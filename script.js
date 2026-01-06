let map = L.map("map").setView([37.2242, 67.2783], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let polyline;
let markers = [];

const buses = [
  {
    number: 1,
    name: "Avtobus №1",
    stops: [
      { name: "Aeroport", lat: 37.232, lng: 67.272 },
      { name: "Avtovokzal", lat: 37.228, lng: 67.276 },
      { name: "Markaz", lat: 37.224, lng: 67.281 },
      { name: "Yangi bozor", lat: 37.221, lng: 67.286 },
    ],
  },
  {
    number: 2,
    name: "Avtobus №2",
    stops: [
      { name: "Temir yo‘l vokzali", lat: 37.229, lng: 67.27 },
      { name: "Shifoxona", lat: 37.226, lng: 67.274 },
      { name: "Markaz", lat: 37.224, lng: 67.281 },
      { name: "Fayzli mahalla", lat: 37.218, lng: 67.29 },
    ],
  },
  {
    number: 3,
    name: "Avtobus №3",
    stops: [
      { name: "Manguzar", lat: 37.215, lng: 67.26 },
      { name: "Yashil bozor", lat: 37.217, lng: 67.265 },
      { name: "Karf", lat: 37.219, lng: 67.268 },
      { name: "Bozor", lat: 37.224, lng: 67.284 },
    ],
  },
  {
    number: 5,
    name: "Avtobus №5",
    stops: [
      { name: "Sanoat zonasi", lat: 37.21, lng: 67.25 },
      { name: "Zavodlar hududi", lat: 37.212, lng: 67.255 },
      { name: "Yangi uylar", lat: 37.218, lng: 67.26 },
      { name: "Poliklinika", lat: 37.222, lng: 67.278 },
      { name: "Markaz", lat: 37.224, lng: 67.281 },
    ],
  },
  {
    number: 7,
    name: "Avtobus №7",
    stops: [
      { name: "Qadimiy Termiz", lat: 37.21, lng: 67.27 },
      { name: "Fayoztepa", lat: 37.215, lng: 67.275 },
      { name: "Muzey", lat: 37.22, lng: 67.278 },
      { name: "Markaz", lat: 37.224, lng: 67.281 },
    ],
  },
  {
    number: 15,
    name: "Avtobus №15",
    stops: [
      { name: "Temir yo‘l vokzali", lat: 37.229, lng: 67.27 },
      { name: "Yangi massiv", lat: 37.217, lng: 67.265 },
      { name: "Markaz", lat: 37.224, lng: 67.281 },
    ],
  },
  {
    number: 222,
    name: "Avtobus №222",
    stops: [
      { name: "Sanoat zonasi", lat: 37.21, lng: 67.25 },
      { name: "Yangi uylar", lat: 37.218, lng: 67.26 },
      { name: "Markaz", lat: 37.224, lng: 67.281 },
    ],
  },
];

function showBus(bus) {
  if (polyline) map.removeLayer(polyline);
  markers.forEach((m) => map.removeLayer(m));
  markers = [];

  const latlngs = bus.stops.map((s) => [s.lat, s.lng]);
  polyline = L.polyline(latlngs, { color: "#0d6efd", weight: 6 }).addTo(map);

  bus.stops.forEach((s) => {
    const marker = L.marker([s.lat, s.lng])
      .addTo(map)
      .bindPopup(`${bus.name}: ${s.name}`);
    markers.push(marker);
  });

  map.fitBounds(polyline.getBounds());
}

document.querySelectorAll(".bus").forEach((div) => {
  div.addEventListener("click", () => {
    const num = parseInt(div.getAttribute("data-number"));
    const bus = buses.find((b) => b.number === num);
    if (bus) showBus(bus);
  });
});

document.getElementById("search").addEventListener("input", (e) => {
  const val = e.target.value;
  const bus = buses.find((b) => b.number.toString() === val);
  if (bus) showBus(bus);
});
