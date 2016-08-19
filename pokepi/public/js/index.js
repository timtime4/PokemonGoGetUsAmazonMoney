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
                    //TODO - unhide the bottom pages
                    setTimeout(function() {
                        $("#pokeButton").html("Calculating...")
                    }, 500);
                    setTimeout(function() {
                        $('.pokemonInfo').css('display', 'block');
                        $('html,body').animate({
                        scrollTop: target.offset().top
                            }, 1000);
                        $("#pokeButton").html("Find Your Pokemon")
                        return false;
                    }, 4000); 
                     
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

    var findPokemon = function() {
        var a = $('#slider1').val();
        var b = $('#slider2').val();
        var c = $('#slider3').val();
        var d = $('#slider4').val();

        serverService(a, b, c, d);
        return true;
    };
    var pickColor = function(t) {
        var type = t || "normal";
        var color = "";
        switch(type) {
            case "fire":
                color = "B22222";
                break;
            case "grass":
                color = "228b22";
                break;
            case "water":
                color = "1E90FF";
                break;
            case "electric":
                color = "E6c300";
                break;
            case "poison":
                color = "8a2be2";
                break;
            case "bug":
                color = "c3df41";
                break;
            case "dark":
                color = "2d1606";
                break;
            case "ghost":
                color = "4e3cc3";
                break;
            case "normal":
                color = "cecece";
                break;
            case "fighting":
                color = "a22a2a";
                break;
            case "psychic":
                color = "f08080";
                break;
            case "rock":
                color = "d2b48c";
                break;
            case "ground":
                color = "c7a14b";
                break;
            case "steel" :
                color = "7b7c79";
                break;
            default: 
                color = "black";
                break;
        }
        return color;

    }

    //Service to talk to node server
    //param: toSend represents the JSON object to post to the server
    var serverService = function(a, b, c, d) {
        //data is a single pokemon's data sent from the server
        var pokeSuccess = function(data, status, xhr) {
            //TODO: *figure out what data is received from the server
            //      *populate the page with the pokemon data and paragraph
            var pokeName = data.name;
            console.log("name: " + pokeName);
            $("#pokeName").html(capitalizeFirstLetter(pokeName));
            //get main pokemon type
            var type = data.types[data.types.length - 1].type.name;
            changeColor(type);
            $("#pokeType").html(capitalizeFirstLetter(type));

            //get the pokemon move names from the json
            //var moves = [];
            //data.moves.forEach(function(move) {
                //moves.push(move.move.name);
            //});

            var spritesUrl = {
                front: data.sprites.front_default,
                frontShiny: data.sprites.front_shiny,
                back: data.sprites.back_default,
                backShiny: data.sprites.back_shiny,
            }

            $('#frontPic').attr('src', spritesUrl.front);
            $('#backPic').attr('src', spritesUrl.back);

            //var height = data.height;
            //var weight = data.weight;
        }

        var success = function(data, status, xhr) {
            //console.log("got here");
            var pokeName = data.pokemon;
            //var pokeapiUrl = "http://pokeapi.co/api/v2/pokemon/" + pokeName;
            var pokeapiUrl = "http://pokeapi.kevgriffin.com/api/v2/pokemon/" + pokeName;
            changeDescription(data.description);
            console.log(data.description);
            $('#piType').html(data.name);

            $.get(pokeapiUrl, pokeSuccess, "json");
        }

        var piData = {
            a: a,
            b: b,
            c: c,
            d: d
        }
        
        var url = "https://obscure-caverns-26110.herokuapp.com/?" + $.param(piData);

        $.get(url, success, "json");
    }
    function display() {

    }

    function sliderOutputDisplay (sliderOutput, sliderProp) {
      document.sliders[sliderOutput].value = document.sliders[sliderProp].value + ' Sigma';
    }
    function changeDescription(descr) {
        $("#piDescription").html(descr);
    }
    function changeColor(type) {
        $('#pokeDescription').css('background-color', '#' + pickColor(type));
    }
    function capitalizeFirstLetter(word) {
        return word.substr(0,1).toUpperCase()+word.substr(1);
    }
    changeDescription();

    for (var x = 1; x < 5; x++){
      var sliderProp = "slider" + x;
      var sliderOutput = "slider" + x + "Output";
      document.sliders[sliderProp].oninput = sliderOutputDisplay.bind(undefined, sliderOutput, sliderProp);
    }
