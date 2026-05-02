(function ($) {
    $(document).ready(function () {

        // ── DESKTOP: click-toggle dropdowns in #nav ──────────────────────

        $(document).on('click', '#nav li.has-dropdown > a', function (e) {
            var $a      = $(this);
            var $parent = $a.closest('li.has-dropdown');
            var wasOpen = $parent.hasClass('open');

            $('#nav li.has-dropdown').removeClass('open');

            if (!wasOpen) {
                e.preventDefault();
                e.stopImmediatePropagation();
                $parent.addClass('open');
            }
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('#nav li.has-dropdown').length) {
                $('#nav li.has-dropdown').removeClass('open');
            }
        });

        // ── MOBILE: drill-down in #navPanel ──────────────────────────────

        $(document).on('click', '#navPanel li.has-dropdown > a', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var $a          = $(this);
            var $li         = $a.closest('li.has-dropdown');
            var $navInner   = $('#navPanel nav');
            var $mainList   = $navInner.children('ul.links');
            var $dropdown   = $li.children('ul.dropdown');
            var title       = $a.text().replace('▾', '').trim();
            var parentHref  = $a.attr('href');

            // Build the drill-down panel
            var $drill = $('<div class="navpanel-drill"></div>');

            // Back button
            $drill.append(
                '<a href="#" class="navpanel-back">&#8592; Back</a>'
            );

            // "Overview" link for the category page itself
            var $sub = $('<ul class="links"></ul>');
            $sub.append(
                '<li class="navpanel-overview"><a href="' + parentHref + '">'
                + title + ' — Overview</a></li>'
            );

            // Clone all sub-items
            $dropdown.children('li').each(function () {
                $sub.append($(this).clone());
            });

            $drill.append($sub);

            // Swap views
            $mainList.hide();
            $navInner.append($drill);

            // Back button: restore main list
            $drill.find('.navpanel-back').on('click', function (e) {
                e.preventDefault();
                $drill.remove();
                $mainList.show();
            });
        });

    });
})(jQuery);