;
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', ready);


	function ready() {
		var menuBtn = document.querySelector('#menuBtn');
		var menuContent = document.querySelector('#menuContent');
		var menuOverlay = document.querySelector('#menuOverlay');
		var hammerMenuBtn = new Hammer(menuBtn);
		var hammerMenuOverlay = new Hammer(menuOverlay);
		var click = 0;
		var body  = document.querySelector('body');

		hammerMenuBtn.on('tap', clickMenuBtnHandler);
		hammerMenuOverlay.on('tap panleft', clickMenuOverlayHandler);


		//menuBtn.addEventListener('click', clickMenuBtnHandler);
		//menuOverlay.addEventListener('click', clickMenuOverlayHandler);

		function clickMenuBtnHandler() {
			click++;

			if (click % 2) {
				if (!menuBtn.classList.contains('js-menu__btn--active')) {
					menuBtn.classList.add('js-menu__btn--active');
				}
				if (!menuContent.classList.contains('js-is-open')) {
					menuContent.classList.add('js-is-open');
				}
				menuOverlay.style.display = 'block';
				if (isScrollDesktop()) {
					body.style.paddingRight = '17px';
				}
				body.style.overflow = 'hidden';
				
			} else {
				if (menuBtn.classList.contains('js-menu__btn--active')) {
					menuBtn.classList.remove('js-menu__btn--active');
				}
				if (menuContent.classList.contains('js-is-open')) {
					menuContent.classList.remove('js-is-open');
				}
				menuOverlay.style.display = 'none';
				body.style.overflow = 'auto';	
				if (isScrollDesktop()) {
					body.style.paddingRight = '0px';
				}		
			}		
		}

		function clickMenuOverlayHandler() {
			click = 0;
			if (menuBtn.classList.contains('js-menu__btn--active')) {
				menuBtn.classList.remove('js-menu__btn--active');
			}
			if (menuContent.classList.contains('js-is-open')) {
				menuContent.classList.remove('js-is-open');
			}
			menuOverlay.style.display = 'none';
			body.style.overflow = 'auto';
			if (isScrollDesktop()) {
				body.style.paddingRight = '0px';
			}
			
		}

		function isScrollDesktop() {
			if (window.innerWidth !== document.documentElement.clientWidth) {
				return true;
			}
			return false;
		}
	};
})();