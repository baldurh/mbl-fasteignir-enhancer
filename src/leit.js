(function(){
  var estateRows, strongs, price, size, sqPrice;
  estateRows = $('.realestate-head + .realestate-properties');
  estateRows.each(function (elem) {
    strongs = $(this).find('strong');
    price = cleanPrice(strongs.eq(0).text());
    size = cleanSize(strongs.eq(1).text());
    sqPrice = calculateSqPrice(price, size);
    console.log(sqPrice);
    if (isFinite(sqPrice)) {
      $(this).append('<span>Fermetraverð: <strong>' + formatPrice(sqPrice) + '</strong></span>');
    }
  });
})();
