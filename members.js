const i18n = {
  zh: {
    pageTitle: "成员 - 崔中华课题组",
    description: "崔中华课题组成员信息",
    groupName: "崔中华课题组",
    brandTag: "吉林大学原子与分子物理研究所",
    navResearch: "研究方向",
    navPublications: "发表论文",
    navMembers: "成员",
    navGallery: "相册",
    navContact: "联系我们",
    languageLabel: "🌐 语言",
    membersPageTitle: "成员",
    groups: {
      pi: "课题组负责人",
      faculty: "教师",
      phd: "博士研究生",
      master: "硕士研究生"
    },
    yearLabel: "级",
    footerLine1: "崔中华课题组 · 吉林大学原子与分子物理研究所",
    footerVisitsText: "访客数：",
    footerEmailText: "邮箱：zcui at jlu.edu.cn",
    footerOrcidText: "ORCID：0000-0002-0710-1774",
    footerLine2: "Copyright ©"
  },
  en: {
    pageTitle: "Members - Cui Zhong-hua Group",
    description: "Member profiles of Cui Zhong-hua Group",
    groupName: "Cui Zhong-hua Group",
    brandTag: "Institute of Atomic and Molecular Physics, Jilin University",
    navResearch: "Research",
    navPublications: "Publications",
    navMembers: "Members",
    navGallery: "Gallery",
    navContact: "Contact",
    languageLabel: "🌐 Language",
    membersPageTitle: "Members",
    groups: {
      pi: "Principal Investigators",
      faculty: "Faculty",
      phd: "PhD Students",
      master: "Master Students"
    },
    yearLabel: "Class of",
    footerLine1: "Cui Zhong-hua Group · Institute of Atomic and Molecular Physics, Jilin University",
    footerVisitsText: "Visitors: ",
    footerEmailText: "Email: zcui at jlu.edu.cn",
    footerOrcidText: "ORCID: 0000-0002-0710-1774",
    footerLine2: "Copyright ©"
  }
};

let memberData = {
  pi: [],
  faculty: [],
  phd: {},
  master: {}
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
  "footerLine1",
  "footerVisitsText",
  "footerEmailText",
  "footerOrcidText"
];

const languageSelect = document.getElementById("languageSelect");
const footerLine2 = document.getElementById("footerLine2");
const memberGroups = document.getElementById("memberGroups");
let activeLanguage = localStorage.getItem("websiteLanguage") || "zh";

function normalizeMemberData(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  return {
    pi: Array.isArray(source.pi) ? source.pi : [],
    faculty: Array.isArray(source.faculty) ? source.faculty : [],
    phd: source.phd && typeof source.phd === "object" ? source.phd : {},
    master: source.master && typeof source.master === "object" ? source.master : {}
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function initialsFromName(name) {
  const value = String(name || "").trim();
  if (!value) {
    return "?";
  }
  if (/^[\u4e00-\u9fa5]+$/.test(value)) {
    return value.slice(0, 1);
  }
  const parts = value.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return value.slice(0, 2).toUpperCase();
}

function extractChineseSurname(nameZh) {
  const value = String(nameZh || "").trim();
  if (!value) {
    return "";
  }

  // Prefer explicit surname delimiter in data, e.g. "于 浩洋" -> "于"
  const parts = value.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return parts[0];
  }

  // Fallback for legacy data without whitespace.
  return value.slice(0, 1);
}

function extractEnglishGivenName(nameEn) {
  const value = String(nameEn || "").trim();
  if (!value) {
    return "";
  }

  const parts = value.split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return parts[0] || "";
  }

  return parts.slice(0, -1).join(" ");
}

function formatStudentNameForZh(item) {
  if (!item || typeof item !== "object") {
    return String(item || "");
  }

  const surnameZh = extractChineseSurname(item.nameZh);
  const givenNameEn = extractEnglishGivenName(item.nameEn);

  if (surnameZh && givenNameEn) {
    return `${surnameZh}${givenNameEn}`;
  }

  return item.nameZh || item.nameEn || "";
}

function renderStaffCard(member, hidePhoto) {
  const displayName = activeLanguage === "zh" ? member.nameZh : (member.nameEn || member.nameZh);
  const initials = initialsFromName(displayName);
  const photoHtml = !hidePhoto && member.photo
    ? `<img src="assets/images/members/${escapeHtml(member.photo)}" alt="${escapeHtml(displayName)}" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />`
    : "";
  const avatarHtml = hidePhoto
    ? ""
    : (
      `<div class="staff-avatar">` +
      photoHtml +
      `<span class="staff-avatar-fallback"${!hidePhoto && member.photo ? " style=\"display:none\"" : ""}>${escapeHtml(initials)}</span>` +
      `</div>`
    );

  return (
    `<article class="staff-card">` +
    avatarHtml +
    `<p class="staff-name">${escapeHtml(displayName)}</p>` +
    `<a class="staff-email" href="mailto:${escapeHtml(member.email)}">${escapeHtml(member.email)}</a>` +
    `</article>`
  );
}

