/* ITE - IA
Sergio Antonio Cruz Olivares
Francisco Eduardo Garcia Perea */


#include <stdio.h>
#include <iostream>
#include <time.h>

void merge(int *a, int p, int q, int r) {

//Declaracion de Variables.
  int n1, n2, i, j = 0, k = 0, t;
  n1 = q - p + 1;
 
  n2 = r - q;
   
  int L[n1], R[n2];

  /*copiamos los elementos del arreglo */

  for(i = 0; i < n1; i++) {
    L[i] = a[p+i];
  } 

  for(i = 0; i < n2; i++) {
    R[i] = a[q+1+i];
  }
  /*comporbamos los elementos del arreglo,
   para verifivar su orden*/

  for(i = p; i <= r; i++) {
    if(L[j] <= R[k]) {
      a[i] = L[j++];
    }
    else if(L[j] > R[k]) {
      a[i] = R[k++];
    }

    if(j == n1) {
      for(t = i+1; t <= r; t++) {
        a[t] = R[k++];
      }
      break;
    }

    if(k == n2) {
      for(t = i+1; t <= r; t++) {
        a[t] = L[j++];
      }
      break;
    }
  }
}

void merge_sort(int *a, int p, int r) {

  if(p < r) {
   /*dividmos la matriz en 2*/
    int q = (p+r)/2;
  
    merge_sort(a, p, q);
    merge_sort(a, q+1, r);
    merge(a, p, q, r);
  }
  else {
    return;
  }
}

int main() {
  int n, i;
  printf("¿De que tamaño sera el arreglo? :  \n");
  scanf("%d", &n);
  int a[n];
  printf(" Ahora ingresa los elementos : \n");

  clock_t start = clock(); //Inicio del cronometro

  for(i=0; i<n; i++) {
    scanf("%d", &a[i]);
  }
  merge_sort(a, 0, n-1);
  printf(" Este es tu arreglo ordenado :  \n");
  for(i=0; i<n; i++) {
    printf("%d \n", a[i]);
  }
  //Finaliza el Conometro

  printf("    ------>  Tiempo total de ejecucion: %f", ((double)clock() - start) / CLOCKS_PER_SEC);
  
  return 0;
}