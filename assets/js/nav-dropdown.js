/* nav-dropdown.js
 * Click-toggle dropdowns on both the desktop nav (#nav) and the
 * Massively mobile sidebar (#navPanel).
 * Load AFTER main.js so jQuery and the navPanel are available.
 */
(function ($) {

    /* Attach click handlers to whichever container is passed in */
    function initDropdowns($container) {
        $container.find('li.has-dropdown > a').on('click', function (e) {
            var $parent = $(this).closest('li.has-dropdown');
            var wasOpen = $parent.hasClass('open');

            /* Close all dropdowns in this container */
            $container.find('li.has-dropdown').removeClass('open');

            if (!wasOpen) {
                e.preventDefault();
                e.stopImmediatePropagation();
                $parent.addClass('open');
            }
            /* If it was open: close it and let the browser navigate normally */
        });
    }

    /* Desktop nav — available immediately */
    $(document).ready(function () {
        initDropdowns($('#nav'));

        /* Close on outside click */
        $(document).on('click', function (e) {
            if (!$(e.target).closest('#nav li.has-dropdown, #navPanel li.has-dropdown').length) {
                $('li.has-dropdown').removeClass('open');
            }
        });
    });

    /* Mobile navPanel — Massively creates it after a short delay.
     * We use MutationObserver to detect when it appears in the DOM
     * and attach handlers then.                                      */
    var navPanelObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
            m.addedNodes.forEach(function (node) {
                if (node.id === 'navPanel') {
                    initDropdowns($(node));
                    navPanelObserver.disconnect(); /* only need to run once */
                }
            });
        });
    });
    navPanelObserver.observe(document.body, { childList: true });

})(jQuery);
