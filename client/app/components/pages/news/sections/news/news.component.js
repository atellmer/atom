;
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var newsItems = $('[data-news-id]');
		var hammerNewsItems = [];
		var click = _makeArrayOf(0, newsItems.length);

		for (var i = 0, len = newsItems.length; i < len; i++) {
			hammerNewsItems[i] = new Hammer(newsItems[i]);
			hammerNewsItems[i].on('tap', clickMenuNewsItem);
		}

		function clickMenuNewsItem(event) {
			var target = $(event.target);
			var id = parseInt(target.closest('[data-news-id]').attr('data-news-id'));
			var anonceEl = $('[data-news-id=' + id + '] .js-news__item-anonce');
			var detailEl = $('[data-news-id=' + id + '] .js-news__item-detail');
			click[id]++;

			if (click[id] % 2) {
				if (!anonceEl.hasClass('js-is-hidden')) {
					anonceEl.addClass('js-is-hidden');
					detailEl.show(400);
				}
			} else {
				if (anonceEl.hasClass('js-is-hidden')) {
					anonceEl.removeClass('js-is-hidden');
					detailEl.hide(400);
				}
			}
		}
	}

	function _makeArrayOf(value, length) {
		var array = [];
		while (length--) {
			array[length] = value;
		}
		return array;
	}
})();