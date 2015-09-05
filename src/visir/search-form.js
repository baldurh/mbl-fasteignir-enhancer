(function() {
  var div, checkboxLabel, checkbox;
  //
  // Add additional search form elements

  // Save Search checkbox
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

  // Checkbox wrapper
  div = $('<div>', {
    style: 'display:inline-block;margin-top:35px;margin-right:10px;float:left;'
  });
  div.append(checkbox).append(checkboxLabel)
  $('.searchmain__submit').prepend(div);

  // Hide annoying ad
  $('.banner.header-subbanner').hide();

  //
  // Fetch the stored data & update form
  chrome.storage.sync.get('visir', function (items) {
    items = items.visir;
    if (items === undefined) {
      return;
    }
    setFormProperties({
      items: items,
      selector: '#topsearch',
      checkboxCustomMethod: function (elem) {
        $(elem).prop('checked', true);
        // Update the UI on parent checkboxes
        var div = $(elem).parents('div').first()
        div.addClass('opened');
        div.prev().addClass('active');
      }
    });
  });

  /*
    Click handlers
  */
  $('#topsearch input[type=submit]').click(function(e) {
    // Out with the old
    chrome.storage.sync.remove('visir');
    // Is save enabled?
    if ($('#saveSearch').prop('checked')) {
      var obj = formProperties('#topsearch');
      // In with the new
      chrome.storage.sync.set({ 'visir': obj });
    }
  });

  $('input[type=reset]').click(function (e) {
    chrome.storage.sync.clear();
    // Form is already cleared by site script
  });
})();
