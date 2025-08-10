function converter() {
    let celsius = document.getElementById("celsius").value;
    celsius = parseFloat(celsius);

    let fahrenheit = (celsius * 9/5) + 32;

    document.getElementById("resultado").innerText = ${celsius}"°C" = ${fahrenheit.tofixed(2)}"°F";

    if (isNaN(celsius)) {
        document.getElementById("resultado").innerText = "Digite uma temperatura valida"; return;
    }
}