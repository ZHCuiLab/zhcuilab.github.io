const i18n = {
  zh: {
    pageTitle: "欢迎加入我们 - 崔中华课题组",
    description: "崔中华课题组招生与联系方式信息",
    groupName: "崔中华课题组",
    brandTag: "吉林大学原子与分子物理研究所",
    navResearch: "研究方向",
    navPublications: "发表论文",
    navMembers: "成员",
    navGallery: "相册",
    navContact: "联系我们",
    languageLabel: "🌐 语言",
    contactHeroTitle: "欢迎加入我们",
    contactHeroDesc: "我们欢迎对原子与分子物理、理论化学与计算材料感兴趣的博士研究生与硕士研究生加入团队，期待与你一起开展前沿探索。",
    sectionInfoTitle: "联系信息",
    professorLabel: "联系人",
    professorValue: "崔中华 教授",
    emailLabel: "邮箱",
    emailValue: "zcui at jlu.edu.cn",
    addressLabel: "联系地址",
    addressText: "中国 吉林省 长春市 朝阳区 前进大街2699号 吉林大学唐敖庆楼C区544，邮编 130012",
    sectionMapTitle: "地图导航",
    mapOpenZh: "打开高德地图",
    mapOpenEn: "打开 Google Maps",
    sectionGalleryTitle: "校园掠影",
    footerLine1: "崔中华课题组 · 吉林大学原子与分子物理研究所",
    footerVisitsText: "访客数：",
    footerEmailText: "邮箱：zcui at jlu.edu.cn",
    footerOrcidText: "ORCID：0000-0002-0710-1774",
    footerLine2: "Copyright ©"
  },
  en: {
    pageTitle: "Join Us - Cui Zhong-hua Group",
    description: "Admissions and contact details of Cui Zhong-hua Group",
    groupName: "Cui Zhong-hua Group",
    brandTag: "Institute of Atomic and Molecular Physics, Jilin University",
    navResearch: "Research",
    navPublications: "Publications",
    navMembers: "Members",
    navGallery: "Gallery",
    navContact: "Contact",
    languageLabel: "🌐 Language",
    contactHeroTitle: "Join Us",
    contactHeroDesc: "We welcome PhD and MSc applicants interested in atomic and molecular physics, theoretical chemistry, and computational materials.",
    sectionInfoTitle: "Contact Information",
    professorLabel: "Contact Person",
    professorValue: "Prof. Zhong-hua Cui",
    emailLabel: "Email",
    emailValue: "zcui at jlu.edu.cn",
    addressLabel: "Address",
    addressText: "Room 544, Zone C, Tang Aoqing Building, Jilin University, 2699 Qianjin Street, Changchun, Jilin, China 130012",
    sectionMapTitle: "Map",
    mapOpenZh: "Open Amap",
    mapOpenEn: "Open Google Maps",
    sectionGalleryTitle: "Campus Glimpse",
    footerLine1: "Cui Zhong-hua Group · Institute of Atomic and Molecular Physics, Jilin University",
    footerVisitsText: "Visitors: ",
    footerEmailText: "Email: zcui at jlu.edu.cn",
    footerOrcidText: "ORCID: 0000-0002-0710-1774",
    footerLine2: "Copyright ©"
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
  "contactHeroTitle",
  "contactHeroDesc",
  "sectionInfoTitle",
  "professorLabel",
  "professorValue",
  "emailLabel",
  "emailValue",
  "addressLabel",
  "addressText",
  "sectionMapTitle",
  "mapOpenZh",
  "mapOpenEn",
  "sectionGalleryTitle",
  "footerLine1",
  "footerVisitsText",
  "footerEmailText",
  "footerOrcidText"
];

const languageSelect = document.getElementById("languageSelect");
const footerLine2 = document.getElementById("footerLine2");
const mapPanelZh = document.getElementById("mapPanelZh");
const mapPanelEn = document.getElementById("mapPanelEn");

const carouselTrack = document.getElementById("carouselTrack");
let carouselItems = Array.from(document.querySelectorAll(".carousel-item"));
const prevBtn = document.getElementById("carouselPrev");
const nextBtn = document.getElementById("carouselNext");
let currentSlide = 0;
let autoPlayTimer = null;

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
const CONTACT_IMAGE_API = "https://api.github.com/repos/ZHCuiLab/zhcuilab.github.io/contents/assets/images/contact";
const CONTACT_IMAGE_CACHE_KEY = "contactImageList";
const CONTACT_IMAGE_CACHE_TTL = 24 * 60 * 60 * 1000;

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

  const showZhMap = selected === "zh";
  if (mapPanelZh) {
    mapPanelZh.hidden = !showZhMap;
  }
  if (mapPanelEn) {
    mapPanelEn.hidden = showZhMap;
  }
}

