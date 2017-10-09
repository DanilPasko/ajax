$('button').addClass("active");

$('button').on('click', function(){	
	$('button').removeClass("active");
	$(this).addClass("active");

	var city = $(this).attr("value");
	$(".wrap-for-results").css('display','inline-block');

	var urlBackgroundForCity = "url('../" + city + ".jpg')";
	$("body").css("background-image", urlBackgroundForCity);

	var xhr = new XMLHttpRequest();
	
	var address = 'http://api.openweathermap.org/data/2.5/weather?q='+ city + '&APPID=ade7221313e248ee596b11990178251d';
	
	xhr.open('GET', address, true);

	xhr.send(); // (1)

	xhr.onreadystatechange = function() { // (3)
	  	if (xhr.readyState != 4) return;

	  		// $('button').innerHTML = 'Готово!';

	  	if (xhr.status != 200) {
		    alert(xhr.status + ': ' + xhr.statusText);
	  	} else {
	    	var answer = xhr.responseText;
	    	var answerParse = JSON.parse(answer);
	    	console.log(answerParse);
	    	var resultTemp = Math.round(answerParse.main.temp - 273,15);
	    	$('.resultTemp').text(resultTemp).append('<span>&#176;C</span>');

	    	var resultWeather = answerParse['weather'][0].main;
	    	$('.resultWeather').text(resultWeather);

	    	$('.city').text(city);

	  	};
	};
});

