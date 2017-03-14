// --------------------------
// Carousel -----------------
// --------------------------

var currentSlideIndex = 0;

// Find out how many images are in the carousel wrapper
var numberImages = $('.carousel img').length;

// Set the width of the image wrapper and each image accordingly (responsive, baby!)
$('.image-wrapper').css('width', numberImages * 100 + '%');
$('.image-wrapper img').css('width', 100 / numberImages + '%');

// Set up a timer for the carousel
var carouselTimer = setInterval(timerTransition, 4000);

function timerTransition () {

  if (currentSlideIndex ===  numberImages - 1) {
    // If we are on the last slide, we want to go back to the first
    currentSlideIndex = 0;
  } else {
    // Otherwise advance to the next slide.
    currentSlideIndex += 1;
  }

  // Transition that baby!!
  transitionSlides();
}

$('.carousel-indicators').on('click', 'li', function () {
  // Clear Timer for Carousel
  clearInterval(carouselTimer);
  // Restart Timer for Carousel
  carouselTimer = setInterval(timerTransition, 3000);

  // Find out which slide the user wants to go to
  currentSlideIndex = $(this).data('slide-number');

  // Transition that baby!!
  transitionSlides();

});


function transitionSlides () {
  // Find out what percentage the slide wrapper should be transitioned
  var amountToTranslate = -((100 / numberImages) * currentSlideIndex);

  // Slide the carousel wrapper
  $('.image-wrapper').css('transform', 'translateX(' + amountToTranslate + '%)');

  // Update the indicators so the user knows which slide is currently showing
  $('.carousel-indicators li').removeClass('active');
  $('.carousel-indicators li[data-slide-number="' + currentSlideIndex + '"]').addClass('active');
}


// --------------------------
// Lightbox -----------------
// --------------------------
$('.carousel').on('click', 'img', function () {
  // Clear Timer for Carousel so that it stops switching slides
  clearInterval(carouselTimer);

  // Find out which image the user wants to view in the lightbox
  var imageSrc = $(this).attr('src');

  $('.lightbox img').attr('src', imageSrc);

  // Fade in lightbox (as a flex container)
  $('.lightbox').css('display', 'flex').hide().fadeIn(300, function () {
    $('body').on('click', hideLightbox);
  });

});

function hideLightbox () {
  $('.lightbox').fadeOut(300, function () {
    // After modal dissapears, remove click event on body
    $('body').unbind('click', hideLightbox);
  });
}


// --------------------------
// Quotes on Timer ----------
// --------------------------
var quoteCounter = 0;
var quoteLength = $('blockquote').length;

setInterval(function () {
  $('blockquote').eq(quoteCounter).fadeOut(800, function () {
    if (quoteCounter === quoteLength - 1) {
      quoteCounter = 0;
    } else {
      quoteCounter += 1;
    }
    $('blockquote').eq(quoteCounter).fadeIn();
  });
}, 7000);


// --------------------------
// Smooth Scroll Nav
// --------------------------

// Do it when someone clicks a nav link
$('.nav-links a, .logo a').on('click', function(e) {
  // prevent the standard link operation on click
  e.preventDefault();
  // use the href of the link to identify what
  // section to scroll to
  var thisTarget = $(this).attr('href');
  // get that section's top offset
  var targetOffset = $(thisTarget).offset().top;
  // use jQuery.animate() to animate the body's
  // scrollTop to the targetOffest
  $('body').animate({
    scrollTop: targetOffset
  }, 600);
});


// -----------------------------
// Highlight Nav Links on Scroll
// -----------------------------
// cache the navigation links
var $navigationLinks = $('.nav-links a');
// cache (in reversed order) the sections
var $sections = $($("section, header").get().reverse());

// map each section id to their corresponding navigation link
var sectionIdTonavigationLink = {};
$sections.each(function() {
    var id = $(this).attr('id');
    sectionIdTonavigationLink[id] = $('.nav-links a[href="#' + id + '"]');
});

// throttle function, enforces a minimum time interval
function throttle(fn, interval) {
    var lastCall, timeoutId;
    return function () {
        var now = new Date().getTime();
        if (lastCall && now < (lastCall + interval) ) {
            // if we are inside the interval we wait
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                lastCall = now;
                fn.call();
            }, interval - (now - lastCall) );
        } else {
            // otherwise, we directly call the function
            lastCall = now;
            fn.call();
        }
    };
}

function highlightNavigation() {
    // get the current vertical position of the scroll bar
    var scrollPosition = $(window).scrollTop();

    // iterate the sections
    $sections.each(function() {
        var currentSection = $(this);
        // get the position of the section
        var sectionTop = currentSection.offset().top - 71;

        // if the user has scrolled over the top of the section
        if (scrollPosition >= sectionTop) {
            // get the section id
            var id = currentSection.attr('id');
            // get the corresponding navigation link
            var $navigationLink = sectionIdTonavigationLink[id];
            // if the link is not current
            if (!$navigationLink.hasClass('current')) {
                // remove .current class from all the links
                $navigationLinks.removeClass('current');
                // add .current class to the current link
                $navigationLink.addClass('current');
            }
            // we have found our section, so we return false to exit the each loop
            return false;
        }
    });
}

$(window).scroll( throttle(highlightNavigation, 100) );


$('.hamburger').on('click', function (e) {
  e.preventDefault();
  $('.nav-links').toggleClass('open-menu');
});
