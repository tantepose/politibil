var configProfile = {
    "profile": {"screenName": 'oslopolitiops'},
    "domId": 'feed',
    "maxTweets": 20,
    "enableLinks": false,
    "showUser": false,
    "showImages": true,
    "lang": 'en',
    "showInteraction": false,
    "showTime": true,
    "customCallback": handleTweets,
  };

function handleTweets(tweets) {
  var x = tweets.length;
  var n = 0;
  var html = '';

  while(n < x) {
    html += tweets[n];
    n++;
  }

  $('#feed').append(html);
  writeMenu();

  addEmojis($('.tweet'));
}

function write (message) {
  $('#feed').append('<p class="tweet">' + message + '</p>')
}

function writeMenu () {
  $('#feed').append(
    '<p class="message" id="more">Gi meg mer! 😍</p>' +
    '<p class="message" id="settings">Bytt politidistrikt. 😵</p>' +
    '<p class="message" id="about">Hva er politibil.no? 😏</p>'
  );
}

function scroll () {
  $("html, body").animate({ 
    scrollTop: $(document).height() 
  }, 2000);
}

$(document).on('click', '#about', function () {
  $('#more, #settings').remove();

  write('Politibil.no gjør det enklere og morsommere å lese Oslo politidistrikts Twitter-meldinger. Og snart alle andre politidistrikts meldinger, også. 👍 Klems, Ole Petter Baugerød Stokke ❤️');
  writeMenu();
  scroll(); 
});

$(document).on('click', '#more', function () {
  $('#about, #settings').remove();

  write('Ja, det er litt vanskeligere enn man skulle tro. Framtidas funksjon! 💡');
  writeMenu();
  scroll (); 
});

$(document).on('click', '#settings', function () {
  $('#more, #about').remove();

  write('Jada, det går an snart sikkert, ganske sikkert. 🤷');
  writeMenu();

  scroll();
});


twitterFetcher.fetch(configProfile);

// EMOJIS //

function escapeSpecialChars(regex) {
  return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
}

function addEmojis (elements) {

  var map = {
    "politibil": "\ud83d\ude93",
    "politibiler": "\ud83d\ude93",
    "politibilene": "\ud83d\ude93",
    "politibilen": "\ud83d\ude93",

    "politipatruljene": "\ud83d\ude93",
    "politipatruljen": "\ud83d\ude93",
    "politipatruljer": "\ud83d\ude93",
    "politipatrulje": "\ud83d\ude93",

    "patruljene": "\ud83d\ude93",
    "patruljer": "\ud83d\ude93",
    "patruljen": "\ud83d\ude93",
    "patrulje": "\ud83d\ude93",
  
    "politiets": "\ud83d\udc6e 's",
    "politiet": "\ud83d\udc6e",
    "politimann": "\ud83d\udc6e",
    "politi": "\ud83d\udc6e",
  
    "brannvesenet": "\ud83d\ude92",
    "brannbil": "\ud83d\ude92",
    "brannen": "\ud83d\udd25",
    "brann": "\ud83d\udd25",
  
    "ambulansepersonell": "\ud83d\ude91",
    "ambulansen": "\ud83d\ude91",
    "ambulanser": "\ud83d\ude91",
    "ambulanse": "\ud83d\ude91",
    "amb.": "\ud83d\ude91",
    "amb": "\ud83d\ude91",
  
    "togene": "\ud83d\ude82",
    "toget": "\ud83d\ude82",
    "tog": "\ud83d\ude82",
  
    "trikken": "\ud83d\ude83",
    "trikkene": "\ud83d\ude83",
    "trikk": "\ud83d\ude83",
  
    "t-banen": "\ud83d\ude87",
    "tbanen": "\ud83d\ude87",
    "t-bane": "\ud83d\ude87",
    "tbane": "\ud83d\ude87",
  
    "taxifører": "\ud83d\ude95",
    "taxisjåfør": "\ud83d\ude95",
  
    "taxien": "\ud83d\ude95",
    "taxier": "\ud83d\ude95",
    "taxi": "\ud83d\ude95",
    "drosjene": "\ud83d\ude95",
    "drosjer": "\ud83d\ude95",
    "drosje": "\ud83d\ude95",
  
    "mannen": "\ud83d\udc68",
    "mann": "\ud83d\udc68",
  
    "kvinnen": "\ud83d\udc69",
    "kvinne": "\ud83d\udc69",
    "damen": "\ud83d\udc69",
    "dame": "\ud83d\udc69",
  
    "meldingen": "\ud83d\udcde",
    "meldinger": "\ud83d\udcde",
    "melding": "\ud83d\udcde",
    "telefon": "\ud83d\udcde",
  
    "nødetater": "\ud83d\ude91 \ud83d\ude92 \ud83d\ude93",
    "nødetatene": "\ud83d\ude91 \ud83d\ude92 \ud83d\ude93",
  
    "bussene:": "\ud83d\ude8c",
    "bussen": "\ud83d\ude8c",
    "busser": "\ud83d\ude8c",
    "buss": "\ud83d\ude8c",
  
    "lastebilen": "\ud83d\ude9a",
    "lastebiler": "\ud83d\ude9a",
    "lastebil": "\ud83d\ude9a",

    "personbiler": "\ud83d\ude97",
    "personbilene": "\ud83d\ude97",
    "personbil": "\ud83d\ude97",
    "bilfører": "\ud83d\ude97",
    "bilistene": "\ud83d\ude97",
    "bilisten": "\ud83d\ude97",
    "bilister": "\ud83d\ude97",
    "bilist": "\ud83d\ude97",

    "bilene": "\ud83d\ude97",
    "biler": "\ud83d\ude97",
    "bilen": "\ud83d\ude97",
    "bil": "\ud83d\ude97"
  };

  console.log('legger inn emojis i ' + $(elements).length + ' elementer.');

  $(elements).each (function () {
    for (var i in map) {
      var content = $(this).text();
      var regex = new RegExp(escapeSpecialChars(i), 'gim');
      content = content.replace(regex, map[i]);
      $(this).text(content);
    }
  });
}
