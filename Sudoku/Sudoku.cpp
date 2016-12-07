//ITE - IA
//EDUARDO PEREA
//SERGIO CRUZ
//Juego del sudoku

//Librerias
#include <stdio.h>
#include <time.h>
#include <windows.h> 
#include <stdlib.h>

//Declaracion de variables y arreglos
int scan(int num,int array[9][9],int tam,int j,int h);

void draw(int tem,int temn);
void llenar(int array[9][9]); 


char matriz[9][9];

int array1[9][9],array2[9][9],array3[9][9];

int temp1=0,teclado=0,b,c,contx=0,conty=0,xx=5,yy=5,jota,fstop=0,aleatorio,l=0,i,conta=0,conta2=0;
int tem,temn,conty2,contx2;
int comparar(int b,int c);

//Cuerpo Principal
int main()
{	
	while(temp1==0)
	{
		temp1=0;teclado=0;contx=0;conty=0;xx=5;yy=5;jota=0;fstop=0;aleatorio=0;
		
		llenar(array1);
		draw(1,1);
		temp1=1;
	}
}

//Dibujamos nuestro plano
void draw(int tem,int temn)
{
	//Presentacion
	printf("INSTITUTO TECNOLOGICO DE ENSENADA\n");
	printf("Juego Sudoku \n");
	printf("Por: Fco. Eduardo Perea, Sergio Cruz\n");
	
	//Iniciamos nuestro Random que usaremos para declarar los campos ocupados iniciales
	srand(time(NULL));
	
	
	for(b=0;b<9;b++)
	{
		printf("\n \n\n");
		if(b==3 || b==6){printf("____________________________________________________________________\n\n");}
		for(c=0;c<9;c++)
		{
			if(c==3 || c==6){printf("     |");}
			if(tem!=1)
			{
				array2[b][c]=0;
				matriz[b][c]=' ';
				if(rand()%(temn+1)==1)
				{
					printf("%6d",array1[b][c]);
					array2[b][c]=array1[b][c];
					matriz[b][c]='|';
				}
				else{printf("%6c",matriz[b][c]);}	
			}
			else{matriz[b][c]='|'; printf("%6d",array1[b][c]);}
		}
	}						
}

//Proceguimos con el llenado de nuestras matricez considerando los espacios ocupados por nuestro random
void llenar(int array1[9][9])
{	
	
	srand(time(NULL));

	do{
		conta2=0;conta=0;
		
		for(b=0;b<9;b++)
		{
			for(c=0;c<9;c++)
			{
				array1[b][c]=0;
				array3[b][c]=0;	
			}
		}
		
		for(b=0;b<9;b++)
		{
			
			for(c=0;c<9;c++)
			{
				
				conta=0;
				i=comparar(b,c);
				do
				{
				
					
					aleatorio=1+rand()%9;
					fstop=scan(aleatorio,array1,9,b,c);
					conta++;
					if(conta>100)
					{
					
						
						fstop=0;
						array3[i][aleatorio-1]=0;
						c=9;
						b=9;
					}
				}while(fstop==1 || array3[i][aleatorio-1]==1 );
				if(c<3){array3[i][aleatorio-1]=1;}
				else if(c>2 && c<6){array3[i][aleatorio-1]=1;}
				else if(c>5 && c<9){array3[i][aleatorio-1]=1;}	
				array1[b][c]=aleatorio;
				conta2++;	
				
			}
		}
	}while(conta2!=81);
}

// Esta funcion analiza los nums de nuestra matriz y le dice cuando parar
int scan(int num,int array[9][9],int tam,int b,int c)
{
	int i,stop=0;          
	for(i=0;(i<tam && stop==0);i++)
	{                         
		if(array[b][i]==num || array[i][c]==num){stop=1;}
	}
	return stop;
}


//Aqui analizamos nuestraz matricez y revisando las filas y columnas para evitar coincidencias
int comparar(int b,int c)
{
	if(b<3)
	{
		if(c<3){i=0;}
		else if(c>2 && c<6){i=1;}
		else if(c>5 && c<9){i=2;}
	}
	else if(b>2 && b<6)
	{
		if(c<3){i=3;}
		else if(c>2 && c<6){i=4;}
		else if(c>5 && c<9){i=5;}
	}
	else if(b>5 && b<9)
	{
		if(c<3){i=6;}
		else if(c>2 && c<6){i=7;}
		else if(c>5 && c<9){i=8;}
	}
	return i;	
}
