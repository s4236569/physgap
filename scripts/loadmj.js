$('.contentPage').live('pageshow', function(event, ui) {
  var head = document.getElementsByTagName("head")[0], script;
  script = document.createElement("script");
  script.type = "text/x-mathjax-config";
  script[(window.opera ? "innerHTML" : "text")] =
    "MathJax.Hub.Config({\n" +
    "  tex2jax: { inlineMath: [['$','$'],['\\\\(','\\\\)']]}\n" +
    "});"
  head.appendChild(script);
  script = document.createElement("script");
  script.type = "text/javascript";
  script.src  = "./scripts/mathjax/MathJax.js?config=default";
  script.onload = callmj;
  head.appendChild(script);
});


