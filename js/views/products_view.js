App.ProductsView = Ember.View.extend({
  templateName: 'products',

  didInsertElement: function() {
    setTimeout(function() { $(window).trigger('resize') }, 100);
  }
});
