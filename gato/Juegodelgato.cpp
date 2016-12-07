//ITE - IA
//EDUARDO PEREA
//SERGIO CRUZ

#include <iostream>
#include <vector>
#include <string.h>


using namespace std;

//Definimos la matriz que usaremos
int Matriz[3][3];

//Victorias posibles
int WinPosibles[8][3]={
{2,3,4},
{2,5,8},
{2,6,10},
{5,6,7},
{8,9,10},
{3,6,9},
{4,7,10},
{8,6,4},
};
//Aqui definimos los vectores para almacenar nuestros movimientos

int VecCol[] = {0, 0, 1, 2, 0, 1, 2, 0, 1, 2};
int VecFilas[] = {0, 2, 2, 2, 1, 1, 1, 0, 0, 0};

//Con estos vectores sabremos quien el ganador o si hay un empate
int leerFila[] = {0, 1, 1, -1};
int leerColum[] = {1, 1, 0, 1};

//Aqui leemos la matriz
int check() {
	for (int i = 0; i < 3; ++i) {
		for (int j = 0; j < 3; ++j) {
			for (int d = 0; d < 4; ++d) {
				string s;
				int f = i, c = j;
				for (int h = 0; h < 3; ++h) {
					if (f < 0 or f >= 3 or c < 0 or c >= 3) break;
					s += char(WinPosibles[f][c] + '0');
					f += leerFila[d];
					c += leerColum[d];
				}
				if (s == "111") return 1;
				else if (s == "222") return 2;
			}
		}
	}
	return -1;
}


//aqui dibujamos nuestro plano
void draw() {
	
	
	for (int i = 0; i < 4; ++i) cout << endl;
	for (int i = 0; i < 3; ++i) {
		for (int j = 0; j < 3; ++j) {
			
			//Aqui revisamos si e nuestra matriz tenemos campos ocupados
			if (Matriz[i][j] == 0) cout << "  ";
			else if (Matriz[i][j] == 1) cout << " X";
			
			else cout << " O";
			
			if (j != 2) cout << " |";			
		}
		
		cout << endl;
		
		if (i != 2) cout << "------------" << endl;
	}
}



//Turno de la maquina
void TurnoPC() {
	int x, y; 
	Matriz[x][y] = 1;
}

//Turno del jugador
void TurnoHumano() {
	int pos = -1;
	while (pos < 1) {
		cin >> pos;
		if (pos < 1 or pos > 9) pos = -1;
		else if (Matriz[VecFilas[pos]][VecCol[pos]] != 0) pos = -1;
	}
	Matriz[VecFilas[pos]][VecCol[pos]] = 2;
}

//Cuerpo pincipal
int main() {
	
	//Presentacion
	cout<<"   Instituto Tecnologico de Ensenada - Inteligencia Artificial " << endl;
	cout<<"   EDUARDO PEREA" << endl;
	cout<<"   SERGIO CRUZ"<< endl;
	cout<<"---------------------------------------------------" << endl;
	cout<<"  " << endl;
	
	//Instrucciones
	cout<<"Instrucciones: En este juego inicias tu para elegir una celda " << endl;
	cout<<"debes ingresar la coordenada usando el Pad Numerico como se"<< endl;
	cout<<"muestra acontinuacion:: "<< endl;
	
	cout<<" "<< endl;
	cout<<" "<< endl;
	cout<<" 7 | 8 | 9"<< endl;
	cout<<"-----------"<< endl;
	cout<<" 4 | 5 | 6"<< endl;
	cout<<"-----------"<< endl;
	cout<<" 1 | 2 | 3"<< endl;
	cout<<" "<< endl;
	cout<<" "<< endl;
	cout<<" "<< endl;
	
	
	cout<<" Tu inicias ! "<< endl;	
	//----------------------------------------------------------
	
	memset(Matriz, 0, sizeof(Matriz));
	
	int win = 0, Turno = 0;
	int temp2 = 0;
	
	draw();
	
	//Aqui definimos quien inicia Turno
	while ((win = check()) < 0 and temp2 < 9) {
		
		
		if (Turno == 1) TurnoPC();
		else TurnoHumano();
		Turno = 1 - Turno;
		draw();
		++temp2;
	}
	
	//en base a los movimientos y las coincidencias con nuestras wins, definimos o no un ganador.
	if (win == 1) cout << "Gane awevo! ya no juego!" << endl;
	else if (win == 2) cout <<  "Perdi, hiciste trampa!"  << endl;
	else cout << "Al mejor de 3 no seas gallina!" << endl;
	
}
