/************
 * Каждая буква в консоле будет рондомного цвета
 */
/* Подключение модуля меняющего цвета консоли*/
var colors = require('colors');

//Модуль для вывода цветнойк консоли
var coloredConsole = (function(){
    //Выбор рандомного числа
    var getRandomInt = function (min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    //разбиению строки на массив и вывод каждого символа с рандомным цветом
    var ratherColors = function(str){
        var arr = str.split(''),
            output = '';
        var colors = [
            'rainbow',
            'grey',
            'cyan',
            'grey',
            'green',
            'grey',
            'cyan',
            'yellow',
            'blue',
            'red'
        ];
        for (var i= 0, arrLenght = arr.length; i<arrLenght ; i++){
            output += arr[i][colors[getRandomInt(0,colors.length-1)]];
        }
        return output;
    };
    return {
        "go" : function(sent){
            console.log(ratherColors(sent));
        }
    }
}());

coloredConsole.go("Amphibians are a class of cold-blooded vertebrates,");

