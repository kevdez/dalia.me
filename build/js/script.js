$(function(){function callback(){$(".tile1").click(function(){$(".tile1").removeClass("largeTile",1e3,"easeInOutCubic",callback)})}$(".tile1").click(function(){$(".tile1").addClass("largeTile",1e3,callback)})}),$(function(){function callback(){$(".tile2").click(function(){$(".tile2").removeClass("largeTile",1e3,callback)})}$(".tile2").click(function(){$(".tile2").addClass("largeTile",1e3,callback)})}),$(function(){function callback(){$(".tile3").click(function(){$(".tile3").removeClass("largeTile",700,"easeOutBounce",callback)})}$(".tile3").click(function(){$(".tile3").addClass("largeTile",700,"easeOutBounce",callback)})}),$(function(){$("#draggable").draggable()});