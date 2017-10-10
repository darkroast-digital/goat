// *************************************************************************
// *************************************************************************
// *************************************************************************

require('./bootstrap');


// #LOADER
// =========================================================================

$(window).on('load', function(){
    $('.loader__container').addClass('is--loaded');
});



// #CAROUSEL
// =========================================================================

$('.hero__content').slick({
  arrows: true,
  dots: true,
  autoplay: true,
  nextArrow: '<i class="fa fa-angle-right next"></i>',
  prevArrow: '<i class="fa fa-angle-left prev"></i>',
});

$('.slick-dots button').empty();



// #TABS
// =========================================================================

$('li[data-tab], .tab__content').first().addClass('is--active');
$('.tab__content').first().addClass('is--active');

$('li[data-tab]').click(function() {
    var thisTab = $(this).attr('data-tab');
    var tab = $('.tab__content' + '[data-tab="' + thisTab + '"]');

    $('li[data-tab]').removeClass('is--active');
    $(this).addClass('is--active');
    $('.tab__content').removeClass('is--active');
    tab.addClass('is--active');
});




// #NAV
// =========================================================================

$('.nav__navbar li').click(function() {
    $('.nav__navbar li').removeClass('is--active');
    $(this).addClass('is--active');
});

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
  



// #MENU
// ========================================================================

var menuTrigger = document.querySelector('.menu__trigger');
var menu = document.querySelector('.menu');

menuTrigger.addEventListener('click', function () {
    this.classList.toggle('is--open');
    menu.classList.toggle('is--open');
});



// #FORM
// ========================================================================

var form = $('.form');

$(form).submit(function(){

    var formData = new FormData($(this)[0]);

    $.ajax({
        url: '/',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
            $('input').val('');
            $('textarea').val('');
            $('<div class="alert alert--success">Your Message Was Sent!  We\'ll be in touch.</div>').insertAfter(form);
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});

// $(form).submit((e) => {
//   e.preventDefault();

//   axios.post('/', {
//     first_name: $('[name="first_name"]').val(),
//     last_name: $('[name="last_name"]').val(),
//     email: $('[name="email"]').val(),
//     phone: $('[name="phone"]').val(),
//   })
//   .then((response) => {
//     $('input').val('');
//     $('textarea').val('');
//     $('<div class="alert success">Your Message Was Sent!  We\'ll be in touch.</div>').insertAfter(form);
//     console.log('success' + response);
//   })
//   .catch((error) => {
//     $('input').val('');
//     $('textarea').val('');
//     $('<div class="alert error">Oh no!  Something went wrong, give it another shot.</div>').insertAfter(form);
//     console.log('error' + error);
//   });
// });



// #MAP
// =========================================================================

var lat = 42.249079;
var long = -83.061125;

          var map = new GMaps({
          el: "#map",
          lat: lat,
          lng: long,
          zoom: 15, 
          zoomControl : true,
          zoomControlOpt: {
            style : "SMALL",
            position: "TOP_LEFT"
          },
          scrollwheel: false,
          panControl : true,
          streetViewControl : false,
          mapTypeControl: false,
          overviewMapControl: false
        });
        
        var styles = [
            {
              stylers: [
                { saturation: 0 },
                { lightness: 0 }
              ]
            }, {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    { lightness: 10 },
                    { visibility: "simplified" }
              ]
            }, {
                featureType: "road",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
              ]
            }
        ];
        
        map.addStyle({
            styledMapName:"Styled Map",
            styles: styles,
            mapTypeId: "map_style"  
        });

        map.addMarker({
          lat: lat,
          lng: long,
          icon: 'http://res.cloudinary.com/darkroast-digital/image/upload/v1505742217/Goat/map__pin.png'
        });
        
        map.setStyle("map_style");
