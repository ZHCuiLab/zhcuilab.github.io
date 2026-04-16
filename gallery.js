const i18n = {
  zh: {
    pageTitle: "相册 - 崔中华课题组",
    description: "崔中华课题组活动相册",
    groupName: "崔中华课题组",
    brandTag: "吉林大学原子与分子物理研究所",
    navResearch: "研究方向",
    navPublications: "发表论文",
    navMembers: "成员",
    navGallery: "相册",
    navContact: "联系我们",
    languageLabel: "🌐 语言",
    galleryPageTitle: "相册",
    galleryIntro: "记录课题组活动与学术成长的重要时刻。",
    footerLine1: "崔中华课题组 · 吉林大学原子与分子物理研究所",
    footerVisitsText: "访客数：",
    footerEmailText: "邮箱：zcui at jlu.edu.cn",
    footerOrcidText: "ORCID：0000-0002-0710-1774",
    footerLine2: "Copyright ©",
    emptyText: "暂无相册数据。",
    localPreviewHint: "当前为本地文件预览（file://），无法读取 data/gallery.json。请使用本地服务器访问，例如 http://localhost:5500/gallery.html。",
    readErrorText: "相册数据加载失败，请稍后重试。",
    imageLabel: "图片"
  },
  en: {
    pageTitle: "Gallery - Cui Zhong-hua Research Group",
    description: "Activity gallery of Cui Zhong-hua Research Group",
    groupName: "Cui Zhong-hua Research Group",
    brandTag: "Institute of Atomic and Molecular Physics, Jilin University",
    navResearch: "Research",
    navPublications: "Publications",
    navMembers: "Members",
    navGallery: "Gallery",
    navContact: "Contact",
    languageLabel: "🌐 Language",
    galleryPageTitle: "Gallery",
    galleryIntro: "Snapshots of group activities and key academic moments.",
    footerLine1: "Cui Zhong-hua Research Group · Institute of Atomic and Molecular Physics, Jilin University",
    footerVisitsText: "Visitors: ",
    footerEmailText: "Email: zcui at jlu.edu.cn",
    footerOrcidText: "ORCID: 0000-0002-0710-1774",
    footerLine2: "Copyright ©",
    emptyText: "No gallery data available.",
    localPreviewHint: "You are opening this page via file://, so data/gallery.json cannot be loaded. Please use a local server, e.g. http://localhost:5500/gallery.html.",
    readErrorText: "Failed to load gallery data. Please try again later.",
    imageLabel: "Image"
  }
};

const textIds = [
  "groupName",
  "brandTag",
  "navResearch",
  "navPublications",
  "navMembers",
  "navGallery",
  "navContact",
  "languageLabel",
  "galleryPageTitle",
  "galleryIntro",
  "footerLine1",
  "footerVisitsText",
  "footerEmailText",
  "footerOrcidText"
];

const languageSelect = document.getElementById("languageSelect");
const footerLine2 = document.getElementById("footerLine2");
const galleryContent = document.getElementById("galleryContent");

const lightbox = document.getElementById("galleryLightbox");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

let activeLanguage = localStorage.getItem("websiteLanguage") || "zh";
let galleryYears = [];
let activePhotoList = [];
let activePhotoIndex = 0;
let galleryMotionPlayed = false;

function applyLanguage(lang) {
  const selected = i18n[lang] ? lang : "zh";
  const dict = i18n[selected];

  document.documentElement.lang = selected === "zh" ? "zh-CN" : "en";
  document.title = dict.pageTitle;
  document.querySelector('meta[name="description"]').setAttribute("content", dict.description);

  textIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = dict[id];
    }
  });

  footerLine2.textContent = `${dict.footerLine2} ${new Date().getFullYear()} ${dict.groupName}`;
  languageSelect.value = selected;
  localStorage.setItem("websiteLanguage", selected);
  activeLanguage = selected;

  renderGallery();
}

