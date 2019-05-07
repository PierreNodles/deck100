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

  //////////////////////////////////////////
  /////////// DECATHLON SKATEBOARD - BLOC 2
  //////////////////////////////////////////


  var time=setInterval(function(){
    $('.nav').toggleClass('black');
  },1000);

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
  var $slider_trigger = $('.features .row.board');
  var top = $slider_trigger.offset().top-100;


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

  var $imgs_deck100 = $('.product_slide.deck100 figure');
  indexImg_deck100 = $imgs_deck100.length - 1, // on définit l'index du dernier élément
  iImg_deck100 = 0, // on initialise un compteur
  $currentImg_deck100 = $imgs_deck100.eq(indexImg_deck100); // enfin, on cible la slide courante, qui possède l'index i (0 pour l'instant)
  $currentImg_deck100.toggleClass('active');

  function sliderDeck100(){

    setTimeout(function(){

      if (iImg_deck100 > indexImg_deck100) {
        iImg_deck100 = 0;
      }

      $imgs_deck100.each(function(){
        $(this).removeClass('active');
      })
      $currentImg_deck100 = $imgs_deck100.eq(iImg_deck100);
      $currentImg_deck100.addClass('active');
      iImg_deck100++;
      sliderDeck100();

    }, 3000);


  }

  sliderDeck100();



  //////////////////////
  ///// SLIDE VIDEO
  //////////////////////

  var width = $('.product_video iframe').width();
  var height = width*(9/16);
  $('.product_video iframe').height(height);



  ////////////////////////
  // GREETINGS FROM LILLE
  ///////////////////////
  function setSlider(){

    $(".slider").each( function(){

      var $slider = $(this),
      $itemscontainer = $slider.find(".slider-items-container"),
      $items = $slider.find('.slider-item'),
      itemsNumber = $(".slider-item").length;

      if ($itemscontainer.find(".slider-item.active").length == 0){
        $itemscontainer.find(".slider-item").first().addClass("active");
      }

      function setWidth(){
        var totalWidth = $window.width()*itemsNumber;
        $itemscontainer.width(totalWidth);
        var itemWidth = totalWidth/itemsNumber;
        $items.each(function(){
          $(this).width(itemWidth);
        })
      }

      function setTransform(){

        var $activeItem = $itemscontainer.find(".slider-item.active"),
        activeItemOffset = $activeItem.offset().left,
        itemsContainerOffset = $itemscontainer.offset().left,
        totalOffset = activeItemOffset - itemsContainerOffset

        $itemscontainer.css({"transform": "translate( -"+totalOffset+"px, 0px)"})

      }


      function makeDots(){
        var activeItem = $itemscontainer.find(".slider-item.active"),
        activeItemIndex = activeItem.index(),
        sliderItemTotal = $itemscontainer.find(".slider-item").length;

        for (i = 0; i < sliderItemTotal; i++){
          $slider.find(".dots").append("<div class='dot'></div>")
        }

        $slider.find(".dots").find(".dot").eq(activeItemIndex).addClass("active")

      }

      setWidth();
      setTransform();
      makeDots();

      $(window).resize( function(){
        setWidth();
        setTransform();
      });


      $slider.find(".dots").find(".dot").on('click', function(e){

        var dotIndex = $(this).index(),
        totalOffset = $itemscontainer.find(".slider-item").eq(dotIndex).offset().left - $itemscontainer.offset().left;

        $itemscontainer.find(".slider-item.active").removeClass("active");
        $itemscontainer.find(".slider-item").eq(dotIndex).addClass("active");
        $slider.find(".dots").find(".dot").removeClass("active");
        $(this).addClass("active")

        $itemscontainer.css({"transform": "translate( -"+totalOffset+"px, 0px)"})

      });

    });

  }

  setSlider();


  // GESTION DU DEFILEMENT AUTOMATIQUE

  var slide_delay = 4500;
  var $dots = $('.dot');
  var numberOfDots = $dots.length;


  function slideThroughGreetings() {
    $dots.each(function(index) {
      var that = this;
      var t = setTimeout(function() {
        $(that).trigger('click');
      }, slide_delay * index);
    });
  }

  slideThroughGreetings();
  var time=setInterval(function(){
    slideThroughGreetings();
  },slide_delay*numberOfDots);


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

  ///////////////////////////
  //// DECK 100 BOARD switch
  ///////////////////////////


  // LANCEMENT DU DEFILEMENT AUTOMATIQUE DU BOARD SWITCH DECK 100

  var $imgs = $('.product_slide.deck120 figure');
  indexImg = $imgs.length - 1, // on définit l'index du dernier élément
  iImg = 0, // on initialise un compteur
  $currentImg = $imgs.eq(indexImg); // enfin, on cible la slide courante, qui possède l'index i (0 pour l'instant)
  $currentImg.toggleClass('active');

  function sliderDeck120(){

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
      sliderDeck120();

    }, 3000);


  }

  sliderDeck120();


  //////////////////
  //// MOVINGS PHOTOS
  ////////////////////


  // CONTAINER HEIGHT
  function setPhotoContainerHeight() {
    var height = $window.height();

    $('.container_fluid.photos .row').height(height);
  }
  setPhotoContainerHeight();
  $window.resize(function() {
    setPhotoContainerHeight();
  });





  // GET EACH PHOTOS CSS POSITION
  var photo_1Top = parseInt($("#photo_1").css('top'), 10),
  photo_1Left = parseInt($("#photo_1").css('left'), 10);

  var photo_2Top = parseInt($("#photo_2").css('top'), 10),
  photo_2Left = parseInt($("#photo_2").css('left'), 10);

  var photo_3Top = parseInt($("#photo_3").css('top'), 10),
  photo_3Left = parseInt($("#photo_3").css('left'), 10);

  var photo_4Top = parseInt($("#photo_4").css('top'), 10),
  photo_4Right = parseInt($("#photo_4").css('right'), 10);

  var photo_5Bottom = parseInt($("#photo_5").css('bottom'), 10),
  photo_5Left = parseInt($("#photo_5").css('left'), 10);

  var photo_6Bottom = parseInt($("#photo_6").css('bottom'), 10),
  photo_6Left = parseInt($("#photo_6").css('left'), 10);


  $window.scroll(function() {
    if (!isMobile) {
      var $photos = $('.photos'), // On récupère la div photos
      photosTop = $photos.offset().top, // ScrollTop du haut de la div
      scrollTop = $(window).scrollTop() + $window.height(), // ScrollTop du bas de la div
      percentage = (scrollTop - photosTop) / $photos.outerHeight(); // Calcul du %age de la div scrollé


      if (percentage <= 0) {
        percentage = 0.001;
      } else if(percentage > 1){
        percentage = 1;
      }




      $("#photo_1").css({
        "top": photo_1Top - 20*(1-percentage),
        "left": photo_1Left - 25*(1-percentage)
      });


      $("#photo_2").css({
        "top": photo_2Top - 15*(1-percentage),
        "left": photo_2Left - 30*(1-percentage)
      });

      $("#photo_3").css({
        "top": photo_3Top + 35*(1-percentage),
        "left": photo_3Left - 20*(1-percentage)
      });

      $("#photo_4").css({
        "top": photo_4Top - 20*(1-percentage),
        "right": photo_4Right + 15*(1-percentage)
      });

      $("#photo_5").css({
        "bottom": photo_5Bottom - 35*(1-percentage),
        "left": photo_5Left + 10*(1-percentage)
      });

      $("#photo_6").css({
        "bottom": photo_6Bottom + 15*(1-percentage),
        "left": photo_6Left + 10*(1-percentage)
      });
    }
  });







  // END JQUERY
});
