/************
 * "Орел или решка"
 * угадывать выпадающее число (0 или 1)
 */
var readline = require('readline'),
    colors = require('colors'),
    rl = readline.createInterface({
        input: process.stdin, // ввод из стандартного потока
        output: process.stdout // вывод в стандартный поток
    }),
    fs = require('fs');
var Eagle = (function () {
    function Answer(answer) {
        var randomAnswer = Math.floor(2 * Math.random()),
            answerText = '';


        if (answer === '0' || answer === '1') {
            if (answer == randomAnswer) {
                answerText = 'Вы угадали'.green;
            } else {
                answerText = 'Вы не угадали'.yellow;
            }
        } else {
            answerText = 'Неправильный формат ввода'.red;
        }
        console.log(answerText);
    }

    return {
        run : function(){
            var logFile = process.argv.slice(2)[0];
            /***
             * Логгируем
             */
            if(logFile){
                fs.readFile(logFile, function (err, data) {
                    if (err) throw err;
                    console.log(data.toString());
                });
            }

            rl.question('Угадайте число? (0 или 1)', function (a) {
                Answer(a)
            });
            rl.on('line', function (a) {
                Answer(a)
            });
        }
    }
})();

Eagle.run();