
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
  if(typeof alignPink==="function")alignPink();
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
  tag.addEventListener("mouseenter",function(){document.body.style.background=pick()});
  tag.addEventListener("mouseleave",function(){document.body.style.background=""});
  tag.addEventListener("click",function(){document.body.style.background=pick()});
}

/* pink block: bottom aligns with last index row; white name changes block color on hover */
var pink=document.querySelector(".preview-pink");
var pname=document.querySelector(".pink-name");
function alignPink(){
  if(!pink)return;
  if(window.innerWidth<=900){pink.style.height="";return}
  var col=document.querySelector(".index-col");
  if(!col)return;
  var cells=col.querySelectorAll(".idx-cell");
  if(!cells.length)return;
  var last=cells[cells.length-1];
  pink.style.height=Math.max(last.offsetTop+last.offsetHeight-36,240)+"px";
}
window.addEventListener("load",alignPink);
window.addEventListener("resize",alignPink);
if(pname){
  pname.addEventListener("mouseenter",function(){if(pink)pink.style.background=pick()});
  pname.addEventListener("click",function(){if(pink)pink.style.background=pick()});
}

/* index row hover -> swap preview image over the pink block (home only) */
var pv=document.getElementById("previewImg");
if(pv){
  document.querySelectorAll("[data-img]").forEach(function(el){
    el.addEventListener("mouseenter",function(){
      var src=el.getAttribute("data-img");
      if(pv.getAttribute("src")!==src)pv.setAttribute("src",src);
      pv.style.display="block";
    });
  });
  var col=document.querySelector(".index-col");
  if(col)col.addEventListener("mouseleave",function(){pv.style.display="none"});
}

/* carousel: prev/next arrows + counter */
document.querySelectorAll(".carousel").forEach(function(car){
  var track=car.querySelector(".car-track");
  if(!track)return;
  var imgs=track.querySelectorAll("img");
  var count=car.querySelector(".car-count");
  var i=0,n=imgs.length;
  function show(k){
    i=(k+n)%n;
    track.style.transform="translateX(-"+(i*100)+"%)";
    if(count)count.textContent=(i+1)+" / "+n;
  }
  var bp=car.querySelector(".prev"),bn=car.querySelector(".next");
  if(bp)bp.addEventListener("click",function(e){e.stopPropagation();show(i-1)});
  if(bn)bn.addEventListener("click",function(e){e.stopPropagation();show(i+1)});
});

/* lightbox */
var lb=document.getElementById("lightbox");
if(lb){
  var lbImg=lb.querySelector("img");
  document.querySelectorAll(".car-track img").forEach(function(img){
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
