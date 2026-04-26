/* nav-dropdown.js — click-toggle for the Projects dropdown */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var triggers = document.querySelectorAll('#nav ul.links li.has-dropdown > a');
        triggers.forEach(function (trigger) {
            trigger.addEventListener('click', function (e) {
                // Only intercept if the page IS projects.html (the link target)
                // On other pages the click should still navigate; so we only
                // prevent default when we're already on that page OR just toggle.
                var parent = this.parentElement;
                var isOpen = parent.classList.contains('open');

                // Close all dropdowns first
                document.querySelectorAll('#nav ul.links li.has-dropdown').forEach(function (li) {
                    li.classList.remove('open');
                });

                if (!isOpen) {
                    e.preventDefault();          // stop navigation, show menu
                    parent.classList.add('open');
                }
                // if it was open, we closed it and let the click navigate normally
            });
        });

        // Click anywhere outside → close all dropdowns
        document.addEventListener('click', function (e) {
            if (!e.target.closest('#nav ul.links li.has-dropdown')) {
                document.querySelectorAll('#nav ul.links li.has-dropdown').forEach(function (li) {
                    li.classList.remove('open');
                });
            }
        });
    });
})();
