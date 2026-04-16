const i18n = {
  zh: {
    pageTitle: "发表论文 - 崔中华课题组",
    description: "崔中华课题组发表论文列表",
    groupName: "崔中华课题组",
    brandTag: "吉林大学原子与分子物理研究所",
    navResearch: "研究方向",
    navPublications: "发表论文",
    navMembers: "成员",
    navGallery: "相册",
    navContact: "联系我们",
    languageLabel: "🌐 语言",
    pubPageTitle: "发表论文",
    footerLine1: "崔中华课题组 · 吉林大学原子与分子物理研究所",
    footerVisitsText: "访客数：",
    footerEmailText: "邮箱：zcui at jlu.edu.cn",
    footerOrcidText: "ORCID：0000-0002-0710-1774",
    footerLine2: "Copyright ©",
    emptyText: "暂无论文数据。",
    localPreviewHint: "当前为本地文件预览（file://），无法读取 data/publications.json。请使用本地服务器访问，例如 http://localhost:5500/publications.html。",
    doiLabel: "DOI"
  },
  en: {
    pageTitle: "Publications - Cui Zhong-hua Research Group",
    description: "Publication list of Cui Zhong-hua Research Group",
    groupName: "Cui Zhong-hua Research Group",
    brandTag: "Institute of Atomic and Molecular Physics, Jilin University",
    navResearch: "Research",
    navPublications: "Publications",
    navMembers: "Members",
    navGallery: "Gallery",
    navContact: "Contact",
    languageLabel: "🌐 Language",
    pubPageTitle: "Publications",
    footerLine1: "Cui Zhong-hua Research Group · Institute of Atomic and Molecular Physics, Jilin University",
    footerVisitsText: "Visitors: ",
    footerEmailText: "Email: zcui at jlu.edu.cn",
    footerOrcidText: "ORCID: 0000-0002-0710-1774",
    footerLine2: "Copyright ©",
    emptyText: "No publications available.",
    localPreviewHint: "You are opening this page via file://, so data/publications.json cannot be loaded. Please use a local server, e.g. http://localhost:5500/publications.html.",
    doiLabel: "DOI"
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
  "pubPageTitle",
  "footerLine1",
  "footerVisitsText",
  "footerEmailText",
  "footerOrcidText"
];

const languageSelect = document.getElementById("languageSelect");
const footerLine2 = document.getElementById("footerLine2");
const publicationsList = document.getElementById("publicationsList");

let publicationData = [];
let activeLanguage = localStorage.getItem("websiteLanguage") || "zh";
let publicationMotionPlayed = false;

const fallbackPublications = {
  "2026": [
    {
      "id": "5",
      "title": "Electronic Structures of CO<sub>2</sub>-Activated Clusters with d<sup>10</sup> Centers",
      "authors": "I. Author, J. Author, Z. Cui",
      "journal": "J. Phys. Chem. Lett.",
      "year": 2026,
      "volume": "17",
      "issue": "4",
      "pages": "1001-1009",
      "doi": "10.1021/jpcl.xxxxx",
      "url": "https://doi.org/10.1021/jpcl.xxxxx",
      "note": ""
    },
    {
      "id": "4",
      "title": "Planar Hypercoordinate Atoms in Boron Clusters",
      "authors": "A. Author, B. Author, Z. Cui",
      "journal": "JACS",
      "year": 2026,
      "volume": "148",
      "issue": "12",
      "pages": "1234-1242",
      "doi": "10.1021/jacs.xxxxx",
      "url": "https://doi.org/10.1021/jacs.xxxxx",
      "note": ""
    },
    {
      "id": "3",
      "title": "Bonding Characteristics in Planar Hypercoordinate Motifs",
      "authors": "E. Author, F. Author, Z. Cui",
      "journal": "Angew. Chem.",
      "year": 2026,
      "volume": "65",
      "issue": "8",
      "pages": "e2026xxxx",
      "doi": "10.1002/anie.xxxxx",
      "url": "https://doi.org/10.1002/anie.xxxxx",
      "note": ""
    }
  ],
  "2025": [
    {
      "id": "2",
      "title": "Electronic Structure and Bonding in Two-Dimensional Superconducting Materials",
      "authors": "C. Author, D. Author, Z. Cui",
      "journal": "Chem. Sci.",
      "year": 2025,
      "volume": "16",
      "issue": "3",
      "pages": "567-579",
      "doi": "10.1039/dxscxxxxx",
      "url": "https://doi.org/10.1039/dxscxxxxx",
      "note": ""
    },
    {
      "id": "1",
      "title": "Topology and Stability of Boron-Based Cluster Systems",
      "authors": "G. Author, H. Author, Z. Cui",
      "journal": "Nano Lett.",
      "year": 2025,
      "volume": "25",
      "issue": "6",
      "pages": "3340-3348",
      "doi": "10.1021/acs.nanolett.xxxxx",
      "url": "https://doi.org/10.1021/acs.nanolett.xxxxx",
      "note": ""
    }
  ]
};

function normalizePublications(raw) {
  if (Array.isArray(raw)) {
    return raw;
  }

  if (!raw || typeof raw !== "object") {
    return [];
  }

  const normalized = [];
  Object.entries(raw).forEach(([yearKey, items]) => {
    if (!Array.isArray(items)) {
      return;
    }

    items.forEach((item, index) => {
      const current = item && typeof item === "object" ? item : {};
      normalized.push({
        ...current,
        id: current.id || String(index + 1),
        year: current.year || Number(yearKey)
      });
    });
  });

  return normalized;
}

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

  renderPublications();
}

