width = document.getElementById("width").clientWidth;
document.getElementById("youtube").style.height=width*0.8*0.56 + "px";
document.getElementById("youtube").style.paddingLeft=width*0.1 + "px";

$(window).scroll(function () {
  //スクロールで動く
  delayScrollAnime()
  TextTypingAnime();
  BlurTextAnimeControl();
  TextRandomAnimeControl();
  EachTextAnimeControl();
});

$(window).on('load', function () {
  //ロードと同時に動く
  delayScrollAnime()
  BlurTextAnimeControl();
  TextRandomAnimeControl();
});
  

function BlurTextAnimeControl() {
  //ぼかし
  $('.blurTrigger').each(function(){ 
    var elemPos = $(this).offset().top-50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('blur');
    }else{
    $(this).removeClass('blur');
    }
  });
}
  
function TextRandomAnimeControl() {
  $('.TextRandomAnime').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("appearRandomtext");
    } else {
      $(this).removeClass("appearRandomtext");
    }
  });
}

$(window).on('load', function () {
  //読み込み後すぐにrandomTextを実行する
  var element = $(".TextRandomAnime");
  element.each(function () {
    var text = $(this).text();
    var textbox = '';
    text.split('').forEach(function (t) {
      textbox += '<span>' + t + '</span>';
    });
    $(this).html(textbox);
  });
  
  TextRandomAnimeControl();
});

function TextTypingAnime() {
  $('.TextTyping').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var thisChild = "";
    if (scroll >= elemPos - windowHeight) {
      thisChild = $(this).children(); 
      thisChild.each(function (i) {
        var time = 100;
        $(this).delay(time * i).fadeIn(time);
      });
    } else {
      thisChild = $(this).children();
      thisChild.each(function () {
        $(this).stop(); 
        $(this).css("display", "none");
      });
    }
  });
}


$(window).on('load', function () {
  var element = $(".TextTyping");
  element.each(function () {
    var text = $(this).html();
    var textbox = "";
    text.split('').forEach(function (t) {
      if (t !== " ") {
        textbox += '<span>' + t + '</span>';
      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);
  });
  
  TextTypingAnime();
});
  
function SmoothTextAnime() {
  $('.smoothTextTrigger').each(function(){ 
    var elemPos = $(this).offset().top-50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('smoothTextAppear');
    }else{
    $(this).removeClass('smoothTextAppear');
    }
  }); 
}
  
function EachTextAnimeControl() {
  $('.eachTextAnime').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("appeartext");
    } else {
      $(this).removeClass("appeartext");
    }
  });
}
  
$(window).on('load', function () {
  //spanタグを追加する
  var element = $(".eachTextAnime");
  element.each(function () {
    var text = $(this).text();
    var textbox = "";
    text.split('').forEach(function (t, i) {
      if (t !== " ") {
        if (i < 10) {
          textbox += '<span style="animation-delay:.' + i + 's;">' + t + '</span>';
        } else {
          var n = i / 10;
          textbox += '<span style="animation-delay:' + n + 's;">' + t + '</span>';
        }
      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);
  });

  EachTextAnimeControl();
});

function delayScrollAnime() {
  var time = 0.7;//遅延時間を増やす秒数の値
  var value = time;
  $('.delayScroll').each(function () {
    var parent = this;          
    var elemPos = $(this).offset().top;//要素の位置まで来たら
    var scroll = $(window).scrollTop();//スクロール値を取得
    var windowHeight = $(window).height();//画面の高さを取得
    var childs = $(this).children();  //子要素を取得
      
    if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {
      $(childs).each(function () {
          
        if (!$(this).hasClass("fadeUp")) {
            
          $(parent).addClass("play"); 
          $(this).css("animation-delay", value + "s");
          $(this).addClass("fadeUp");
          value = value + time;
            
          //全ての処理を終わったらplayを外す
          var index = $(childs).index(this);
          if((childs.length-1) == index){
            $(parent).removeClass("play");
          }
        }
      })
    }else {
      $(childs).removeClass("fadeUp");
      value = time;
    }
  })
}

$(".openbtn1").click(function () {
  $(this).css('z-index', '9999');
  $(this).toggleClass('active');
  $("#g-nav").toggleClass('panelactive');
  $(".circle-bg").toggleClass('circleactive');//丸背景にcircleactiveクラスを付与
});
  
$("#g-nav a").click(function () {
    $(".openbtn1").removeClass('active');
    $("#g-nav").removeClass('panelactive');
    $(".circle-bg").removeClass('circleactive');
});

$(window).on('load',function(){
  $("#splash").delay(1500).fadeOut('slow');
  $("#splash_logo").delay(1200).fadeOut('slow');
});


var bar = new ProgressBar.Line(splash_text, {
  //ページの進捗バー
  easing: 'easeInOut',
  duration: 1000,//一秒
  strokeWidth: 1,
  color: 'orange',
  trailWidth: 1,
  trailColor: '#bbb',
  text: {    
    style: {
      position: 'absolute',
      left: '50%',
      top: '65%',
      padding: '0',
      margin: '-30px 0 0 0',
      transform:'translate(-50%,-50%)',
      'font-size':'1rem',
      color: 'orange',
    },
    autoStyleContainer: false 
  },
  step: function(state, bar) {
    bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
  }
});

//アニメーションスタート
bar.animate(1.0, function () {
  $("#splash").delay(1500).fadeOut('slow');
});  