(function(){
  var price, size, sqPrice, lastRow, newRow;
  price = cleanPrice($('.price').text());
  size = cleanSize($('.features li:first').text());
  sqPrice = calculateSqPrice(price, size);

  // Remove ads
  $('.partner-link').remove();
  $('.grid-item.partner').removeClass('partner').addClass('half halfFirst');

  if (isFinite(sqPrice)) {
    newRow = $('<li>');
    newRow.append('<span class="title">Fermetraverð: </span><span class="data">' + formatPrice(sqPrice) + '</span>');
    $('ul.loan').append(newRow);
  }
})();
