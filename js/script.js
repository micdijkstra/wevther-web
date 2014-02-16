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

$( document ).ready(function() {
  setupSettingsPage();
  loadSettings();

  $(window).scroll(function(event) {
    fadeWeather();
  });

  $('[data-toggle-settings]').click(function() {
    toggleSettings();
    return false;
  });

  $('[data-control]').click(function() {
    type = $(this).data('control-type');
    value = $(this).data('control-value');
    saveSetting(type, value);
    loadSettings();
  });

  imagesLoaded($('.productPage')).on('progress', function( instance ) {
    setupBlocks();
  });
});
