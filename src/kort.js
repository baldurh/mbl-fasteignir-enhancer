(function(){
var price, size, sqPrice, oldHref = '', modal = document.querySelector('.popupmodal');
var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
    	var aEle = jQuery('a.mp-skodaeign')[0];
    	if(typeof(aEle) === 'undefined') return;
        var href = jQuery(aEle).attr('href');
        if(href === 'undefined') return;
        if(oldHref !== href) {
        	jQuery('span#fmverd').remove();
        	oldHref = href;
    		price = cleanPrice(jQuery('.mp-verd-val').text());
				size = cleanSize(jQuery('.mp-staerd-val').text());
				sqPrice = calculateSqPrice(price, size);
				if (isFinite(sqPrice)) {
					jQuery('span.mp-field:contains("Stærð:")').after('<span class="mp-field" id="fmverd"><span>m<sup>2</sup></span> verð: <span class="mp-val">'+formatPrice(sqPrice)+'</span><span class="mp-val"></span></span>');
			}
        }
    });    
});

var config = {attributes: true};
observer.observe(modal, config);

})();
