//Aqui declaro las variables que no necesitan la carga del DOM
let colorSeleccionado = ''; //Variable con el color seleccionado para aplicarselo al tablero
let contAciertos = 0; //este es el contador para saber si ha ganado
let contadorFilasTablero = 0; //Este es el contador usado para saber por cual fila va el usuario
let combinacionGanadora = obtenerCombinacionganadora(); 

function seleccionarcolor() {
    colorSeleccionado = this.className;
}


function comprobarVictoria(){
    return contAciertos == 4;
}




function main() {

    
    jugadorTable = document.querySelector('.fichasJugadorTable');//selecciono las tablas del DOM
    tableroTable = document.querySelector('.tableroTable');
    pistasTable = document.querySelector('.pistasTable');
    
    let filaTablero=[]; //Aqui voy guardando cada fila por la que el usuario va, así compruebo los aciertos
    
    let trJugador = jugadorTable.getElementsByTagName('tr'); //cada tr dentro de las tablas
    let trTablero = tableroTable.getElementsByTagName('tr');
    let trPistas = pistasTable.getElementsByTagName('tr');
    
    
    function mostrarPistas(filaTablero) { //mostrarPistas espera recibir la ultima fila que el usuario ha completado y muesrta las pistas
        let combinacionGanadora = obtenerCombinacionganadora();
        todosTd = [];
        for (let i = 0; i < trPistas.length; i++) { //aqui obtengo cada tr con sus td
            let cadaTr = trPistas[i].getElementsByTagName("td"); 
            for (let j = 0; j < cadaTr.length; j++) {
                todosTd.push(cadaTr[j]) //en todosTd estoy guardando cada elemento td de las pistas
                
            }
            
        }
    
        for (let i = 0; i < 4; i++) {//voy recorriendo cada fila de las pistas i<4 porque son las combinaciones posibles    
            if (filaTablero.includes(combinacionGanadora[i])) { //Comprueba si la fila del usuario contiene un color ganador
                    todosTd[i + contadorFilasTablero].classList.remove("grisPista");
                    todosTd[i + contadorFilasTablero].classList.add("blancoPista");
                }
                console.log(filaTablero[i] + " " + combinacionGanadora[i])
            if(combinacionGanadora[i] == filaTablero[i]){//comprueba si el usuario ha acertado posicion y color
                contAciertos++;
                todosTd[i + contadorFilasTablero].classList.remove("grisPista");
                todosTd[i + contadorFilasTablero].classList.remove("blancoPista");
                todosTd[i + contadorFilasTablero].classList.add("negroPista");
            }
                
            }
            if (comprobarVictoria()) {
                alert("HAS GANADO!")
            }
            contAciertos = 0;
        contadorFilasTablero += 4; //le sumamos 4 para que en la siguiente vez que se llame a la funcion cambie la siguiente lista
    }



    for (let i = 0; i < trJugador.length; i++) {
        let td = trJugador[i].getElementsByTagName('td')[0] //Selecciona los colores que se le proporciona al jugador y le añade un evento
        td.addEventListener('click', seleccionarcolor);

    }



    for (let i = 0; i < trTablero.length; i++) { //Selecciona las casillas del tablero y añade un evento a cada una
        for (let j = 0; j < 4; j++) {
            let td = trTablero[i].getElementsByTagName('td')[j]
            td.addEventListener('click', seleccionarCombinacion);

        }

    }
    function seleccionarCombinacion() {
        if (colorSeleccionado != '') {
            cambiarColor()
        }
    }
    function cambiarColor() {
        for (let i = 0; i < trTablero.length; i++) {
            for (let j = 1; j < 5; j++) {
                let td = trTablero[i].getElementsByTagName('td')[j-1]
                if (td.className == 'gris') {

                    td.classList.remove("gris");
                    td.classList.add(colorSeleccionado);
                    filaTablero.push(td.className)
                    if (j % 4 == 0) {
                        mostrarPistas(filaTablero)
                        if (filaTablero.length % 4 == 0) {
                            filaTablero = []
                        }
                    }

                    return
                }

            }

        }
    }
}


window.onload = main;

