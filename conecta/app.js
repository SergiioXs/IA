angular.module('app', [])
  .controller('game', function($scope, $timeout) {
    	/* VARIABLES */
	    	var size; //Tamaño de la matriz
	    	var cant; //Cantidad de puntos
	    	var save; //Guardara la matriz para poderla reiniciar
	    	var points = [ //Puntos
		    		{
		    			name: "A", //Nombre a mostrar
		    			color: "red", //Color de fondo
		    			x: 0, //Pos x
		    			y: 0, //Pos y
		    			parent: true, //Declaramos que es el parent
		    			found: false //Y que no a sido encontrado
		    		},
		    		{
		    			name: "B",
		    			color: "blue",
		    			x: 0,
		    			y: 0,
		    			parent: true,
		    			found: false
		    		},
		    		{
		    			name: "C",
		    			color: "green",
		    			x: 0,
		    			y:0,
		    			parent: true,
		    			found: false
		    		},
		    		{
		    			name: "D",
		    			color: "#a08604",
		    			x: 0,
		    			y:0,
		    			parent: true,
		    			found: false
		    		},
		    		{
		    			name: "E",
		    			color: "pink",
		    			x: 0,
		    			y:0,
		    			parent: true,
		    			found: false
		    		},
		    		{
		    			name: "F",
		    			color: "grey",
		    			x: 0,
		    			y:0,
		    			parent: true,
		    			found: false
		    		},
		    		{
		    			name: "G",
		    			color: "#05fff6",
		    			x: 0,
		    			y:0,
		    			parent: true,
		    			found: false
		    		},
		    		{
		    			name: "H",
		    			color: "#60005a",
		    			x: 0,
		    			y:0,
		    			parent: true,
		    			found: false
		    		},
		    		{
		    			name: "I",
		    			color: "#60005a",
		    			x: 0,
		    			y:0,
		    			parent: true,
		    			found: false
		    		},
		    		{
		    			name: "J",
		    			color: "#60005a",
		    			x: 0,
		    			y:0,
		    			parent: true,
		    			found: false
		    		}
		    	];

    	/* CREAR MATRIZ */
	    	$scope.createStage = function(dificult) { //Recibe un numero del 1 al 3 para indicar la dificultad
		    	
		    	switch(dificult) {
		    		case 1: //Easy
		    			size = 5; //Con esto declaramos que la matriz sera de 5x5
		    			cant = 2; //Con 2 puntos
		    		break; 
		    		case 2: //Normal
		    			size = 10;
		    			cant = 3;
		    		break;
		    		case 3: //Hard
		    			size = 20;
		    			cant = 7;
		    		break;
		    		default:
		    			size = 10;
		    			cant = 3;
		    		break;
		    	}

		    	$scope.matriz = []; //Inicializamos la matriz vacia
		    	for(x = 0; x < size; x++){ //Creamos un ciclo del tamaño que se le indico que seria la matriz
		    		$scope.matriz[x] = []; 
			    	for(y = 0; y < size; y++) 
			    		$scope.matriz[x].push({ //En cada espacio de la matriz declaramos su pos en x, y & z como 0 (false)
			    			x: x,
			    			y: y,
			    			z: 0
			    		}); 
			    }
			    

			    v = 1; //Variable que indica si es parent o child
			    for(c = 0; c < cant;){ 
			    //Ciclo que crea los puntos en la matriz tanto parent como childs, 
			  	//el incremento de 'c' se de abajo para usar el mismo punto 2 veces (parent&child) 
			    	console.log("Creating...");
					X = Math.floor((Math.random() * size-1) + 1); //Pedimos un numero random que este dentro del rango 0 al tamaño de la matriz para x
		    		Y = Math.floor((Math.random() * size-1) + 1); //Pedimos un numero random que este dentro del rango 0 al tamaño de la matriz para y
		    		
		    		if(!$scope.matriz[X][Y].z) { //Para evitar que se sobre escriban verificamos que el espacio este vacio, siendo z = 0 lo que marca el espacio en la matriz como vacio
		    			$scope.matriz[X][Y].z = { //Ahora z contendra el obj child
		    				data: { //Su informacion
			    			name: points[c].name, //Nombre que lo identifica
			    			color: points[c].color, //Color de fondo
			    			x: X, //pos en x
			    			y: Y, //pos en y
			    			parent: v == 1 ? true : false //si la varible esta en 1 es parent de lo contrario sera child
			    		}
			    	}
		    			
		    			if(v == 1) { //Al ser parent entramos para asignar la pos x & y en la variable de los puntos
		    				points[c].x = X;
		    				points[c].y = Y;

		    			}
		    			
		    			if(v == 2) { //Si la variable ya a sido usada para colocar al parent & child 
		    				v = 1; //la reiniciamos
		    				c++; //Y avanzamos con el siguiente punto
		    			} else {
		    				v++; //Incrementa si ya se colo el parent
		    			}
		    			
		    		}
		    	}

	    		save = angular.copy($scope.matriz); //Guardamos la matriz en la variable save para poderla reiniciar con el boton
	    		}
    		$scope.createStage(1); //Creamos la matriz en nivel easy
    	
    	/* Funcion que inicia la solucion */
	    	$scope.resolver = function () { //Funcion que resuelve el juego

	    		for(P in points) { //ciclo que recorrera todos los puntos de la variable points

		    			if(P < cant) { //Si P es menor que la cantidad de puntos acordados, entonces entrara
			    			movimientos2(points[P],points[P].x,points[P].y); //Mnadamos el obj del punto, su x, & y (Que ahora que lo veo era solo necesario e obj xD)
		    			}
		    	}
	    	}
    	
	   	/* FUNCION PRINCIPAL */
	   		function movimientos2 (P,x,y) { //Recibe el punto (obj), x & y
    		//Checa los cuatro caminos para ver si puede avanzar
    		//Hasta que ya no pueda caminar
    		while(step(1,x,y) || step(2,x,y) || step(3,x,y) || step(4,x,y)) {
		    		//Chcecar si su par esta alrededor de el
	    			if(checkNear(P,x,y)) { //Checa si su child esta a su alrededor
	    				console.log("Encontrado");
	    				return 0; //termina la funcion
	    			}
	    			//avanzar en direccion a su par (Aqui falta tomar decicion para rodear otros elementos aun asi se salga de su ruta)
					if(step(1,x,y) && proximidad(P,1,x,y)) { //Caminar hacia la derecha, checa si se puede y si esta en direccion a su child
	    				y++; //Si asi lo es, entonces avanza
	    				$scope.matriz[x][y].z = {data: {name: P.name.toLowerCase(), color: P.color, parent: true}}; //y deja su rastro en la matriz
	    				movimientos2($scope.matriz[x][y].z.data,x,y); //Volvemos a llamar la funcion ahora en la posicion actual
	    			} else { //Si no puede caminar a la izquierda o se aleja del child
	    				if(step(2,x,y) && proximidad(P,2,x,y)) { //Verifica ahora por la izquierda
		    					
	    					y--;
	    					$scope.matriz[x][y].z = {data: {name: P.name.toLowerCase(), color: P.color, parent: true}};
		    				movimientos2($scope.matriz[x][y].z.data,x,y);
			    			
	    				} else {
		    				if(step(3,x,y) && proximidad(P,3,x,y)) { //Verifica arriba
	    					x--;
	    					$scope.matriz[x][y].z = {data: {name: P.name.toLowerCase(), color: P.color, parent: true}};
	    					movimientos2($scope.matriz[x][y].z.data,x,y);
		    			
			    			} else { 
				    			if(step(4,x,y) && proximidad(P,4,x,y)) {//Verifica abajo
				    				x++;
				    				$scope.matriz[x][y].z = {data: {name: P.name.toLowerCase(), color: P.color, parent: true}};
				    				movimientos2($scope.matriz[x][y].z.data,x,y);	
				    			} else { //Se termina si no encontro mas soluciones y sigue con el siguiente punto
				    				console.log("Se acabo");
				    				//Si ya no tiene caminos
				    				return 0;
				    			}
			    			}
						
						
		    			}	
	    			}
	    		} 
	    			//Si ya no tiene caminos
	    			console.log("Nowey/way")
					return 0;
	    		
    		}

    	/* Verifica si su par esta alrededor */
	    	function checkNear(obj, x, y) {	 //Recibe el obj de donde se encuentra, x y
	    		//derecha
	    			if($scope.matriz[x][y+1]) //Checamos si existe el espacio en la matriz hacia la derecha
	    				if($scope.matriz[x][y+1].z) //Ahora checamos si ese lugar esta ocupado
	    					if($scope.matriz[x][y+1].z.data.name == obj.name.toUpperCase() && !$scope.matriz[x][y+1].z.data.parent) //Ahora si el que lo ocupa es igual al que esta corriendo y que no sea el parent
	    						return true;
	    		//izquierda
	    			if($scope.matriz[x][y-1])
	    				if($scope.matriz[x][y-1].z)
	    					if($scope.matriz[x][y-1].z.data.name == obj.name.toUpperCase() && !$scope.matriz[x][y-1].z.data.parent)
	    						return true;
	    		//arriba
	    			if($scope.matriz[x-1])
	    				if($scope.matriz[x-1][y].z)
	    					if($scope.matriz[x-1][y].z.data.name == obj.name.toUpperCase() && !$scope.matriz[x-1][y].z.data.parent)
	    						return true;
	    		//abajo
	    			if($scope.matriz[x+1])
	    				if($scope.matriz[x+1][y].z)
	    					if($scope.matriz[x+1][y].z.data.name == obj.name.toUpperCase() && !$scope.matriz[x+1][y].z.data.parent)
	    						return true;
	    		return false;
	    	}
    	
    	/* Checar si puede avanzar en cualquier sentido */
	    	function step(index,x,y) { //Recibe un numero que identifica hacia que lado se requiere revisar
	    		switch(index) {
	    			case 1:	//derecha
	    				if($scope.matriz[x]) //Checa si existe la pos x
			    			if($scope.matriz[x][y+1]) //Checa si se puede avanzar a la derecha
			    				if(!$scope.matriz[x][y+1].z) //Checa si el lugar no esta ocupado
			    					return true; 
	    			break;
	    			case 2: //izquierda
		    			if($scope.matriz[x])
			    			if($scope.matriz[x][y-1])
			    				if(!$scope.matriz[x][y-1].z)
			    					return true;
	    			break;
	    			case 3:	//arriba
						if($scope.matriz[x-1])
		    				if(!$scope.matriz[x-1][y].z)
		    					return true;
	    			break;
	    			case 4:  //abajo
						if($scope.matriz[x+1])
		    				if(!$scope.matriz[x+1][y].z)
		    					return true;
	    			break;
	    			
	    		}
	    		return false;
	    	}
    	
    	/* Checa la proximidad de su par y lo dejara avanzar o no */
	    	function proximidad(parent,index,x,y){ //Recivimos el ultimo elemento del recorrido del parent, index=a que lado queremos verificar, x y
	    		for(i in $scope.matriz) //Recorre la matriz
	    			for(j in $scope.matriz[i]){ 
						if($scope.matriz[i][j].z) //Si el espacio en la matriz esta ocupado por un obj
							if($scope.matriz[i][j].z.data.name == parent.name.toUpperCase() && !$scope.matriz[i][j].z.data.parent) { //Checa que sea igual que el parent y pero evita que sea el mismo
								child = $scope.matriz[i][j].z.data; //Entonces encontramos a child y lo guardamos

							}
	    			}
	    			//console.log(child);
	    			//console.log(parent);
	    		switch(index){
	    			case 1: //derecha
	    				
	    				y++; //Avanzamos a la derecha
		    			if($scope.matriz[x]) //Checamos si exxista la pos en x
		    				if($scope.matriz[x][y]) //Checamos si exista la pos en Y
		    					if(!$scope.matriz[x][y].z) { //checamos si el espacio esta desocupado
		    						if(y == child.y){ return true; /*puede avanzar*/} else { //Si el parent esta en la misma fila que su child regresa true
			    						if(parent.y < child.y){ //Si el parent esta mas hacia la izquierda que su child
					    					return true; 	//Entonces si puede avanzar a la derecha
					    				}
					    				if(parent.y > child.y){ //Si el parent esta mas hacia la derecha que su child
					    					return false; 	//Entonces no podra avanzar
					    				}
									}				
			    				}
						

	    			break;
	    			case 2: //izquierda
	    				y--;
		    			if($scope.matriz[x])
		    				if($scope.matriz[x][y])
		    					if(!$scope.matriz[x][y].z) {
		    						if(y == child.y){ return true; /*puede avanzar*/} else {
		    							if(parent.y < child.y){ //Si el parent esta mas hacia la izquierda que su child
					    					return false; //no puede avanzar
					    				}
					    				if(parent.y > child.y){ //Si el parent esta mas hacia la derecha que su child
					    					return true; //puede avanzar
					    				}	
		    						}
		    									
			    				}
						

	    			break;
	    			case 3: //arriba
	      				x--;
		    			if($scope.matriz[x])
		    				if($scope.matriz[x][y])
		    					if(!$scope.matriz[x][y].z) {
		    						if(x == child.x){ return true; /*puede avanzar*/} else {
		    							if(parent.x < child.x){ //Si el parent esta mas arriba que su child
					    					return false; //no puede avanzar
					    				}
					    				if(parent.x > child.x){ //Si el parent esta mas abajo que su child
					    					return true; //puede avanzar
					    				}
		    						}
		    										
			    				}
						

	  				break;
	    			case 4: //abajo
	     				x++;
		    			if($scope.matriz[x])
		    				if($scope.matriz[x][y])
		    					if(!$scope.matriz[x][y].z) {
		    						if(x == child.x){ return true; /*puede avanzar*/} else {
		    							if(parent.x < child.x){ //Si el parent esta mas arriba que su child
				    						return true; //puede avanzar
					    				}
					    				if(parent.x > child.x){ //Si el parent esta mas abajo que su child
					    					return false; //no puede avanzar
					    				}	
		    						}
		    									
			    				}
						


	    			break;
	    		}

	    	}

	    /* Reinicia el juego */
	    	$scope.limpiar = function () {

	    		$scope.matriz = save; //Reinicia la matriz
	    		save = angular.copy($scope.matriz);
	    	}


 	});
   
 