(function() {
  var checkboxLabel, checkbox, clearButton;
  //
  // Add additional search form elements

  // Save search checkbox
  checkboxLabel = $('<label>', {
    for: 'saveSearch',
    text: 'Vista leit',
    style: 'float:right;margin-bottom:10px;padding-top:2px;'
  });
  checkbox = $('<input>', {
    id: 'saveSearch',
    type: 'checkbox',
    checked: 'checked',
    style: 'margin:0;margin-left:5px;margin-bottom:10px;'
  });
  checkboxLabel.append(checkbox);
  // Clear search button
  clearButton = $('<input>', {
    type: 'button',
    value: 'Hreinsa leit'
  });

  $('.mainsearchsection').append(checkboxLabel);
  $('.rightsearchsection').append(clearButton);

  //
  // Fetch the stored data & update form
  chrome.storage.sync.get('mbl', function (items) {
    items = items.mbl;
    if (items === undefined) {
      return;
    }
    setFormProperties({
      items: items,
      selector: '#realestate-search-form',
      checkboxCustomMethod: function (elem) {
        var $elem = $(elem);
        // Trigger the change event in the DOM
        // So that the checkbox will be added to the query
        elem.click();
        $elem.prop('checked', true);
        // Update the UI on parent checkboxes
        $elem.parents('div').each(function (idx, div) {
          // Check if the id is a number
          if (isFinite(parseInt(div.id))) {
            $(div).show();
          }
        });
      }
    });
  });
  /*
    Click handlers
  */
  //
  // Form submit
  $('#realestate-search-form').find('input[type=submit]').each(function(idx, input) {
    $(input).click(function(e) {
      // Out with the old
      chrome.storage.sync.remove('mbl');
      // Is save enabled?
      if ($('#saveSearch').prop('checked')) {
        var obj = formProperties('#realestate-search-form');
        // In with the new
        chrome.storage.sync.set({ 'mbl': obj });
      }
    });
  });
  //
  // Clear button click
  clearButton.click(function (e) {
    e.stopPropagation();
    chrome.storage.sync.remove('mbl');
    // Clear form
    $('#realestate-search-form').find('input[type=checkbox]:checked,input[type=text],select').each(function (idx, elem) {
      var $elem = $(elem);
      elem.click();
      $elem.prop('checked', false);
      $elem.val('');
      $elem.parents('div').each(function (idx, div) {
        // Check if the id is a number
        if (isFinite(parseInt(div.id))) {
          $(div).parent().find('label:first').removeClass('dirty');
        }
      });
    });
  });
})();
