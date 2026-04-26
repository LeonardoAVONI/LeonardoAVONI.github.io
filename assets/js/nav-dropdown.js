/* nav-dropdown.js
 * Click-toggle dropdowns for desktop (#nav) and mobile (#navPanel).
 *
 * ROOT CAUSE OF MOBILE BUG:
 *   Massively's main.js adds #navPanel to the DOM immediately but as an
 *   empty shell. The nav content (ul.links with li.has-dropdown items) is
 *   only moved into it later when the <=medium breakpoint fires. A
 *   MutationObserver or document.ready handler therefore finds no
 *   li.has-dropdown elements inside #navPanel and attaches nothing.
 *
 * FIX: Use jQuery event delegation on `document`. Delegated handlers match
 *   elements that exist *at click time*, so it doesn't matter when the
 *   elements appear in the DOM.
 *
 * Load AFTER main.js so jQuery is available.
 */
(function ($) {
    $(document).ready(function () {

        /*
         * Single delegated handler for BOTH #nav and #navPanel.
         * Selector: any <a> that is a direct child of li.has-dropdown
         * inside either container.
         */
        $(document).on('click', '#nav li.has-dropdown > a, #navPanel li.has-dropdown > a', function (e) {

            var $a      = $(this);
            var $parent = $a.closest('li.has-dropdown');

            // Which container are we in? (#nav or #navPanel)
            var $container = $a.closest('#nav, #navPanel');

            var wasOpen = $parent.hasClass('open');

            // Close all dropdowns in this container first
            $container.find('li.has-dropdown').removeClass('open');

            if (!wasOpen) {
                // Block navigation and show the sub-menu
                e.preventDefault();
                e.stopImmediatePropagation();
                $parent.addClass('open');
            }
            // If it was already open: we've closed it above, now let
            // the browser follow the href to the category page.
        });

        /* Close all dropdowns when clicking anywhere outside a dropdown */
        $(document).on('click', function (e) {
            if (!$(e.target).closest('#nav li.has-dropdown, #navPanel li.has-dropdown').length) {
                $('li.has-dropdown').removeClass('open');
            }
        });

    });
})(jQuery);
