$('body').mousemove(function(p){
    let rotateX = -($(window).innerWidth()/2-p.pageX)/10;
    let rotateY = -($(window).innerHeight()/2-p.pageX)/10;
    $('.card').css("transform", "rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)");
});
$(document).mouseout(function(){
    $('.card').css("transform", "");
});