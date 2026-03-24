const i18n = {
  zh: {
    pageTitle: "崔中华课题组",
    description: "崔中华课题组官方网站",
    brandTag: "吉林大学原子与分子物理研究所",
    groupName: "崔中华课题组",
    navResearch: "研究方向",
    navPublications: "发表论文",
    navMembers: "成员",
    navGallery: "相册",
    navContact: "联系我们",
    languageLabel: "🌐 语言",
    heroKicker: "",
    heroTitle: "欢迎来到崔中华课题组",
    heroDesc: "我们以理论计算为驱动，深入探索原子与分子体系中的新型结构与成键本质，在平面超配位化学、团簇物理与二维功能材料等方向持续产出原创性成果。",
    featureResearchTitle: "研究方向",
    featureResearchDesc: "课题组围绕原子与分子体系的结构、成键与功能展开系统性研究，综合运用全局结构搜索、高精度量子化学计算及拓扑分析等方法，探索平面超配位化学、团簇物理与二维超导材料中的新现象与新规律。",
    featureResearchLink: "查看研究方向",
    featurePublicationsTitle: "发表论文",
    featurePublicationsDesc: "本课题组期深耕原子与分子物理前沿，在平面超配位原子、硼团簇结构、化学键理论及二维超导材料等方向持续产出高水平研究成果，论文发表于 JACS、Angew. Chem.、Chem. Sci.、Nano Lett. 等国际权威期刊。",
    featurePublicationsLink: "查看论文成果",
    featureMembersTitle: "成员",
    featureMembersDesc: "课题组现有导师、博士后及在读研究生若干，成员来自多个学科背景，形成了结构合理、充满活力的研究团队，历届毕业生已在学术界与工业界广泛发展。",
    featureMembersLink: "查看成员信息",
    footerLine1: "崔中华课题组 · 吉林大学原子与分子物理研究所",
    footerVisitsText: "访客数：",
    footerEmailText: "邮箱：zcui at jlu.edu.cn",
    footerOrcidText: "ORCID：0000-0002-0710-1774",
    footerLine2: "Copyright ©"
  },
  en: {
    pageTitle: "Cui Zhong-hua Group",
    description: "Official website of Cui Zhong-hua Group",
    brandTag: "Institute of Atomic and Molecular Physics, Jilin University",
    groupName: "Cui Zhong-hua Group",
    navResearch: "Research",
    navPublications: "Publications",
    navMembers: "Members",
    navGallery: "Gallery",
    navContact: "Contact",
    languageLabel: "🌐 Language",
    heroKicker: "",
    heroTitle: "Welcome to Cui Zhong-hua Group",
    heroDesc: "Our group investigates key scientific questions in atomic and molecular systems through integrated theoretical and experimental approaches. We focus on microscopic interaction mechanisms and their potential applications in chemistry and materials science, while advancing both fundamental research and interdisciplinary talent training.",
    featureResearchTitle: "Research",
    featureResearchDesc: "Highlights of our core research themes, methods, and potential applications in atomic and molecular sciences.",
    featureResearchLink: "View Research",
    featurePublicationsTitle: "Publications",
    featurePublicationsDesc: "Our group has continuously advanced frontier topics in atomic and molecular physics, including planar hypercoordinate atoms, boron cluster structures, chemical bonding theory, and two-dimensional superconducting materials, with high-impact papers published in JACS, Angew. Chem., Chem. Sci., and Nano Lett.",
    featurePublicationsLink: "View Publications",
    featureMembersTitle: "Members",
    featureMembersDesc: "Profiles of the PI, postdoctoral researchers, students, and alumni, presenting the structure of our research team.",
    featureMembersLink: "View Members",
    footerLine1: "Cui Zhong-hua Group · Institute of Atomic and Molecular Physics, Jilin University",
    footerVisitsText: "Visitors: ",
    footerEmailText: "Email: zcui at jlu.edu.cn",
    footerOrcidText: "ORCID: 0000-0002-0710-1774",
    footerLine2: "Copyright ©"
  }
};

const textIds = [
  "brandTag",
  "groupName",
  "navResearch",
  "navPublications",
  "navMembers",
  "navGallery",
  "navContact",
  "languageLabel",
  "heroKicker",
  "heroTitle",
  "heroDesc",
  "featureResearchTitle",
  "featureResearchDesc",
  "featureResearchLink",
  "featurePublicationsTitle",
  "featurePublicationsDesc",
  "featurePublicationsLink",
  "featureMembersTitle",
  "featureMembersDesc",
  "featureMembersLink",
  "footerLine1",
  "footerVisitsText",
  "footerEmailText",
  "footerOrcidText"
];

const languageSelect = document.getElementById("languageSelect");
const footerLine2 = document.getElementById("footerLine2");

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
}

const savedLanguage = localStorage.getItem("websiteLanguage") || "zh";
applyLanguage(savedLanguage);

languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});