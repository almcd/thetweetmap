$(document).ready(function(){function e(e){var t='<a href="http://www.twitter.com/'+e.user+'" target="_blank">'+e.user+"</a>",a=Autolinker.link(e.message,{className:"tweetLink"});if("positive"===e.sentiment){var n="#34af8c";s.positive++,$(".positive-val").text(s.positive)}else if("negative"===e.sentiment){var n="#f33834";s.negative++,$(".negative-val").text(s.negative)}else{var n="#fda63f";s.neutral++,$(".neutral-val").text(s.neutral)}var o=L.mapbox.featureLayer().addTo(i),r=[{type:"Feature",geometry:{type:"Point",coordinates:[e.coordone,e.coordtwo]},properties:{title:t,description:a,sentiment:e.sentiment,"marker-size":"large","marker-color":n}}];o.setGeoJSON(r).addTo(i),$(".user-status").fadeOut("fast")}L.mapbox.accessToken="pk.eyJ1IjoiYWxtY2QiLCJhIjoiTkhyWmpxcyJ9.hQu_1FXmUrLEsc1ElNZLOQ";var t="almcd.7e0f3d40",a=L.latLng(51.2232,-.7251),n=L.latLng(51.7559,.5479),o=L.latLngBounds(a,n),i=L.mapbox.map("map",t,{maxZoom:16,minZoom:10,maxBounds:o}).setView([51.5072,-.1275],12),s={positive:0,negative:0,neutral:0};$(".about-dialog").click(function(){$(".dialog").fadeIn("fast")}),$(".dialog-close img").click(function(){$(".dialog").fadeOut("fast")});var r=(new Date).getFullYear();$(".current-year").html(r);try{var c=io.connect({reconnection:!0,reconnectionDelay:1e3,reconnectionDelayMax:5e3,reconnectionAttempts:60})}catch(l){$(".user-status").html("Error Connecting!"),$(".user-status").fadeIn("slow")}void 0!==c&&(c.on("status",function(t){e(t)}),c.on("disconnect",function(){$(".user-status").html("Disconnected!"),$(".user-status").fadeIn("slow")}),c.on("connect",function(){$(".user-status").fadeIn("fast"),$(".user-status").html('Connected! <br /> Waiting for tweets with geolocation<br /><img src="../img/loader.gif" alt="" />')}))});