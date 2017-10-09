$('button').on('click', function(){
	var xhr = new XMLHttpRequest();
	var city = $(this).attr("value");
	var adress = 'http://api.openweathermap.org/data/2.5/weather?q='+ city + '&APPID=ade7221313e248ee596b11990178251d';
	
	xhr.open('GET', adress, true);

	xhr.send(); // (1)

	xhr.onreadystatechange = function() { // (3)
	  	if (xhr.readyState != 4) return;

	  		// $('button').innerHTML = 'Готово!';

	  	if (xhr.status != 200) {
		    alert(xhr.status + ': ' + xhr.statusText);
	  	} else {
	    	var a = xhr.responseText;
	    	var b = JSON.parse(a);
	    	var resultTemp = Math.round(b.main.temp - 273,15);
	    	$('.resultTemp').text(resultTemp + 'C');

	    	var resultWeather = b['weather'][0].main;
	    	$('.resultWeather').text(resultWeather);
	  	};
	};
});

