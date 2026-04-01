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
    groups: {
      pi: "课题组负责人",
      faculty: "教师",
      phd: "博士研究生",
      master: "硕士研究生",
      alumni: "已毕业成员"
    },
    emptyGroup: "该分组暂无成员。",
    modalEmailLabel: "邮箱：",
    modalEducationTitle: "教育背景",
    modalProjectsTitle: "主要项目情况",
    modalHonorsTitle: "荣誉奖励",
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
    groups: {
      pi: "Principal Investigator",
      faculty: "Faculty",
      phd: "PhD Students",
      master: "Master Students",
      alumni: "Alumni"
    },
    emptyGroup: "No members in this group yet.",
    modalEmailLabel: "Email: ",
    modalEducationTitle: "Education",
    modalProjectsTitle: "Major Projects",
    modalHonorsTitle: "Honors & Awards",
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
  "modalEmailLabel",
  "modalEducationTitle",
  "modalProjectsTitle",
  "footerLine1",
  "footerVisitsText",
  "footerEmailText",
  "footerOrcidText"
];

const groupOrder = ["pi", "faculty", "phd", "master", "alumni"];

const groupIcons = {
  pi: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.5 5.2 5.7.8-4.1 4 1 5.6L12 15l-5.1 2.6 1-5.6-4.1-4 5.7-.8z"/></svg>',
  faculty: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v2H3zm2 4h14v9H5zm4 2v2h6v-2z"/></svg>',
  phd: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l10 5-10 5L2 8zm-6 8.2L12 14l6-2.8V16c0 2.2-2.7 4-6 4s-6-1.8-6-4z"/></svg>',
  master: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v12H4zm2 2v8h12V6zm3 11h6v2H9z"/></svg>',
  alumni: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a5 5 0 0 1 5 5v1h1a4 4 0 0 1 4 4v7h-2v-7a2 2 0 0 0-2-2h-1v9h-2V7a3 3 0 1 0-6 0v12H7v-9H6a2 2 0 0 0-2 2v7H2v-7a4 4 0 0 1 4-4h1V7a5 5 0 0 1 5-5z"/></svg>'
};

const languageSelect = document.getElementById("languageSelect");
const footerLine2 = document.getElementById("footerLine2");
const memberGroups = document.getElementById("memberGroups");

const memberModal = document.getElementById("memberModal");
const memberModalBackdrop = document.getElementById("memberModalBackdrop");
const memberModalClose = document.getElementById("memberModalClose");
const modalPhoto = document.getElementById("modalPhoto");
const modalNameZh = document.getElementById("modalNameZh");
const modalNameEn = document.getElementById("modalNameEn");
const modalRole = document.getElementById("modalRole");
const modalEmail = document.getElementById("modalEmail");
const modalEducationList = document.getElementById("modalEducationList");
const modalProjectsList = document.getElementById("modalProjectsList");
const modalEducationSection = document.getElementById("modalEducationSection");
const modalProjectsSection = document.getElementById("modalProjectsSection");

let activeLanguage = localStorage.getItem("websiteLanguage") || "zh";
let members = [];

