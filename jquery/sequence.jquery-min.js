/*
Sequence.js (www.sequencejs.com)
Version: 0.7.3 Beta
Author: Ian Lunn @IanLunn
Author URL: http://www.ianlunn.co.uk/
Github: https://github.com/IanLunn/Sequence

This is a FREE script and is dual licensed under the following:
http://www.opensource.org/licenses/mit-license.php | http://www.gnu.org/licenses/gpl.html

Sequence.js and its dependencies are (c) Ian Lunn Design 2012 unless otherwise stated.
Aside from these comments, you may modify and distribute this file as you please. Have fun!
*/
(function(e) {
    function t(t, n, r, i) {
        function f() {
            s.afterLoaded();
            s.settings.hideFramesUntilPreloaded && s.settings.preloader && s.sequence.children("li").show();
            if (s.settings.preloader)
                if (s.settings.hidePreloaderUsingCSS && s.transitionsSupported) {
                    s.prependPreloadingCompleteTo = s.settings.prependPreloadingComplete == 1 ? s.settings.preloader : e(s.settings.prependPreloadingComplete);
                    s.prependPreloadingCompleteTo.addClass("preloading-complete");
                    setTimeout(g, s.settings.hidePreloaderDelay)
                } else s.settings.preloader.fadeOut(s.settings.hidePreloaderDelay, function() {
                    clearInterval(s.defaultPreloader);
                    g()
                });
            else g()
        }

        function g() {
            function r(e) {
                s.containerLeft = s.container.position().left;
                s.containerRight = s.containerLeft + s.container.width();
                s.containerTop = s.container.position().top;
                s.containerBottom = s.containerTop + s.container.height();
                var t = e.pageX,
                    n = e.pageY;
                if (t >= s.containerLeft && t <= s.containerRight && n >= s.containerTop && n <= s.containerBottom) {
                    s.settings.autoPlay = !1;
                    clearTimeout(s.sequenceTimer);
                    s.settings.pauseIcon !== undefined && s.settings.pauseIcon.show();
                    s.settings.pauseButton !== undefined && s.settings.pauseButton.addClass("paused");
                    s.paused();
                    s.sequence.unbind("mousemove")
                }
            }
            e(s.settings.preloader).remove();
            s.settings.nextButton = s.init.uiElements(s.settings.nextButton, ".next");
            s.settings.prevButton = s.init.uiElements(s.settings.prevButton, ".prev");
            s.settings.pauseButton = s.init.uiElements(s.settings.pauseButton, ".pause");
            s.settings.nextButton !== undefined && s.settings.nextButton !== !1 && s.settings.showNextButtonOnInit && s.settings.nextButton.show();
            s.settings.prevButton !== undefined && s.settings.prevButton !== !1 && s.settings.showPrevButtonOnInit && s.settings.prevButton.show();
            s.settings.pauseButton !== undefined && s.settings.pauseButton !== !1 && s.settings.pauseButton.show();
            if (s.settings.pauseIcon !== !1) {
                s.settings.pauseIcon = s.init.uiElements(s.settings.pauseIcon, ".pause-icon");
                s.settings.pauseIcon !== undefined && s.settings.pauseIcon.hide()
            } else s.settings.pauseIcon = undefined;
            s.hasTouch && (s.settings.calculatedSwipeThreshold = s.container.width() * (s.settings.swipeThreshold / 100));
            s.nextFrameID = s.settings.startingFrameID;
            s.nextFrame = s.sequence.children("li:nth-child(" + s.nextFrameID + ")");
            if (s.settings.hashTags) {
                s.sequence.children("li").each(function() {
                    s.frameHashID.push(e(this).attr(s.getHashTagFrom))
                });
                s.currentHashTag = location.hash.replace("#", "");
                if (s.currentHashTag === undefined || s.currentHashTag === "") s.nextFrameID = s.settings.startingFrameID;
                else {
                    s.frameHashIndex = e.inArray(s.currentHashTag, s.frameHashID);
                    s.frameHashIndex !== -1 ? s.nextFrameID = s.frameHashIndex + 1 : s.nextFrameID = s.settings.startingFrameID
                }
            }
            s.nextFrame = s.sequence.children("li:nth-child(" + s.nextFrameID + ")");
            s.nextFrameChildren = s.nextFrame.children();
            s.direction;
            s.sequence.css({
                width: "100%",
                height: "100%",
                position: "relative"
            });
            s.sequence.children("li").css({
                width: "100%",
                height: "100%",
                position: "absolute"
            });
            if (s.transitionsSupported)
                if (!s.settings.animateStartingFrameIn) {
                    s.currentFrame = s.nextFrame.addClass("current-frame");
                    s.settings.moveActiveFrameToTop && s.currentFrame.css("z-index", s.numberOfFrames);
                    s.currentFrameChildren = s.currentFrame.children();
                    s.currentFrameID = s.nextFrameID;
                    s.modifyElements(s.currentFrameChildren, "0s");
                    s.currentFrameChildren.addClass("animate-in");
                    if (s.settings.hashChangesOnFirstFrame) {
                        s.currentHashTag = s.currentFrame.attr(s.getHashTagFrom);
                        document.location.hash = "#" + s.currentHashTag
                    }
                    setTimeout(function() {
                        s.modifyElements(s.currentFrameChildren, "")
                    }, 100);
                    if (s.settings.autoPlay) {
                        var t = function() {
                            s.autoPlaySequence()
                        };
                        clearTimeout(s.sequenceTimer);
                        s.sequenceTimer = setTimeout(t, s.settings.autoPlayDelay, s)
                    }
                } else if (s.settings.reverseAnimationsWhenNavigatingBackwards && s.settings.autoPlayDirection - 1 && s.settings.animateStartingFrameIn) {
                s.modifyElements(s.nextFrameChildren, "0s");
                s.nextFrameChildren.addClass("animate-out");
                s.goTo(s.nextFrameID, -1)
            } else s.goTo(s.nextFrameID, 1);
            else {
                s.container.addClass("sequence-fallback");
                s.currentFrame = s.nextFrame;
                s.currentFrame.addClass("current-frame");
                s.beforeNextFrameAnimatesIn();
                s.afterNextFrameAnimatesIn();
                if (s.settings.hashChangesOnFirstFrame) {
                    s.currentHashTag = s.currentFrame.attr(s.getHashTagFrom);
                    document.location.hash = "#" + s.currentHashTag
                }
                s.currentFrameChildren = s.currentFrame.children();
                s.currentFrameID = s.nextFrameID;
                s.sequence.children("li").children().addClass("animate-in");
                s.sequence.children(":not(li:nth-child(" + s.nextFrameID + "))").css({
                    display: "none",
                    opacity: 0
                });
                if (s.settings.autoPlay) {
                    var t = function() {
                        s.autoPlaySequence()
                    };
                    clearTimeout(s.sequenceTimer);
                    s.sequenceTimer = setTimeout(t, s.settings.autoPlayDelay, s)
                }
            }
            s.settings.nextButton !== undefined && s.settings.nextButton.click(function() {
                s.next()
            });
            s.settings.prevButton !== undefined && s.settings.prevButton.click(function() {
                s.prev()
            });
            s.settings.pauseButton !== undefined && s.settings.pauseButton.click(function() {
                s.pause()
            });
            if (s.settings.keyNavigation) {
                var n = {
                    left: 37,
                    right: 39
                };
                e(document).keydown(function(e) {
                    function t(e, t) {
                        var r;
                        for (keyCodes in t) {
                            keyCodes === "left" || keyCodes === "right" ? r = n[keyCodes] : r = keyCodes;
                            e === r && s.initCustomKeyEvent(t[keyCodes])
                        }
                    }
                    var r = parseFloat(String.fromCharCode(e.keyCode));
                    if (r > 0 && r <= s.numberOfFrames && s.settings.numericKeysGoToFrames) {
                        s.nextFrameID = r;
                        s.goTo(r)
                    }
                    t(e.keyCode, s.settings.keyEvents);
                    t(e.keyCode, s.settings.customKeyEvents)
                })
            }
            if (s.settings.pauseOnHover && !s.settings.pauseOnElementsOutsideContainer && s.settings.autoPlay) {
                s.hoverEvent = s.sequence.mousemove(function(e) {
                    r(e)
                });
                s.sequence.mouseleave(function(e) {
                    s.settings.autoPlay = !0;
                    var t = function() {
                        s.autoPlaySequence()
                    };
                    clearTimeout(s.sequenceTimer);
                    s.sequenceTimer = setTimeout(t, s.settings.autoPlayDelay, s);
                    s.settings.pauseIcon !== undefined && s.settings.pauseIcon.hide();
                    s.settings.pauseButton !== undefined && s.settings.pauseButton.removeClass("paused");
                    s.unpaused();
                    s.sequence.data("events").mousemove === undefined && s.sequence.mousemove(function(e) {
                        r(e)
                    })
                })
            } else s.settings.pauseOnHover && s.settings.autoPlay && (s.hoverEvent = s.sequence.hover(function(e) {
                s.settings.autoPlay = !1;
                clearTimeout(s.sequenceTimer);
                s.settings.pauseIcon !== undefined && s.settings.pauseIcon.show();
                s.settings.pauseButton !== undefined && s.settings.pauseButton.addClass("paused");
                s.paused()
            }, function() {
                s.settings.autoPlay = !0;
                var e = function() {
                    s.autoPlaySequence()
                };
                clearTimeout(s.sequenceTimer);
                s.sequenceTimer = setTimeout(e, s.settings.autoPlayDelay, s);
                s.settings.pauseIcon !== undefined && s.settings.pauseIcon.hide();
                s.settings.pauseButton !== undefined && s.settings.pauseButton.removeClass("paused");
                s.unpaused()
            }));
            s.settings.hashTags && e(window).hashchange(function() {
                newTag = location.hash.replace("#", "");
                if (s.currentHashTag !== newTag) {
                    s.currentHashTag = newTag;
                    s.frameHashIndex = e.inArray(s.currentHashTag, s.frameHashID);
                    if (s.frameHashIndex !== -1) {
                        s.nextFrameID = s.frameHashIndex + 1;
                        s.goTo(s.nextFrameID)
                    }
                }
            });
            if (s.settings.swipeNavigation && s.hasTouch) {
                var i = {
                    touchstartX: -1,
                    touchstartY: -1,
                    touchmoveX: -1,
                    touchmoveY: -1
                };
                s.sequence.on("touchstart touchmove touchend", function(e) {
                    s.settings.swipePreventsDefault && e.preventDefault();
                    switch (e.originalEvent.type) {
                        case "touchmove":
                        case "touchstart":
                            i[e.originalEvent.type + "X"] = e.originalEvent.touches[0].pageX;
                            i[e.originalEvent.type + "Y"] = e.originalEvent.touches[0].pageY;
                            break;
                        case "touchend":
                            if (i.touchmoveX !== -1) {
                                var t = i.touchmoveX - i.touchstartX,
                                    n = i.touchmoveY - i.touchstartY;
                                Math.abs(t) > Math.abs(n) && t > s.settings.calculatedSwipeThreshold ? s.initCustomKeyEvent(s.settings.swipeEvents.right) : Math.abs(t) > Math.abs(n) && Math.abs(t) > s.settings.calculatedSwipeThreshold ? s.initCustomKeyEvent(s.settings.swipeEvents.left) : Math.abs(n) > Math.abs(t) && n > s.settings.calculatedSwipeThreshold ? s.initCustomKeyEvent(s.settings.swipeEvents.down) : Math.abs(n) > Math.abs(t) && Math.abs(n) > s.settings.calculatedSwipeThreshold && s.initCustomKeyEvent(s.settings.swipeEvents.up);
                                i = {
                                    touchstartX: -1,
                                    touchstartY: -1,
                                    touchmoveX: -1,
                                    touchmoveY: -1
                                }
                            }
                            break;
                        default:
                    }
                })
            }
            e(window).resize(function() {
                s.settings.calculatedSwipeThreshold = s.container.width() * (s.settings.swipeThreshold / 100)
            })
        }
        var s = this;
        s.container = e(t), s.sequence = s.container.children("ul");
        try {
            Modernizr.prefixed;
            if (Modernizr.prefixed === undefined) throw "undefined"
        } catch (o) {
            i.modernizr()
        }
        var u = {
                WebkitTransition: "-webkit-",
                MozTransition: "-moz-",
                OTransition: "-o-",
                msTransition: "-ms-",
                transition: ""
            },
            a = {
                WebkitTransition: "webkitTransitionEnd webkitAnimationEnd",
                MozTransition: "transitionend animationend",
                OTransition: "oTransitionEnd oAnimationEnd otransitionend oanimationend",
                msTransition: "MSTransitionEnd MSAnimationEnd",
                transition: "transitionend animationend"
            };
        s.prefix = u[Modernizr.prefixed("transition")], s.transitionEnd = a[Modernizr.prefixed("transition")], s.transitionProperties = {}, s.numberOfFrames = s.sequence.children("li").length, s.transitionsSupported = s.prefix !== undefined ? !0 : !1, s.hasTouch = "ontouchstart" in window ? !0 : !1, s.sequenceTimer, s.isPaused = !1, s.hoverEvent, s.defaultPreloader, s.init = {
            preloader: function(t) {
                s.prependTo = s.settings.prependPreloader == 1 ? s.container : s.settings.prependPreloader;
                switch (t) {
                    case !0:
                    case undefined:
                        i.defaultPreloader(s.prependTo, s.transitionsSupported, s.prefix);
                        s.transitionsSupported || s.preloaderFallback();
                        return e(".sequence-preloader");
                    case !1:
                        break;
                    default:
                        this.CSSSelectorToHTML(t);
                        return e(t)
                }
            },
            uiElements: function(t, n) {
                switch (t) {
                    case !1:
                        return undefined;
                    case !0:
                        n === ".sequence-preloader" && i.defaultPreloader(s.container, s.transitionsSupported, s.prefix);
                        return e(n);
                    default:
                        return e(t)
                }
            }
        };
        s.paused = function() {}, s.unpaused = function() {}, s.beforeNextFrameAnimatesIn = function() {}, s.afterNextFrameAnimatesIn = function() {}, s.beforeCurrentFrameAnimatesOut = function() {}, s.afterCurrentFrameAnimatesOut = function() {}, s.beforeFirstFrameAnimatesIn = function() {}, s.afterFirstFrameAnimatesIn = function() {}, s.beforeLastFrameAnimatesIn = function() {}, s.afterLastFrameAnimatesIn = function() {}, s.afterLoaded = function() {};
        s.settings = e.extend({}, r, n), s.settings.preloader = s.init.uiElements(s.settings.preloader, ".sequence-preloader");
        s.firstFrame = s.settings.animateStartingFrameIn ? !0 : !1;
        s.currentHashTag;
        s.getHashTagFrom = s.settings.hashDataAttribute ? "data-sequence-hashtag" : "id";
        s.frameHashID = [];
        s.settings.hideFramesUntilPreloaded && s.settings.preloader && s.sequence.children("li").hide();
        s.prefix === "-o-" && (s.transitionsSupported = i.operaTest());
        s.modifyElements(s.sequence.children("li").children(), "0s");
        s.sequence.children("li").children().removeClass("animate-in");
        var l = s.settings.preloadTheseFrames.length,
            c = s.settings.preloadTheseImages.length;
        if (!s.settings.preloader || l === 0 && c === 0) e(window).bind("load", function() {
            f();
            e(this).unbind("load")
        });
        else {
            function h(t, n) {
                var r = [];
                if (!n)
                    for (var i = t; i > 0; i--) s.sequence.children("li:nth-child(" + s.settings.preloadTheseFrames[i - 1] + ")").find("img").each(function() {
                        r.push(e(this)[0])
                    });
                else
                    for (var i = t; i > 0; i--) r.push(e("body").find('img[src="' + s.settings.preloadTheseImages[i - 1] + '"]')[0]);
                return r
            }
            var p = h(l),
                d = h(c, !0),
                v = e(p.concat(d)),
                m = v.length;
            v.length ? v.bind("load", function() {
                --m <= 0 && f()
            }).each(function() {
                if (this.complete || this.complete === undefined) {
                    var e = this.src;
                    this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                    this.src = e
                }
            }) : f()
        }
    }
    t.prototype = {
        preloaderFallback: function() {
            function r() {
                n = n === 1 ? 0 : 1;
                e(".sequence-preloader img:nth-child(1)").animate({
                    opacity: n
                }, 10);
                e(".sequence-preloader img:nth-child(2)").animate({
                    opacity: n
                }, 35);
                e(".sequence-preloader img:nth-child(3)").animate({
                    opacity: n
                }, 60)
            }
            var t = this,
                n = 0;
            r();
            t.defaultPreloader = setInterval(function() {
                r()
            }, 60)
        },
        initCustomKeyEvent: function(e) {
            var t = this;
            switch (e) {
                case "next":
                    t.next();
                    break;
                case "prev":
                    t.prev();
                    break;
                case "pause":
                    t.pause()
            }
        },
        autoPlaySequence: function(e) {
            var t = this;
            t.settings.autoPlayDirection === 1 ? t.next() : t.prev()
        },
        modifyElements: function(e, t) {
            var n = this;
            e.css(n.prefixCSS(n.prefix, {
                "transition-duration": t,
                "transition-delay": t
            }))
        },
        prefixCSS: function(e, t) {
            var n = {};
            for (property in t) n[e + property] = t[property];
            return n
        },
        setTransitionProperties: function(t) {
            var n = this;
            n.modifyElements(n.frameChildren, "");
            n.frameChildren.each(function() {
                n.transitionProperties["transition-duration"] = e(this).css(n.prefix + "transition-duration");
                n.transitionProperties["transition-delay"] = e(this).css(n.prefix + "transition-delay");
                e(this).css(n.prefixCSS(n.prefix, n.transitionProperties))
            })
        },
        pause: function() {
            var e = this;
            if (e.settings.autoPlay) {
                if (e.settings.pauseButton !== undefined) {
                    e.settings.pauseButton.addClass("paused");
                    e.settings.pauseIcon !== undefined && e.settings.pauseIcon.show()
                }
                e.paused();
                e.stopAutoPlay()
            } else {
                if (e.settings.pauseButton !== undefined) {
                    e.settings.pauseButton.removeClass("paused");
                    e.settings.pauseIcon !== undefined && e.settings.pauseIcon.hide()
                }
                e.unpaused();
                e.startAutoPlay(e.settings.unpauseDelay)
            }
        },
        startAutoPlay: function(e, t) {
            var n = this;
            e = e === undefined ? 0 : e;
            n.settings.autoPlayDelay = t === undefined ? n.settings.autoPlayDelay : t;
            n.settings.autoPlay = !0;
            var r = function() {
                n.autoPlaySequence()
            };
            clearTimeout(n.sequenceTimer);
            n.sequenceTimer = setTimeout(r, e, n);
            n.settings.pauseOnHover && (n.hoverEvent = n.sequence.hover(function() {
                n.settings.autoPlay = !1;
                clearTimeout(n.sequenceTimer);
                n.settings.pauseIcon !== undefined && n.settings.pauseIcon.show();
                n.settings.pauseButton !== undefined && n.settings.pauseButton.addClass("paused");
                n.paused()
            }, function() {
                n.settings.autoPlay = !0;
                var e = function() {
                    n.autoPlaySequence()
                };
                clearTimeout(n.sequenceTimer);
                n.sequenceTimer = setTimeout(e, n.settings.autoPlayDelay, n);
                n.settings.pauseIcon !== undefined && n.settings.pauseIcon.hide();
                n.settings.pauseButton !== undefined && n.settings.pauseButton.removeClass("paused");
                n.unpaused()
            }))
        },
        stopAutoPlay: function() {
            var e = this;
            e.settings.autoPlay = !1;
            clearTimeout(e.sequenceTimer);
            e.hoverEvent !== undefined && e.hoverEvent.unbind()
        },
        next: function() {
            var e = this;
            if (!e.active)
                if (e.settings.cycle || !e.settings.cycle && e.currentFrameID !== e.numberOfFrames) {
                    if (e.isPaused) {
                        e.isPaused = !1;
                        e.startAutoPlay()
                    }
                    e.nextFrameID = e.currentFrameID !== e.numberOfFrames ? e.currentFrameID + 1 : 1;
                    e.goTo(e.nextFrameID, 1)
                } else if (e.settings.autoPlayDirection === 1) {
                e.isPaused = !0;
                e.stopAutoPlay()
            }
        },
        prev: function() {
            var e = this;
            if (!e.active)
                if (e.settings.cycle || !e.settings.cycle && e.currentFrameID !== 1) {
                    if (e.isPaused) {
                        e.isPaused = !1;
                        e.startAutoPlay()
                    }
                    e.nextFrameID = e.currentFrameID === 1 ? e.numberOfFrames : e.currentFrameID - 1;
                    e.goTo(e.nextFrameID, -1)
                } else if (e.settings.autoPlayDirection === -1) {
                e.isPaused = !0;
                e.stopAutoPlay()
            }
        },
        goTo: function(t, n) {
            var r = this;
            t === r.numberOfFrames ? r.beforeLastFrameAnimatesIn() : t === 1 && r.beforeFirstFrameAnimatesIn();
            if (r.currentFrame !== undefined && t === r.currentFrame.index() + 1) return !1;
            if (!r.active) {
                r.active = !0;
                r.currentFrame = r.sequence.children(".current-frame");
                r.nextFrame = r.sequence.children("li:nth-child(" + t + ")");
                n === undefined ? r.direction = t > r.currentFrameID ? 1 : -1 : r.direction = n;
                r.frameChildren = r.currentFrame.children();
                r.nextFrameChildren = r.nextFrame.children();
                if (r.transitionsSupported) {
                    if (r.currentFrame.length !== 0) {
                        r.beforeCurrentFrameAnimatesOut();
                        r.animateOut(r.direction)
                    }
                    var i = function() {
                        r.animateIn(r.direction);
                        r.currentFrameID = t
                    };
                    if (!r.firstFrame) switch (r.settings.transitionThreshold) {
                        case !0:
                            r.waitForAnimationsToComplete(r.currentFrame, r.frameChildren, "out");
                            break;
                        case !1:
                            i();
                            break;
                        default:
                            setTimeout(i, r.settings.transitionThreshold)
                    } else i()
                } else switch (r.settings.fallback.theme) {
                    case "slide":
                        var s = {},
                            i = {},
                            o = {};
                        if (r.direction === 1) {
                            s.left = "-100%";
                            i.left = "100%"
                        } else {
                            s.left = "100%";
                            i.left = "-100%"
                        }
                        o.left = "0%";
                        o.opacity = 1;
                        r.beforeCurrentFrameAnimatesOut();
                        r.currentFrame.removeClass("current-frame").animate(s, r.settings.fallback.speed, function() {});
                        r.beforeNextFrameAnimatesIn();
                        r.nextFrame.addClass("current-frame").show().css(i).animate(o, r.settings.fallback.speed, function() {
                            r.currentFrame = r.nextFrame;
                            if (r.settings.hashTags) {
                                r.currentHashTag = r.currentFrame.attr(r.getHashTagFrom);
                                r.frameHashIndex = e.inArray(r.currentHashTag, r.frameHashID);
                                if (r.frameHashIndex !== -1) {
                                    r.nextFrameID = r.frameHashIndex + 1;
                                    document.location.hash = "#" + r.currentHashTag
                                } else r.nextFrameID = r.settings.startingFrameID
                            }
                            r.currentFrameID = r.currentFrame.index() + 1;
                            r.active = !1;
                            r.afterNextFrameAnimatesIn();
                            if (r.settings.autoPlay) {
                                var t = function() {
                                    r.autoPlaySequence()
                                };
                                clearTimeout(r.sequenceTimer);
                                r.sequenceTimer = setTimeout(t, r.settings.autoPlayDelay, r)
                            }
                        });
                        break;
                    case "fade":
                    default:
                        r.sequence.children("li").css({
                            position: "relative"
                        });
                        r.beforeCurrentFrameAnimatesOut();
                        r.currentFrame.animate({
                            opacity: 0
                        }, r.settings.fallback.speed, function() {
                            r.currentFrame.css({
                                display: "none",
                                "z-index": "1"
                            });
                            r.currentFrame.removeClass("current-frame");
                            r.beforeNextFrameAnimatesIn();
                            r.nextFrame.addClass("current-frame").css({
                                display: "block",
                                "z-index": r.numberOfFrames
                            }).animate({
                                opacity: 1
                            }, 50, function() {
                                r.afterNextFrameAnimatesIn()
                            });
                            r.currentFrame = r.nextFrame;
                            r.currentFrameID = r.currentFrame.index() + 1;
                            r.active = !1;
                            if (r.settings.autoPlay) {
                                var e = function() {
                                    r.autoPlaySequence()
                                };
                                clearTimeout(r.sequenceTimer);
                                r.sequenceTimer = setTimeout(e, r.settings.autoPlayDelay, r)
                            }
                        });
                        r.sequence.children("li").css({
                            position: "relative"
                        })
                }
            }
        },
        animateOut: function(e) {
            var t = this;
            t.settings.moveActiveFrameToTop && t.currentFrame.css("z-index", 1);
            t.currentFrame.removeClass("current-frame");
            t.nextFrame.addClass("next-frame");
            if (!t.settings.reverseAnimationsWhenNavigatingBackwards || e === 1) {
                t.modifyElements(t.nextFrameChildren, "0s");
                t.nextFrameChildren.removeClass("animate-out");
                t.modifyElements(t.frameChildren, "");
                t.frameChildren.addClass("animate-out").removeClass("animate-in")
            }
            if (t.settings.reverseAnimationsWhenNavigatingBackwards && e === -1) {
                t.modifyElements(t.nextFrameChildren, "0s");
                t.nextFrameChildren.addClass("animate-out");
                t.setTransitionProperties(t.frameChildren);
                t.frameChildren.removeClass("animate-in")
            }
            t.settings.transitionThreshold && t.waitForAnimationsToComplete(t.currentFrame, t.currentFrame.children(), "out", !0)
        },
        animateIn: function(e) {
            var t = this;
            t.active = !0;
            t.currentFrame.unbind(t.transitionEnd);
            t.currentFrame = t.nextFrame;
            e === 1 ? t.currentFrameID = t.currentFrameID !== t.numberOfFrames ? t.currentFrameID + 1 : 1 : t.currentFrameID = t.currentFrameID !== 1 ? t.currentFrameID - 1 : t.numberOfFrames;
            t.nextFrameChildren = t.nextFrame.children();
            t.frameChildren = t.currentFrame.children();
            t.beforeNextFrameAnimatesIn();
            t.settings.moveActiveFrameToTop && t.nextFrame.css({
                "z-index": t.numberOfFrames
            });
            !t.settings.reverseAnimationsWhenNavigatingBackwards || e === 1 ? setTimeout(function() {
                t.modifyElements(t.frameChildren, "");
                t.frameChildren.addClass("animate-in");
                t.waitForAnimationsToComplete(t.nextFrame, t.nextFrameChildren, "in");
                t.settings.transitionThreshold !== !0 && t.afterCurrentFrameAnimatesOut != "function () {}" && t.waitForAnimationsToComplete(t.currentFrame, t.currentFrame.children(), "out")
            }, 5) : t.settings.reverseAnimationsWhenNavigatingBackwards && e === -1 && setTimeout(function() {
                t.setTransitionProperties(t.frameChildren);
                t.frameChildren.addClass("animate-in").removeClass("animate-out");
                t.waitForAnimationsToComplete(t.nextFrame, t.nextFrameChildren, "in");
                t.settings.transitionThreshold !== !0 && t.afterCurrentFrameAnimatesOut != "function () {}" && t.waitForAnimationsToComplete(t.currentFrame, t.currentFrame.children(), "out")
            }, 5)
        },
        waitForAnimationsToComplete: function(t, n, r, i) {
            var s = this;
            if (r === "out") var o = function() {
                s.active = !1;
                t.unbind(s.transitionEnd);
                s.afterCurrentFrameAnimatesOut();
                i && s.animateIn(s.direction)
            };
            else if (r === "in") var o = function() {
                t.unbind(s.transitionEnd);
                s.afterNextFrameAnimatesIn();
                if (s.settings.hashTags) {
                    s.currentHashTag = s.currentFrame.attr(s.getHashTagFrom);
                    s.frameHashIndex = e.inArray(s.currentHashTag, s.frameHashID);
                    if (s.frameHashIndex !== -1 && (s.settings.hashChangesOnFirstFrame || !s.firstFrame)) {
                        s.nextFrameID = s.frameHashIndex + 1;
                        document.location.hash = "#" + s.currentHashTag
                    } else {
                        s.nextFrameID = s.settings.startingFrameID;
                        s.firstFrame = !1
                    }
                }
                s.currentFrameID === s.numberOfFrames ? s.afterLastFrameAnimatesIn() : s.currentFrameID === 1 && s.afterFirstFrameAnimatesIn();
                s.nextFrame.removeClass("next-frame").addClass("current-frame");
                s.active = !1;
                if (s.settings.autoPlay) {
                    var n = function() {
                        s.autoPlaySequence()
                    };
                    clearTimeout(s.sequenceTimer);
                    s.sequenceTimer = setTimeout(n, s.settings.autoPlayDelay, s)
                }
            };
            n.each(function() {
                e(this).data("animationEnded", !1)
            });
            s.currentFrame.bind(s.transitionEnd, function(t) {
                e(t.target).data("animationEnded", !0);
                var r = !0;
                n.each(function() {
                    e(this).data("animationEnded") === !1 && (r = !1)
                });
                r && o()
            })
        }
    };
    e.fn.sequence = function(i) {
        var s = this;
        return s.each(function() {
            var s = new t(e(this), i, r, n);
            e(this).data("sequence", s)
        })
    };
    var n = {
            modernizr: function() {
                window.Modernizr = function(e, t, n) {
                    function r(e) {
                        v.cssText = e
                    }

                    function i(e, t) {
                        return r(prefixes.join(e + ";") + (t || ""))
                    }

                    function s(e, t) {
                        return typeof e === t
                    }

                    function o(e, t) {
                        return !!~("" + e).indexOf(t)
                    }

                    function u(e, t) {
                        for (var r in e) {
                            var i = e[r];
                            if (!o(i, "-") && v[i] !== n) return t == "pfx" ? i : !0
                        }
                        return !1
                    }

                    function a(e, t, r) {
                        for (var i in e) {
                            var o = t[e[i]];
                            if (o !== n) return r === !1 ? e[i] : s(o, "function") ? o.bind(r || t) : o
                        }
                        return !1
                    }

                    function f(e, t, n) {
                        var r = e.charAt(0).toUpperCase() + e.slice(1),
                            i = (e + " " + b.join(r + " ") + r).split(" ");
                        return s(t, "string") || s(t, "undefined") ? u(i, t) : (i = (e + " " + w.join(r + " ") + r).split(" "), a(i, t, n))
                    }
                    var l = "2.6.1",
                        c = {},
                        h = t.documentElement,
                        p = "modernizr",
                        d = t.createElement(p),
                        v = d.style,
                        m, g = {}.toString,
                        y = "Webkit Moz O ms",
                        b = y.split(" "),
                        w = y.toLowerCase().split(" "),
                        E = {
                            svg: "http://www.w3.org/2000/svg"
                        },
                        S = {},
                        x = {},
                        T = {},
                        N = [],
                        C = N.slice,
                        k, L = {}.hasOwnProperty,
                        A;
                    !s(L, "undefined") && !s(L.call, "undefined") ? A = function(e, t) {
                        return L.call(e, t)
                    } : A = function(e, t) {
                        return t in e && s(e.constructor.prototype[t], "undefined")
                    }, Function.prototype.bind || (Function.prototype.bind = function(e) {
                        var t = self;
                        if (typeof t != "function") throw new TypeError;
                        var n = C.call(arguments, 1),
                            r = function() {
                                if (self instanceof r) {
                                    var i = function() {};
                                    i.prototype = t.prototype;
                                    var s = new i,
                                        o = t.apply(s, n.concat(C.call(arguments)));
                                    return Object(o) === o ? o : s
                                }
                                return t.apply(e, n.concat(C.call(arguments)))
                            };
                        return r
                    }), S.svg = function() {
                        return !!t.createElementNS && !!t.createElementNS(E.svg, "svg").createSVGRect
                    };
                    for (var O in S) A(S, O) && (k = O.toLowerCase(), c[k] = S[O](), N.push((c[k] ? "" : "no-") + k));
                    return c.addTest = function(e, t) {
                        if (typeof e == "object")
                            for (var r in e) A(e, r) && c.addTest(r, e[r]);
                        else {
                            e = e.toLowerCase();
                            if (c[e] !== n) return c;
                            t = typeof t == "function" ? t() : t, enableClasses && (h.className += " " + (t ? "" : "no-") + e), c[e] = t
                        }
                        return c
                    }, r(""), d = m = null, c._version = l, c._domPrefixes = w, c._cssomPrefixes = b, c.testProp = function(e) {
                        return u([e])
                    }, c.testAllProps = f, c.prefixed = function(e, t, n) {
                        return t ? f(e, t, n) : f(e, "pfx")
                    }, c
                }(self, self.document)
            },
            defaultPreloader: function(t, n, r) {
                var i = '<div class="sequence-preloader"><svg class="preloading" xmlns="http://www.w3.org/2000/svg"><circle class="circle" cx="6" cy="6" r="6" /><circle class="circle" cx="22" cy="6" r="6" /><circle class="circle" cx="38" cy="6" r="6" /></svg></div>';
                e("head").append("<style>.sequence-preloader{height: 100%;position: absolute;width: 100%;z-index: 999999;}@" + r + "keyframes preload{0%{opacity: 1;}50%{opacity: 0;}100%{opacity: 1;}}.sequence-preloader .preloading .circle{fill: #ff9442;display: inline-block;height: 12px;position: relative;top: -50%;width: 12px;" + r + "animation: preload 1s infinite; animation: preload 1s infinite;}.preloading{display:block;height: 12px;margin: 0 auto;top: 50%;margin-top:-6px;position: relative;width: 48px;}.sequence-preloader .preloading .circle:nth-child(2){" + r + "animation-delay: .15s; animation-delay: .15s;}.sequence-preloader .preloading .circle:nth-child(3){" + r + "animation-delay: .3s; animation-delay: .3s;}.preloading-complete{opacity: 0;visibility: hidden;" + r + "transition-duration: 1s; transition-duration: 1s;}div.inline{background-color: #ff9442; margin-right: 4px; float: left;}</style>");
                t.prepend(i);
                if (!Modernizr.svg && !n) {
                    e(".sequence-preloader").prepend('<div class="preloading"><div class="circle inline"></div><div class="circle inline"></div><div class="circle inline"></div></div>');
                    setInterval(function() {
                        e(".sequence-preloader .circle").fadeToggle(50)
                    }, 50)
                } else n || setInterval(function() {
                    e(".sequence-preloader").fadeToggle(50)
                }, 50)
            },
            operaTest: function() {
                e("body").append('<span id="sequence-opera-test"></span>');
                var t = e("#sequence-opera-test");
                t.css("-o-transition", "1s");
                return t.css("-o-transition") != "1s" ? !1 : !0
            }
        },
        r = {
            startingFrameID: 1,
            cycle: !0,
            animateStartingFrameIn: !1,
            transitionThreshold: 1e3,
            reverseAnimationsWhenNavigatingBackwards: !0,
            moveActiveFrameToTop: !0,
            autoPlay: !0,
            autoPlayDirection: 1,
            autoPlayDelay: 5e3,
            nextButton: !1,
            showNextButtonOnInit: !0,
            prevButton: !1,
            showPrevButtonOnInit: !0,
            pauseButton: !1,
            unpauseDelay: 0,
            pauseOnHover: !0,
            pauseIcon: !1,
            pauseOnElementsOutsideContainer: !1,
            preloader: !0,
            preloadTheseFrames: [1],
            preloadTheseImages: [],
            hideFramesUntilPreloaded: !0,
            prependPreloadingComplete: !0,
            hidePreloaderUsingCSS: !0,
            hidePreloaderDelay: 0,
            keyNavigation: !0,
            numericKeysGoToFrames: !0,
            keyEvents: {
                left: "prev",
                right: "next"
            },
            customKeyEvents: {},
            swipeNavigation: !0,
            swipeThreshold: 15,
            swipePreventsDefault: !1,
            swipeEvents: {
                left: "prev",
                right: "next",
                up: !1,
                down: !1
            },
            hashTags: !1,
            hashDataAttribute: !1,
            hashChangesOnFirstFrame: !1,
            fallback: {
                theme: "slide",
                speed: 50
            }
        }
})(jQuery);