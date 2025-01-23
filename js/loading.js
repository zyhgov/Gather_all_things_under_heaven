$(window).on('load',function () {
    $(".wrap").addClass('is-show');
    $(".loadingLogo").fadeOut(600, function(){
     $(this).remove();
    });
    $(".loadingOverlay").delay(500).fadeOut(1500, function(){
     $(this).remove();
    });
  });