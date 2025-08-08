 document.getElementById('btn').addEventListener('click' Verificar);

        function Verificar() {
    var n = Number(document.getElementById("btn1").value);
    var res = document.getElementById("res");

    if (n % 2 == 0) {
        res.innerHTML = 'O numero' + n + ' é par';
    }
    else { 
        res.innerHTML = 'O numero ' + n + ' é impar';
    }

}  