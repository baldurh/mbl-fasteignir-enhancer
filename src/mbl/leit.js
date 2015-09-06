(function(){
  var estateRows, strongs, price, size, sqPrice;
  estateRows = $('.realestate-head + .realestate-properties');
  estateRows.each(function (idx, elem) {
    var $elem = $(elem);
    strongs = $elem.find('strong');
    price = cleanPrice(strongs.eq(0).text());
    size = cleanSize(strongs.eq(1).text());
    sqPrice = calculateSqPrice(price, size);
    if (isFinite(sqPrice)) {
      $elem.append('<span>Fermetraverð: <strong>' + formatPrice(sqPrice) + '</strong></span>');
    }
  });
})();
