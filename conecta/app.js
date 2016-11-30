angular.module('app', [])
  .controller('game', function($scope, $timeout) {
    	/* VARIABLES */
	    	var size;
	    	var cant;
	    	var save;
	    	var points = [
		    		{
		    			name: "A",
		    			color: "red",
		    			x: 0,
		    			y:0,
		    			parent: true
		    		},
		    		{
		    			name: "B",
		    			color: "blue",
		    			x: 0,
		    			y:0,
		    			parent: true
		    		},
		    		{
		    			name: "C",
		    			color: "green",
		    			x: 0,
		    			y:0,
		    			parent: true
		    		},
		    		{
		    			name: "D",
		    			color: "#a08604",
		    			x: 0,
		    			y:0,
		    			parent: true
		    		},
		    		{
		    			name: "E",
		    			color: "pink",
		    			x: 0,
		    			y:0,
		    			parent: true
		    		},
		    		{
		    			name: "F",
		    			color: "grey",
		    			x: 0,
		    			y:0,
		    			parent: true
		    		},
		    		{
		    			name: "G",
		    			color: "#05fff6",
		    			x: 0,
		    			y:0,
		    			parent: true
		    		},
		    		{
		    			name: "H",
		    			color: "#60005a",
		    			x: 0,
		    			y:0,
		    			parent: true
		    		},
		    		{
		    			name: "I",
		    			color: "#60005a",
		    			x: 0,
		    			y:0,
		    			parent: true
		    		},
		    		{
		    			name: "J",
		    			color: "#60005a",
		    			x: 0,
		    			y:0,
		    			parent: true
		    		}
		    	];

    	/* CREAR MATRIZ */
	    	$scope.createStage = function(dificult) {
	    		dificult = dificult;
		    	
		    	switch(dificult) {
		    		case 1:
		    			size = 5;
		    			cant = 2;
		    		break;
		    		case 2:
		    			size = 10;
		    			cant = 3;
		    		break;
		    		case 3:
		    			size = 20;
		    			cant = 7;
		    		break;
		    	}

		    	$scope.matriz = [];
		    	for(x = 0; x < size; x++){
		    		$scope.matriz[x] = [];
			    	for(y = 0; y < size; y++)
			    		$scope.matriz[x].push({
			    			x: x,
			    			y: y,
			    			z: 0
			    		}); 
			    }
			    

			    c = 0; v = 1;
			    for(; c < cant;){
			    	console.log("Creating...");
					X = Math.floor((Math.random() * size-1) + 1);
		    		Y = Math.floor((Math.random() * size-1) + 1);
		    		
		    		if(!$scope.matriz[X][Y].z) {
		    			$scope.matriz[X][Y].z = {
		    				data: {
			    			name: points[c].name,
			    			color: points[c].color,
			    			x: X,
			    			y: Y,
			    			parent: v == 1 ? true : false
			    		}
			    	}
		    			
		    			if(v == 1) {
		    				points[c].x = X;
		    				points[c].y = Y;

		    			}
		    			
		    			if(v == 2) {
		    				v = 1;
		    				c++;
		    			} else {
		    				v++;
		    			}
		    			
		    		}
		    	}

	    		save = angular.copy($scope.matriz);
	    		}
    		$scope.createStage(1);
    	
    	/* Funcion que inicia la solucion */
	    	$scope.resolver = function () {
		    	/*
				for(P in points) {
					x = points[P].x;
					y = points[P].y;
					movimientos(points[P],x,y);
		    	}
	    		*/
	    		for(P in points) {
	    			if(P < cant)
		    			movimientos2(points[P],points[P].x,points[P].y);
		    	}
	    		}
    	
	   	/* FUNCION PRINCIPAL */
	   		function movimientos2 (P,x,y) {
    		//Hasta que ya no pueda caminar
    		while(step(1,x,y) || step(2,x,y) || step(3,x,y) || step(4,x,y)) {
		    		//Chcecar si su par esta alrededor de el
	    			if(checkNear(P,x,y)) {
	    				console.log("Encontrado");
	    				return 0;
	    			}
	    			//avanzar en direccion a su par (Aqui falta tomar decicion para rodear otros elementos aun asi se salga de su ruta)
					if(step(1,x,y) && proximidad(P,1,x,y)) {
	    				y++;
	    				$scope.matriz[x][y].z = {data: {name: P.name.toLowerCase(), color: P.color, parent: true}};
	    				movimientos2($scope.matriz[x][y].z.data,x,y);
	    			} else {
	    				if(step(3,x,y) && proximidad(P,3,x,y)) {
		    					x--;
		    					$scope.matriz[x][y].z = {data: {name: P.name.toLowerCase(), color: P.color, parent: true}};
			    				movimientos2($scope.matriz[x][y].z.data,x,y);
			    			
	    				} else {
		    				if(step(2,x,y) && proximidad(P,2,x,y)) {
	    					y--;
	    					$scope.matriz[x][y].z = {data: {name: P.name.toLowerCase(), color: P.color, parent: true}};
	    					movimientos2($scope.matriz[x][y].z.data,x,y);
		    			
			    			} else {

				    			if(step(4,x,y) && proximidad(P,4,x,y)) {
				    				x++;
				    				$scope.matriz[x][y].z = {data: {name: P.name.toLowerCase(), color: P.color, parent: true}};
				    				movimientos2($scope.matriz[x][y].z.data,x,y);	
				    			} else {
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
	    	function checkNear(obj, x, y) {	
	    		//derecha
	    			if($scope.matriz[x][y+1])
	    				if($scope.matriz[x][y+1].z)
	    					if($scope.matriz[x][y+1].z.data.name == obj.name.toUpperCase() && !$scope.matriz[x][y+1].z.data.parent)
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
	    	function step(index,x,y) {
	    		switch(index) {
	    			case 1:	//derecha
	    				if($scope.matriz[x])
			    			if($scope.matriz[x][y+1])
			    				if(!$scope.matriz[x][y+1].z)
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
	    	function proximidad(parent,index,x,y){
	    		for(i in $scope.matriz)
	    			for(j in $scope.matriz[i]){
						if($scope.matriz[i][j].z)
							if($scope.matriz[i][j].z.data.name == parent.name.toUpperCase() && !$scope.matriz[i][j].z.data.parent) {
								child = $scope.matriz[i][j].z.data;

							}
	    			}
	    			//console.log(child);
	    			//console.log(parent);
	    		switch(index){
	    			case 1: //derecha
	    				
	    				y++;
		    			if($scope.matriz[x])
		    				if($scope.matriz[x][y])
		    					if(!$scope.matriz[x][y].z) {
		    						if(y == child.y){ return false; }
		    						if(parent.y < child.y){
				    					return true; 
				    				}
				    				if(parent.y > child.y){
				    					return false; 
				    				}				
			    				}
						

	    			break;
	    			case 2: //izquierda
	    				y--;
		    			if($scope.matriz[x])
		    				if($scope.matriz[x][y])
		    					if(!$scope.matriz[x][y].z) {
		    						if(y == child.y){ return false; }
		    						if(parent.y < child.y){
				    					return false; 
				    				}
				    				if(parent.y > child.y){
				    					return true; 
				    				}				
			    				}
						

	    			break;
	    			case 3: //arriba
	      				x--;
		    			if($scope.matriz[x])
		    				if($scope.matriz[x][y])
		    					if(!$scope.matriz[x][y].z) {
		    						if(x == child.x){ return true; }
		    						if(parent.x < child.x){
				    					return false; 
				    				}
				    				if(parent.x > child.x){
				    					return true; 
				    				}				
			    				}
						

	  				break;
	    			case 4: //abajo
	     				x++;
		    			if($scope.matriz[x])
		    				if($scope.matriz[x][y])
		    					if(!$scope.matriz[x][y].z) {
		    						if(x == child.x){ return true; }
		    						if(parent.x < child.x){
				    					return true; 
				    				}
				    				if(parent.x > child.x){
				    					return false; 
				    				}				
			    				}
						


	    			break;
	    		}

	    	}

	    /* Reinicia el juego */
	    	$scope.limpiar = function () {
	    		console.log(save);
	    		$scope.matriz = save;
	    		save = angular.copy($scope.matriz);
	    	}


 	});
   
 