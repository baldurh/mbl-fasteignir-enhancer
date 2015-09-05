function calculateSqPrice(price, size) {
  return Math.round(price / size);
}
function cleanPrice(priceStr) {
  return parseFloat(priceStr.replace(/\./g, '').replace(' kr', ''));
}
function cleanSize(sizeStr) {
  return parseFloat(sizeStr.replace(/\,/g, '.').replace(' m2', ''));
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
function replaceId(id) {
  if (idDict.hasOwnProperty(id)) {
    return idDict[id];
  }
  return id;
}
function setFormProperties(obj) {
  var selector = obj.selector;
  var items = obj.items;
  var checkboxCustomMethod = obj.checkboxCustomMethod;
  // Check boxes
  $(selector).find('input[type=checkbox]').each(function (idx, elem) {
    var checked = items[elem.id] !== undefined;
    if (checked) {
      if (checkboxCustomMethod) {
        checkboxCustomMethod(elem);
      } else {
        $(elem).prop('checked', true);
      }
    }
  });
  // Drop-downs and text inputs
  $(selector).find('select,input[type=text]').each(function (idx, elem) {
    // Add the stored value to the element
    //  It might be stored by name instead of id
    var value = items[elem.id] || items[elem.name];
    if (value) {
      $(elem).val(value);
    }
  });
}
function formProperties(formSelector) {
  var obj = {};
  // Check boxes and text inputs
  $(formSelector).find('input[type=checkbox]:checked,input[type=text]').each(function (idx, elem) {
    var id = replaceId(elem.id);
    if (id) {
      obj[id] = $(elem).val();
    }
  });
  // Drop-downs
  $(formSelector).find('select option:selected').each(function (idx, elem) {
    // Some elements do not have ids so we fall back to the name
    var selectId = replaceId($(elem).parent().prop('id') || $(elem).parent().prop('name'));
    if (selectId) {
      obj[selectId] = $(elem).val();
    }
  });
  return obj;
}
var idDict = {
  'menu-tegund-fast-1': 'type_Einbýlishús',
  'menu-tegund-fast-2': 'type_Fjölbýlishús',
  'menu-tegund-fast-3': 'type_Atvinnuhúsnæði',
  'menu-tegund-fast-4': 'type_Raðhús',
  'menu-tegund-fast-6': 'type_Sumarhús',
  'menu-tegund-fast-7': 'type_Parhús',
  'menu-tegund-fast-8': 'type_Jörð/lóð',
  'menu-tegund-fast-17': 'type_Hæð',
  'menu-tegund-fast-35': 'type_Hesthús',
  'menu-tegund-fast-36': 'type_Óflokkað',
  'menu-tegund-fast-80p': 'type_80',
  'menu-keywords': 'oldsearch-street',
  'menu-description': 'oldsearch-description',
  'set-day-sale': 'set-day-sale-old',
  'set-week-sale': 'set-week-sale-old',
  'menu-annad-entrance_private': 'annad_entrance_private',
  'menu-annad-openhouse': 'annad_openhouse',
  'menu-annad-elevator': 'annad_elevator',
  'menu-annad-garage': 'annad_garage',
  'menu-annad-not_finished': 'annad_not_finished',
  'menu-annad-finished': 'annad_finished'
};
