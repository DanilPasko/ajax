// object with current names of citys for clock
var cityForTimer = {
	"dnipro": 'Europe/Kiev',
	"kiev": 'Europe/Kiev',
	"london": 'Europe/London',
	"new-york": 'America/New_York'
}

// var for current city
var curentCity;

// style for main nav buttons - on main screen
$('button').addClass("active");


// action when choose city
$('button').on('click', function(){	
	$('button').removeClass("active");
	$(this).addClass("active");

	var city = $(this).attr("value");
	
	$(".wrap-for-results").css('display','flex');
	for (var key in cityForTimer) {
		if (key === city) {
			curentCity = cityForTimer[key];
			
			function update() {
				$('#clock').html(moment().tz(curentCity).format('HH:mm:ss')).prepend('<span>actual time - </span>');
			}
			setInterval(update, 1000);
		}
	}

	var urlBackgroundForCity = "url('../" + city + ".jpg')";
	$("body").css("background-image", urlBackgroundForCity);

	var xhr = new XMLHttpRequest();
	
	var address = 'http://api.openweathermap.org/data/2.5/weather?q='+ city + '&APPID=ade7221313e248ee596b11990178251d';
	
	xhr.open('GET', address, true);

	xhr.send(); // (1)

	xhr.onreadystatechange = function() { // (3)
	  	if (xhr.readyState != 4) return;
	  	if (xhr.status != 200) {
		    alert(xhr.status + ': ' + xhr.statusText);
	  	} else {	    	
	    	var answerParse = JSON.parse(xhr.responseText); //parse answer from server (json)
	    	$('.resultTemp').text(Math.round(answerParse.main.temp - 273,15)).append('<span class="result">&#176;C</span>').prepend('<span>temperature - </span>'); //get and add temperature on site
	    	$('.resultWeather').text(answerParse['weather'][0].main).prepend('<span>weather - </span>').append('<i></i>'); //get and add weather status on site
	    	$('.city').text(city).prepend('<span>city - </span>');

	    	// var weatherIconCode = answerParse['weather'][0].icon;
	    	var weatherIconUrl = "url('http://openweathermap.org/img/w/" + answerParse['weather'][0].icon + ".png')";
	    	$('.resultWeather i').css('background-image',weatherIconUrl);


	  	};
	};
});









