const responses = ['b', 'a', 'c', 'a', 'b'];
const emojis = ['✔️', '✨', '👀', '😭', '👎'];

// Selectionne le formulaire
const form = document.querySelector('.quiz-form');

// Ajoute un écouteur d'événement pour le submit
form.addEventListener('submit', handleSubmit);

// Fonction appelée lors du submit
function handleSubmit(event) {
  // Annule le comportement par défaut du formulaire
  event.preventDefault();

  // Récupère les réponses des inputs radio cochés
  const results = [];
  const radioButtons = document.querySelectorAll('input[type="radio"]:checked');

  // Compare les réponses aux réponses attendues
  radioButtons.forEach((radioButton, index) => {
    // Si la réponse est correcte, ajoute true au tableau results
    if (radioButton.value === responses[index]) {
      results.push(true);
    }
    // Sinon, ajoute false
    else {
      results.push(false);
    }
  });

  // Appelle la fonction showResults avec le tableau results
  showResults(results);
  // Appelle la fonction addColors avec le tableau results
  addColors(results);
}

const titleResult = document.querySelector('.quiz-title');

// Fonction pour afficher les résultats
function showResults(results) {
  // Compte le nombre de réponses fausses
  const errorsNumber = results.filter((el) => el === false).length;

  // Affiche le nombre de réponses correctes au cas par cas
  switch (errorsNumber) {
    case 0:
      titleResult.textContent = `✔️ 5 / 5 | Bravo, c'est un sans faute ! ✔️`;
      break;
    case 1:
      titleResult.textContent = `✨ 4 / 5 | Vous y êtes presque ! ✨`;
      break;
    case 2:
      titleResult.textContent = `✨ 3 / 5 | Encore un effort ... 👀`;
      break;
    case 3:
      titleResult.textContent = `👀 2 / 5 | Il reste quelques erreurs. 😭`;
      break;
    case 4:
      titleResult.textContent = `😭 1 / 5 | Peut mieux faire ! 😭`;
      break;
    case 5:
      titleResult.textContent = `👎 0 / 5 | BOOH OOH OOH ! 👎`;
      break;

    default:
      titleResult.textContent = `Whops!, je n'avais pas prévu ce cas de figure ! 🤯`;
  }
}

// Fonction pour ajouter des couleurs aux réponses
const questions = document.querySelectorAll('.quiz-question');

function addColors(results) {
  results.forEach((response, index) => {
    // Si la réponse est correcte, ajoute un fond vert
    if (results[index]) {
      questions[index].style.backgroundImage =
        'linear-gradient(to right, #a8ff78, #78ffd6)';
    }
    // Sinon, ajoute un fond rouge
    else {
      questions[index].style.backgroundImage =
        'linear-gradient(to right, #ff78a8, #f5567d)';
    }
  });
}

// Sélectionne tous les inputs de type radio
const radioInputs = document.querySelectorAll('input[type="radio"]');

radioInputs.forEach((radioInput) =>
  radioInput.addEventListener('input', resetColors)
);

// Fonction pour réinitialiser les couleurs
function resetColors(event) {
  // Récupère l'index de la question
  const index = event.target.getAttribute('name').slice(-1) - 1;
  const parentQuizQuestion = questions[index];

  // Réinitialise les couleurs
  parentQuizQuestion.style.backgroundColor = '#f1f1f1';
  parentQuizQuestion.style.backgroundImage = 'none';
}
