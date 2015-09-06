(function() {
  var sqms,prices,selectSizeFrom,selectSizeTo,selectPriceFrom,selectPriceTo;
  sqms = _.range(0, 101, 10);
  sqms = sqms.concat(_.range(125, 301, 25));
  sqms = sqms.concat(_.range(350, 1001, 50));

  prices = _.range(0, 101, 5);
  prices = prices.concat(_.range(125, 301, 25));
  prices = prices.concat(_.range(350, 1001, 50));
  prices[0] = 1;

  selectSizeFrom = $('select[name=size]');
  selectSizeTo = $('select[name=size-to]');
  selectPriceFrom = $('select[name=price]');
  selectPriceTo = $('select[name=price-to]');
  selectSizeFrom.html('');
  selectSizeTo.html('');
  selectPriceFrom.html('');
  selectPriceTo.html('');

  _.each(sqms, function (sqm) {
    var option = $('<option>', {
      text: sqm + ' m²',
      value: sqm
    });
    selectSizeFrom.append(option);
    selectSizeTo.append(option.clone());
  });

  _.each(prices, function (price) {
    var option = $('<option>', {
      text: price + ' mkr.',
      value: price * 1000000
    });
    selectPriceFrom.append(option);
    selectPriceTo.append(option.clone());
  });

  selectSizeFrom.prepend($('<option>', {
    text: 'Frá',
    value: 0
  }));
  selectSizeTo.prepend($('<option>', {
    text: 'Til',
    value: 1000
  }));
  selectPriceFrom.prepend($('<option>', {
    text: 'Frá',
    value: 0
  }));
  selectPriceTo.prepend($('<option>', {
    text: 'Til',
    value: 100000000
  }));
})();
