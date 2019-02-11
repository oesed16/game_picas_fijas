// Declaración de variables 
var template = Handlebars.compile($('#num-template').html()); // Para el template que incorpora la tabla con el historial de cada juego en la interfaz de usuario.
var arrayUniqueNum; // Para almacenar el arreglo que contiene los cuatro números únicos generados aleatoriamente.
var uniqueNum; // Para almacenar el número único de cuatro dígitos. 
var correct; // Para almacenar lo que se denominará la respuesta correcta.

// Función de JQuery que permite escuchar el evento al oprimir la tecla Enter.
$('#input').keypress(function (e) {
    var valueInput = $(this).val(); // Captura el valor del input, valor ingresado por el usuario.
    var only_num = /^(?!.*(.).*\1)\d{4}$/; // Expresión regular que identifica caracteres numéricos y restringe el tamaño del valor del input a cuatro.
    var is_num = only_num.test(valueInput); // Validación para que el input no esté en blanco, tenga 4 carateres y sean números.
    if (e.which === 13) { // Condicional para identificar la tecla Enter.
        if (is_num) { // Condicional para validar que el valor del input cumple con las especificaciones.
            var arrayAnsUser = Array.from(valueInput); // Almacena el arreglo conformado por la respuesta ingresada en el input.
            var countPicas = 0; // Contador de Picas del número ingresado en el input.
            var countFijas = 0; // Contador de Fijas del número ingresado en el input.
            $.each(arrayAnsUser, function (index, value) { // Función de JQuery que permite recorrer arreglos.
                if ($.inArray(value, correct) !== -1) { // Condicional que permite comparar arreglos y encontrar coincidencias de valores.
                    countPicas = countPicas + 1; // De cumplirse la condición anterior, incrementa el número de picas.
                }
                if (correct[index] === arrayAnsUser[index]) { // Condicional que permite encontrar coincidencias en posiciones de arreglos.
                    countFijas = countFijas + 1; // De cumplirse la condición anterior, incrementa el número de fijas.
                }
            });
            var dataFromUser = { // Objeto que contiene los valores a mostrar en la tabla de la interfaz del usuario.
                numUser: valueInput, // Número ingresado por el usuario.
                picas: countPicas, // Número de Picas del número ingresado por el usuario.
                fijas: countFijas // Número de Fijas del número ingresado por el usuario.
            }
            $(this).val(''); // Limpia el input para ingresar un nuevo valor.
            $(this).removeClass("invalid"); // De cumplirse la condición, remueve la clase que indica errores a través del input.
            $('p span').removeClass("error"); // De cumplirse la condición, remueve la clase que indica errores a través de texto.
            $('table tbody:first').after().prepend(template(dataFromUser)); // Template que incorpora las filas de la tabla en la primera posición después del encabezado.
        } else { // Cuando el valor del input no cumple las especificaciones.
            $(this).addClass("invalid"); // Añade la clase que indica errores a través del input.
            $('p span').addClass("error"); // Añade la clase que indica errores a través de texto.
        }
        if (valueInput === correct) { // Condición que valida que el valor ingresado por el usuario corresponde a la respuesta correcta.
            $('.ganaste').show().css({ "display": "flex" }); // De cumplirse la condición, se muestra la interfaz de ganador, la cual le permite al usuario volver a jugar.
            // Función de JQuery que permite escuchar el evento al dar click a la opción "Jugar Nuevamente".
            $('.close a').on('click', function () { 
                $('.ganaste').hide(); // Oculta la interfaz de ganador.
                location.reload(); //  Recarga el documento actual para iniciar un juego nuevo.
                generateNumber(); // Genera aleatoriamente un nuevo número que contiene cuatro dígitos únicos.
            });
        }
    }
});

generateNumber(); // Llamado a la función que genera aleatoriamente el número de cuatro dígitos únicos.

// Función que genera aleatoriamente el número de cuatro dígitos únicos.
function generateNumber() { 
    this.arrayUniqueNum = this.getArrayUniqueNum(); // Obtiene el arreglo que contiene el número de cuatro dígitos únicos.
    this.uniqueNum = this.arrayUniqueNum.join(''); // Obtiene el número de cuatro dígitos únicos.
    this.correct = this.uniqueNum; // Asigna el número generado aleatoriamente como respuesta correcta.
}
console.log(correct); // Imprime en consola el valor de la respuesta correcta.

// Función que genera aleatoriamente el arreglo de cuatro dígitos únicos.
function getArrayUniqueNum() {
    var arrayUniqueNum = []; // Variable para almacenar los números generados aleatoriamente.
    return Array.from({ length: 4 }, () => { // Retorna un array de cuatro dígitos, generado aleatoriamente.
        var randomValue = Math.floor((Math.random() * 9)); // Almacena el dígito generado aleatoriamente, dígito que debe estar entre 0 y 9.
        while (arrayUniqueNum.includes(randomValue)) { // Ciclo para asegurar que no se repitan dígitos en el número generado.
            randomValue = Math.floor((Math.random() * 9)); // De repetirse el dígito, vuelve a generar uno nuevo.
        }
        arrayUniqueNum.push(randomValue); // Incorpora en un array los dígitos generados.
        return randomValue; // Retorna el dígito generado aleatoriamente.
    });
}