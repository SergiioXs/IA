	function getMatrix () {
		len = Math.floor((Math.random() * 6) + 3);
		array = [];
		for(x = 0; x < len ; x++) {
			array.push([]);
			for(y = 0; y < len ; y++) {
				array[x].push( Math.floor((Math.random() * 10) + 1));
			}	
		}
		return array;
	} 

	function getArray () {
		len = 10; //Math.floor((Math.random() * 10) + 1);
		array = [];
		for(x = 0; x < len ; x++) {
			array.push( Math.floor((Math.random() * 99) + 1));
		}
		return array;
	} 

	function printArray(array, selector, time) {
		if(selector == "output") {
			if(time){
				$("#time").html(time);
			} else {
				$("#time").html("0");
			}
		}

		txt = "<table style='text-align: right; border-collapse: collapse; '>";
			txt += "<tr>";
			for (x=0; x < array.length ; x++) {
				txt += "<td style='border: 1px solid black; padding: 5px;'>"+(array[x] < 10 ? "&nbsp;&nbsp;"+array[x] : array[x])+"</td>";
			}
			txt += "</tr>";	
		txt += "</table>";
			$("#"+selector).html(txt);
	}

	function printMatrix(array, selector) {
		txt = "<table style='text-align: right; border-collapse: collapse; '>";
		console.log(array.length);
		for (x=0; x < array.length ; x++) {
			txt += "<tr>";
			for (y=0; y < array[x].length ; y++) {
				txt += "<td style='border: 1px solid black; padding: 5px;'>"+(array[x][y] < 10 ? "&nbsp;&nbsp;"+array[x][y] : array[x][y])+"</td>";
			}
			txt += "</tr>";	
		}
		txt += "</table>";
			$("#"+selector).html(txt);
	}

	function swap(input, index_A, index_B) {
	    var temp = input[index_A];

	    input[index_A] = input[index_B];
	    input[index_B] = temp;
	}

	function getFinalTime(inicio) {
		fin = new Date().getTime();
		diff=new Date(fin-inicio);
		return diff.getUTCMilliseconds();	
	}