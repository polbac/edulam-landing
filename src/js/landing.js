function init() {
    $(window).scroll(checkScroll);
    $(window).scroll(checkScrollFeatures);
};

function checkScroll() {
    var scrollY = $(document).scrollTop();

    if (scrollY > 100) {
        $("header").addClass("small");
        return;
    }

    $("header").removeClass("small");
}

function checkScrollFeatures() {
    var scrollY = $(document).scrollTop();
    var featuresOffsetY = $("section.features").offset().top;
    var featuresHeight = $("section.features").height() + $(window).height();
    var containerWidth = $(window).width() > 1140 ? 1140 : $(window).width();

    if (scrollY > featuresOffsetY && scrollY < (featuresOffsetY + featuresHeight)) {
        $(".fixed-block")
            .addClass("fixed")
            .css({
                left: ($(window).width() / 2) - (containerWidth / 2) + 15,
            });        
        return;
    }

    $(".fixed-block").removeClass("fixed").css({ left: 0 });
}

$(document).ready(init);