function renderFacultyBlock(dict) {
  const piMembers = memberData.pi || [];
  const facultyMembers = memberData.faculty || [];
  const hidePhoto = true;

  const piCards = piMembers.map((member) => {
    return renderStaffCard(member, hidePhoto);
  }).join("");

  const facultyCards = facultyMembers.map((member) => {
    return renderStaffCard(member, hidePhoto);
  }).join("");

  const piRow = piCards
    ? `<div class="staff-grid staff-grid-pi">${piCards}</div>`
    : "";

  const facultyRow = facultyCards
    ? `<div class="staff-grid staff-grid-faculty">${facultyCards}</div>`
    : "";

  const emptyState = !piRow && !facultyRow
    ? `<p class="member-empty">-</p>`
    : "";

  return (
    `<section class="member-group member-group-staff" data-group="faculty">` +
    `<div class="member-group-inner">` +
    `<h2 class="member-group-title">${dict.groups.faculty}</h2>` +
    `<div class="staff-stack">${piRow}${facultyRow}${emptyState}</div>` +
    `</div>` +
    `</section>`
  );
}

function renderStaffCards(groupKey, dict) {
  const members = memberData[groupKey] || [];
  const hidePhoto = groupKey === "pi" || groupKey === "faculty";
  const cards = members.map((member) => {
    const displayName = activeLanguage === "zh" ? member.nameZh : (member.nameEn || member.nameZh);
    const initials = initialsFromName(displayName);
    const photoHtml = !hidePhoto && member.photo
      ? `<img src="assets/images/members/${escapeHtml(member.photo)}" alt="${escapeHtml(displayName)}" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />`
      : "";
    const avatarHtml = hidePhoto
      ? ""
      : (
        `<div class="staff-avatar">` +
        photoHtml +
        `<span class="staff-avatar-fallback"${!hidePhoto && member.photo ? " style=\"display:none\"" : ""}>${escapeHtml(initials)}</span>` +
        `</div>`
      );

    return (
      `<article class="staff-card">` +
      avatarHtml +
      `<p class="staff-name">${escapeHtml(displayName)}</p>` +
      `<a class="staff-email" href="mailto:${escapeHtml(member.email)}">${escapeHtml(member.email)}</a>` +
      `</article>`
    );
  });

  return (
    `<section class="member-group member-group-staff" data-group="${groupKey}">` +
    `<div class="member-group-inner">` +
    `<h2 class="member-group-title">${dict.groups[groupKey]}</h2>` +
    `<div class="staff-grid">${cards.join("")}</div>` +
    `</div>` +
    `</section>`
  );
}

function renderYearRows(groupKey, dict) {
  const yearMap = memberData[groupKey] || {};
  const years = Object.keys(yearMap).sort((a, b) => Number(b) - Number(a));
  const rows = years.map((year) => {
    const names = yearMap[year] || [];
    const yearLabel = activeLanguage === "zh" ? `${year}${dict.yearLabel}` : `${dict.yearLabel} ${year}`;
    const displayNames = names.map((item) => {
      if (item && typeof item === "object") {
        if (activeLanguage === "zh") {
          return formatStudentNameForZh(item);
        }
        return item.nameEn || item.nameZh || "";
      }

      return String(item || "");
    }).filter(Boolean);

    const namesHtml = displayNames
      .map((name) => `<span class="year-name-item">${escapeHtml(name)}</span>`)
      .join("");

    return (
      `<div class="year-row">` +
      `<div class="year-label">${escapeHtml(yearLabel)}</div>` +
      `<div class="year-names">${namesHtml}</div>` +
      `</div>`
    );
  });

  return (
    `<section class="member-group member-group-students" data-group="${groupKey}">` +
    `<div class="member-group-inner">` +
    `<h2 class="member-group-title">${dict.groups[groupKey]}</h2>` +
    `<div class="year-list">${rows.join("")}</div>` +
    `</div>` +
    `</section>`
  );
}

function renderMembers() {
  const dict = i18n[activeLanguage] || i18n.zh;
  memberGroups.innerHTML = [
    renderFacultyBlock(dict),
    renderYearRows("phd", dict),
    renderYearRows("master", dict)
  ].join("");
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

  renderMembers();
}

async function loadMemberData() {
  try {
    const response = await fetch("data/members.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load members data: ${response.status}`);
    }

    const raw = await response.json();
    memberData = normalizeMemberData(raw);
  } catch {
    memberData = normalizeMemberData(null);
  }

  applyLanguage(activeLanguage);
}

languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

loadMemberData();
