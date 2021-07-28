const costoReparacion = 10;
const costoPerdida = 20;


var metricasRegistroTodasLasTablas = [];

function obtenerInputs(){
    var cantEventos = Number(document.getElementById("cantEventos").value);
    var desde = Number(document.getElementById("mostrarDesde").value);
    var hasta = Number(document.getElementById("mostrarHasta").value);
    var media = Number(document.getElementById("media").value);
    var reparador = Number(document.getElementById("selector").value);
    var mostrarTodasLasTablas = document.getElementById("btnCheckBox").checked;
    return [cantEventos, desde, hasta, media, reparador,mostrarTodasLasTablas];
}

function averio(media,randomAverio){

    var tiempoProxAverio = -media * (Math.log(1 - randomAverio));
    return tiempoProxAverio;
}

function formulaUnReparador(randomReparacion){
    var tiempoReparacion = 25 + (randomReparacion * (35-25));
    return tiempoReparacion;
}

function formulaDosReparadores(randomReparacion){
    var tiempoReparacion = 15 + (randomReparacion * (23-15));
    return tiempoReparacion;    
}

function formulaTresReparadores(randomReparacion,randomReparacion2){
    var tiempoReparacion = (Math.sqrt( -2 * Math.log(randomReparacion)) * Math.cos(2 * Math.PI * randomReparacion2)) * 2 + 12;
    return tiempoReparacion;   
}

function formulaCuatroReparadores(randomReparacion,randomReparacion2){
    var tiempoReparacion = (Math.sqrt( -2 * Math.log(randomReparacion)) * Math.cos(2 * Math.PI * randomReparacion2)) * 3 + 8;
    return tiempoReparacion;     
}


function generarTodasLasTablas(){

    var cantEventos = obtenerInputs()[0];
    var desde = obtenerInputs()[1];
    var hasta = obtenerInputs()[2];
    var media = obtenerInputs()[3];
    var reparador = obtenerInputs()[4];
    var randomGenerales = [];
    var randomGenerales2 = [];
    var randomGeneralesAverio = [];
    var todasLasTablas = [];

    for(var j=0; j < cantEventos; j++){
        randomGenerales.push(Math.random());
        randomGenerales2.push(Math.random());
        // randomGeneralesAverio.push(Math.random());
    }

    for(var k=0; k < cantEventos*2; k++){
        randomGeneralesAverio.push(Math.random());
    }


    for(var i=1; i < 5 ; i++){
        todasLasTablas.push( generarTabla(cantEventos, desde, hasta, media, i, randomGenerales,randomGenerales2,randomGeneralesAverio));
    }

    return todasLasTablas;
}