function normalizeGalleryData(raw) {
  if (raw && Array.isArray(raw.years)) {
    return raw.years
      .map((yearBlock) => ({
        year: Number(yearBlock.year) || 0,
        events: Array.isArray(yearBlock.events) ? yearBlock.events : []
      }))
      .filter((yearBlock) => yearBlock.year > 0 && yearBlock.events.length > 0)
      .sort((a, b) => b.year - a.year)
      .map((yearBlock) => ({
        ...yearBlock,
        events: yearBlock.events
          .map((event) => ({
            ...event,
            photos: Array.isArray(event.photos) ? event.photos : []
          }))
          .filter((event) => event.photos.length > 0)
          .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
      }))
      .filter((yearBlock) => yearBlock.events.length > 0);
  }

  if (raw && Array.isArray(raw.events)) {
    const yearMap = new Map();
    raw.events.forEach((event) => {
      const eventDate = String(event.date || "");
      const year = Number(eventDate.slice(0, 4)) || Number(event.year) || 0;
      if (!year) {
        return;
      }
      if (!yearMap.has(year)) {
        yearMap.set(year, []);
      }
      yearMap.get(year).push({
        ...event,
        photos: Array.isArray(event.photos) ? event.photos : []
      });
    });

    return [...yearMap.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, events]) => ({
        year,
        events: events
          .filter((event) => event.photos.length > 0)
          .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
      }))
      .filter((yearBlock) => yearBlock.events.length > 0);
  }

  return [];
}

function getEventTitle(event) {
  return activeLanguage === "zh" ? (event.titleZh || event.titleEn || "") : (event.titleEn || event.titleZh || "");
}

function getEventDescription(event) {
  return activeLanguage === "zh" ? (event.descriptionZh || "") : (event.descriptionEn || "");
}

function buildPhotoAlt(eventTitle, index, dict) {
  return `${eventTitle} - ${dict.imageLabel} ${index + 1}`;
}

function renderGallery() {
  const dict = i18n[activeLanguage] || i18n.zh;

  if (!galleryYears.length) {
    galleryContent.innerHTML = `<p class="gallery-empty">${dict.emptyText}</p>`;
    return;
  }

  const html = galleryYears.map((yearBlock) => {
    const eventsHtml = yearBlock.events.map((event) => {
      const eventTitle = escapeHtml(getEventTitle(event));
      const eventDescription = escapeHtml(getEventDescription(event));
      const eventDate = escapeHtml(event.date || "");

      const photosHtml = event.photos.map((photo, index) => {
        const image = escapeHtml(photo.image || "");
        const isCover = photo.cover ? " is-cover" : "";
        const alt = escapeHtml(buildPhotoAlt(getEventTitle(event), index, dict));
        const photoTitle = `${eventTitle} · ${eventDate}`;

        return `
          <button type="button" class="gallery-photo${isCover}" data-event-id="${escapeHtml(event.eventId || "")}" data-photo-index="${index}" aria-label="${alt}">
            <img src="${image}" alt="${alt}" loading="lazy" decoding="async" data-photo-title="${photoTitle}" />
          </button>
        `;
      }).join("");

      return `
        <article class="gallery-event" data-event-id="${escapeHtml(event.eventId || "")}">
          <header class="gallery-event-header">
            <h3 class="gallery-event-title">${eventTitle}</h3>
            <span class="gallery-event-date">${eventDate}</span>
          </header>
          ${eventDescription ? `<p class="gallery-event-description">${eventDescription}</p>` : ""}
          <div class="gallery-photos">${photosHtml}</div>
        </article>
      `;
    }).join("");

    return `
      <section class="gallery-year" aria-labelledby="gallery-year-${yearBlock.year}">
        <h2 class="gallery-year-title" id="gallery-year-${yearBlock.year}">${yearBlock.year}</h2>
        <div class="gallery-events">${eventsHtml}</div>
      </section>
    `;
  }).join("");

  galleryContent.innerHTML = html;
  bindPhotoActions();
  applyGalleryMotion();
}

