(function(){
  var price, size, sqPrice, priceRow, priceCol;
  priceRow = $('tr:contains("Verð")');
  priceCol = priceRow.find('.value');
  price = cleanPrice(priceCol.text());
  size = cleanSize($('td:contains("Stærð") + .value').first().text());
  sqPrice = calculateSqPrice(price, size);
  if (isFinite(sqPrice)) {
    priceRow.after('<tr><td>Fermetraverð: </td><td class="value">' + formatPrice(sqPrice) + '</td></tr>');
  }
})();
