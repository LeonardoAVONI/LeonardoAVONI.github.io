/* nav-dropdown.js — click-toggle for the Projects dropdown
 * Must load AFTER main.js so jQuery is available.
 * Uses jQuery + stopImmediatePropagation to prevent the Massively
 * template's own click handler from swallowing the event on desktop.
 */
(function ($) {
    $(document).ready(function () {

        var $trigger = $('#nav ul.links li.has-dropdown > a');

        $trigger.on('click', function (e) {
            var $parent = $(this).parent();
            var wasOpen = $parent.hasClass('open');

            // Close every dropdown first
            $('#nav ul.links li.has-dropdown').removeClass('open');

            if (!wasOpen) {
                // Prevent the template and browser from following the link
                e.preventDefault();
                e.stopImmediatePropagation();
                $parent.addClass('open');
            }
            // If it was already open: close it and allow navigation to projects.html
        });

        // Click anywhere outside the dropdown → close everything
        $(document).on('click', function (e) {
            if (!$(e.target).closest('#nav ul.links li.has-dropdown').length) {
                $('#nav ul.links li.has-dropdown').removeClass('open');
            }
        });
    });
})(jQuery);
