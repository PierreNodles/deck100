jQuery(function($) {

  var $window = $(window);
  var isMobile = ($window.width() < 720) ? true : false;


  //////////////////////
  /////////// JUMBOTRON
  /////////////////////



  // Jumbotro full Height
  function setHeight() {
    windowHeight = $window.innerHeight() ;
    if (isMobile) {
      windowHeight = $window.innerHeight() * 1.15;
    }
    $('.dp_jumbotron-container').css('height', windowHeight);
    $('.dp_jumbotron').css('min-height', windowHeight*1.055);
  };

  setHeight();

  // Adaptation de la hauteur en cas de variation de la taille de la fenêtre
  $window.resize(function() {
    setHeight();
  });


  function backgroundHeight() {
    var bH = $(document).height();
    $('#dp_background').css('min-height', bH);;
  }
  $window.on('scroll resize', backgroundHeight);
  backgroundHeight();


  ///////////////////////
  //// FEATURES SLIDER
  //////////////////////


  var $slider_features = $('.features'), // on cible le bloc du slider
  $slide_features = $('.features .board'), // on cible les slides contenues dans le slider
  $slide_features_height = $slide_features.height(), // On récupère la hauteur des slides
  indexSlide_features = $slide_features.length - 1, // on définit l'index du dernier élément
  i_features = 0, // on initialise un compteur
  $slideToDisplay = $slide_features.eq(i_features); // enfin, on cible la slide à afficher, qui possède l'index i (0 pour l'instant)
  $slideToDisplay.fadeIn(500); // Et on la fait apparaître

  // Definition du déclencheur de l'animation et récupération de sa position
  var $slider_trigger = $('.decathlon_skateboarding .nav');
  var top = $slider_trigger.offset().top;


  // Gestion de l'animation
  $window.scroll(function (event) {

    if (!isMobile) {

      var scroll = $window.scrollTop();

      if (scroll < top) {
        i_features_target = 0;
      } else {
        i_features_target = 1;
      }

      if ( i_features_target != i_features ){

        $slideToDisplay = $slide_features.eq(i_features_target);
        var $oldSlide_features = $slide_features.eq(i_features);

        $slideToDisplay.fadeIn(500);
        $oldSlide_features.fadeOut(500);

        i_features = i_features_target;
      }
    }
  });


  // On donne au slider la taille des slides
  $slider_features.height($slide_features_height);



  ////////////////////////
  // SLIDER PRODUCT - BOUTIQUE
  ////////////////////////

  var $slider = $('.slider_products'), // on cible le bloc du slider
  $slide = $('.slider_products .product_slide'), // on cible les slides contenues dans le slider
  indexSlide = $slide.length - 1, // on définit l'index du dernier élément
  i = 0, // on initialise un compteur
  $currentSlide = $slide.eq(i); // enfin, on cible la slide courante, qui possède l'index i (0 pour l'instant)
  $currentSlide.fadeIn(500)

  function changeSlide(direction){
    $currentSlide = $slide.eq(i); // enfin, on cible l'image courante, qui possède l'index i (0 pour l'instant)
    if (direction == "left") {
      $slide.animate({opacity: 0, left: '-300px'}, 900).animate({left:'300px'}, 0); // on cache les images
    } else if (direction == "right" || !direction) {
      $slide.animate({opacity: 0, left: '300px'}, 900).animate({left:'-300px'}, 0); // on cache les images
    }

    $currentSlide.animate({opacity: 1.0, left :"0px", right :"0px"}, 900); // on affiche seulement l'image courante

  }

  changeSlide();

  // AJOUT DES BOUTONS DE NAVIGATION
  $('.slider_products .container').append('<div class="controls"> <div class="next nav"><span>Accessoires</span><figure><img src="./img/accessoires_arrow.png"></figure></div></div>');

  // GESTION DE LA NAVIGATION
  $('.next').click(function(event) {
    i++;
    if (i > indexSlide) {
      i = 0;
    }
    changeSlide('right');

  });

  $('.prev').click(function(event) {
    i--;
    if (i < 0) {
      i = indexSlide;
    }
    changeSlide('left');

  });


  // GESTION DE LA TAILLE DU SLIDER


  function setSliderHeight() {
    var $slideHeight = $('.product_slide').height();
    $('.slider_products .container').height($slideHeight);

  }


  function setSliderHeight_responsive() {
    if (isMobile) {
      var $productHeight = $('.col-md-6.left .product_img').height();
      $('.col-md-6.left').height($productHeight);
    }
  }
  setSliderHeight_responsive();
  setSliderHeight();



  $window.resize(function() {

    setSliderHeight_responsive();
    setSliderHeight();
  });

  ///////////////////////////
  //// DECK 100 BOARD switch
  ///////////////////////////


  // LANCEMENT DU DEFILEMENT AUTOMATIQUE DU BOARD SWITCH DECK 100

  var $imgs = $('.product_slide.deck100 figure');
  indexImg = $imgs.length - 1, // on définit l'index du dernier élément
  iImg = 0, // on initialise un compteur
  $currentImg = $imgs.eq(indexImg); // enfin, on cible la slide courante, qui possède l'index i (0 pour l'instant)
  $currentImg.toggleClass('active');

  function slider(){

    setTimeout(function(){

      if (iImg > indexImg) {
        iImg = 0;
      }

      $imgs.each(function(){
        $(this).removeClass('active');
      })
      $currentImg = $imgs.eq(iImg);
      $currentImg.addClass('active');
      iImg++;
      slider();

    }, 3000);


  }

  slider();



  //////////////////////
  ///// SLIDE VIDEO
  //////////////////////

  var width = $('.product_video iframe').width();
  var height = width*(9/16);
  $('.product_video iframe').height(height);



  ////////////////////////
  // GREETINGS FROM LILLE
  ///////////////////////

  var $puce = $('.puce');

  $puce.click(function(){
    $puce.removeClass('active');
    $(this).addClass('active');
    var position = $(this).attr('position');

    switch (position) {
      case '0':
      $('.greetings').css('background-image', "url('img/greetings_1.jpg')");
      break;
      case '1':
      $('.greetings').css('background-image', "url('img/greetings_2.jpg')");
      break;
      case '2':
      $('.greetings').css('background-image', "url('img/greetings_3.jpg')");
      break;
      case '3':
      $('.greetings').css('background-image', "url('img/greetings_4.jpg')");
      break;

      default:
      $('.greetings').css('background-image', "url('img/greetings_1.jpg')");

    }


  });

  ////////////////////////
  ///////// BOARDSIZE
  ///////////////////////

  var $container = $('.board_size'),
  $boards = $('.board_size .product .product_img'),
  $size_div = $('.board_size .product .size'),
  $size = $('.board_size .product .size span'),
  $board = $boards.eq(0),
  height = $board.height();


  function size_Height(){
    $board = $boards.eq(0),
    height = $board.height();
    $size_div.each(function(){
      $(this).height(height);
    });
  }

  function container_height() {
    $board = $boards.eq(0),
    height = $board.height();
    console.log(height);
    $container.innerHeight(height);
  }

  size_Height();
  container_height();

  $window.resize(function() {
    size_Height();
    container_height();
  });


  $boards.fadeOut();

  $size_div.hover(function() {
    var $product_img = $(this).prev();
    $(this).children('span').fadeOut();
    $product_img.fadeIn();
  }, function() {
    $(this).children('span').fadeIn();
    var $product_img = $(this).prev();
    $product_img.fadeOut();
  });


//////////////////
//// MOVINGS PHOTOS
////////////////////


$window.scroll(function() {
  var $photos = $('.photos'),
  photosTop = $photos.offset().top,

  scrollTop = $(window).scrollTop() + $window.height(),


  percentage = (scrollTop - photosTop) / $photos.outerHeight();


if (percentage <= 0) {
  percentage = 0.001;
} else if(percentage > 1){
  percentage = 1;
}


console.log(percentage);

  $("#photo_1").css({
    "top": 1 + 150*(1-percentage),
    "left": 1 - 300*(1-percentage)
  });
  $("#photo_2").css({
    "top": ($(document).height() - $window.height()) + "px",
    "left": ($(window).scrollLeft()) + "px"
  });
});







  // END JQUERY
});
