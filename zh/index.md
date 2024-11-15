---
layout: default
lang: zh
title: 主页
nav:
  order: 1
  tooltip: 欢迎访问我们的课题组
---

# 欢迎来到崔中华课题组
我们课题组致力于理论化学和计算材料科学研究，专注于电子结构计算、激发态分子动力学以及新型材料（包括二维超导材料）的设计。

{% include section.html %}

## 研究方向
{% capture text %}
我们的主要研究方向包括：
• 小分子及团簇的基态和激发态电子结构的理论研究
• 特殊团簇的设计和应用
• 激发态分子动力学
• 二维超导材料研究

{%
  include button.html
  link="zh/research.html"
  text="了解研究方向"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}
{% endcapture %}
{%
  include feature.html
  image="images/research-focus.jpg"
  link="zh/research.html"
  title="研究方向"
  text=text
%}

## 发表论文
{% capture text %}
课题组在《德国应用化学》（Angewandte Chemie）和《美国化学会志》（Journal of the American Chemical Society）等顶级期刊发表多篇重要论文。这些研究成果为理论化学和材料科学领域做出了重要贡献。

{%
  include button.html
  link="zh/publications.html"
  text="查看发表论文"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}
{% endcapture %}
{%
  include feature.html
  image="images/publication-highlight.jpg"
  link="zh/publications.html"
  title="发表论文"
  flip=true
  style="bare"
  text=text
%}

## 团队成员
{% capture text %}
我们的团队由教授、研究人员和研究生组成。在崔教授的带领下，课题组获得了包括国家自然科学基金优秀青年科学基金在内的多项重要科研项目资助。

{%
  include button.html
  link="zh/members.html"
  text="认识团队成员"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}
{% endcapture %}
{%
  include feature.html
  image="images/team-photo.jpg"
  link="zh/members.html"
  title="团队成员"
  text=text
%}
