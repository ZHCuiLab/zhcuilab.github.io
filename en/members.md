---
title: Members
nav:
  order: 3
  tooltip: Our group members
lang: en
---

# {% include icon.html icon="fa-solid fa-users" %}Group Members

{% include section.html %}

## Principal Investigator
{% include list.html data="members" component="portrait" filter="role == 'pi' and lang == 'zh'" style="small" %}

## Faculty Members
{% include list.html data="members" component="portrait" filter="role == 'faculty' and lang == 'zh'" style="small" %}

## Ph.D. Students
{% include list.html data="members" component="portrait" filter="role == 'phd' and lang == 'zh'" style="small" %}

## Master Students
{% include list.html data="members" component="portrait" filter="role == 'master' and lang == 'zh'" style="small" %}

{% include section.html %}

## Alumni
Here are our former group members who have graduated or moved on to new positions:

{% include list.html data="members" component="portrait" filter="role == 'alumni' and lang == 'zh'" style="small" %}

{% include section.html %}

## Awards and Honors

{% include awards.html data=site.data.awards_en %}
