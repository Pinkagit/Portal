$(function(){
    
    $(".icon-liebiao2").on("click", function() {
        $(".navbar-container").toggleClass("navbar-container-sacle1");
    })
    
    var clientHeight = $(window).height();          //浏览器的可视高度
    $(".banner").css("height", clientHeight-50);    //设置初始banner图的高度

    layout();
    $(window).resize(layout);   //当浏览器改变大小时触发

    function layout(){          //各个section的定位
        var bannerHeight = $(".banner").css("height");
        var topHeight = parseInt(bannerHeight) + 50 + "px";

        $(".product").css({
            top: topHeight
        })
        $(".culture").css({
            top: function () {
                return parseInt(topHeight) + parseInt($(".product").css("height")) + "px"
            }
        })
        $(".team").css({
            top: function () {
                return parseInt($(".culture").css("top")) + parseInt($(".culture").css("height")) + "px"
            }
        })
        $(".contact").css({
            top: function () {
                return parseInt($(".team").css("top")) + parseInt($(".team").css("height")) + "px"
            }
        })
        $("footer").css({
            top: function () {
                return parseInt($(".contact").css("top")) + parseInt($(".contact").css("height")) + "px"
            }
        })
    }
    
    var img_flag = 0;
    var img_arr = ["../images/banner01.png", "../images/banner02.png", "../images/banner03.png"];
    var img_box = 2;        

    setInterval(switch_banner, 7500);   //停留时间 7500 - 1500 + 1500

    setTimeout(() => {      //打开2s后立刻触发
        switch_banner();
    }, 2000);

    function switch_banner() {      
        var img_url = 'url("' + img_arr[(img_flag + 1) % img_arr.length] + '")';
        var img_index1 = img_flag % img_box;
        var img_index2 = (img_flag + 1) % img_box;
        
        $(".banImg").eq(img_index1).css({
            transform: "scale(.8)"
        }).delay(500).animate({
            top: '+=100%'
        }, 1000, function () {
            $(this).css({
                top: "-100%",
                transform: "scale(.7)"
            })
        })

        $(".banImg").eq(img_index2).css({
            "background-image": img_url,
            transform: "scale(.7)"
        }).delay(500).animate({
            top: '+=100%'
        }, 1000, function () {
            $(this).css({
                transform: "scale(1)"
            })
        })

        $(".title_line").eq(img_index1).css({
            transform: "scale(1, 1)"
        })
        
        setTimeout(function(){
            $(".title_mask").eq(img_index1).animate({ width: "100%" }, 4500).animate({ width: "0" }, 0, function(){
                $(".title_line").eq(img_index1).css({
                    transform: "scale(0, 1)"
                })
            })
        }, 1500)
        
        img_flag++;
    }
    
    
    
})