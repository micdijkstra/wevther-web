App = Ember.Application.create();

// Save default settings
if ($.cookie('temperature_type') == undefined) { $.cookie('temperature_type', 'c') }
if ($.cookie('location_id') == undefined) { $.cookie('location_id', 'USNY0996') }
if ($.cookie('location_name') == undefined) { $.cookie('location_name', 'New York City, United States of America') }
if ($.cookie('gender_type') == undefined) { $.cookie('gender_type', 'all') }

App.Router.map(function() {
  this.resource('forecast', { path: '/' });
  this.resource('information', { path: '/information' });
});

App.Product = Ember.Object.extend({});
App.Product.reopenClass({
  findAll: function(weather_code, gender, low, high) {
   data = '{"products":[{"name":"NIKE FLYKNIT LUNAR1+ IN WOLF GREY","temperature":70,"url":"http://needsupply.com/catalog/product/view/id/88642/s/wolf-grey-nike-lunar-flyknit/category/4/#","gender":"male","image_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/011/large/1007138-12.jpg?1375804950","thumbnail_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/011/thumb/1007138-12.jpg?1375804950","conditions":[{"name":"Fair (Night)","code":"33","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/116/original/condition_lg_sunny_2x.png?1377537377"}]},{"name":"Nike Premium Roshe Run Sneaker","temperature":76,"url":"http://www.urbanoutfitters.com/urban/catalog/productdetail.jsp?id=26710525\u0026color=041\u0026parentid=MORE%20IDEAS","gender":"male","image_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/015/large/26710525_041_d?1375883673","thumbnail_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/015/thumb/26710525_041_d?1375883673","conditions":[{"name":"Fair (Night)","code":"33","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/116/original/condition_lg_sunny_2x.png?1377537377"}]},{"name":"Reverse Seam Shirt Outside Pocket","temperature":73,"url":"http://www.stevenalan.com/REVERSE-SEAM-SHIRT-OUTSIDE-POCKET/848785046826,default,pd.html#cgid=mens-clothing-shirting\u0026view=all\u0026frmt=ajax\u0026start=0\u0026hitcount=168","gender":"male","image_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/026/large/S13_3_MST0001_B414_PD1?1375970199","thumbnail_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/026/thumb/S13_3_MST0001_B414_PD1?1375970199","conditions":[{"name":"Fair (Night)","code":"33","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/116/original/condition_lg_sunny_2x.png?1377537377"}]},{"name":"NIKE FLYKNIT LUNAR1+ IN GYM RED","temperature":76,"url":"http://needsupply.com/mens/new/nike-lunar-flyknit-gym-red.html","gender":"male","image_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/043/large/1007134.jpg?1376595646","thumbnail_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/043/thumb/1007134.jpg?1376595646","conditions":[{"name":"Fair (Night)","code":"33","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/116/original/condition_lg_sunny_2x.png?1377537377"}]},{"name":"ASOS Canvas Espadrilles","temperature":73,"url":"http://us.asos.com/ASOS-Canvas-Espadrilles/xgb8r/?iid=1891626\u0026cid=14910\u0026sh=0\u0026pge=0\u0026pgesize=36\u0026sort=-1\u0026clr=Black\u0026mporgp=L0FTT1MvQVNPUy1DYW52YXMtRXNwYWRyaWxsZXMvUHJvZC8.","gender":"male","image_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/066/large/image1xl.jpg?1376863752","thumbnail_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/066/thumb/image1xl.jpg?1376863752","conditions":[{"name":"Fair (Night)","code":"33","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/116/original/condition_lg_sunny_2x.png?1377537377"}]},{"name":"Striped Reverse Seam Pocket T-Shirt","temperature":73,"url":"http://www.stevenalan.com/STRIPED-REVERSE-SEAM-POCKET-T-SHIRT/F13_P_MCS0066,default,pd.html","gender":"male","image_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/142/large/F13_P_MCS0066_E400_PD?1377538268","thumbnail_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/142/thumb/F13_P_MCS0066_E400_PD?1377538268","conditions":[{"name":"Fair (Night)","code":"33","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/116/original/condition_lg_sunny_2x.png?1377537377"}]},{"name":"OBEY Brownsville Button-Down Shirt","temperature":76,"url":"http://www.urbanoutfitters.com/urban/catalog/productdetail.jsp?id=28360287\u0026color=040\u0026parentid=MORE%20IDEAS","gender":"male","image_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/171/large/28360287_040_b?1378319634","thumbnail_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/171/thumb/28360287_040_b?1378319634","conditions":[{"name":"Fair (Night)","code":"33","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/116/original/condition_lg_sunny_2x.png?1377537377"}]},{"name":"BURGUNDY NEPPY T-SHIRT","temperature":79,"url":"http://us.topman.com/en/tmus/product/clothing-172005/mens-t-shirts-tanks-2179535/burgundy-neppy-t-shirt-2201775?bi=81\u0026ps=20","gender":"male","image_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/188/large/80J01GBRG_large.jpg?1378502161","thumbnail_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/188/thumb/80J01GBRG_large.jpg?1378502161","conditions":[{"name":"Fair (Night)","code":"33","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/116/original/condition_lg_sunny_2x.png?1377537377"}]},{"name":"NIELS BOUCLE TEE DARK NAVY","temperature":76,"url":"http://www.woodlandsshop.com/collections/tops/products/niels-boucle-tee-1","gender":"male","image_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/191/large/norse-tee-6_1024x1024.jpg?1378502775","thumbnail_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/191/thumb/norse-tee-6_1024x1024.jpg?1378502775","conditions":[{"name":"Fair (Night)","code":"33","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/116/original/condition_lg_sunny_2x.png?1377537377"}]},{"name":"FADED JEANS","temperature":70,"url":"http://www.zara.com/us/en/man/jeans/faded-jeans-c269235p1296316.html","gender":"male","image_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/244/large/6394300406_2_1_1.jpg?1380045904","thumbnail_url":"https://s3.amazonaws.com/wevther-assets/products/images/000/000/244/thumb/6394300406_2_1_1.jpg?1380045904","conditions":[{"name":"Fair (Night)","code":"33","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/116/original/condition_lg_sunny_2x.png?1377537377"}]}]}'
    return JSON.parse(data);
  }
});

