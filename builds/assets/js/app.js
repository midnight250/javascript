(function ($) {
	'use strict';

	var collection = $('[data-calc-target]');

	if (!collection.length) return;

	collection.each(function (){
		var $this = $(this),
			$target = $this.data('calc-target');
		$this.css({
			'height' : 'calc(100vh - ' + $($target).outerHeight() + 'px)'
		});
	});

	console.log(collection);

})(jQuery);
