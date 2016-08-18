// Closes the sidebar menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Scrolls to the selected menu item on the page
    $(function() {
        $('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
    //#to-top button appears after scrolling
    var fixed = false;
    $(document).scroll(function() {
        if ($(this).scrollTop() > 250) {
            if (!fixed) {
                fixed = true;
                // $('#to-top').css({position:'fixed', display:'block'});
                $('#to-top').show("slow", function() {
                    $('#to-top').css({
                        position: 'fixed',
                        display: 'block'
                    });
                });
            }
        } else {
            if (fixed) {
                fixed = false;
                $('#to-top').hide("slow", function() {
                    $('#to-top').css({
                        display: 'none'
                    });
                });
            }
        }
    });
    // Disable Google Maps scrolling
    // See http://stackoverflow.com/a/25904582/1607849
    // Disable scroll zooming and bind back the click event
    var onMapMouseleaveHandler = function(event) {
        var that = $(this);
        that.on('click', onMapClickHandler);
        that.off('mouseleave', onMapMouseleaveHandler);
        that.find('iframe').css("pointer-events", "none");
    }
    var onMapClickHandler = function(event) {
            var that = $(this);
            // Disable the click handler until the user leaves the map area
            that.off('click', onMapClickHandler);
            // Enable scrolling zoom
            that.find('iframe').css("pointer-events", "auto");
            // Handle the mouse leave event
            that.on('mouseleave', onMapMouseleaveHandler);
        }
        // Enable map zooming with mouse scroll when the user clicks the map
    $('.map').on('click', onMapClickHandler);

    //Service to talk to node server
    //param: toSend represents the JSON object to post to the server
    var serverService = function(a, b, c, d) {
        //data is a single pokemon's data sent from the server
        var success = function(data, status, xhr) {
            //TODO: *figure out what data is received from the server
            //      *populate the page with the pokemon data and paragraph
            var pokeName = data.name;

            //get the pokemon move names from the json
            var moves = {};
            data.moves.forEach(function(move) {
                moves.push(move.move.name);
            });

            var spritesUrl = {
                front: data.sprites.front_default,
                frontShiny: data.sprites.front_shiny,
                back: data.sprites.back_default,
                backShiny: data.sprites.back_shiny,
            }

            var height = data.height;
            var weight = data.weight;

            var types = {};
            //get pokemon types
            data.types.forEach(function(type) {
                types.push(type.type.name);
            });
        }

        var piData = {
            a: a,
            b: b,
            c: c,
            d: d
        }

        //TODO: enter server url here
        var url = "enter here";

        $.post(url, data, success, "json");
    }