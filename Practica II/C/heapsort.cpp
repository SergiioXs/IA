/* ITE - IA
Sergio Antonio Cruz Olivares
Francisco Eduardo Garcia Perea */

#include <stdio.h>
#include <iostream>
#include <time.h>

using namespace std;
int main()
{
	int A[6],j,item,temp,i,k,n;
	cout<<" Indica el tamaño del arreglo e ingresa los numeros a ordenar : ";
	cin>>n;
	for(i=1;i<=n;i++)
		cin >> A[i];
	
	clock_t start = clock(); //Inicio del cronometro
	for(k=n;k>0;k--)
	{
		for(i=1;i<=k;i++)
		{
			item=A[i];
			j=i/2;
			while(j>0 && A[j]<item)
			{
				A[i]=A[j];
				i=j;
				j=j/2;
			}
			A[i]=item;
		}
		temp=A[1];
		A[1]=A[k];
		A[k]=temp;
	}
	//Finaliza el Conometro
	printf("    ------>  Tiempo total de ejecucion: %f", ((double)clock() - start) / CLOCKS_PER_SEC);
	
	cout<<"El orden es:"<<endl;
	for(i=1;i<=n;i++)
		cout<<A[i] << endl;
	return 0;
}