const fallbackMembers = [
  {
    id: "zhong-hua-cui",
    group: "pi",
    nameZh: "崔中华",
    nameEn: "Zhong-hua Cui",
    titleZh: "教授",
    titleEn: "Professor",
    email: "zcui at jlu.edu.cn",
    photo: "Zhong-hua_Cui.jpg",
    educationZh: [
      "2007年本科毕业于吉林大学化学学院高分子材料与工程。",
      "2012年博士毕业于吉林大学理论化学研究所，导师为丁益宏教授。",
      "2012-2014年在美国乔治城大学博士后，合作导师 Miklos Kertesz。",
      "2015-2016年天津大学博士后，合作导师 Has Lischka 以及 Adelia Aquino 教授。"
    ],
    educationEn: [
      "B.E. in Polymer Materials and Engineering, College of Chemistry, Jilin University (2007).",
      "Ph.D. in Theoretical Chemistry, Jilin University (2012), supervised by Prof. Yihong Ding.",
      "Postdoctoral Researcher at Georgetown University, USA (2012-2014), with Prof. Miklos Kertesz.",
      "Postdoctoral Researcher at Tianjin University (2015-2016), with Prof. Has Lischka and Prof. Adelia Aquino."
    ],
    projectsZh: [
      "2016年国家自然科学基金项目 - 青年项目。",
      "2018年国家自然科学基金项目 - 面上项目。",
      "2019年国家自然科学基金项目 - 优青项目。"
    ],
    projectsEn: [
      "2016 - National Natural Science Foundation of China, Young Scientists Fund.",
      "2018 - National Natural Science Foundation of China, General Program.",
      "2019 - National Natural Science Foundation of China, Excellent Young Scientists Fund."
    ],
    order: 1
  },
  {
    id: "guang-ren-na",
    group: "faculty",
    nameZh: "那广仁",
    nameEn: "Guang-ren Na",
    titleZh: "讲师",
    titleEn: "Lecturer",
    email: "na_guangren@jlu.edu.cn",
    photo: "Guangren_Na.jpg",
    educationZh: [
      "2017-09 至 2021-12，吉林大学，材料物理与化学，博士，导师：张立军教授。",
      "2015-09 至 2017-07，吉林大学，有机化学（硕博连读），硕士，导师：李明洙教授。",
      "2011-09 至 2015-07，吉林大学，化学，学士。"
    ],
    educationEn: [
      "2017-09 to 2021-12, Jilin University, Materials Physics and Chemistry, Ph.D., supervised by Prof. Lijun Zhang.",
      "2015-09 to 2017-07, Jilin University, Organic Chemistry (combined master's-doctoral track), M.S., supervised by Prof. Mingzhu Li.",
      "2011-09 to 2015-07, Jilin University, Chemistry, B.S."
    ],
    projectsZh: [],
    projectsEn: [],
    order: 2
  },
  {
    id: "xinbo-liu",
    group: "phd",
    nameZh: "刘鑫波",
    nameEn: "Xinbo Liu (Simba Liu)",
    titleZh: "博士研究生",
    titleEn: "PhD Student",
    email: "970770958@qq.com",
    photo: "Xinbo_liu.png",
    educationZh: [],
    educationEn: [],
    projectsZh: [
      "2024.05 被吉林大学评为“优秀团员”。",
      "2024.11 被吉林大学评为“优秀研究生”。",
      "2024.12 获国家奖学金。"
    ],
    projectsEn: [
      "2024.05 - Awarded Outstanding League Member by Jilin University.",
      "2024.11 - Awarded Outstanding Graduate Student by Jilin University.",
      "2024.12 - Recipient of the National Scholarship."
    ],
    order: 1
  }
];

function getInitials(name) {
  const value = String(name || "").trim();
  if (!value) {
    return "?";
  }

  const words = value.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return value.slice(0, 2).toUpperCase();
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

  renderGroups();
}

function sortedMembers(list) {
  return [...list].sort((a, b) => (a.order || 999) - (b.order || 999));
}

function renderMemberCard(member) {
  const displayName = activeLanguage === "zh" ? member.nameZh : member.nameEn;
  const initials = getInitials(member.nameEn || member.nameZh);

  return (
    `<button class="member-card" data-member-id="${member.id}" aria-label="${displayName}">` +
    `<span class="member-avatar-wrap">` +
    `<img src="assets/images/members/${member.photo}" alt="${displayName}" loading="lazy" decoding="async" />` +
    `<span class="member-avatar-fallback">${initials}</span>` +
    `<span class="member-role-icon">${groupIcons[member.group] || groupIcons.master}</span>` +
    `</span>` +
    `<p class="member-name">${displayName}</p>` +
    `</button>`
  );
}

