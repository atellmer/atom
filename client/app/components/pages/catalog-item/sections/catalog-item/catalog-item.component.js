;
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var tabsTriggers = $('[data-tabs-trigger]');
		var hammerTabsTriggers = [];
		var triggerIdPrev = 0;

		for (var i = 0, len = tabsTriggers.length; i < len; i++) {
			hammerTabsTriggers[i] = new Hammer(tabsTriggers[i]);
			hammerTabsTriggers[i].on('tap', clickTabTrigger);
		}

		function clickTabTrigger(event) {
			var trigger = $(event.target);
			var parentId = parseInt(trigger.closest('[data-tabs-id]').attr('data-tabs-id'));
			var triggerId = 0;
			var triggerEl = '';
			var triggerAll = $('[data-tabs-id=' + parentId + '] [data-tabs-trigger]');
			var targetEl = '';
			var targetAll = $('[data-tabs-target]');

			if (trigger.attr('data-tabs-trigger')) {
				triggerId = parseInt(trigger.attr('data-tabs-trigger'));
			} else {
				triggerId = parseInt(trigger.closest('[data-tabs-trigger]').attr('data-tabs-trigger'));
			}

			triggerEl = $('[data-tabs-id=' + parentId + '] [data-tabs-trigger=' + triggerId + ']');
			targetEl = $('[data-tabs-id=' + parentId + '] [data-tabs-target=' + triggerId + ']');

			for (var i = 0, len = triggerAll.length; i < len; i++) {
				if (!$(triggerAll[i]).hasClass('js-tabs-trigger--is-hidden')) {
					$(triggerAll[i]).addClass('js-tabs-trigger--is-hidden');
				} else {
					$(triggerAll[i]).removeClass('js-tabs-trigger--is-hidden');
				}
			}

			if (triggerIdPrev !== triggerId) {
				for (var i = 0, len = triggerAll.length; i < len; i++) {
					if ($(triggerAll[i]).hasClass('js-tabs-trigger--is-open')) {
						$(triggerAll[i]).removeClass('js-tabs-trigger--is-open');
					}
					if (!$(triggerAll[i]).hasClass('js-tabs-trigger--is-hidden')) {
						$(triggerAll[i]).addClass('js-tabs-trigger--is-hidden');
					}
				}
				for (var i = 0, len = targetAll.length; i < len; i++) {
					if ($(targetAll[i]).hasClass('js-tabs-target--is-open')) {
						$(targetAll[i])
							.removeClass('js-tabs-target--is-open')
							.hide(400);
					}
				}
			}

			if (!triggerEl.hasClass('js-tabs-trigger--is-open')) {
				if (triggerEl.hasClass('js-tabs-trigger--is-hidden')) {
					triggerEl.removeClass('js-tabs-trigger--is-hidden')
				}
				triggerEl.addClass('js-tabs-trigger--is-open');
			} else {
				if (triggerEl.hasClass('js-tabs-trigger--is-hidden')) {
					triggerEl.removeClass('js-tabs-trigger--is-hidden')
				}
				triggerEl.removeClass('js-tabs-trigger--is-open');
			}

			targetEl.toggleClass('js-tabs-target--is-open');

			if (targetEl.hasClass('js-tabs-target--is-open')) {
				targetEl.show(400);
			} else {
				targetEl.hide(400);
			}

			triggerIdPrev = triggerId;
		}
	}
})();