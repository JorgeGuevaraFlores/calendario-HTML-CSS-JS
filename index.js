// leer input

let boton = document.getElementById("boton");
let input = document.getElementById("anio");

// solo leer números en el input
function numeros(evt) {
  var code = evt.which ? evt.which : evt.keyCode;

  if (code == 8) {
    // backspace.
    return true;
  } else if (code >= 48 && code <= 57) {
    // is a number.
    return true;
  } else {
    // other keys.
    return false;
  }
}

const calendario = () => {
  // Dibujar calendario

  // Obtener meses
  const formatoMes = { month: "long" };
  const indexMeses = [...Array(12).keys()];

  const nombreMeses = indexMeses.map((mes) => {
    const anioMeses = new Date(anio, mes);
    const nombreMes = new Intl.DateTimeFormat("es", formatoMes);

    // Obtener el numero de dias del mes
    const diasMes = new Date(anio, mes + 1, 0);

    return {
      nombreMes: nombreMes.format(anioMeses).toUpperCase(),
      diasMes: diasMes.getDate(),
      diaInicio: new Date(anio, mes, 1).getDay(),
    };
  });

  let divAnio = document.getElementById("anioSeleccionado");
  let divCalendario = document.getElementById("calendario");

  let pintarHTML = nombreMeses
    .map((index) => {
      const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
      const pintarSemana = diasSemana
        .map((dia) => {
          return `
        <li>${dia}</li>
    `;
        })
        .join("");
      const dias = [...Array(index.diasMes).keys()];
      const inicio = index.diaInicio;
      const atributoPrimerDia = `class='primer-dia' style='--primer-dia-inicio: ${inicio}'`;

      const pintarDias = dias
        .map((numDia) => {
          return `
        <li ${numDia === 0 ? atributoPrimerDia : ""}>${numDia + 1}</li>
    `;
        })
        .join("");

      return `
        <div class='mes'>
            <h2>${index.nombreMes}</h2>
            <ol>
                ${pintarSemana}
                ${pintarDias}
            </ol>
        </div>
    `;
    })
    .join("");

  divAnio.innerHTML = `<h1>Año ${anio}</h1>`;
  divCalendario.innerHTML = pintarHTML;
  input.value = "";
};

// Obtener año actual
var anioActual, anio;
if (input.value == "") {
  anioActual = new Date();
  anio = anioActual.getFullYear();
  calendario();
}
// console.log(anio)

// console.log(input);

boton.addEventListener("click", function () {
  if (input.value == "") {
    anioActual = new Date();
    anio = anioActual.getFullYear();
    calendario();
  } else {
    anio = parseInt(input.value);
    calendario();
  }
});
