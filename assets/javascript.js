

var reactions = ["Happy", "Sad", "Yikes"]

function makeButtons () {
  $("#button-locale").empty();

  for (var i = 0; i < reactions.length; i++) {
    var a = $("<button>");
    a.addClass("gif");
    a.attr("data-name", reactions[i]);
    a.addClass("reactionClass")
    a.text(reactions[i])
    $("#button-locale").append(a);
  }
}

$("#add-reaction").on("click", function(event) {
  var userReaction = $("#reaction-input").val().trim();
  reactions.push(userReaction);
  makeButtons();


})

makeButtons();

$(document.body).on("click", ".reactionClass", function() {
  var reaction = $(this).attr("data-name")
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    reaction + "&api_key=W2UTUQCfCJrrACjmnCMFBgdOXwGFkTc0&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    $("#gif-locale").empty();
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);
        //var favorite = $("<button>").text("Favorite").attr("id", "favorite")
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height.url);
        gifImage.attr("display", "inline-block")

        //gifDiv.prepend(favorite)
        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);

        $("#gif-locale").prepend(gifDiv);
      }

    /*$("#favorite").on("click", function(event) {
    localStorage.clear();
    localStorage.setItem("favoriteGif", $(this).prev("img"))
    
    // $(this).prev(‘[element, class, or id]’)
    
    })*/
     

    });


})
    
    
      
