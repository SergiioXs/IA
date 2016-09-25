#include <stdio.h>
#include <time.h>
#include <iostream>

using namespace std;
int main()
{
	int numeros = 10; 
	int vector[10] = {8,4,3,1,0,2,-3,7,9,8}; 
	int temp,i,j;	

	 clock_t start = clock();   

		for (i=1; i<10; i++){
		    
			for (j=0; j<10-1; j++){
				if (vector[j] > vector[j+1]){
					temp = vector[j];
					vector[j] = vector[j+1];
					vector[j+1] = temp;
				}
			}
		}
		for (i=0; i<10; i++){
			cout <<vector[i] << " ";
		}

		printf("    ------>  Tiempo total de ejecucion: %f", ((double)clock() - start) / CLOCKS_PER_SEC);

		
		return 0;

	}

