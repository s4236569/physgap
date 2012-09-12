---
title: Animation
author: Michael McClintock
equations: false
---

test animation built with sencha animator.

<div class="animation-size" data-sencha-anim-url="/static/test_animation/"></div>
<script type="text/javascript">
  $('.contentPage').live('pageinit', function(event, ui) {
    var head = document.getElementsByTagName("head")[0], script;
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src  = "/static/test_animation/embed/senchaAnimatorEmbed.js";
    head.appendChild(script);
  });
</script>
