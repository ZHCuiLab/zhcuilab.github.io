---
title: 成员
nav:
  order: 3
  tooltip: 我们的团队成员
lang: zh
---

# {% include icon.html icon="fa-solid fa-users" %}团队成员

{% include section.html %}

## 课题组负责人
{% include list.html data="members" component="portrait" filter="role == 'pi' and lang == 'zh'" style="small" %}

## 教师
{% include list.html data="members" component="portrait" filter="role == 'faculty' and lang == 'zh'" style="small" %}

## 博士研究生
{% include list.html data="members" component="portrait" filter="role == 'phd' and lang == 'zh'" style="small" %}

## 硕士研究生
{% include list.html data="members" component="portrait" filter="role == 'master' and lang == 'zh'" style="small" %}

{% include section.html %}

## 毕业生
以下是我们的前成员，他们已经毕业或继续了新的职位：

{% include list.html data="members" component="portrait" filter="role == 'alumni' and lang == 'zh'" style="small" %}

{% include section.html %}

## 奖项与荣誉

{% include awards.html data=site.data.awards_zh %}