function updateCarousel() {
  if (!carouselTrack || carouselItems.length === 0) {
    return;
  }

  const offset = currentSlide * 100;
  carouselTrack.style.transform = `translateX(-${offset}%)`;
}

function stepCarousel(delta) {
  if (carouselItems.length === 0) {
    return;
  }

  currentSlide = (currentSlide + delta + carouselItems.length) % carouselItems.length;
  updateCarousel();
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayTimer = window.setInterval(() => {
    stepCarousel(1);
  }, 5000);
}

function stopAutoPlay() {
  if (autoPlayTimer) {
    window.clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
}

function isImageFile(name) {
  const lower = String(name || "").toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function getFallbackImages() {
  return carouselItems
    .map((item) => {
      const img = item.querySelector("img");
      if (!img) {
        return null;
      }

      return {
        src: img.getAttribute("src") || "",
        alt: img.getAttribute("alt") || "校园照片"
      };
    })
    .filter((img) => img && img.src);
}

function renderCarouselImages(images) {
  if (!carouselTrack || !Array.isArray(images) || images.length === 0) {
    return;
  }

  const html = images
    .map((img) => {
      const safeSrc = String(img.src || "");
      const safeAlt = String(img.alt || "校园照片");
      return (
        `<figure class="carousel-item">` +
        `<img src="${safeSrc}" alt="${safeAlt}" loading="lazy" decoding="async" />` +
        `</figure>`
      );
    })
    .join("");

  carouselTrack.innerHTML = html;
  carouselItems = Array.from(document.querySelectorAll(".carousel-item"));
  currentSlide = 0;
  updateCarousel();
}

function readImageCache() {
  try {
    const raw = localStorage.getItem(CONTACT_IMAGE_CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.images) || typeof parsed.ts !== "number") {
      return null;
    }

    if (Date.now() - parsed.ts > CONTACT_IMAGE_CACHE_TTL) {
      return null;
    }

    return parsed.images;
  } catch {
    return null;
  }
}

function writeImageCache(images) {
  try {
    const payload = { ts: Date.now(), images };
    localStorage.setItem(CONTACT_IMAGE_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore cache write failures.
  }
}

async function loadContactImages() {
  const fallbackImages = getFallbackImages();

  if (window.location.protocol === "file:") {
    // Browsers cannot enumerate local directories for static pages.
    renderCarouselImages(fallbackImages);
    return;
  }

  const cached = readImageCache();
  if (cached && cached.length > 0) {
    renderCarouselImages(cached);
  }

  try {
    const response = await fetch(CONTACT_IMAGE_API, {
      headers: {
        Accept: "application/vnd.github+json"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }

    const entries = await response.json();
    if (!Array.isArray(entries)) {
      throw new Error("Unexpected API response.");
    }

    const images = entries
      .filter((entry) => entry && entry.type === "file" && isImageFile(entry.name))
      .sort((a, b) => a.name.localeCompare(b.name, "en"))
      .map((entry) => ({
        src: entry.download_url || `https://raw.githubusercontent.com/ZHCuiLab/zhcuilab.github.io/main/${entry.path}`,
        alt: "校园照片"
      }));

    if (images.length > 0) {
      renderCarouselImages(images);
      writeImageCache(images);
      return;
    }

    renderCarouselImages(fallbackImages);
  } catch {
    renderCarouselImages(cached && cached.length > 0 ? cached : fallbackImages);
  }
}

const savedLanguage = localStorage.getItem("websiteLanguage") || "zh";
applyLanguage(savedLanguage);
updateCarousel();
startAutoPlay();
loadContactImages();

languageSelect.addEventListener("change", (event) => {
  const lang = event.target.value;
  applyLanguage(lang);
});

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    stepCarousel(-1);
    startAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    stepCarousel(1);
    startAutoPlay();
  });
}

if (carouselTrack) {
  carouselTrack.addEventListener("mouseenter", stopAutoPlay);
  carouselTrack.addEventListener("mouseleave", startAutoPlay);
}
