// solo leer números en el input y agregar enter para hacer la accion
function numeros(evt) {
  var code = evt.which ? evt.which : evt.keyCode;

  if (code == 8) {
    // backspace.
    return true;
  } else if (code >= 48 && code <= 57) {
    // is a number.
    return true;
  } else if (code == 13) {
    validarAnio();
  } else {
    // other keys.
    return false;
  }
}

// leer input
let boton = document.getElementById("boton");
let input = document.getElementById("anio");

// Declarar variables globales para obtener el año
let anioActual, anio;

// Pintar el dia actual
const diaActual = () => {
  // Obtener año actual
  anioActual = new Date();
  anio = anioActual.getFullYear();

  // Obtener nombre del mes
  const mesActual = anioActual.toLocaleString("es", { month: "long" });
  let nombreMesActual = mesActual.toUpperCase();

  // Obtener numero de dia actual
  const numDiaActual = anioActual.getDate();
  // console.log(anio, mesActual, nombreMesActual, numDiaActual);

  const datos = {
    anioUsuario: anio,
    nombreMesUsuario: nombreMesActual,
    numDiaUsuario: numDiaActual,
  };

  return datos;
};

// Obtener el valor del input
const validarAnio = () => {
  if (input.value == "") {
    anioActual = new Date();
    anio = anioActual.getFullYear();
    calendario(anio);
    diaActual();
  } else {
    anio = parseInt(input.value);
    calendario(anio);
    diaActual();
  }
};

// Agregar funcion al hacer click en el boton
boton.addEventListener("click", function () {
  validarAnio();
});

// Creacion del calendario
const calendario = (anioObtenido) => {
  let check = false;
  // console.log(anioObtenido);
  // Obtener el formato y numero de meses
  const formatoMes = { month: "long" };
  const indexMeses = [...Array(12).keys()];

  // Obteniendo el nombre del mes, los dias totales de cada mes y el dia de inicio
  const nombreMeses = indexMeses.map((mes) => {
    const anioMeses = new Date(anioObtenido, mes);
    const nombreMes = new Intl.DateTimeFormat("es", formatoMes);

    // Obtener el numero de dias del mes
    const diasMes = new Date(anioObtenido, mes + 1, 0);

    return {
      nombreMes: nombreMes.format(anioMeses).toUpperCase(),
      diasMes: diasMes.getDate(),
      diaInicio: new Date(anioObtenido, mes, 1).getDay(),
    };
  });

  // Obteniendo los div donde colocaremos el contenido de cada mes
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
      let inicio = index.diaInicio;
      let atributoPrimerDia;
      if (inicio == 0) {
        let previoInicio = 7;
        atributoPrimerDia = `class='primer-dia' style='--primer-dia-inicio: ${previoInicio}'`;
      } else {
        atributoPrimerDia = `class='primer-dia' style='--primer-dia-inicio: ${inicio}'`;
      }

      let atributoDiaActual = `class = 'diaActual'`;

      const pintarDias = dias
        .map((numDia) => {
          // Obtener año actual
          anioActual = new Date();
          anio = anioActual.getFullYear();

          // Obtener nombre del mes
          const mesActual = anioActual.toLocaleString("es", { month: "long" });
          let nombreMesActual = mesActual.toUpperCase();

          // Obtener numero de dia actual
          const numDiaActual = anioActual.getDate();

          if (
            anio == anioObtenido &&
            nombreMesActual == index.nombreMes &&
            numDia + 1 == numDiaActual
          ) {
            check = true;
            return `
        <li ${(numDia === 0 ? atributoPrimerDia : "", atributoDiaActual)}>${
              numDia + 1
            }</li>
    `;
          } else {
            return `
        <li ${numDia === 0 ? atributoPrimerDia : ""}>${numDia + 1}</li>
    `;
          }
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

  divAnio.innerHTML = `<h1>Año ${anioObtenido}</h1>`;
  divCalendario.innerHTML = pintarHTML;
  input.value = "";
  let scroll = ".diaActual";
  // console.log(scroll);
  if (check) {
    scrollDiaActual(scroll);
  }
};

const scrollDiaActual = (elemento) => {
  const espacioDiaActual = document.querySelector(elemento);
  espacioDiaActual.scrollIntoView({
    behavior: "smooth",
  });
};
