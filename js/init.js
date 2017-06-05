/**
 * Created by mao on 17-6-5.
 */
(function ($) {
    $(function () {


        function is_touch_device() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        }

        if (is_touch_device()) {
            $('#nav-mobile').css({overflow: 'auto'});
        }

        // Set checkbox on forms.html to indeterminate
        var indeterminateCheckbox = document.getElementById('indeterminate-checkbox');
        if (indeterminateCheckbox !== null)
            indeterminateCheckbox.indeterminate = true;


        // Plugin initialization
        $('.carousel.carousel-slider').carousel({fullWidth: true});
        $('.carousel').carousel();
        $('.slider').slider();
        $('.parallax').parallax();
        $('.modal').modal();
        $('.scrollspy').scrollSpy();
        // $('.button-collapse').sideNav({'edge': 'left'});
        $('.datepicker').pickadate({selectYears: 20});
        $('select').not('.disabled').material_select();
        $(".button-collapse").sideNav();

    });
})(jQuery);
