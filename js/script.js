var colCount = 0;
var colWidth = 0;
var margin = 0;
var windowWidth = 0;
var blocks = [];

$(function(){
  $(window).resize(setupBlocks);
});

function setupBlocks() {
  windowWidth = $('.productPage').width();
  colWidth = $('.block').outerWidth();
  blocks = [];
  console.log(blocks);
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
    blocks[index] = min+$(this).outerHeight()+margin;
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

$( document ).ready(function() {
  setupBlocks();
  $(window).scroll(function(event) {
    fadeWeather();
  });
});
