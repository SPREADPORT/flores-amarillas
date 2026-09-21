(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Gallery ---------- */
  const photos = [
    { file: "foto-01.jpg", w: 1600, h: 900, label: "flor 01", alt: "Los dos en una piscina, él con los pulgares arriba sobre una flotador rosado." },
    { file: "foto-02.jpg", w: 900, h: 1600, label: "flor 02", alt: "Selfie de los dos sonriendo frente a un restaurante." },
    { file: "foto-03.jpg", w: 1600, h: 900, label: "flor 03", alt: "Selfie divertida en una tienda de ropa." },
    { file: "foto-04.jpg", w: 1600, h: 900, label: "flor 04", alt: "Los dos esperando en una sala, ella lanzando un beso a la cámara." },
    { file: "foto-06.jpg", w: 1600, h: 1200, label: "flor 05", alt: "Selfie frente a un edificio, ella con la mano en su hombro." },
    { file: "foto-07.jpg", w: 1600, h: 1200, label: "flor 06", alt: "Un beso en una terraza, con la ciudad y el cielo nublado de fondo." },
    { file: "foto-08.jpg", w: 1600, h: 1200, label: "flor 07", alt: "Selfie al atardecer en una terraza, con la ciudad iluminándose de fondo." },
    { file: "foto-09.jpg", w: 1600, h: 1200, label: "flor 08", alt: "Los dos haciendo pucheros juntos frente a una pared de ladrillo." },
    { file: "foto-10.jpg", w: 1600, h: 1200, label: "flor 09", alt: "Selfie entre plantas, ella lanzando un beso." },
    { file: "foto-11.jpg", w: 1600, h: 1200, label: "flor 10", alt: "Selfie junto a una piscina, él con gorra." },
  ];

  const rotations = [-3, 2.4, -1.6, 3.2, -2.4, 1.6, -3.4, 2.8, -1.2, 3];

  const grid = document.getElementById("galleryGrid");
  if (grid) {
    const frag = document.createDocumentFragment();
    photos.forEach((p, i) => {
      const fig = document.createElement("figure");
      fig.className = "polaroid";
      fig.style.setProperty("--r", `${rotations[i % rotations.length]}deg`);

      const img = document.createElement("img");
      img.src = `images/${p.file}`;
      img.alt = p.alt;
      img.width = p.w;
      img.height = p.h;
      img.loading = "lazy";
      fig.appendChild(img);

      const stamp = document.createElement("figcaption");
      stamp.className = "polaroid__stamp";
      stamp.innerHTML = `<span>${p.label}</span><span>&#9679;</span>`;
      fig.appendChild(stamp);

      frag.appendChild(fig);
    });
    grid.appendChild(frag);
  }

  /* ---------- Falling petals ---------- */
  const petalContainer = document.getElementById("petals");
  if (petalContainer && !reduceMotion) {
    const TOTAL = 22;
    for (let i = 0; i < TOTAL; i++) {
      const el = document.createElement("span");
      const isButterfly = i % 7 === 0;
      const isSoft = !isButterfly && i % 3 === 0;
      el.className = "petal" + (isButterfly ? " petal--butterfly" : isSoft ? " petal--soft" : "");

      const left = Math.random() * 100;
      const fallDuration = 9 + Math.random() * 10;
      const swayDuration = 3 + Math.random() * 3;
      const delay = Math.random() * -20;
      const scale = 0.7 + Math.random() * 0.9;

      el.style.left = `${left}vw`;
      el.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
      el.style.animationDelay = `${delay}s, ${delay}s`;
      el.style.transform = `scale(${scale}) rotate(${Math.random() * 360}deg)`;

      petalContainer.appendChild(el);
    }
  }

  /* ---------- Date badge ---------- */
  const badge = document.getElementById("dateBadge");
  const yearMeta = document.getElementById("yearMeta");

  if (badge) {
    const now = new Date();
    const year = now.getFullYear();
    const isTodayTheDay = now.getMonth() === 8 && now.getDate() === 21; // septiembre = mes 8

    if (isTodayTheDay) {
      badge.textContent = "Hoy es 21 de septiembre";
      badge.dataset.mode = "today";
    } else {
      let target = new Date(year, 8, 21);
      if (now > target) target = new Date(year + 1, 8, 21);
      const days = Math.ceil((target - now) / 86400000);
      badge.textContent = `Faltan ${days} día${days === 1 ? "" : "s"} para las flores amarillas`;
      badge.dataset.mode = "countdown";
    }

    if (yearMeta) yearMeta.textContent = `21 de septiembre · ${year}`;
  }
})();
