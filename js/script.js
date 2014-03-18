var colCount = 0;
var colWidth = 0;
var margin = 0;
var windowWidth = 0;
var blocks = [];

$(function(){
  $(window).resize( function() {
    setupBlocks();
    setupSettingsPage();
  });
});

function setupBlocks() {
  windowWidth = $('.productPage').width();
  colWidth = $('.block').outerWidth();
  blocks = [];
  colCount = Math.floor(windowWidth/(colWidth+margin*2));
  for(var i=0;i<colCount;i++){
    blocks.push(margin);
  }
  positionBlocks();
}

function positionBlocks() {
  $('.block').each(function(){
    var min = Array.min(blocks);
    var index = $.inArray(min, blocks);
    var leftPos = margin+(index*(colWidth+margin));
    $(this).css({
      'left':leftPos+'px',
      'top':min+'px',
      'z-index':'-1'
    });
    var height = height = min+$(this).outerHeight()+margin;
    blocks[index] = height;
  });
}

function fadeWeather() {
  var scrollTop = $(this).scrollTop();
  var fadeHeight = 245;
  if ($(window).width() >= 1500) {
    var fadeHeight = 527;
  } else if ($(window).width() >= 768) {
    var fadeHeight = 408;
  }

  var fadeOpacity;
  if (scrollTop < 0) {
    fadeOpacity = 1;
  } else if (scrollTop/fadeHeight >= 0) {
    fadeOpacity = 1-scrollTop/fadeHeight;
  } else {
    fadeOpacity = 0;
  }

  if (fadeOpacity >= 0) {
    $('.forecastPage .fade').css('opacity', fadeOpacity);
    $('.forecastPage .fade').css('display', 'block');
  } else {
    $('.forecastPage .fade').css('display', 'none');
  }
}

// Function to get the Min value in Array
Array.min = function(array) {
    return Math.min.apply(Math, array);
};

function toggleSettings() {
  $('.settingsPage').fadeToggle();
  $('.settingsClose').fadeToggle();
  $('.settingsNav').toggleClass('active');
  $('body').toggleClass('lockScroll')
}

function setupSettingsPage() {
  $('.settingsPage').width($(window).width()-120);
}

function loadSettings() {
  temperature_type = $.cookie('temperature_type');
  location_id = $.cookie('location_id');
  location_name = $.cookie('location_name');
  gender_type = $.cookie('gender_type');

  $("[data-control]").removeClass('bgActive dull');

  $("[data-control-type='temperature_type'][data-control-value='" + temperature_type  + "']").addClass('bgActive dull');
  $("[data-control-type='gender_type'][data-control-value='" + gender_type + "']").addClass('bgActive dull');

  $("[data-control-location]").val(location_name);
}

function saveSetting(setting, value) {
  var controller = App.__container__.lookup("controller:forecast");
  controller.send('updateSetting', setting, value);
}

function searchLocation(query) {
  //$.getJSON( "https://wevther-api.herokuapp.com/api/v1/locations.json?access_token=e0ijbv02834hv9824hbvn9u4n9482n2&q=" + query, function( data ) {
  if(query.length) {
    var data = '{"locations":[{"weather_id":"ASXX0112","name":"Sydney","country":"Australia","latitude":"-33.856281","longitude":"151.020966","pretty_name":"Sydney, Australia","point":"-33.856281,151.020966","id":"48239","_score":6.181521,"_type":"location","_index":"pearkes-locations","_version":null,"sort":null,"highlight":null,"_explanation":null},{"weather_id":"CAXX0487","name":"Sydney","country":"Canada","latitude":"46.161678","longitude":"-60.181938","pretty_name":"Sydney, Canada","point":"46.161678,-60.181938","id":"52905","_score":6.181521,"_type":"location","_index":"pearkes-locations","_version":null,"sort":null,"highlight":null,"_explanation":null},{"weather_id":"ASXX0274","name":"Sydney Regional Office","country":"Australia","latitude":"-33.856281","longitude":"151.020966","pretty_name":"Sydney Regional Office, Australia","point":"-33.856281,151.020966","id":"48393","_score":4.9452167,"_type":"location","_index":"pearkes-locations","_version":null,"sort":null,"highlight":null,"_explanation":null},{"weather_id":"USFL0478","name":"Sydney","country":"United States of America","latitude":"27.96282","longitude":"-82.207321","pretty_name":"Sydney, United States of America","point":"27.96282,-82.207321","id":"77819","_score":4.9452167,"_type":"location","_index":"pearkes-locations","_version":null,"sort":null,"highlight":null,"_explanation":null},{"weather_id":"USVA0344","name":"Hampden Sydney","country":"United States of America","latitude":"37.247501","longitude":"-78.456802","pretty_name":"Hampden Sydney, United States of America","point":"37.247501,-78.456802","id":"91226","_score":4.3270645,"_type":"location","_index":"pearkes-locations","_version":null,"sort":null,"highlight":null,"_explanation":null}]}'
  } else {
    data = {}
  }
  loadLocations(data);
}

function loadLocations(data) {
  $('.locateBtn').show();
  $('.locateLoader').hide();

  $('.modLocations').slideDown();
  $('.modLocations').html('');
  var locations = JSON.parse(data).locations;
  locations.slice(0,3).forEach( function(loc) {
    var html = '<div class="bgInactive hoverBgActive pointer mtt" data-control-location-id="' + loc.weather_id + '" data-control-location-name="' + loc.pretty_name + '"><p class="mbn">' + loc.pretty_name + '</p></div>'
    $('.modLocations').append(html);
  });
  $(".settingsPage").animate({ scrollTop: $(document).height() }, "slow");
  $('.modLocations').slideDown();
}

