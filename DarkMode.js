
    function SetMode() {
            var r = document.querySelector(':root');
            var Slider = document.getElementById("DarkModeSlider");
            
            if (Slider.checked == true){
                //checked - dark mode
                r.style.setProperty('--backgroundcolor', 'url(bgcDark.jpg)');
                r.style.setProperty('--fontcolor', 'whitesmoke');
                r.style.setProperty('--thHoverColor', 'black');
                
                const chart = Chart.getChart("CountryPopulationChart");
                chart.data.datasets[0].backgroundColor = 'rgb(192,192,192)';
                chart.options.scales.x.ticks.color = 'rgb(245,245,245)';
                chart.options.scales.y.ticks.color = 'rgb(245,245,245)';
                chart.options.plugins.legend.labels.color = 'rgb(245,245,245)';
                chart.update();
                
                const chart2 = Chart.getChart("MonumentsChart");
                chart2.data.datasets[0].backgroundColor = [
                    'rgb(192, 192, 192)',
                    'rgb(51, 51, 51)'
                  ];
                chart2.options.plugins.title.color = 'rgb(245,245,245)'
                chart2.options.plugins.legend.labels.color = 'rgb(245,245,245)'
                chart2.update();
                
                
        

            
            }
            else {
                //unchecked - normal mode
                r.style.setProperty('--backgroundcolor', 'url(bgc.jpg)');
                r.style.setProperty('--fontcolor', 'black');
                r.style.setProperty('--thHoverColor', 'black');

                const chart = Chart.getChart("CountryPopulationChart");
                chart.data.datasets[0].backgroundColor = 'rgb(84,179,214)';
                chart.options.scales.x.ticks.color = 'rgb(0,0,0)';
                chart.options.scales.y.ticks.color = 'rgb(0,0,0)';
                chart.options.plugins.legend.labels.color = 'rgb(0,0,0)';
                chart.update();

                const chart2 = Chart.getChart("MonumentsChart");
                chart2.data.datasets[0].backgroundColor = [
                    'rgb(174, 214, 241)',
                    'rgb(84,179,214)'
                  ];
                chart2.options.plugins.title.color = 'rgb(0,0,0)';
                chart2.options.plugins.legend.labels.color = 'rgb(0,0,0)';
                chart2.update();
            }

    }