function generarTabla(cantEventos, desde, hasta, media, reparador, random,random2,randomAverio){

    var reloj = 0;
    var arrayAutos = [];
    var tiempoProxAverio = 0;
    var proxAverio = 0;
    var finReparacion = "-";
    var tiempoReparacion = "-";
    var randomReparacion = 0;
    var randomReparacion2 = 0;
    var colaReparacion = -1;
    var estadoReparador = "Esperando Auto";
    var indicadorAuto = 0;    
    var filaTabla = [ new Array(24).fill(0), new Array(24).fill(0)];
    var grillaFinal = []; 
    var primeraVuelta = true;
    var pagoReparadores = 0;
    var perdidaPorAverio = 0;
    var cantAutosReparados = 0;
    var indiceDeRandom = 0;
    var indiceDeRandom2 = 0;
    var indiceAverio = 0;



    for(var j=1; j<=10 ; j ++){
        var auto = {
            id : j, 
            estado: "En Uso",
            tiempoReparacion: "-",
            finReparacion: "-",
            perdida: 0
        }
        arrayAutos.push(auto);
    }

    // tiempoProxAverio = averio(media, randomAverio[indiceAverio]);
    // indiceAverio++;
    // proxAverio = Number((reloj + tiempoProxAverio).toFixed(2));

    for (var i=0; i<=cantEventos ; i++){

        if( proxAverio < finReparacion || primeraVuelta || finReparacion == "-"){
            // Entra un auto averiado
            if(primeraVuelta){
                tiempoProxAverio = averio(media,randomAverio[indiceAverio]);
                indiceAverio++;
                proxAverio = Number((reloj + tiempoProxAverio).toFixed(2));
                primeraVuelta = false;
            }
            else{

                reloj = proxAverio;
            
                if(colaReparacion == 8){
                    tiempoProxAverio = "-";
                    proxAverio = "-";
                }
                else{
                    tiempoProxAverio = averio(media,randomAverio[indiceAverio]);
                    indiceAverio++;
                    proxAverio = Number((reloj + tiempoProxAverio).toFixed(2));
                }

                randomReparacion = random[indiceDeRandom];
                randomReparacion2 = random2[indiceDeRandom2];

                if(colaReparacion == -1){
                    arrayAutos[indicadorAuto].estado = "Siendo Reparado";
                }    
                else{
                    arrayAutos[indicadorAuto].estado = "Esperando Reparacion";
                }
                colaReparacion++;    
                if(reparador == 1){
                    arrayAutos[indicadorAuto].tiempoReparacion = Number(formulaUnReparador(randomReparacion).toFixed(2));
                    // console.log(randomReparacion);
                }
                else{
                    if(reparador == 2){
                        arrayAutos[indicadorAuto].tiempoReparacion = Number(formulaDosReparadores(randomReparacion).toFixed(2));
                        // console.log("2da tabla");
                        // console.log(randomReparacion);
                    }
                    else{
                        if(reparador == 3){
                            arrayAutos[indicadorAuto].tiempoReparacion = Number(formulaTresReparadores(randomReparacion,randomReparacion2).toFixed(2));
                            // console.log("3era tabla");
                            // console.log(randomReparacion);
                        }
                        else{
                            arrayAutos[indicadorAuto].tiempoReparacion = Number(formulaCuatroReparadores(randomReparacion,randomReparacion2).toFixed(2));
                            // console.log("4ta tabla");
                            // console.log(randomReparacion);
                        }
                        // random2.splice(0,1);
                        indiceDeRandom2++;
                    }
                }
                // random.splice(0,1);
                indiceDeRandom++;

                // para calcular el fin de reparacion del auto actual segun la hora fin del auto anterior en la cola
                if(finReparacion == "-"){
                    arrayAutos[indicadorAuto].finReparacion = reloj + arrayAutos[indicadorAuto].tiempoReparacion;
                }
                else{
                    if(indicadorAuto == 0){
                        var autoAnterior = 9;
                    }
                    else{
                        var autoAnterior = indicadorAuto - 1;
                    }
                    arrayAutos[indicadorAuto].finReparacion = arrayAutos[autoAnterior].finReparacion + arrayAutos[indicadorAuto].tiempoReparacion;
                }

                arrayAutos[indicadorAuto].perdida = ((arrayAutos[indicadorAuto].finReparacion - reloj) * 20) / 60;

                indicadorAuto ++;

                if(indicadorAuto == 10){
                    indicadorAuto = 0;
                }

                for(var l=0; l < arrayAutos.length; l++){
                    if(arrayAutos[l].estado == "Siendo Reparado"){
                        estadoReparador = "Reparando Auto " + arrayAutos[l].id;
                        tiempoReparacion = arrayAutos[l].tiempoReparacion;
                        finReparacion = Number((arrayAutos[l].finReparacion).toFixed(2));
                        break;
                    }
                }
            }

        }
        else{
            // Se termina de reparar un auto

            reloj = finReparacion;
            colaReparacion--;
            cantAutosReparados++;

            var cortarVuelta = false;

            for(var k=0; k < arrayAutos.length; k++){
                if(arrayAutos[k].estado == "Siendo Reparado" && cortarVuelta == false){
                    arrayAutos[k].estado = "En Uso";
                    perdidaPorAverio += arrayAutos[k].perdida;
                    pagoReparadores += ((tiempoReparacion * 10) / 60) * reparador
                    arrayAutos[k].tiempoReparacion = "-";
                    arrayAutos[k].finReparacion = "-";

                    if(arrayAutos[(k+1)%arrayAutos.length].estado == "Esperando Reparacion"){
                        arrayAutos[(k+1)%arrayAutos.length].estado = "Siendo Reparado";
                        tiempoReparacion = arrayAutos[(k+1)%arrayAutos.length].tiempoReparacion;
                        finReparacion = Number((arrayAutos[(k+1)%arrayAutos.length].finReparacion).toFixed(2));
                        estadoReparador = "Reparando Auto " + arrayAutos[(k+1)%arrayAutos.length].id;
                    }

       
                    cortarVuelta = true;
                    break;
                }

            }


            if(colaReparacion == -1){
                estadoReparador = "Esperando Auto";
                tiempoReparacion = "-";
                finReparacion = "-";
            }
            

            if(tiempoProxAverio == "-"){

                tiempoProxAverio = averio(media,randomAverio[indiceAverio]);
                indiceAverio++;
                proxAverio = Number((reloj + tiempoProxAverio).toFixed(2));

            }

        }
        filaTabla.splice(0, 1);
        var insertarRegistro = [reloj,proxAverio,tiempoReparacion,finReparacion,colaReparacion,estadoReparador,Number((pagoReparadores).toFixed(2)), Number((perdidaPorAverio).toFixed(2)), arrayAutos[0].estado,arrayAutos[1].estado,arrayAutos[2].estado,arrayAutos[3].estado,arrayAutos[4].estado,arrayAutos[5].estado,arrayAutos[6].estado,arrayAutos[7].estado,arrayAutos[8].estado,arrayAutos[9].estado];
    
        filaTabla.push(insertarRegistro);
    
        if((i >= desde && i <= hasta) || i == cantEventos) {
            grillaFinal.push(insertarRegistro);
        }

    }

    var metricasRegistro = [reparador,cantAutosReparados, Number((pagoReparadores).toFixed(2)),Number((perdidaPorAverio).toFixed(2)), Number((pagoReparadores+perdidaPorAverio).toFixed(2))];
    metricasRegistroTodasLasTablas.push(metricasRegistro);

    return grillaFinal;

}
console.log(metricasRegistroTodasLasTablas);

