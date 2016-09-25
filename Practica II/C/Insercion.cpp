/* ITE - IA
Sergio Antonio Cruz Olivares
Francisco Eduardo Garcia Perea */


#include <stdio.h>
#include <iostream>
#include <time.h>

using namespace std;

int main()
{
		//Declracion de variables y asignacion de valores
		int numeros = 10, vector[numeros] = {12,0,5,8,7,9,22,-4,-2,0}, temp,i,j;

		clock_t start = clock(); //Inicio del cronometro

		//Inicia ciclo de ordenamiento
		for (i=1; i<numeros; i++){
			 temp = vector[i];
			 for (j=i-1; j>=0 && vector[j] > temp; j--){
			 	vector[j+1]=vector[j];
			 }
			 vector[j+1]=temp;
			 }

		for (i=0; i<numeros; i++){
			cout <<vector[i] << " ";
		}

		//Finaliza el Conometro

	printf("    ------>  Tiempo total de ejecucion: %f", ((double)clock() - start) / CLOCKS_PER_SEC);

		system("pause");
		return 0;
	}