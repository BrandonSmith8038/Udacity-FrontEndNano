function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  // load streetview

  var streetStr = $("#street").val();
  var cityStr = $("#city").val();
  var address = streetStr + ', ' + cityStr;

  $greeting.text('So, you want to live at ' + address + '?');

  var streetUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';

  $body.append('<img class="bgimg" src="' + streetUrl + '">');

  //Nytimes 

  var nyTimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=2afb075c949a4f8f982a8395a7bc6d50'

  $.getJSON(nyTimesUrl, function(data) {

      $nytHeaderElem.text('New York Times Articles About ' + cityStr);

      var articles = data.response.docs;
      for (var i = 0; i < 10; i++) {
        var article = articles[i];
        $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
          '<p>' + article.snippet + '</p>' +
          '</li>');
      }
    })
    //e equals the actual error if you want to do something with it. 
    .error(function(e) {
      $nytElem.text("No articles available");
    })


  //Wikipedia Articles

  var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + cityStr + "&format=json&callback=wikiCallback";
  
  //error handling
  var wikiRequestTimeout = setTimeout(function(){
    $wikiElem.text("failed to get the wikipedia articles");
  }, 3000);
  
  $.ajax({
    url: wikiUrl,
    dataType: "jsonp",
    success: function(response) {
      var articleList = response[1];

      for (var i = 0; i < 10; i++) {
        var articleStr = articleList[i];
        var url = "http://en.wikipedia.org/wiki/" + articleStr;
        $wikiElem.append('<li><a target="_blank" href="' + url + ' ">' + articleStr + '</a></li>');
      }
      clearTimeout(wikiRequestTimeout);
    }
  })


  return false;
}

$('#form-container').submit(loadData);