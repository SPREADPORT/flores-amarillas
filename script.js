(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Data: una flor por foto ---------- */
  const photos = [
    { file: "foto-05.jpg", w: 1200, h: 1600, alt: "Un beso al atardecer, con las luces de la ciudad encendiéndose de fondo." },
    { file: "foto-07.jpg", w: 1200, h: 1600, alt: "Un beso en una terraza, con la ciudad y el cielo nublado de fondo." },
    { file: "foto-01.jpg", w: 1600, h: 900,  alt: "Los dos en una piscina, él con los pulgares arriba sobre un flotador rosado." },
    { file: "foto-08.jpg", w: 1600, h: 1200, alt: "Selfie al atardecer en una terraza, con la ciudad iluminándose de fondo." },
    { file: "foto-02.jpg", w: 900,  h: 1600, alt: "Selfie de los dos sonriendo frente a un restaurante." },
    { file: "foto-09.jpg", w: 1200, h: 1600, alt: "Los dos haciendo pucheros juntos frente a una pared de ladrillo." },
    { file: "foto-04.jpg", w: 1600, h: 900,  alt: "Los dos esperando en una sala, ella lanzando un beso a la cámara." },
    { file: "foto-06.jpg", w: 1200, h: 1600, alt: "Selfie frente a un edificio, ella con la mano en su hombro." },
    { file: "foto-03.jpg", w: 1600, h: 900,  alt: "Selfie divertida en una tienda de ropa." },
    { file: "foto-10.jpg", w: 1600, h: 1200, alt: "Selfie entre plantas, ella lanzando un beso." },
    { file: "foto-11.jpg", w: 1200, h: 1600, alt: "Selfie junto a una piscina, él con gorra." },
  ];

  const TOTAL = photos.length;
  const openedFlowers = new Set();

  const marigoldSVG = () => `
    <svg viewBox="0 0 100 100">
      <g fill="var(--yellow)">
        <ellipse cx="50" cy="26" rx="9" ry="18"/>
        <ellipse cx="50" cy="74" rx="9" ry="18"/>
        <ellipse cx="26" cy="50" rx="18" ry="9"/>
        <ellipse cx="74" cy="50" rx="18" ry="9"/>
        <ellipse cx="34" cy="34" rx="8" ry="15" transform="rotate(-45 34 34)"/>
        <ellipse cx="66" cy="66" rx="8" ry="15" transform="rotate(-45 66 66)"/>
        <ellipse cx="66" cy="34" rx="8" ry="15" transform="rotate(45 66 34)"/>
        <ellipse cx="34" cy="66" rx="8" ry="15" transform="rotate(45 34 66)"/>
      </g>
      <circle class="flower__center" cx="50" cy="50" r="10" fill="var(--ember)"/>
    </svg>`;

  /* ---------- Construir el ramo ---------- */
  const bouquet = document.getElementById("bouquet");
  const scene = document.getElementById("scene");
  const giftbox = document.getElementById("giftbox");
  const giftboxLabel = document.getElementById("giftboxLabel");
  const sceneCounter = document.getElementById("sceneCounter");

  const flowerButtons = [];

  if (bouquet) {
    const scale = window.innerWidth < 480 ? 0.72 : 1;
    const spread = Math.min(60, 24 + TOTAL * 3.2); // grados totales de abanico
    photos.forEach((p, i) => {
      const t = TOTAL === 1 ? 0.5 : i / (TOTAL - 1);
      const angle = -spread + t * (spread * 2);
      const jitter = ((i * 37) % 7) - 3; // variación pequeña y determinista
      const finalAngle = angle + jitter * 0.4;
      const length = (130 + ((i % 3) * 24)) * scale; // profundidad del ramo
      const size = (44 + ((i % 3) * 6)) * scale;

      const stem = document.createElement("div");
      stem.className = "stem";
      stem.style.setProperty("--angle", `${finalAngle}deg`);
      stem.style.setProperty("--delay", `${i * 0.05}s`);
      stem.style.height = `${length}px`;
      stem.style.zIndex = String(100 - Math.round(Math.abs(finalAngle)));

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "flower";
      btn.style.setProperty("--angle", `${finalAngle}deg`);
      btn.style.setProperty("--size", `${size}px`);
      btn.setAttribute("aria-label", `Ver foto ${i + 1} de ${TOTAL}`);
      btn.dataset.index = String(i);
      btn.innerHTML = marigoldSVG();
      btn.addEventListener("click", () => openLightbox(i));

      stem.appendChild(btn);
      bouquet.appendChild(stem);
      flowerButtons.push(btn);
    });
  }

  function updateCounter() {
    if (!sceneCounter) return;
    sceneCounter.textContent = `${openedFlowers.size} de ${TOTAL} flores abiertas`;
  }

  /* ---------- Abrir / cerrar la caja ---------- */
  let boxOpen = false;

  function toggleBox() {
    boxOpen = !boxOpen;
    scene.classList.toggle("is-open", boxOpen);
    giftbox.setAttribute("aria-pressed", String(boxOpen));
    giftboxLabel.textContent = boxOpen ? "Toca una flor" : "Toca para abrir";
    sceneCounter.classList.toggle("is-visible", boxOpen);
  }

  giftbox?.addEventListener("click", toggleBox);

  /* ---------- Abrir el sobre del bono ---------- */
  const envelope = document.getElementById("envelope");
  const voucherScene = document.getElementById("voucherScene");

  envelope?.addEventListener("click", () => {
    voucherScene.classList.add("is-open");
    envelope.setAttribute("aria-pressed", "true");
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxScrim = document.getElementById("lightboxScrim");
  let lastFocused = null;

  function openLightbox(i) {
    const p = photos[i];
    if (!p || !lightbox) return;

    lastFocused = flowerButtons[i];
    openedFlowers.add(i);
    flowerButtons[i]?.classList.add("is-seen");
    updateCounter();

    lightboxImg.src = `images/${p.file}`;
    lightboxImg.alt = p.alt;
    lightboxImg.width = p.w;
    lightboxImg.height = p.h;
    lightboxCaption.textContent = `flor ${i + 1} de ${TOTAL}`;

    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("is-visible"));
    lightboxClose.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeLightbox() {
    lightbox.classList.remove("is-visible");
    document.removeEventListener("keydown", onKeydown);
    setTimeout(() => { lightbox.hidden = true; }, reduceMotion ? 0 : 300);
    lastFocused?.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") closeLightbox();
  }

  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxScrim?.addEventListener("click", closeLightbox);

  /* ---------- Falling petals ---------- */
  const petalContainer = document.getElementById("petals");
  if (petalContainer && !reduceMotion) {
    const TOTAL_PETALS = 22;
    for (let i = 0; i < TOTAL_PETALS; i++) {
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
  }
})();
