---
title: 联系我们
nav:
  order: 6
  tooltip: 联系方式
lang: zh
---

# {% include icon.html icon="fa-regular fa-envelope"%}联系我们

## 联系方式

对于学术问询和合作机会,请联系:

{%
include button.html
type="email"
text="zcui@jlu.edu.cn"
link="zcui@jlu.edu.cn"
%}
{% include section.html %}

## 地址

中华人民共和国  
吉林省，长春市  
前进大街2699号  
吉林大学前卫校区南区  
唐敖庆楼C区 544室

{% capture col1 %}
<div class="map-responsive">
  <iframe 
    src="https://map.baidu.com/poi/%E5%90%89%E6%9E%97%E5%A4%A7%E5%AD%A6-%E5%89%8D%E5%8D%AB%E6%A0%A1%E5%8C%BA(%E5%8D%97%E6%A0%A1%E5%8C%BA)/@13947671.335434824,5409602.236551358,19.5z?uid=1cff2a6b2ef2532407026f3f&info_merge=1&isBizPoi=false&ugc_type=3&ugc_ver=1&device_ratio=2&compat=1&pcevaname=pc4.1&querytype=detailConInfo&da_src=shareurl"
    width="600"
    height="450"
    frameborder="0"
    style="border:0"
    allowfullscreen>
  </iframe>
</div>
{% endcapture %}
{% include cols.html col1=col1 %}
<style>
.map-responsive {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
  margin: 20px 0;
}
.map-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
@media (max-width: 768px) {
  .map-responsive {
    padding-bottom: 75%;
  }
}
</style>