function metricasGenerales(metricasRegistroTodasLasTablas){
    var grilla = metricasRegistroTodasLasTablas;
    var registroMenorTotal = [];
    var tablaMetricas = document.getElementById("tablaMetricas");
    // var metricas = document.getElementsByClassName("metricas")[0].style.display = "block";
    // metricas.innerHTML = '<h1 class="tituloMetricas">Metricas</h1>';
    tablaMetricas.innerHTML = "<tr><th>Cantidad Reparadores</th><th>Cantidad Autos Reparados</th><th>Costo Reparadores</th><th>Perdida por Averio</th><th>Total Gastos/Perdida</th></tr>";

    for(var j=0; j<grilla.length; j++){
    registroMenorTotal.push(grilla[j][4]);
    }
    var menor = Math.min.apply(null,registroMenorTotal)

    for(var i=0; i<grilla.length; i++) {
        if(grilla[i][4] == menor){
            var cadena = '<tr><td class="menorTotal">' + grilla[i][0] +'</td>';
            cadena += '<td class="menorTotal">' + (grilla[i][1]) + '</td>';
            cadena += '<td class="menorTotal">' + (grilla[i][2]) + '</td>';
            cadena += '<td class="menorTotal">' + (grilla[i][3]) + '</td>';
            cadena += '<td class="menorTotal">' + (grilla[i][4]) + '</td></tr>';
        }
        else{
            var cadena = '<tr><td>' + grilla[i][0] +'</td>';
            cadena += '<td>' + (grilla[i][1]) + '</td>';
            cadena += '<td>' + (grilla[i][2]) + '</td>';
            cadena += '<td>' + (grilla[i][3]) + '</td>';
            cadena += '<td>' + (grilla[i][4]) + '</td></tr>';
        }
        tablaMetricas.innerHTML += cadena;
    }
    tablaMetricas.style.display = "block";

}

