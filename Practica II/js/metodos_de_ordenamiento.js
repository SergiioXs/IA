$(document).ready(function () {

	/* HECHO POR */
		var Sergio_Antonio_Cruz_Olivares = "Gato";
		var Francisco_Eduardo_Perea = "Pancho";

	/* BUBBLE SORT */
		function burbujaArray(array, callback) {
			for(x in array) {
				for (y=0; y<array.length-1; y++){
					if (array[y] > array[y+1]){
						temp = array[y];
						array[y] = array[y+1];
						array[y+1] = temp;
					}
				}
			}
			callback(array);
		}

	/* HEAP SORT */
		var n;
		function buildHeap(array) {
		    n = array.length;

		    for (i = Math.floor(n / 2); i >= 0; i--) {
		        heapify(array, i);
		    }
		}

		function heapify(array, i) {
		    var izquierda = 2 * i + 1;
		    var derecha = 2 * i + 2;
		    var largo = i;


		    largo = izquierda < n && array[izquierda] > array[largo] ? izquierda : largo;
		    largo = derecha < n && array[derecha] > array[largo] ? derecha : largo;

		    if (largo != i) {
		        swap(array, i, largo);
		        heapify(array, largo);
		    }
		}

		function heapSort(array, callback) {
		    buildHeap(array);

		    for (var i = array.length - 1; i > 0; i--) {
		        swap(array, 0, i);
		        n--;
		        heapify(array, 0);
		    }
		    callback(array);
		}

	/* MERGE SORT */
		function merge(izquierda, derecha){
		    result  = [];
	        x  = 0;
	        y  = 0;

		    while (x < izquierda.length && y < derecha.length){
		        result.push(izquierda[x] < derecha[y] ? izquierda[x++] : derecha[y++]);
		    }

		    return result.concat(izquierda.slice(x)).concat(derecha.slice(y));
		}

		function mergeSort(array){

		    if (array.length < 2) {
		        return array;
		    }

		    var medio = Math.floor(array.length / 2);
	        var izquierda = array.slice(0, medio);
	        var derecha   = array.slice(medio);
	        return merge(mergeSort(izquierda), mergeSort(derecha));
		}

		function playMergeSort(array, callback){
			callback(mergeSort(array));
		}

	/* INSERCION */
		function insercion(array, callback){

				for(x in array){
					tmp=array[x];

			        for(y=x; y && (tmp<array[y-1]); y--) {
			            array[y]=array[y-1];
			        }
			       
			        array[y]=tmp;
				}

		    callback(array);
		}

	/* QUICK SORT */
		function particion(array, izquierda, derecha) {
		    var pivote  = array[Math.floor((derecha + izquierda) / 2)];

		    for (x in array) {				        
		        for (;array[izquierda] < pivote;) {
		            izquierda++;
		        }
		        
		        for (;array[derecha] > pivote;) {
		            derecha--;
		        }
		        
		        if (izquierda <= derecha) {
		            swap(array, izquierda, derecha);
		            izquierda++;
		            derecha--;
		        }
		    }
		    return izquierda;
		}


		function quickSort(array, izquierda, derecha) {
		    var pos;
		    
		    if (array.length > 1) {

		        izquierda = !izquierda ? 0 : izquierda;
		        derecha = !derecha ? array.length - 1 : derecha;

		        pos = particion
		        (array, izquierda, derecha);

		        if (izquierda < pos - 1) {
		            quickSort(array, izquierda, pos - 1);
		        }

		        if (pos < derecha) {
		            quickSort(array, pos, derecha);
		        }

		    }

		    return array;
		}

		function playQuicksort (array, callback) {
			callback(quickSort(array, 0, array.length-1));
		}

	/* SELECCION */
		function seleccion(array, callback) {
			for(x=0; x<=array.length-1; x++){
		        pos=x;

		        for(y=x+1; y<array.length; y++)
		        	pos = array[y]<array[pos] ? y : pos;

		        swap(array, x, pos);
			}	
			callback(array);
		}

	/* EVENTO CLICK PARA REALIZAR UNA FUNCION */
		$("button").on('click', function() {
			/* Mostrar boton activo */
			$("button").css("background-color", "white");
			$(this).css("background-color", "lightgreen");
			/* Obtenemos un array random */
			array = getArray();
			/* Imprimos nuestro input */
			printArray(array, "input");
			/* Tomamos el tiempo de inicio */
			inicio = new Date().getTime();
			/* Realizamos la funcion seleccionada */
			switch($(this).val()){
				case "Burbuja":
					burbujaArray(array, function(result){
						printArray(result, "output", getFinalTime(inicio));
					});
				break;
				case "HeapSort": 
					heapSort(array, function(result){
						printArray(result, "output", getFinalTime(inicio));
					});
				break;
				case "Insercion": 
					insercion(array, function(result){
						printArray(result, "output", getFinalTime(inicio));
					});
				break;
				case "MergeSort": 
					playMergeSort(array, function(result){
						printArray(result, "output", getFinalTime(inicio));
					}); 
				break;
				case "QuickSort": 
					playQuicksort(array, function(result){
						printArray(result, "output", getFinalTime(inicio));
					}); 
				break;
				case "Seleccion": 
					seleccion(array, function(result){
						printArray(result, "output", getFinalTime(inicio));
					}); 
				break;
			}
		});

});