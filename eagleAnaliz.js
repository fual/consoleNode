/************
 * "Орел или решка"
 * Анализ результатов
 */
var readline = require('readline'),
    colors = require('colors'),
    rl = readline.createInterface({
        input: process.stdin, // ввод из стандартного потока
        output: process.stdout // вывод в стандартный поток
    }),
    fs = require('fs');

// Модуль игры
var EagleAnaliz = (function () {
    //Функция игры
    function Statistic(logFile) {
        // Создаем переменные колличество партий, кол-во побед, кол-во побед подряд,
        // Кол-во порожений, кол-во порожений подряд
        var count = 0, win = 0, winC = '0', loos = 0, loosC = 0;
        //Если лог файл задан
        if (logFile) {
            //Если лог файл существует
            fs.exists(logFile, function (exists) {
                if (exists) {
                    fs.createReadStream(logFile)
                        .on('data', function (chunk) {

                            var arr = chunk.toString().split('\r\n'),
                                arrWins = chunk.toString().replace(/(?:\\[rn]|[\r\n]+)+/g, "").split('0'),
                                arrLoos = chunk.toString().replace(/(?:\\[rn]|[\r\n]+)+/g, "").split('1');

                            arrLoos.map(function(i){
                                loosC = (i.length > loosC) ? i.length : loosC;
                            });
                            arrWins.map(function(i){
                                winC = (i.length > winC) ? i.length : winC;
                            });

                            count = arr.length - 1;
                            arr.forEach(function(i){
                                if(i == 0){
                                    loos++
                                }else if(i == 1){
                                    win++
                                }
                            })
                        })
                        .on('end', function () {
                            console.log("Общее колличество партий:" + count);
                            console.log("Общее кол-во побед:" + win);
                            console.log("Общее кол-во поражений:" + loos);
                            console.log("Соотношение побед и прогрышей:" + ( win/ loos ).toFixed(2));
                            console.log("максимальное число побед" + winC);
                            console.log("максимальное число прогрышей" + loosC);
                        });
                }
            });
        }
    }

    return {
        run: function () {
            var logFile = process.argv.slice(2)[0];
            Statistic(logFile);
        }
    }
})();

EagleAnaliz.run();