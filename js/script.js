var colCount = 0;
var colWidth = 0;
var margin = 0;
var windowWidth = 0;
var blocks = [];

$(function(){
  $(window).resize( function() {
    setupBlocks();
  });
});

function setupBlocks() {
  if ($(".productBlock")[0]){
    windowWidth = $('.productPage').width();
    colWidth = $('.productBlock').outerWidth();
    blocks = [];
    colCount = Math.floor(windowWidth/(colWidth+margin*2));
    for(var i=0;i<colCount;i++){
      blocks.push(margin);
    }
    positionBlocks();
  }
}

function positionBlocks() {
  $('.productBlock').each(function(){
    var min = Array.min(blocks);
    var index = $.inArray(min, blocks);
    var leftPos = margin+(index*(colWidth+margin));
    var paddingTop = $(this).css('padding-top');
    var paddingLeft = $(this).css('padding-left');
    var paddingRight = $(this).css('padding-right');
    if (paddingTop == '0px') { $(this).css('padding-top', Math.floor((Math.random()*50)+50)+'px') }
    if (paddingRight == '0px') { $(this).css('padding-left', Math.floor((Math.random()*50)+50)+'px') }
    if (paddingRight == '0px') { $(this).css('padding-right', Math.floor((Math.random()*50)+50)+'px') }
    $(this).css({
      'left':leftPos+'px',
      'top':min+'px',
      'z-index':'-1'
    });
    var height = height = min+$(this).outerHeight()+margin;
    blocks[index] = height;
    $('.productFooter').css({
      'left': 0,
      'top':height+'px',
      'width': $('.modProducts').width(),
      'z-index':'-1'
    });
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

function toggleInformation() {
  $('.informationPage').fadeToggle();
  $('.cityToggle').toggleClass('cityToggleOpen');
  $('body').toggleClass('lockScroll');
  $('#nav').toggleClass('hide');
}

function toggleSettings() {
  $('.settingsBody').slideToggle();
  $('.cityToggle').toggleClass('cityToggleOpen');
}

function loadSettings() {
  temperature_type = $.cookie('temperature_type');
  location_id = $.cookie('location_id');
  location_name = $.cookie('location_name');
  gender_type = $.cookie('gender_type');

  $("[data-control]").removeClass('bgActive dull');

  $("[data-control-type='temperature_type'][data-control-value='" + temperature_type  + "']").addClass('bgActive dull');
  $("[data-control-type='gender_type'][data-control-value='" + gender_type + "']").addClass('bgActive dull');
}

function saveSetting(setting, value) {
  var controller = App.__container__.lookup("controller:forecast");
  controller.send('updateSetting', setting, value);
}

function searchLocation(query) {
  if(query.length) {
    $.getJSON( "https://wevther-api.herokuapp.com/api/v1/locations.json?access_token=e0ijbv02834hv9824hbvn9u4n9482n2&q=" + query + '&callback=?', function( data ) {
      loadLocations(data.locations);
    });
  } else {
    loadLocations({});
  }
}

function loadLocations(locations) {
  $('.locateBtn').show();
  $('.locateLoader').hide();

  $('.modLocations').slideDown();
  $('.modLocations').html('');
  if(locations.length) {
    locations.slice(0,3).forEach( function(loc) {
      var html = '<div class="bgDarkT hoverBgActive pointer bbt bcLightT" data-control-location-id="' + loc.weather_id + '" data-control-location-name="' + loc.pretty_name + '"><p class="fsl mbn">' + loc.pretty_name + '</p></div>'
      $('.modLocations').append(html);
    });
  }
  $(".settingsBody").animate({ scrollTop: $(document).height() }, "slow");
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
  $.getJSON( "https://wevther-api.herokuapp.com/api/v1/locations.json?access_token=e0ijbv02834hv9824hbvn9u4n9482n2&lat=" + position.coords.latitude + "&lng=" + position.coords.longitude + '&callback=?', function( data ) {
    loadLocations(data.locations);
  });
}

$(document).ready(function() {
  loadSettings();

  $('body').on({
    'touchmove': function(e) {
      //fadeWeather();
    }
  });

  $(document).on("click", '[data-toggle-information]', function() {
    toggleInformation();
    return false;
  });

  $(document).on("click", '[data-toggle-settings]', function() {
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

  $(document).on("click", '.modLocations', function() {
    $('.modLocations').slideUp();
  });

  $(document).on("click", '.modLocation input, .modLocation .locateBtn', function(e) {
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
    var id = $(this).data('control-location-id');
    saveSetting('location_id', id);

    var name = $(this).data('control-location-name');
    saveSetting('location_name', name);

    $('[data-control-location]').val(name);
    $('.modLocations').html('');
    $('.modLocations').slideUp();
    toggleSettings();
  });
});