App.Forecast = Ember.Object.extend({});
App.Forecast.reopenClass({
  findAll: function(temperature_type, location_id) {
    data = '{"result":true,"unit":"c","location":{"city":"New York","country":"US","region":"NY"},"date":"2014-02-15","now":{"code":"33","date":"Fri, 14 Feb 2014 11:50 pm EST","temp":"3","text":"Fair","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/116/original/condition_lg_sunny_2x.png?1377537377"},"today":{"code":"14","date":"14 Feb 2014","day":"Fri","high":"3","low":"-2","text":"Few Snow Showers","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/097/original/condition_lg_snowy_2x.png?1377537868"},"tomorrow":{"code":"16","date":"15 Feb 2014","day":"Sat","high":"1","low":"-8","text":"Snow","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/099/original/condition_lg_snowy_2x.png?1377537891"},"":{"code":"11","date":"18 Feb 2014","day":"Tue","high":"6","low":"-2","text":"Showers","icon_url":"https://s3.amazonaws.com/wevther-assets/conditions/icons/000/000/094/original/condition_lg_rainy_2x.png?1377537833"}}';
    return JSON.parse(data);
  }
});

App.ForecastRoute = Ember.Route.extend({
  activate: function() {
    $(document).attr('title', 'Wevther');
    setupBlocks();
  },
  model: function() {
    temperature_type = $.cookie('temperature_type');
    location_id = $.cookie('location_id')
    return App.Forecast.findAll(temperature_type, location_id);
  }
});

App.InformationRoute = Ember.Route.extend({
  activate: function() {
    $(document).attr('title', 'About Wevther');
  }
});
