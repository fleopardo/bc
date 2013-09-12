
/** Jquery-tweet-scroll.js */
(function (e) {
        e.fn.twitscroller = function (t) {
            function i(e) {
                return Date.parse(e.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, "$1,$2$4$3"))
            }

            function s(e) {
                var t = i(e);
                var n = arguments.length > 1 ? arguments[1] : new Date;
                var r = parseInt((n.getTime() - t) / 1e3);
                var s = "";
                if (r < 60) {
                    s = r + " segundos"
                } else if (r < 120) {
                    s = "un minuto"
                } else if (r < 45 * 60) {
                    s = parseInt(r / 60, 10).toString() + " minutos"
                } else if (r < 2 * 60 * 60) {
                    s = "una hora"
                } else if (r < 24 * 60 * 60) {
                    s = "" + parseInt(r / 3600, 10).toString() + " horas"
                } else if (r < 48 * 60 * 60) {
                    s = "un dia"
                } else {
                    s = parseInt(r / 86400, 10).toString() + " dias"
                }
                return "hace " + s
            }
            var n = {
                user: null,
                visible: 1,
                speed: 7e3,
                vertical: true,
                easing: "easeOutBounce",
                count: 10
            }, r = e.extend({}, n, t);
            this.each(function () {
                    var t = e(this);
                    t.html("");
                    t.addClass("twitscroller-replace");
                    e.ajax({
                            type: "GET",
                            url: "get-tweets.php",
                            dataType: "json",
                            success: function(t) {

                            e("<ul>").appendTo(".twitscroller-replace");
                            e(t).each(function (t, n) {


                                var i = n.text.replace(/\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/ig, '<a href="$&" target="_top">$&</a>').replace(/@(\w*)\b/ig, '@<a href="http://twitter.com/$1" target="_top">$1</a>').replace(/#(\w*)\b/ig, '<a href="http://twitter.com/search?q=%23$1" target="_top">#$1</a>');
                                var o = s(n.created_at);
                                var u = "http://twitter.com/" + r.user + "/statuses/" + n.id_str;
                                e("<li></li>").html('<span class="title"><a href="' + u + '" target="_blank">' + i + "</a></span></span>").append('<span class="date">' + o + "</span>").appendTo(".twitscroller-replace ul");

                            });

                            /*e(".twitscroller-replace").jCarouselLite({
                                vertical: r.vertical,
                                visible: r.visible,
                                auto: r.speed
                            });*/

                            e(".twitscroller-replace").removeClass("twitscroller-replace");

                            app.scrollCustom();
                        }
                    })
            });
        return this
    }
})(jQuery);