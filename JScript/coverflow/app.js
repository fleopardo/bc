/*

  (Early beta) jQuery UI CoverFlow 2.2 App for jQueryUI 1.8.9 / core 1.6.2
  Copyright Addy Osmani 2011.

  With contributions from Paul Bakhaus, Nicolas Bonnicci

*/
$(function () {

    var coverflowApp = coverflowApp || {};

    coverflowApp = {

        defaultItem: 6,
        //default set item to be centered on
        defaultDuration: 1200,
        //animation duration
        html: $('.wrapperCoverflow').html(),
        imageCaption: $('.wrapperCoverflow #imageCaption'),
        sliderCtrl: $('.wrapper #slider'),
        coverflowCtrl: $('.wrapperCoverflow #coverflow'),
        coverflowImages: $('.wrapperCoverflow #coverflow').find('img'),
        coverflowItems: $('.wrapperCoverflow .coverflowItem'),
        sliderVertical: $(".wrapperCoverflow #slider-vertical"),


        origSliderHeight: '',
        sliderHeight: '',
        sliderMargin: '',
        difference: '',
        proportion: '',
        handleHeight: '',

        listContent: "",


        artist: "",
        album: "",
        sortable: $('#sortable'),
        scrollPane: $('#scroll-pane'),

        setDefault: function () {

            this.defaultItem = this.defaultItem / 2;
            $('.coverflowItem').eq(this.defaultItem).addClass('ui-selected');
        },

        setCaption: function (caption) {

            this.imageCaption.html(caption);
        },

        init_coverflow: function (elem) {

            this.setDefault();
            this.coverflowCtrl.coverflow({
                item: coverflowApp.defaultItem,
                duration: 1200,
                select: function (event, sky) {
                    coverflowApp.skipTo(sky.value);
                }
            });

            //
            this.coverflowImages.each(function (index, value) {
                var current = $(this);
                try {
                    coverflowApp.listContent += "<li class='ui-state-default coverflowItem' data-itemlink='" + (index) + "'>" + current.data('artist') + " - " + current.data('album') + "</li>";
                } catch (e) {}
            });

            //Skip all controls to the current default item
            this.coverflowItems = this.getItems();
            this.sortable.html(this.listContent);
            this.skipTo(this.defaultItem);


            //
            this.init_slider(this.sliderCtrl, 'horizontal');
            //this.init_slider($("#slider-vertical"), 'vertical');
            //change the main div to overflow-hidden as we can use the slider now
            this.scrollPane.css('overflow', 'hidden');

            //calculate the height that the scrollbar handle should be
            this.difference = this.sortable.height() - this.scrollPane.height(); //eg it's 200px longer
            this.proportion = this.difference / this.sortable.height(); //eg 200px/500px
            this.handleHeight = Math.round((5 - this.proportion) * this.scrollPane.height()); //set the proportional height
            ///
            this.setScrollPositions(this.defaultItem);

            //
            this.origSliderHeight = this.sliderVertical.height();
            this.sliderHeight = this.origSliderHeight - this.handleHeight;
            this.sliderMargin = (this.origSliderHeight - this.sliderHeight) * 0.5;

            //
            this.init_mousewheel();
            this.init_keyboard();
            this.sortable.selectable({
                stop: function () {
                    var result = $("#select-result").empty();
                    $(".ui-selected", this).each(function () {
                        var index = $("#sortable li").index(this);
                        coverflowApp.skipTo(index);
                    });
                }
            });


        },

        init_slider: function (elem, direction) {

        	if (direction == 'horizontal') {
                elem.slider({
                    min: 0,
                    max: $('#coverflow > *').length - 1,
                    value: coverflowApp.defaultItem,
                    slide: function (event, ui) {

                        var current = $('#coverflow img');
                        coverflowApp.coverflowCtrl.coverflow('select', ui.value, true);
                        current.removeClass('ui-selected');
                        current.eq(ui.value).addClass('ui-selected');

                        var caption = "";
			            caption += '<a class="nombreProducto" href="carrito-step3-canje-directo.html">' + current.eq(ui.value).attr("data-name") + '</a>';
			            caption += '<span class="puntosProducto">' + current.eq(ui.value).attr("data-puntos") +
			            		    '<a href="#" class="carrito '+current.eq(ui.value).attr("data-en-carrito")+'">'+current.eq(ui.value).attr("data-en-carrito")+'</span>'
			            		   '</a>';

                        coverflowApp.setCaption(caption);
                    }
                })
            } else {
                if (direction == 'vertical') {
                    elem.slider({
                        orientation: direction,
                        range: "max",
                        min: 0,
                        max: 100,
                        value: 0,
                        slide: function (event, ui) {
                            console.log('aaa');
                            var topValue = -((100 - ui.value) * coverflowApp.difference / 100);
                            coverflowApp.sortable.css({
                                top: topValue
                            });
                        }
                    })
                }
            }
        },

        getItems: function () {
            var refreshedItems = $('.wrapperCoverflow .coverflowItem');
            return refreshedItems;
        },

        skipTo: function (itemNumber) {

            var items = $('#coverflow img');
            this.sliderCtrl.slider("option", "value", itemNumber);
            this.coverflowCtrl.coverflow('select', itemNumber, true);
            items.removeClass('ui-selected');
            items.eq(itemNumber).addClass('ui-selected');

            var caption = "";
            caption += '<a class="nombreProducto" href="carrito-step3-canje-directo.html">' + items.eq(itemNumber).attr("data-name") + '</a>';
            caption += '<span class="puntosProducto">' + items.eq(itemNumber).attr("data-puntos") +
            		   		'<a href="#" class="carrito '+items.eq(itemNumber).attr("data-en-carrito")+'">'+items.eq(itemNumber).attr("data-en-carrito")+'</span>'
            		   '</a>';

            this.setCaption(caption);

            //this.setCaption(items.eq(itemNumber).html());

        },

        init_mousewheel: function () {
            $('body').mousewheel(function (event, delta) {

                var speed = 1,
                    sliderVal = coverflowApp.sliderCtrl.slider("value"),
                    coverflowItem = 0,
                    cflowlength = $('#coverflow > *').length - 1,
                    leftValue = 0;

                //check the deltas to find out if the user has scrolled up or down
                if (delta > 0 && sliderVal > 0) {
                    sliderVal -= 1;
                } else {
                    if (delta < 0 && sliderVal < cflowlength) {
                        sliderVal += 1;
                    }
                }

                leftValue = -((100 - sliderVal) * coverflowApp.difference / 100); //calculate the content top from the slider position
                if (leftValue > 0) leftValue = 0; //stop the content scrolling down too much
                if (Math.abs(leftValue) > coverflowApp.difference) leftValue = (-1) * coverflowApp.difference; //stop the content scrolling up beyond point desired
                coverflowItem = Math.floor(sliderVal);
                coverflowApp.skipTo(coverflowItem);

            });
        },

        init_keyboard: function () {
            $(document).keydown(function (e) {
                var current = coverflowApp.sliderCtrl.slider('value');
                if (e.keyCode == 37) {
                    if (current > 0) {
                        current--;
                        coverflowApp.skipTo(current);
                    }
                } else {
                    if (e.keyCode == 39) {
                        if (current < $('#coverflow > *').length - 1) {
                            current++;
                            coverflowApp.skipTo(current);
                        }
                    }
                }


            })
        },

        generateList: function () {
            this.coverflowImages.each(function (index, value) {
                var t = $(this);
                try {
                    listContent += "<li class='ui-state-default coverflowItem' data-itemlink='" + (index) + "'>" + t.data('artist') + " - " + t.data('album') + "</li>";
                } catch (e) {}
            })
        },


        setScrollPositions: function () {
            $('#slider-vertical').slider('value', this.item * 5);
            this.sortable.css('top', -this.item * 5 + -35);
        },

        handleScrollpane: function () {
            this.scrollPane.css('overflow', 'hidden');

            //calculate the height that the scrollbar handle should be
            difference = this.sortable.height() - this.scrollPane.height(); //eg it's 200px longer
            proportion = difference / this.sortable.height(); //eg 200px/500px
            handleHeight = Math.round((1 - proportion) * this.scrollPane.height()); //set the proportional height
        }
    };


    coverflowApp.init_coverflow();



});