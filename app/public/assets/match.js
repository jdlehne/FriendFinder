$("#submit").on("click", function() {

  console.log("Hello there, you've clicked a submit button!");

  //--Form validation used from Friend Finder example--//
  function validateForm() {
    var isValid = true;
    $('.form-control').each(function() {
      if ($(this).val() === '')
        isValid = false;
    });

    $(".chosen-select").each(function() {

      if ($(this).val() === '')
        isValid = false;
    });
    return isValid;
  }

  if (validateForm() == true) {

    var userData = {
      name: $('#name').val().trim(),
      image: $('#photo').val().trim(),
      numbers: [$('#q1').val().trim(),
        $('#q2').val().trim(),
        $('#q3').val().trim(),
        $('#q4').val().trim(),
        $('#q5').val().trim(),
        $('#q6').val().trim(),
        $('#q7').val().trim(),
        $('#q8').val().trim(),
        $('#q9').val().trim(),
        $('#q10').val().trim()
      ]
    };

    var currentURL = window.location.origin;
    console.log(currentURL + "/api/survey");

    $.post(currentURL + "/api/survey", userData,
      function(data) {
        // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        $("#match-name").html(data.name);
        //----------DEBUG-------------//
        //console.log(data);
        //console.log(data.name);
        $(".modal-title").html("Found a Match!")
        $('#match-img').attr("src", data.image);
      });
    // Show the modal with the best match
    $("#resultsModal").modal('toggle');


  } else {
    console.log("Whoops, need more info")
    $(".modal-title").html("Uh-Oh! Whammy!");
    $("#match-name").html("Please fill out the entire form");
    $("#resultsModal").modal('toggle');

  }
  return false;

});
