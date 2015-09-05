(function(){
  var price, size, sqPrice, lastRow, newRow;
  price = cleanPrice($('.b-produtcs-param-price strong').text());
  size = cleanSize($('.b-house-param li:contains("Stærð") strong').text());
  sqPrice = calculateSqPrice(price, size);
  if (isFinite(sqPrice)) {
    lastRow = $('.b-house-param ul li:last');
    newRow = $('<li>');
    newRow.append('<span>Fermetraverð: </span><strong>' + formatPrice(sqPrice) + '</strong>');
    if (!lastRow.hasClass('styled')) {
      newRow.addClass('styled');
    }
    $('.b-house-param ul').append(newRow);
  }
})();
