
(function(){
"use strict";

/* language toggle */
var toggle=document.getElementById("langToggle");
var lang="en";
function applyLang(l){
  lang=l;
  document.documentElement.lang=l==="zh"?"zh-CN":"en";
  document.querySelectorAll("[data-en]").forEach(function(el){
    var t=l==="zh"?el.getAttribute("data-zh"):el.getAttribute("data-en");
    if(t!==null)el.innerHTML=t;
  });
  if(toggle)toggle.textContent=l==="zh"?"EN":"中";
  try{localStorage.setItem("cw-lang",l)}catch(e){}
}
if(toggle)toggle.addEventListener("click",function(){applyLang(lang==="en"?"zh":"en")});
var saved=null;
try{saved=localStorage.getItem("cw-lang")}catch(e){}
var url=new URLSearchParams(location.search).get("lang");
if(url==="zh"||url==="en")saved=url;
if(saved==="zh")applyLang("zh");

/* name tag hover -> random saturated background */
var tag=document.getElementById("nameTag");
var colors=["#FF2D78","#2440FF","#00C853","#FFD600","#FF3D00","#7C4DFF"];
var last=-1;
function pick(){
  var i;do{i=Math.floor(Math.random()*colors.length)}while(i===last);
  last=i;return colors[i];
}
if(tag){
  tag.addEventListener("mouseenter",function(){
    document.body.style.background=pick();
    document.body.classList.add("colored");
  });
  tag.addEventListener("mouseleave",function(){
    document.body.style.background="";
    document.body.classList.remove("colored");
  });
  tag.addEventListener("click",function(){
    document.body.style.background=pick();
    document.body.classList.add("colored");
  });
}

/* index row hover -> swap preview image (home only) */
var pv=document.getElementById("previewImg");
if(pv){
  document.querySelectorAll("[data-img]").forEach(function(el){
    el.addEventListener("mouseenter",function(){
      var src=el.getAttribute("data-img");
      if(pv.getAttribute("src")!==src){
        pv.setAttribute("src",src);
        pv.style.display="";
        var ph=document.getElementById("previewPh");
        if(ph)ph.style.display="none";
      }
    });
  });
}

/* lightbox */
var lb=document.getElementById("lightbox");
if(lb){
  var lbImg=lb.querySelector("img");
  document.querySelectorAll(".board img, img.hero").forEach(function(img){
    img.addEventListener("click",function(){
      lbImg.src=img.src;lbImg.alt=img.alt||"";
      lb.classList.add("open");
      document.body.style.overflow="hidden";
    });
  });
  function close(){lb.classList.remove("open");document.body.style.overflow=""}
  lb.querySelector(".lightbox-close").addEventListener("click",close);
  lb.addEventListener("click",function(e){if(e.target===lb)close()});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
}
})();
