---
title: Animation
author: Michael McClintock
equations: false
---

test animation built with sencha animator.

<script type="text/javascript">
  $('#Animation').one('pageshow', function(event, ui) {
    if (!$(this).added) {
      $(this).append('<iframe id="anim" class="animation-size" src="/static/test_animation/test.html"></iframe>');
    }
  });


 </script>