function applyGalleryMotion() {
  const heading = document.getElementById("galleryPageTitle");
  const intro = document.getElementById("galleryIntro");
  const yearBlocks = Array.from(galleryContent.querySelectorAll(".gallery-year"));

  if (heading) {
    heading.classList.add("js-reveal");
    heading.style.setProperty("--reveal-delay", "0ms");
  }

  if (intro) {
    intro.classList.add("js-reveal");
    intro.style.setProperty("--reveal-delay", "90ms");
  }

  yearBlocks.forEach((block, index) => {
    block.classList.add("js-reveal");
    block.style.setProperty("--reveal-delay", `${Math.min(160 + index * 90, 520)}ms`);

    const events = Array.from(block.querySelectorAll(".gallery-event"));
    events.forEach((event, eventIndex) => {
      event.classList.add("js-reveal");
      event.style.setProperty("--reveal-delay", `${Math.min(220 + eventIndex * 70, 620)}ms`);
    });
  });

  if (galleryMotionPlayed) {
    document.querySelectorAll("#galleryPageTitle, #galleryIntro, .gallery-year, .gallery-event").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  if (window.MotionReveal && typeof window.MotionReveal.setup === "function") {
    window.MotionReveal.setup(document);
  }

  galleryMotionPlayed = true;
}

function bindPhotoActions() {
  const eventMap = new Map();

  galleryYears.forEach((yearBlock) => {
    yearBlock.events.forEach((event) => {
      eventMap.set(String(event.eventId || ""), event);
    });
  });

  document.querySelectorAll(".gallery-photo").forEach((button) => {
    button.addEventListener("click", () => {
      const eventId = button.getAttribute("data-event-id") || "";
      const photoIndex = Number(button.getAttribute("data-photo-index") || 0);
      const event = eventMap.get(eventId);

      if (!event || !Array.isArray(event.photos) || event.photos.length === 0) {
        return;
      }

      activePhotoList = event.photos.map((photo, index) => ({
        src: photo.image || "",
        title: `${getEventTitle(event)} · ${event.date || ""}`,
        alt: buildPhotoAlt(getEventTitle(event), index, i18n[activeLanguage] || i18n.zh)
      }));
      activePhotoIndex = Math.max(0, Math.min(photoIndex, activePhotoList.length - 1));
      showLightbox();
    });
  });
}

function showLightbox() {
  if (!activePhotoList.length) {
    return;
  }

  const photo = activePhotoList[activePhotoIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxTitle.textContent = `${photo.title} (${activePhotoIndex + 1}/${activePhotoList.length})`;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function hideLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showPrevPhoto() {
  if (!activePhotoList.length) {
    return;
  }
  activePhotoIndex = (activePhotoIndex - 1 + activePhotoList.length) % activePhotoList.length;
  showLightbox();
}

function showNextPhoto() {
  if (!activePhotoList.length) {
    return;
  }
  activePhotoIndex = (activePhotoIndex + 1) % activePhotoList.length;
  showLightbox();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function loadGalleryData() {
  const dict = i18n[activeLanguage] || i18n.zh;

  if (window.location.protocol === "file:") {
    galleryContent.innerHTML = `<p class="gallery-empty">${dict.localPreviewHint}</p>`;
    return;
  }

  try {
    const response = await fetch("data/gallery.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const raw = await response.json();
    galleryYears = normalizeGalleryData(raw);
    renderGallery();
  } catch (error) {
    console.error("Failed to load gallery data:", error);
    galleryContent.innerHTML = `<p class="gallery-empty">${dict.readErrorText}</p>`;
  }
}

const savedLanguage = localStorage.getItem("websiteLanguage") || "zh";
applyLanguage(savedLanguage);
loadGalleryData();

languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

lightboxBackdrop.addEventListener("click", hideLightbox);
lightboxClose.addEventListener("click", hideLightbox);
lightboxPrev.addEventListener("click", showPrevPhoto);
lightboxNext.addEventListener("click", showNextPhoto);

document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) {
    return;
  }

  if (event.key === "Escape") {
    hideLightbox();
  } else if (event.key === "ArrowLeft") {
    showPrevPhoto();
  } else if (event.key === "ArrowRight") {
    showNextPhoto();
  }
});
