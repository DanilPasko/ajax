$('button').on('click', function(){
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'phones.json', true);

	xhr.send(); // (1)

	xhr.onreadystatechange = function() { // (3)
	  	if (xhr.readyState != 4) return;

	  		$('button').innerHTML = 'Готово!';

	  	if (xhr.status != 200) {
		    alert(xhr.status + ': ' + xhr.statusText);
	  	} else {
	    	var a = xhr.responseText;
	    	var b = JSON.parse(a);
	    	for (var i = 0; i < b.length; i++) {
	    		console.log(b[i].id + ': ' + b[i].name);
	    	}
	  	}

	}

	$('button').innerHTML = 'Загружаю...'; // (2)
	$('button').disabled = true;
});