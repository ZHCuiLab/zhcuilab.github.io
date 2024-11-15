---
layout: default
lang: en
title: Home
nav:
  order: 1
  tooltip: Welcome to our group
---

# Welcome to The Cui-Zhonghua Group
Our research group specializes in theoretical and computational chemistry, focusing on electronic structure calculations, excited-state molecular dynamics, and the design of novel materials including 2D superconductors. 

{% include section.html %}

## Research Areas
{% capture text %}
Our research encompasses:
• Theoretical studies of ground and excited state electronic structures
• Design and applications of specialized clusters
• Excited-state molecular dynamics
• 2D superconducting materials

{%
  include button.html
  link="en/research.html"
  text="Explore Our Research"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}
{% endcapture %}
{%
  include feature.html
  image="images/research-focus.jpg"
  link="en/research.html"
  title="Research Areas"
  text=text
%}

## Publications
{% capture text %}
Our work has been published in prestigious journals including Angewandte Chemie and Journal of the American Chemical Society. Our recent publications in these top-tier journals have made significant contributions to the field of theoretical chemistry and materials science.

{%
  include button.html
  link="en/publications.html"
  text="View Our Publications"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}
{% endcapture %}
{%
  include feature.html
  image="images/publication-highlight.jpg"
  link="en/publications.html"
  title="Publications"
  flip=true
  style="bare"
  text=text
%}

## Team Members
{% capture text %}
Our group consists of professors, researchers, and graduate students working together to advance the frontiers of theoretical chemistry. Under the leadership of Prof. Cui, we have secured multiple National Natural Science Foundation of China grants, including the Outstanding Young Scientist Fund.

{%
  include button.html
  link="en/members.html"
  text="Meet Our Team"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}
{% endcapture %}
{%
  include feature.html
  image="images/team-photo.jpg"
  link="en/members.html"
  title="Our Team"
  text=text
%}