function findLocation() {
  $('.locateBtn').hide();
  $('.locateLoader').show();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findLocationsWithPosition);
  } else {
    $('.locateBtn').hide();
    $('.locateLoader').show();
    $('[data-control-location]').val('Can not find location');
  }
}

function findLocationsWithPosition(position) {
  //$.getJSON( "https://wevther-api.herokuapp.com/api/v1/locations.json?access_token=e0ijbv02834hv9824hbvn9u4n9482n2&lat=" + position.coords.latitude + "&lng=" + position.coords.longtiude, function( data ) {
    var data = '{"locations":[{"weather_id":"ASXX0112","name":"Sydney","country":"Australia","latitude":"-33.856281","longitude":"151.020966","pretty_name":"Sydney, Australia","point":"-33.856281,151.020966","id":"48239","_score":null,"_type":"location","_index":"pearkes-locations","_version":null,"sort":[17.294187511877347],"highlight":null,"_explanation":null},{"weather_id":"ASXX0274","name":"Sydney Regional Office","country":"Australia","latitude":"-33.856281","longitude":"151.020966","pretty_name":"Sydney Regional Office, Australia","point":"-33.856281,151.020966","id":"48393","_score":null,"_type":"location","_index":"pearkes-locations","_version":null,"sort":[17.294187511877347],"highlight":null,"_explanation":null},{"weather_id":"ASXX0284","name":"Cape Nelson","country":"Australia","latitude":"-33.65279","longitude":"150.91568","pretty_name":"Cape Nelson, Australia","point":"-33.65279,150.91568","id":"48402","_score":null,"_type":"location","_index":"pearkes-locations","_version":null,"sort":[36.479715729122084],"highlight":null,"_explanation":null},{"weather_id":"ASXX0099","name":"Richmond","country":"Australia","latitude":"-33.623699","longitude":"150.798996","pretty_name":"Richmond, Australia","point":"-33.623699,150.798996","id":"48226","_score":null,"_type":"location","_index":"pearkes-locations","_version":null,"sort":[46.90006163255373],"highlight":null,"_explanation":null},{"weather_id":"ASXX0359","name":"Richmond Amo","country":"Australia","latitude":"-33.623699","longitude":"150.798996","pretty_name":"Richmond Amo, Australia","point":"-33.623699,150.798996","id":"48476","_score":null,"_type":"location","_index":"pearkes-locations","_version":null,"sort":[46.90006163255373],"highlight":null,"_explanation":null},{"weather_id":"ASXX0049","name":"Gosford","country":"Australia","latitude":"-33.423199","longitude":"151.343002","pretty_name":"Gosford, Australia","point":"-33.423199,151.343002","id":"48178","_score":null,"_type":"location","_index":"pearkes-locations","_version":null,"sort":[51.70612060516302],"highlight":null,"_explanation":null},{"weather_id":"ASXX0245","name":"Whyalla","country":"Australia","latitude":"-33.423199","longitude":"151.343002","pretty_name":"Whyalla, Australia","point":"-33.423199,151.343002","id":"48365","_score":null,"_type":"location","_index":"pearkes-locations","_version":null,"sort":[51.70612060516302],"highlight":null,"_explanation":null},{"weather_id":"ASXX0124","name":"Wollongong","country":"Australia","latitude":"-34.373959","longitude":"150.838684","pretty_name":"Wollongong, Australia","point":"-34.373959,150.838684","id":"48250","_score":null,"_type":"location","_index":"pearkes-locations","_version":null,"sort":[65.2161347280166],"highlight":null,"_explanation":null},{"weather_id":"ASXX0269","name":"Katoomba","country":"Australia","latitude":"-33.705818","longitude":"150.350388","pretty_name":"Katoomba, Australia","point":"-33.705818,150.350388","id":"48388","_score":null,"_type":"location","_index":"pearkes-locations","_version":null,"sort":[81.41244337599083],"highlight":null,"_explanation":null},{"weather_id":"ASXX0270","name":"Bowral","country":"Australia","latitude":"-34.455059","longitude":"150.385895","pretty_name":"Bowral, Australia","point":"-34.455059,150.385895","id":"48389","_score":null,"_type":"location","_index":"pearkes-locations","_version":null,"sort":[99.53562930332788],"highlight":null,"_explanation":null}]}'
  loadLocations(data);
}

$( document ).ready(function() {
  loadSettings();

  $(window).scroll(function(event) {
    fadeWeather();
    setupBlocks();
  });

  $('body').on({
    'touchmove': function(e) {
      fadeWeather();
    }
  });

  $(document).on("click", '[data-toggle-settings]', function() {
    setupSettingsPage();
    toggleSettings();
    return false;
  });

  $(document).on("keyup", '[data-control-location]', function() {
    var query = $(this).val();
    searchLocation(query);
  });

  $(document).on("focus", '[data-control-location]', function() {
    var query = $(this).val();
    searchLocation(query);
  });

  $(document).on("click", '.settingsPage', function() {
    $('.modLocations').slideUp();
  });

  $(document).on("click", '.modLocation input, .modLocation .locateBtn', function() {
    e.stopPropagation();
  });

  $(document).on("click", '[data-control-locate]', function() {
    findLocation();
  });

  $(document).on("click", '[data-control]', function() {
    type = $(this).data('control-type');
    value = $(this).data('control-value');
    saveSetting(type, value);
    loadSettings();
  });

  $(document).on("click", '[data-control-location-id]', function() {
    var id = $(this).data('control-location');
    saveSetting('location_id', id);

    var name = $(this).data('control-location-name');
    saveSetting('location_name', name);

    $('[data-control-location]').val(name);
    $('.modLocations').html('');
  });
});