function renderGroups() {
  const dict = i18n[activeLanguage] || i18n.zh;
  const sections = [];

  groupOrder.forEach((groupKey) => {
    const grouped = sortedMembers(members.filter((member) => member.group === groupKey));

    const cards = grouped.length
      ? grouped.map((member) => renderMemberCard(member)).join("")
      : `<p class="member-empty">${dict.emptyGroup}</p>`;

    sections.push(
      `<section class="member-group">` +
      `<div class="member-group-head">` +
      `<div class="member-group-title-wrap">` +
      `<span class="member-group-icon">${groupIcons[groupKey] || groupIcons.master}</span>` +
      `<h2 class="member-group-title">${dict.groups[groupKey]}</h2>` +
      `</div>` +
      `</div>` +
      `<div class="member-grid">${cards}</div>` +
      `</section>`
    );
  });

  memberGroups.innerHTML = sections.join("");

  const cards = Array.from(document.querySelectorAll(".member-card"));
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      openMemberModal(card.dataset.memberId);
    });

    const img = card.querySelector("img");
    const avatarWrap = card.querySelector(".member-avatar-wrap");
    if (img && avatarWrap) {
      img.addEventListener("error", () => {
        avatarWrap.classList.add("fallback");
      }, { once: true });
    }
  });
}

function openMemberModal(memberId) {
  const dict = i18n[activeLanguage] || i18n.zh;
  const member = members.find((item) => item.id === memberId);
  if (!member) {
    return;
  }

  const displayName = activeLanguage === "zh" ? member.nameZh : member.nameEn;
  const roleName = activeLanguage === "zh"
    ? (member.titleZh || dict.groups[member.group] || "")
    : (member.titleEn || dict.groups[member.group] || "");

  const education = activeLanguage === "zh" ? member.educationZh || [] : member.educationEn || [];
  const projects = activeLanguage === "zh" ? member.projectsZh || [] : member.projectsEn || [];
  const honors = activeLanguage === "zh" ? member.honorsZh || [] : member.honorsEn || [];
  const secondary = projects.length > 0 ? projects : honors;

  modalNameZh.textContent = activeLanguage === "zh" ? member.nameZh : member.nameEn;
  modalNameEn.textContent = activeLanguage === "zh" ? member.nameEn : member.nameZh;
  modalRole.textContent = roleName;
  modalEmail.textContent = member.email || "";

  modalEducationList.innerHTML = education.map((item) => `<li>${item}</li>`).join("");
  modalProjectsList.innerHTML = secondary.map((item) => `<li>${item}</li>`).join("");
  const secondaryTitleEl = document.getElementById("modalProjectsTitle");
  if (secondaryTitleEl) {
    secondaryTitleEl.textContent = projects.length > 0 ? dict.modalProjectsTitle : dict.modalHonorsTitle;
  }

  if (modalEducationSection) {
    modalEducationSection.hidden = education.length === 0;
  }
  if (modalProjectsSection) {
    modalProjectsSection.hidden = secondary.length === 0;
  }

  modalPhoto.src = `assets/images/members/${member.photo}`;
  modalPhoto.alt = displayName;
  modalPhoto.style.display = "block";

  modalPhoto.onerror = () => {
    modalPhoto.style.display = "none";
  };

  modalPhoto.onload = () => {
    modalPhoto.style.display = "block";
  };

  memberModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeMemberModal() {
  memberModal.hidden = true;
  document.body.style.overflow = "";
}

async function loadMembers() {
  try {
    const response = await fetch("data/members.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load members data: ${response.status}`);
    }

    const data = await response.json();
    members = Array.isArray(data.members) ? data.members : fallbackMembers;
  } catch {
    members = fallbackMembers;
  }

  applyLanguage(activeLanguage);
}

memberModalBackdrop.addEventListener("click", closeMemberModal);
memberModalClose.addEventListener("click", closeMemberModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !memberModal.hidden) {
    closeMemberModal();
  }
});

languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

loadMembers();
