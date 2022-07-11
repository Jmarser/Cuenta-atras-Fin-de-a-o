/* Constantes vinculadas con el DOM */
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const body = document.getElementsByTagName("body");
const mensaje = document.getElementById("mensaje");

//obtenemos el año actual del sistema
var anioActual = new Date().getFullYear();

//Calculamos los días que tiene el año
var diasAnio = totalDias(anioActual);

const nuevo = "1 jan " + (anioActual + 1);

/* Obtenemos los días del año en los que comienzan las estaciones */
var primavera = diasAnio - diasEstacion(anioActual, 2, 20);
var verano = diasAnio - diasEstacion(anioActual, 5, 21);
var otonio = diasAnio - diasEstacion(anioActual, 8, 22);
var invierno = diasAnio - diasEstacion(anioActual, 11, 21);


function cuentaAtras(){

    const nyd = new Date(nuevo);
    const actual = new Date();

    var aux = (nyd - actual) / 1000;

    var dias = Math.floor(aux / 3600 / 24);
    var horas = Math.floor(aux / 3600)% 24;
    var minutos = Math.floor(aux / 60) % 60;
    var segundos = Math.floor(aux % 60);

    let imagen = "";
    mensaje.innerText = "";

    if(dias >= 365){
        imagen += "url('../img/new_year.jpg')";
        mensaje.innerText = "FELIZ AÑO NUEVO";
    }else if(dias <= diasAnio && dias > primavera){
        imagen += "url('../img/winter_dia.jpg')";
    }else if(dias <= primavera && dias > verano){
        imagen += "url('../img/spring_dia.jpg')";
    }else if(dias <= verano && dias > otonio){
        imagen += "url('../img/summer_dia.jpg')";
    }else if(dias <= otonio && dias > invierno){
        imagen += "url('../img/autumn_dia.jpg')";
    }else if(dias <= invierno && dias > 25){
        imagen += "url('../img/winter_dia.jpg')";
    }else if(dias <= 25){
        imagen += "url('../img/navidad.jpg')";
        mensaje.innerText = "FELIZ NAVIDAD";
    }

    days.innerHTML = dias;
    hours.innerHTML = format(horas);
    min.innerHTML = format(minutos);
    sec.innerHTML = format(segundos);
    body[0].style.backgroundImage = imagen;
}

/* Formateamos para que la salida tenga dos dígitos */
function format(segundos){
    return (segundos < 10) ? ("0" + segundos) : segundos;
}

/* Nos devuelve el día del año en el que comienza la estación */
function diasEstacion(anio, meses, dias){
    let aux = 0;
    for(let i = 1; i <= meses; i++){
        aux += new Date(anio, i, 0).getDate();
    }
    return aux + dias;
}

/* Nos devuelve la cantidad de días que tiene el año */
function totalDias(anio){
    let aux2 = 0;
    for(let i = 1; i <= 12; i++){
        aux2 += new Date(anio, i, 0).getDate();
    }

    return aux2;
}

//Llamamos al método para realizar la cuenta atras
cuentaAtras();
//Le indicamos que lo repita cada segundo 
setInterval(cuentaAtras, 1000);