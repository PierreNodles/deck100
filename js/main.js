jQuery(function($) {

  var $window = $(window);

  //////////////////////
  /////////// JUMBOTRON
  /////////////////////



  // Jumbotro full Height
  function setHeight() {
    windowHeight = $(window).innerHeight() ;
    if ($(window).width() < 720) {
      windowHeight = $(window).innerHeight() * 1.05;
    }
    $('.dp_jumbotron-container').css('height', windowHeight);
    $('.dp_jumbotron').css('min-height', windowHeight*1.055);
  };

  setHeight();

  // Adaptation de la hauteur en cas de variation de la taille de la fenêtre
  $(window).resize(function() {
    setHeight();
  });


  function backgroundHeight() {
    var bH = $(document).height();
    $('#dp_background').css('min-height', bH);;
  }
  $(window).on('scroll resize', backgroundHeight);
  backgroundHeight();



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


  // // LANCEMENT DU DEFILEMENT AUTOMATIQUE DU slider_products
  // var loop;
  //
  // function slider(){
  //
  //   loop = setTimeout(function(){
  //
  //     i++;
  //     if (i > indexSlide) {
  //       i = 0;
  //     }
  //     changeSlide();
  //     slider();
  //   }, 5000);
  //
  // }
  //
  // slider();

  // On s'assure qu'en cas de nav manuelle, le chrono avant defilement revienne à 0;

  $('.nav').click(function(event) {

    clearTimeout(loop); // On sort de la boucle timeOut créée ans la function carrousel_1
    slider(); // Puis on la relance
  });


  function setSliderHeight() {
    var $slideHeight = $('.product_slide').height();
    $('.slider_products .container').height($slideHeight);

  }


  setSliderHeight();



  $(window).resize(function() {

    setSliderHeight();
  });

  ///////////////////////////
  //// DECK 100 BOARD switch
  ///////////////////////////


  // LANCEMENT DU DEFILEMENT AUTOMATIQUE DU SLIDER_PRODUCT

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
  console.log("no match");

}


});






  // END JQUERY
});
