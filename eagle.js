/************
 * "Орел или решка"
 * угадывать выпадающее число (0 или 1)
 * В качестве параметра можно указать файл
 */
var readline = require('readline'),
    colors = require('colors'),
    rl = readline.createInterface({
        input: process.stdin, // ввод из стандартного потока
        output: process.stdout // вывод в стандартный поток
    }),
    fs = require('fs');

// Модуль игры
var Eagle = (function () {
    //Функция игры
    function Answer(answer, logFile) {
        //
        var randomAnswer = Math.floor(2 * Math.random()),
            answerText = '',
            result;

        if (answer === '0' || answer === '1') {
            if (answer == randomAnswer) {
                answerText = 'Вы угадали'.green;
                result = 1;
            } else {
                answerText = 'Вы не угадали'.yellow;
                result = 0;
            }
        } else {
            answerText = 'Неправильный формат ввода'.red;
        }

        // Проверка на существование файла и запись
        // Запись происходит только в существующий файл
        if (logFile) {
            fs.exists(logFile, function (exists) {
                if (exists) {
                    fs.appendFile(logFile, result + "\r\n", function (err) {
                        if(err) {
                            return console.log(err);
                        }
                    });
                } else {
                    fs.open(logFile, 'a' , function(){});
                }
            });
        }
        console.log(answerText);
    }

    return {
        run: function () {
            var logFile = process.argv.slice(2)[0];

            /***
             * Логгируем
             */


            rl.question('Угадайте число? (0 или 1)', function (a) {
                Answer(a, logFile)
            });
            rl.on('line', function (a) {
                Answer(a, logFile)
            });
        }
    }
})();

Eagle.run();