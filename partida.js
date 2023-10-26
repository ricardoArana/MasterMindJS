class Partida {
    constructor() {
        this.combinacionGanadora = this.crearCombinacionGanadora();
    }
    
    crearCombinacionGanadora() {
        const colores = ["rojo", "azul", "amarillo", "verde"];
        const arrayAleatorio = [];

        for (let i = 0; i < 4; i++) {
          const indiceAleatorio = Math.floor(Math.random() * colores.length);
          arrayAleatorio.push(colores[indiceAleatorio]);//Del array de colores, añade un color aleatorio a otro array hasta 4 veces
        }
      
        return arrayAleatorio;
      }
}


