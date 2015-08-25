function calculateSqPrice(price, size) {
  return Math.round(price / size);
}
function cleanPrice(priceStr) {
  return parseFloat(priceStr.replace(/\./g, '').replace(' kr', ''));
}
function cleanSize(sizeStr) {
  return parseFloat(sizeStr.replace(' m2', ''));
}
function formatPrice (price) {
  return addCommas(price) + ' kr.';
}
function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}
