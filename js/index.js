$(function(){
    
    /* ------------------------ init ----------------------- */
    var product_top, culture_top, team_top, contact_top;           //各模块到网页顶部的距离
    var clientHeight, headHeight;

    init_layout();
    $(window).resize(init_layout);                                 //当浏览器改变大小时触发事件

    function init_layout(params) {
        clientHeight = $(window).height();                         //浏览器的可视高度
        headHeight = parseInt($("header").css("height"));          //header的高度
        $(".banner").css("height", clientHeight - headHeight);     //设置初始banner图的高度
    }

    $(".icon-liebiao2").on("click", function() {                   //nav icon
        $(".navbar-container").toggleClass("navbar-container-sacle1");
    })

    /* ---------------------- nav ----------------------- */
    var arr_nav = [];
    $(".navbar-container li").each(function(i){
        arr_nav.push($(this).text());
    })
    
    $(".navbar-container").on("click", "li", function() {          //nav 标签样式
        $(this).siblings("li").removeClass("navbar_li_actived");
        $(this).addClass("navbar_li_actived");
        
        var nav_flag = arr_nav.indexOf($(this).text());

        switch (nav_flag) {
            case 0:         //定位到 主页
                $('body,html').animate({ scrollTop: "0" }, 1000);
                break;
            case 1:         //定位到 产品欣赏
                $('body,html').animate({ scrollTop: product_top - headHeight }, 1000);
                break;
            case 2:         //定位到 团队介绍
                $('body,html').animate({ scrollTop: team_top - headHeight }, 1000);
                break;
            case 3:         //定位到 公司招聘
                $('body,html').animate({ scrollTop: culture_top - headHeight }, 1000);
                break;
            case 4:         //定位到 联系我们
                $('body,html').animate({ scrollTop: contact_top - headHeight }, 1000);
                break;
            default:
                break;
        }
        
    })

    /* ---------------------- banner ---------------------- */
    var img_flag = 0;
    var img_arr = ["/static/images/banner01.png", "/static/images/banner02.png", "/static/images/banner03.png"];
    var img_box = 2;        

    setInterval(switch_banner, 7500);   //停留时间 7500 - 1500 + 1500

    setTimeout(() => {      //打开2s后立刻触发
        switch_banner();
    }, 2000);

    function switch_banner() {      //banner图 切换特效
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

        var title_flag = img_flag % img_arr.length;
        $(".title_line").eq(title_flag).css({
            transform: "scale(1, 1)"
        })
        
        setTimeout(function(){
            $(".title_mask").eq(title_flag).animate({ width: "100%" }, 4500).animate({ width: "0" }, 0, function(){
                $(".title_line").eq(title_flag).css({
                    transform: "scale(0, 1)"
                })
            })
        }, 1500)
        
        img_flag++;
    }
    
    /* ----------------------- scroll ----------------------- */
    $(window).scroll(offset_animation);     //当网页滚动时触发事件
    setTimeout(() => {
        product_top = $(".product").offset().top;
        culture_top = $(".culture").offset().top;
        team_top    = $(".team").offset().top;
        contact_top = $(".contact").offset().top;
        offset_animation();
    }, 800);
    
    function offset_animation() {
        var scroll_top = $(window).scrollTop();         //垂直滚动条的滚动位置(可视区域到页面顶部距离)

        if (clientHeight >= product_top - scroll_top + 300) {
            $(".products").addClass("products_animation")
        }

        if (clientHeight >= culture_top - scroll_top + 300) {
            $(".content_article li").eq(0).css({ transform: "translate(0)" }, 1000);
            $(".content_article li").eq(1).css({ opacity: "1" }, 1000);
            $(".content_article li").eq(2).css({ transform: "translate(0)" }, 1000);
            $(".content_article li").eq(3).css({ transform: "translate(0)" }, 1000);
            $(".content_article li").eq(4).css({ opacity: "1" }, 1000);
            $(".content_article li").eq(5).css({ transform: "translate(0)" }, 1000);
        }

        if (clientHeight >= team_top - scroll_top + 300) {
            $(".team").find("p").eq(0).animate({ left: "0", opacity: "1" }, 1000);
            $(".team").find("p").eq(1).animate({ left: "0", opacity: "1" }, 1000);
            $(".team").find("p").eq(2).animate({ left: "0", opacity: "1" }, 1000);
            $(".team").find("p").eq(3).animate({ left: "0", opacity: "1" }, 1000, function(){
                $(".rotating-slider").css({
                    transform: "rotate(360deg)",
                    transition: "transform 2s",
                    "transform-origin": "49% 199%"
                })
            });
            
        }

        if (clientHeight >= contact_top - scroll_top + 300) {
            $(".map_container").animate({ opacity: "1" }, 1000);
            $(".address").animate({ opacity: "1" }, 1000);
        }
    }
    
    /* ------------------- rotating-slider -------------------- */
    $('.rotating-slider').rotatingSlider({
        autoRotate: true,               //自动播放
        autoRotateInterval: 5000,       //自动播放的时间间隔
        draggable: true,                //拖动

        directionControls: true,        // 轮播图的左右控制按钮
        // directionLeftText: '?',
        // directionRightText: '?',

        rotationSpeed: 750,             // 动画速度

        slideHeight: 260,               // 轮播图的尺寸
        slideWidth: 380,
    });

    /* ----------------------- map ----------------------- */
    var map = new BMap.Map("map");                              // 创建地图实例
    var point = new BMap.Point(121.539273, 31.224149);          // 创建点坐标
    map.centerAndZoom(point, 16);                                // 初始化地图，设置中心点坐标和地图级别
    // map.enableScrollWheelZoom(true);         //开启鼠标滚轮缩放

    map.addControl(new BMap.OverviewMapControl());      //可折叠的缩略地图
    map.addControl(new BMap.NavigationControl({
        type: BMAP_NAVIGATION_CONTROL_ZOOM
    }));
    
    var opts = {
        width: 280,     // 信息窗口宽度    
        height: 23,     // 信息窗口高度    
        title: "<p class='map_title'>上海陆家嘴软件园8号研发楼</p>"  // 信息窗口标题   
    }
    var infoWindow = new BMap.InfoWindow("<p class='map_address'>地址：峨山路91弄120号</p>", opts);
    map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
    
    /* --------------------- video ------------------------ */
    var arr_video = ["/static/video/01.mp4", "/static/video/02.mp4", "/static/video/03.mp4", "/static/video/04.mp4"]
    
    $(".products").each(function(i){
        $(this).on("click", function(){
            console.log(arr_video[i]);
            $("#video_source").attr("src", arr_video[i]);
            $("#video_source")[0].load();           // 重新加载资源
            $("#video_source")[0].play();           // 开始播放
            $("#product_video").css("transform", "translate(-50%, -50%)  scale(1,1)");
        })
    })
    
    $("#product_video .icon-guanbi1").on("click", function(){
        $("#product_video").css("transform", "translate(-50%, -50%)  scale(1,0)");
        $("#video_source")[0].pause();             // 暂停播放
    })
    
})