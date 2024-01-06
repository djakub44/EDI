
    function SetMode() {
            var r = document.querySelector(':root');
            var Slider = document.getElementById("DarkModeSlider");
            console.log("elo")
            if (Slider.checked == true){
                //checked - dark mode
                r.style.setProperty('--backgroundcolor', 'url(bgcDark.jpg)');
                r.style.setProperty('--fontcolor', 'whitesmoke');
                r.style.setProperty('--thHoverColor', 'black');
                
            } else {
                //unchecked - normal mode
                r.style.setProperty('--backgroundcolor', 'url(bgc.jpg)');
                r.style.setProperty('--fontcolor', 'black');
                r.style.setProperty('--thHoverColor', 'black');
                
            }

    }