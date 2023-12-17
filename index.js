const fs = require('fs');
const inquirer = require('inquirer');


const tareas = [];

function mostrarTareas() {
  console.log('Tareas:');
  for (const tarea of tareas) {
    console.log(`  - ${tarea.indicador}: <span class="math-inline">\{tarea\.descripcion\} \(</span>{tarea.estado ? 'Completada' : 'Pendiente'})`);
  }
}

function añadirTarea() {
  const pregunta = [
    {
      type: 'input',
      name: 'indicador',
      message: 'Indica el indicador de la tarea:',
    },
    {
      type: 'input',
      name: 'descripcion',
      message: 'Indica la descripción de la tarea:',
    },
  ];

  const respuesta = prompt(pregunta);

  tareas.push({
    indicador: respuesta.indicador,
    descripcion: respuesta.descripcion,
    estado: false,
  });
}

function completarTarea() {
  const pregunta = [
    {
      type: 'input',
      name: 'indicador',
      message: 'Indica el indicador de la tarea a completar:',
    },
  ];

  const respuesta = prompt(pregunta);

  for (const tarea of tareas) {
    if (tarea.indicador === respuesta.indicador) {
      tarea.estado = true;
      break;
    }
  }
}

function eliminarTarea() {
  const pregunta = [
    {
      type: 'input',
      name: 'indicador',
      message: 'Indica el indicador de la tarea a eliminar:',
    },
  ];

  const respuesta = prompt(pregunta);

  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].indicador === respuesta.indicador) {
      tareas.splice(i, 1);
      break;
    }
  }
}

function mostrarMenu() {
  const opciones = [
    {
      name: '1',
      value: 'Mostrar tareas',
    },
    {
      name: '2',
      value: 'Añadir tarea',
    },
    {
      name: '3',
      value: 'Completar tarea',
    },
    {
      name: '4',
      value: 'Eliminar tarea',
    },
    {
      name: '5',
      value: 'Salir',
    },
  ];

  const respuesta = prompt({
    type: 'select',
    name: 'opcion',
    message: '¿Qué quieres hacer?',
    choices: opciones,
  });

  switch (respuesta.opcion) {
    case '1':
      mostrarTareas();
      break;
    case '2':
      añadirTarea();
      break;
    case '3':
      completarTarea();
      break;
    case '4':
      eliminarTarea();
      break;
    case '5':
      console.log('Hasta pronto!');
      break;
  }
}

// Cargamos las tareas del archivo
const tareasArchivo = readFileSync('tareas.json', 'utf-8');
tareas = JSON.parse(tareas)