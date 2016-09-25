/* ITE - IA
Sergio Antonio Cruz Olivares
Francisco Eduardo Garcia Perea */


#include <stdio.h>
#include <iostream>
#include <time.h>

int partition(int *a, int p, int r) {

  int p = array[r]; // pivote
  int i = p-1, j, temp;

  for(j = p; j <= r-1; j++) {
   //comparamos los elementos con nuestro pivote
    if(array[j] <= p) {
      i++;
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  temp = array[i+1];
  array[i+1] = array[r];
  array[r] = temp;
  return i+1;
}

void quick_sort(int *a, int p, int r) {
  if(p < r) {
    int q = partition(a,p,r);
    quick_sort(a, p, q-1);
    quick_sort(a, q+1, r);
  }
}

int main() {
  int n, i;
  printf("¿De que tamaño sera el arreglo? : \n");
  scanf("%d", &n);
  int array[];
  printf("Ahora ingresa los elementos : \n");
  for(i=0; i<n; i++) {
    scanf("%d", &array[i]);
  }
    clock_t start = clock(); //Inicio del cronometro
  quick_sort(a, 0, n-1);
  printf("Este es tu arreglo ordenado :  \n");

  //Finaliza el Conometro
  printf("    ------>  Tiempo total de ejecucion: %f", ((double)clock() - start) / CLOCKS_PER_SEC);

  for(i=0; i<n; i++) {
    printf("%d \n", array[i]);
  }
  return 0;
}