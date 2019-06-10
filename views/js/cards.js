$(document).ready(function() {
    $(".js-monthly").click(function() {
      var checkbox = $(this).find(".c-selection-card__selector");
        $(this).toggleClass("selected");
            if (checkbox.attr("checked") == "checked") {
                checkbox.removeAttr("checked");
                
                // $("#selection-two").prop("checked", true);
                // $('.js-monthly').removeClass('selected')
            } else {
              // $('.js-monthly').addClass('selected')
                checkbox.attr("checked", "checked");
            }
        
      // $("#selection-one").prop("checked", false);
      // $("#selection-two").prop("checked", true);
     
      // $('.js-monthly').addClass('selected')
      // $('.js-yearly').removeClass('selected')
    }); 
    $(".js-yearly").click(function() {

       $("#selection-one").prop("checked", true);
      //  $("#selection-two").prop("checked", false);
       
      //  $('.js-monthly').removeClass('selected')
       $('.js-yearly').addClass('selected')
    });  
});