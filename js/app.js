var template = Handlebars.compile($('#num-template').html());
var arrayUniqueNum;
var uniqueNum;
var correct ;

$('#input').keypress(function (e) {
    var valueInput = $(this).val();
    var only_num = /^(?!.*(.).*\1)\d{4}$/;
    var is_num = only_num.test(valueInput);
    // Validación para que el input no esté en blanco, tenga 4 carateres y sean números
    if (e.which === 13) {
        if (is_num) {
            var arrayAnsUser = Array.from(valueInput);
            var countPicas = 0;
            var countFijas = 0;
            $.each(arrayAnsUser, function (index, value) {
                if ($.inArray(value, correct) !== -1) {
                    countPicas = countPicas + 1;
                }
                if (correct[index] === arrayAnsUser[index]) {
                    countFijas = countFijas + 1;
                }
            });
            var dataFromUser = {
                numUser: valueInput,
                picas: countPicas,
                fijas: countFijas
            }
            $(this).val('');
            $(this).removeClass("invalid");
            $('p span').removeClass("error");
            $('table tbody:first').after().prepend(template(dataFromUser));
        } else {
            $(this).addClass("invalid");
            $('p span').addClass("error");
        }
    }
    if (valueInput === correct) {
        $('.ganaste').show().css({"display": "flex"});
    }
});

generateNumbers();

$('.close a').on('click', function () {
    $('.ganaste').hide();
    $('table tbody').empty();
    generateNumbers();
});

function generateNumbers() {
    this.arrayUniqueNum = this.getArrayUniqueNum();
    this.uniqueNum = this.arrayUniqueNum.join('');
    console.log(uniqueNum);
    this.correct = this.uniqueNum;
}

function getArrayUniqueNum() {
    var arrayUniqueNum = [];
    return Array.from({ length: 4 }, () => {
        var randomValue = Math.floor((Math.random() * 9));
        while (arrayUniqueNum.includes(randomValue)) {
            randomValue = Math.floor((Math.random() * 9));
        }
        arrayUniqueNum.push(randomValue);
        return randomValue;
    });
}