(function(){
  var price, size, sqPrice, observer, aEle, href, config, oldHref, modal;
  oldHref = '';
  modal = document.querySelector('.popupmodal');
  observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      aEle = $('a.mp-skodaeign')[0];
      if(typeof(aEle) === 'undefined') return;
        href = $(aEle).attr('href');
        if(href === 'undefined') return;
        if(oldHref !== href) {
          $('span#fmverd').remove();
          oldHref = href;
          price = cleanPrice($('.mp-verd-val').text());
          size = cleanSize($('.mp-staerd-val').text());
          sqPrice = calculateSqPrice(price, size);
          if (isFinite(sqPrice)) {
            $('span.mp-field:contains("Stærð:")').after('<span class="mp-field" id="fmverd"><span>m<sup>2</sup></span> verð: <span class="mp-val">' + formatPrice(sqPrice) + '</span><span class="mp-val"></span></span>');
          }
        }
    });
  });

  config = { attributes: true };
  observer.observe(modal, config);

})();
