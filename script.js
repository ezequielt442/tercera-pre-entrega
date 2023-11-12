// script.js
alert("English Level Test");

let contador = 0;
let currentQuestionIndex = 0;

const preguntas = [
  {
    id: 1,
    pregunta: "I ______ a bus on Mondays.",
    opciones: "1. 'm going to work with\n2. 'm going to work by\n3. go to work with\n4. go to work by",
    respuestaCorrecta: 4,
    esCorrecta: true
  },
  {
    id: 2,
    pregunta: "Sorry, but this chair is ______.",
    opciones: "1. me\n2. mine\n3. my\n4. our",
    respuestaCorrecta: 2,
    esCorrecta: true
  },
  {
    id: 3,
    pregunta: "'How old ______?' B: 'I ______.'",
    opciones: "1. are you / am 20 years old.\n2. have you / have 20 years old.\n3. are you / am 20 years.\n4. do you have / have 20 years.",
    respuestaCorrecta: 1,
    esCorrecta: true
  },
  {
    id: 4,
    pregunta: "I ______ to the cinema.",
    opciones: "1. not usually go\n2. don't usually go\n3. don't go usually\n4. do not go usually",
    respuestaCorrecta: 2,
    esCorrecta: true
  },
  {
    id: 5,
    pregunta: "Where ______ ?",
    opciones: "1. your sister works\n2. your sister work\n3. does your sister work\n4. do your sister work",
    respuestaCorrecta: 3,
    esCorrecta: true
  },
  {
    id: 6,
    pregunta: "The test is ______ February.",
    opciones: "1. in\n2. at\n3. on\n4. over",
    respuestaCorrecta: 1,
    esCorrecta: true
  },
  {
    id: 7,
    pregunta: "I eat pasta ______ week.",
    opciones: "1. twice in a\n2. twice a\n3. one time a\n4. once in a",
    respuestaCorrecta: 2,
    esCorrecta: true
  },
  {
    id: 8,
    pregunta: "I don't have ______ free time.",
    opciones: "1. many\n2. any\n3. a lot\n4. some",
    respuestaCorrecta: 2,
    esCorrecta: true
  },
  {
    id: 9,
    pregunta: "'_____ to the cinema tomorrow?'",
    opciones: "1. We will go\n2. Do we go\n3. We go\n4. Shall we go",
    respuestaCorrecta: 4,
    esCorrecta: true
  },
  {
    id: 10,
    pregunta: "We went to the market ______ some vegetables.",
    opciones: "1. to buy\n2. for buy\n3. for to buy\n4. for buying",
    respuestaCorrecta: 1,
    esCorrecta: true
  },
  // ... otras preguntas ...
];

function loadQuestion() {
  const questionContainer = document.getElementById('questionContainer');
  const optionsContainer = document.getElementById('optionsContainer');

  if (currentQuestionIndex < preguntas.length) {
    const currentQuestion = preguntas[currentQuestionIndex];

    questionContainer.innerHTML = `<p>${currentQuestion.pregunta}</p>`;

    const options = currentQuestion.opciones.split('\n');
    optionsContainer.innerHTML = options.map((option, index) => {
      return `<button onclick="checkAnswer(${index + 1})">${option}</button>`;
    }).join('');
  } else {
    // No hay más preguntas, mostrar mensaje de fin del cuestionario
    questionContainer.innerHTML = "<p>¡Fin del cuestionario!</p>";
    optionsContainer.innerHTML = "";
  }
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < preguntas.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function checkAnswer(userAnswer) {
  const correctAnswer = preguntas[currentQuestionIndex].respuestaCorrecta;

  if (userAnswer === correctAnswer) {
    contador++;
  }

  const preguntaId = `pregunta_${preguntas[currentQuestionIndex].id}`;
  const respuestaGuardada = {
    respuestaUsuario: userAnswer
  };

  localStorage.setItem(preguntaId, JSON.stringify(respuestaGuardada));

  nextQuestion();
}

function showResults() {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.innerHTML = `Gracias por participar en el cuestionario. Tu puntuación es: ${contador} respuestas correctas.`;

  if (contador < 5) {
    resultContainer.innerHTML += "<br>Tu nivel es básico.";
  } else if (contador >= 5 && contador <= 8) {
    resultContainer.innerHTML += "<br>Tu nivel es intermedio.";
  } else {
    resultContainer.innerHTML += "<br>¡Felicidades! Tu nivel es avanzado.";
  }

  resultContainer.innerHTML += "<br><br><strong>Detalles de respuestas:</strong><br>";

  preguntas.forEach((pregunta, index) => {
    const preguntaId = `pregunta_${pregunta.id}`;
    const respuestaGuardada = JSON.parse(localStorage.getItem(preguntaId));

    resultContainer.innerHTML += `<p>Pregunta ${index + 1}: ${pregunta.pregunta}</p>`;
    resultContainer.innerHTML += `<p>Opciones: ${pregunta.opciones}</p>`;
    resultContainer.innerHTML += `<p>Respuesta Correcta: ${pregunta.respuestaCorrecta}</p>`;

    if (respuestaGuardada) {
      resultContainer.innerHTML += `<p>Tu Respuesta: ${respuestaGuardada.respuestaUsuario}</p>`;
    } else {
      resultContainer.innerHTML += `<p>Tu Respuesta: No respondiste esta pregunta</p>`;
    }

    resultContainer.innerHTML += "<hr>";
  });
}

loadQuestion();  // Agregamos esto para cargar la primera pregunta al iniciar la aplicación


