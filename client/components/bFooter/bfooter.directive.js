(function() {
    'use strict';

    angular.module('angularFullApp')
        .component('bFooter', {
            templateUrl: 'components/bFooter/footer.html',
            bindings: {},
            controller: FooterController,
            controllerAs: 'vm'
        });

    function FooterController() {
        this.$postLink = function() {

            var $goToTop = $('#go-to-top');

            //jQuery
            $goToTop.on('touchstart click', function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 600);
            });

            //capture scroll any percentage
            $(window).scroll(function() {

                var wintop = $(window).scrollTop(),
                    docheight = $(document).height(),
                    winheight = $(window).height();
                var scrolltrigger = 0.50;

                if ((wintop / (docheight - winheight)) > scrolltrigger) {
                    $goToTop.show();
                } else {
                    $goToTop.hide();
                }
            });
        };

    }

})();
