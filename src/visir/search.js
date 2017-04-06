(function(){
  var div, checkboxLabel, checkbox;

  //
  // Add additional search form elements
  div = $('<div>', {
    style: 'margin-top:5px;float:right;'
  });

  checkboxLabel = $('<label>', {
    for: 'saveSearch',
    text: 'Vista leit',
    class: 'in-label'
  });

  checkbox = $('<input>', {
    id: 'saveSearch',
    type: 'checkbox',
    checked: 'checked',
    class: 'in-checkbox js-tag'
  });
  div.append(checkbox).append(checkboxLabel);

  $('#searchsidebar h1').after(div);

  var resultsPlaceholder = document.querySelector('#result-placeholder');
  var observer = new MutationObserver(function(mutations) {

    // Remove ads
    $('[id^=EAS_fif]').hide();
    $('[href^="/ads"]').hide();
    $('.b-banner-over').hide();
    $('[name=banner]').hide();
    var estateRows = $('.property.property--grid');
    estateRows.each(function (idx, elem) {
      var $elem = $(elem);
      var sizeText = $elem.find('.property__size').text();
      var priceText = $elem.find('.property__price').text();

      var price = cleanPrice(priceText);
      var size = cleanSize(sizeText);
      var sqPrice = calculateSqPrice(price, size);
      if (isFinite(sqPrice)) {
        var featuresDiv = $elem.find('.property__details');
        var newElement = $('<div style="font-size: 1.4em; margin: 8px 0;">')
        newElement.append(`Fermetraverð: <strong>${formatPrice(sqPrice)}</strong>`);
        featuresDiv.append(newElement);
      }
    });
  });

  var config = { childList: true };
  observer.observe(resultsPlaceholder, config);

  $('#searchsidebar #menu-submit').click(scanPage);
  $('#searchsidebar input[type=checkbox]').click(scanPage);
  $('#searchsidebar select').change(scanPage);

  function scanPage() {
    // Out with the old
    chrome.storage.sync.remove('visir');

    if ($('#saveSearch').prop('checked')) {
      var obj = formProperties('#searchsidebar');
      // In with the new
      chrome.storage.sync.set({ 'visir': obj });
    }
  }

})();