function formatCitation(item, dict) {
  const idLabel = escapeHtml(item.id || "");
  const idPrefix = idLabel ? `<span class="publication-id">${idLabel}</span>` : "";
  const authors = formatAuthorsMarkup(item.authors || "");
  const title = `<span class="publication-title">${sanitizeTitleMarkup(item.title || "")}</span>`;
  const journal = `<span class="publication-journal">${escapeHtml(item.journal || "")}</span>`;
  const year = item.year ? `<span class="publication-year-inline">${escapeHtml(String(item.year))}</span>` : "";

  const details = [item.volume, item.issue ? `(${item.issue})` : "", item.pages]
    .filter(Boolean)
    .map((part) => escapeHtml(String(part)))
    .join(" ");

  const doiValue = item.doi ? escapeHtml(item.doi) : "";
  const doiHref = item.url ? escapeHtml(item.url) : (item.doi ? `https://doi.org/${escapeHtml(item.doi)}` : "");
  const doi = doiValue
    ? `<a class="publication-doi" href="${doiHref}" target="_blank" rel="noopener noreferrer">${dict.doiLabel}: ${doiValue}</a>`
    : "";
  const note = item.note ? escapeHtml(item.note) : "";

  const bodySegments = [authors, title, journal, year, details, doi, note].filter(Boolean);
  let html = bodySegments.join(", ");

  if (idPrefix) {
    html = `${idPrefix}. ${html}`;
  }

  return html;
}

function groupByYear(data) {
  const withIndex = data.map((item, index) => {
    const year = Number(item.year) || 0;
    const inMergedBucket = year >= 2010 && year <= 2015;

    return {
      ...item,
      _index: index,
      _groupLabel: inMergedBucket ? "2010-2015" : String(year),
      _sortYear: inMergedBucket ? 2015 : year
    };
  });

  withIndex.sort((a, b) => {
    if (a._sortYear !== b._sortYear) {
      return b._sortYear - a._sortYear;
    }
    return a._index - b._index;
  });

  const grouped = new Map();
  withIndex.forEach((item) => {
    const label = item._groupLabel;
    if (!grouped.has(label)) {
      grouped.set(label, []);
    }
    grouped.get(label).push(item);
  });

  return grouped;
}

function renderPublications() {
  const dict = i18n[activeLanguage] || i18n.zh;

  if (!publicationData.length) {
    publicationsList.innerHTML = `<p class="publications-empty">${dict.emptyText}</p>`;
    return;
  }

  const grouped = groupByYear(publicationData);
  const blocks = [];

  grouped.forEach((items, yearLabel) => {
    const sortedItems = [...items].sort((a, b) => {
      const idA = Number(a.id);
      const idB = Number(b.id);

      if (!Number.isNaN(idA) && !Number.isNaN(idB) && idA !== idB) {
        return idB - idA;
      }

      return String(b.id || "").localeCompare(String(a.id || ""), "en", { numeric: true });
    });

    const itemHtml = sortedItems
      .map((item) => `<li class="publication-item">${formatCitation(item, dict)}</li>`)
      .join("");

    blocks.push(
      `<section class="publication-year-block" aria-label="${yearLabel}">` +
      `<h2 class="publication-year-title">${yearLabel}</h2>` +
      `<ol class="publication-items">${itemHtml}</ol>` +
      `</section>`
    );
  });

  publicationsList.innerHTML = blocks.join("");
  applyPublicationsMotion();
}

function applyPublicationsMotion() {
  const yearBlocks = Array.from(publicationsList.querySelectorAll(".publication-year-block"));
  if (!yearBlocks.length) {
    return;
  }

  yearBlocks.forEach((block, blockIndex) => {
    block.classList.add("js-reveal");
    block.style.setProperty("--reveal-delay", `${Math.min(blockIndex * 90, 360)}ms`);

    const itemList = Array.from(block.querySelectorAll(".publication-item"));
    itemList.forEach((item, itemIndex) => {
      item.classList.add("js-reveal");
      item.style.setProperty("--reveal-delay", `${Math.min(120 + itemIndex * 55, 520)}ms`);
    });
  });

  if (publicationMotionPlayed) {
    publicationsList.querySelectorAll(".js-reveal").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  if (window.MotionReveal && typeof window.MotionReveal.setup === "function") {
    window.MotionReveal.setup(publicationsList);
  }

  publicationMotionPlayed = true;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeTitleMarkup(value) {
  const escaped = escapeHtml(value);
  return escaped.replace(/&lt;(\/?)(sub|sup)&gt;/gi, "<$1$2>");
}

function formatAuthorsMarkup(value) {
  const escaped = escapeHtml(value || "");

  // Normalize legacy marker encodings in data, then apply display highlights.
  const normalized = escaped
    .replace(/\\([*#†‡])/g, "$1")
    .replace(/\^#\^/g, "#");

  return normalized.replace(/Zhong-?hua Cui/gi, (match) => {
    return `<span class="publication-author-highlight">${match}</span>`;
  });
}

async function loadPublications() {
  try {
    const response = await fetch("data/publications.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    publicationData = normalizePublications(data);
    renderPublications();
  } catch (error) {
    const dict = i18n[activeLanguage] || i18n.zh;
    if (window.location.protocol === "file:") {
      publicationsList.innerHTML = `<p class="publications-empty">${dict.localPreviewHint}</p>`;
      return;
    }

    publicationData = normalizePublications(fallbackPublications);
    renderPublications();
  }
}

applyLanguage(activeLanguage);
loadPublications();

languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});
