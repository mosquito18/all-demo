$(document).ready(function() {
  let startTime = new Date(),
    duration = 0;
  document.addEventListener(
    "visibilitychange",
    function() {
      if (document.visibilityState == "hidden") {
        let endTime = new Date();
        duration = endTime.getTime() - startTime.getTime();
      } else {
        startTime = new Date();
      }
    },
    false
  );
  $(window).bind("beforeunload", function() {
    let endTime = new Date();
    t = endTime.getTime() - startTime.getTime() + duration;
    let hour = Math.floor((t / 1000 / 60 / 60) % 24);
    let min = Math.floor((t / 1000 / 60) % 60);
    let sec = Math.floor((t / 1000) % 60);
    studytime = hour + "小时" + min + "分钟" + sec + "秒";
    let studydate = format(startTime, "yyyy-MM-dd HH:mm:ss");
    console.log(studytime, studydate);
    return "您输入的内容尚未保存，确定离开此页面吗？";
  });
});
