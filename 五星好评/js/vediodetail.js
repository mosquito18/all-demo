start_num = 0,
target_num = 0,
startArray = (num) => {
    let imgSrc = "./img/start.png"; //没有填色的星星
    let imgSrc_2 = "./img/start-active.png"; //打分后有颜色的星星,这里的star_full图片时实心的有颜色的五星。
    let imgArray = $(".start-list img");
    for (let j = 0; j < imgArray.length; j++) {
        if (j <= num - 1) {
            imgArray.eq(j).attr("src", imgSrc_2);
        } else {
            imgArray.eq(j).attr("src", imgSrc);
        }
    }
};
$(".start-list img").mouseover(function () {
    target_num = this.dataset.index;
    if (target_num < start_num) {
        startArray(start_num);
    } else {
        startArray(target_num);
    }

});

$(".start-list img").mouseout(function () {
    if (start_num > 0) {
        startArray(start_num);
    } else {
        startArray(0);
    }
});
$(".start-list img").click(function () {
    start_num = this.dataset.index;
    startArray(start_num);
});