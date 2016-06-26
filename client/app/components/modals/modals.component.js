;
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var modalBtns = document.querySelectorAll('[data-modal-trigger]');
		var overlay = document.querySelector('.modals__overlay');
		var hammerModalBtns = [];
		var hammerOverlay = new Hammer(overlay);

		for (var i = 0, len = modalBtns.length; i < len; i++) {
			hammerModalBtns[i] = new Hammer(modalBtns[i]);
			hammerModalBtns[i].on('tap', clickModalBtnsHandler);
		}

		function clickModalBtnsHandler(event) {
			var trigger = event.target;
			var id = trigger.getAttribute('data-modal-trigger');
			var target = document.querySelector('[data-modal-target="' + id + '"]');
			var closeBtns = document.querySelectorAll('[data-modal-target="' + id + '"] [data-modal-close]');
			var hammerCloseBtns = [];
			var body = document.querySelector('body');

			hammerOverlay.on('tap', clickCloseBtnHandler);

			for (var i = 0, len = closeBtns.length; i < len; i++) {
				hammerCloseBtns[i] = new Hammer(closeBtns[i]);
				hammerCloseBtns[i].on('tap', clickCloseBtnHandler);
			}

			if (!target.classList.contains('js-is-open')) {
				target.classList.add('js-is-open');
			}

			if (!overlay.classList.contains('js-is-open')) {
				overlay.classList.add('js-is-open');
			}
			//body.style.overflow = 'hidden';

			function clickCloseBtnHandler() {
				if (target.classList.contains('js-is-open')) {
					target.classList.remove('js-is-open');
				}
				if (overlay.classList.contains('js-is-open')) {
					overlay.classList.remove('js-is-open');
				}
				//body.style.overflow = 'auto';
			}
		}
	}
})();