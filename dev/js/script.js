$(function() {
  $(".tile1").click(function() {
    $(".tile1").addClass("largeTile", 1000, callback);
  });

  function callback() {
    $(".tile1").click(function() {
      $(".tile1").removeClass("largeTile", 1000, "easeInOutCubic", callback);
    });
  }
});
$(function() {
  $(".tile2").click(function() {
    $(".tile2").addClass("largeTile", 1000, callback);
  });

  function callback() {
    $(".tile2").click(function() {
      $(".tile2").removeClass("largeTile", 1000, callback);
    });
  }
});
$(function() {
  $(".tile3").click(function() {
    $(".tile3").addClass("largeTile", 700, "easeOutBounce", callback);
  });

  function callback() {
    $(".tile3").click(function() {
      $(".tile3").removeClass("largeTile", 700, "easeOutBounce", callback);
    });
  }
});

$(function() {
  $("#draggable").draggable();
})