function rellenarTabla() {
    var reparador = obtenerInputs()[4];
    var mostrarTodasLasTablas = obtenerInputs()[5];
    var grilla;
    var todasLasGrillas;
    todasLasGrillas = generarTodasLasTablas()

    for(var m = 1; m < 5 ; m++){
        var tablaLimpiar = document.getElementById("tabla"+m);
        tablaLimpiar.innerHTML = "";
    }



    for(var k = 1; k < 5; k++){

        if(mostrarTodasLasTablas){
            var tabla = document.getElementById("tabla"+k);
            grilla = todasLasGrillas[k-1];
        }
        else{
            var tabla = document.getElementById("tabla"+reparador);
            grilla = todasLasGrillas[reparador-1];
            k = 5
        }



        tabla.innerHTML = "<tr><th>Reloj</th><th>Proximo Averio</th><th>Tiempo Reparacion</th><th>Fin Reparacion Actual</th><th>Cola de Reparacion</th><th>Estado Reparador</th><th>Costo Reparar</th><th>Perdida por Averio</th><th>Estado Auto 1</th><th>Estado Auto 2</th><th>Estado Auto 3</th><th>Estado Auto 4</th><th>Estado Auto 5</th><th>Estado Auto 6</th><th>Estado Auto 7</th><th>Estado Auto 8</th><th>Estado Auto 9</th><th>Estado Auto 10</th></tr>";
        for(var i=0; i<grilla.length; i++) {
            var cadena = '<tr><td>' + grilla[i][0] +'</td>';

            if(grilla[i][1] < grilla[i][3] || grilla[i][3] == "-"){
                cadena += '<td class="proxEvento">' + (grilla[i][1]) + '</td>';
            }
            else{
                cadena += '<td>' + (grilla[i][1]) + '</td>';
            }

            cadena += '<td>' + (grilla[i][2]) + '</td>';

            if(grilla[i][3] < grilla[i][1] || grilla[i][1] == "-"){
                cadena += '<td class="proxEvento">' + (grilla[i][3]) + '</td>';
            }
            else{
                cadena += '<td>' + (grilla[i][3]) + '</td>';
            }
            if(grilla[i][4] == -1){
                grilla[i][4] = 0;
            }
            cadena += '<td>' + grilla[i][4] + '</td>';
            if(grilla[i][5] == "Esperando Auto"){
                cadena += '<td id="estadoReparador1">' + grilla[i][5] + '</td>';
            }
            else{
                cadena += '<td id="estadoReparador2">' + grilla[i][5] + '</td>';
            }
            cadena += '<td>' + grilla[i][6] + '</td>';
            cadena += '<td>' + grilla[i][7] + '</td>';

            for(var j=8; j <= 17; j++){

                if(grilla[i][j] == "En Uso"){
                    cadena += '<td class="estadoEnUso">' + grilla[i][j] + '</td>';
                }
                else{
                    if(grilla[i][j] == "Siendo Reparado"){
                        cadena += '<td class="estadoSiendoReparado">' + grilla[i][j] + '</td>';
                    }
                    else{
                        cadena += '<td class="esperandoReparacion">' + grilla[i][j] + '</td>';
                    }
                    
                }
            }
            cadena += '</tr>'


            tabla.innerHTML += cadena;
        }
    }

    

}





function main() {
    rellenarTabla();

    for(var k = 1; k < 5; k++){
        var tabla = document.getElementById("tabla"+k);
        tabla.style.display = "block";
    }
    metricasGenerales(metricasRegistroTodasLasTablas);
    metricasRegistroTodasLasTablas = [];
}

document.getElementById("btnAceptar").addEventListener('click', () => {
    main();
})

