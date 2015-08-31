(function(){

  // Add additional search form elements
  var checkboxLabel = $('<label>', {
    for: 'saveSearch',
    text: 'Vista leit',
    style: 'float:right;margin-bottom:10px;padding-top:2px;'
  });

  var checkbox = $('<input>', {
    id: 'saveSearch',
    type: 'checkbox',
    checked: 'checked',
    style: 'margin:0;margin-left:5px;margin-bottom:10px;'
  });
  checkboxLabel.append(checkbox);

  var clearButton = $('<input>', {
    type: 'button',
    value: 'Hreinsa leit'
  });

  $('.mainsearchsection').append(checkboxLabel);
  $('.rightsearchsection').append(clearButton);

  clearButton.click(function (e) {
    e.stopPropagation();
    chrome.storage.sync.clear();
    clearForm();
  });

  function clearForm () {
    $('#realestate-search-form').find('input[type=checkbox]:checked,input[type=text],select').each(function (idx, elem) {
      $(elem)[0].click();
      $(elem).prop('checked', false);
      $(elem).val('');
      $(elem).parents('div').each(function (idx, div) {
        // Check if the id is a number
        if (isFinite(parseInt(div.id))) {
          $(div).parent().find('label:first').removeClass('dirty');
        }
      });
    });
  }

  // Fetch the stored data
  chrome.storage.sync.get(function (items) {
    // Check boxes
    $('#realestate-search-form input[type=checkbox]').each(function (idx, elem) {
      var checked = items[elem.id] !== undefined;
      if (checked) {
        // Trigger the change event in the DOM
        $(elem)[0].click();
        $(elem).prop('checked', true);
        // Update the UI on parent checkboxes
        $(elem).parents('div').each(function (idx, div) {
          // Check if the id is a number
          if (isFinite(parseInt(div.id))) {
            $(div).show();
            $(div).parent().find('label:first').addClass('dirty');
          }
        });
      }
    });

    // Drop-downs and text inputs
    $('#realestate-search-form').find('select,input[type=text]').each(function (idx, elem) {
      // Add the stored value to the element
      //  It might be stored by name instead of id
      var value = items[elem.id] || items[elem.name];
      if (value) {
        $(elem).val(value);
      }
    });
  });


  /*
    Click handlers
  */
  $('#realestate-search-form').find('input[type=submit]').each(function(idx, input) {
    $(input).click(function(e) {

      // Out with the old
      chrome.storage.sync.clear();

      if ($('#saveSearch').prop('checked')) {
        var obj = {};
        // Check boxes and text inputs
        $('#realestate-search-form').find('input[type=checkbox]:checked,input[type=text]').each(function (idx, elem) {
          if (elem.id) {
            obj[elem.id] = $(elem).val();
          }
        });

        // Drop-downs
        $('#realestate-search-form').find('select option:selected').each(function (idx, elem) {
          // Some elements do not have ids so we fall back to the name
          var selectId = $(elem).parent().prop('id') || $(elem).parent().prop('name');
          if (selectId) {
            obj[selectId] = $(elem).val();
          }
        });

        // In with the new
        chrome.storage.sync.set(obj);
      }
    });
  });

})();
