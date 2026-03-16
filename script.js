


let currentLanguage = localStorage.getItem("siteLanguage") || "ru";

// Переводы элементов HTML у которых data-long
const translations = {
  ru: {
    trenDif: "Выберите упражнения",
    legs: "Ноги",
    chest: "Грудь",
    back: "Спина",
    shoulders: "Плечи",
    abs: "Пресс",
    mytren: "Моя тренировка",
    totalsum: "Всего упражнений:",
    saveAsPdf: "Скачать тренировку в PDF",
    infoSave: "Здесь хранятся все тренировки, которые были сохранены и скачаны с сайта.",
    mytrenSaved: "Мои тренировки"
  },
  en: {
    trenDif: "Choose exercises",
    legs: "Legs",
    chest: "Chest",
    back: "Back",
    shoulders: "Shoulders",
    abs: "Abs",
    mytren: "My Workout",
    totalsum: "Total exercises:",
    saveAsPdf: "Download workout as PDF",
    infoSave: "All workouts that were saved and downloaded from the website are stored here.",
    mytrenSaved: "My Workouts"
  }
};

// Переводы строк которые создаются в Js
const jsTranslations = {
  ru: {
    add: "Добавить",
    sets: "Подходы",
    reps: "Повторы",
    workoutName: "Моя тренировка",
    date: "Дата",
    totalExercises: "Всего упражнений",
    workoutEmpty: "Список тренировки пуст!",
    pdfError: "pdfMake не подключён! Проверь подключение библиотек.",
    workoutPlaceholder: "Название тренировки",
    downloadPdf: "Скачать PDF",
    pdfFileName: "Тренировка.pdf",
    unknownExercise: "Неизвестное упражнение"
  },
  en: {
    add: "Add",
    sets: "Sets",
    reps: "Reps",
    workoutName: "My Workout",
    date: "Date",
    totalExercises: "Total exercises",
    workoutEmpty: "The workout list is empty!",
    pdfError: "pdfMake is not connected! Check the library connection.",
    workoutPlaceholder: "Workout name",
    downloadPdf: "Download PDF",
    pdfFileName: "Workout.pdf",
    unknownExercise: "Unknown exercise"
  }
};

window.rerenderDynamicContent = null;



// База упражнений c переводами
const exercises = {
  legs: [
    { id: 1, name: { ru: "Приседания", en: "Squats" }, img: "../imajes/exercises/prisedaniya.webp" },
    { id: 2, name: { ru: "Жим ногами", en: "Leg Press" }, img: "../imajes/exercises/zim-nagami.webp" },
    { id: 3, name: { ru: "Выпады", en: "Lunges" }, img: "../imajes/exercises/vipady.webp" },
    { id: 4, name: { ru: "Румынская тяга", en: "Romanian Deadlift" }, img: "../imajes/exercises/rymunka.webp" },
    { id: 5, name: { ru: "Разгибания ног в тренажёре", en: "Leg Extensions" }, img: "../imajes/exercises/razgibaniya-nog.webp" }
  ],
  chest: [
    { id: 6, name: { ru: "Жим лёжа", en: "Bench Press" }, img: "../imajes/exercises/zim-leza.webp" },
    { id: 7, name: { ru: "Разведения гантелей", en: "Dumbbell Flyes" }, img: "../imajes/exercises/razvedene-ganteley.webp" },
    { id: 8, name: { ru: "Отжимания на брусьях", en: "Dips" }, img: "../imajes/exercises/otzhimanie-na-brusyakh.webp" },
    { id: 9, name: { ru: "Жим на наклонной скамье", en: "Incline Bench Press" }, img: "../imajes/exercises/zim-na-naklonnoi-skame.webp" }
  ],
  back: [
    { id: 10, name: { ru: "Становая тяга", en: "Deadlift" }, img: "../imajes/exercises/stonivaya.webp" },
    { id: 11, name: { ru: "Подтягивания", en: "Pull-Ups" }, img: "../imajes/exercises/podtygivaniya.webp" },
    { id: 12, name: { ru: "Тяга штанги в наклоне", en: "Bent-Over Barbell Row" }, img: "../imajes/exercises/tygashtangy-v-naklone.webp" },
    { id: 13, name: { ru: "Тяга верхнего блока", en: "Lat Pulldown" }, img: "../imajes/exercises/tyga-verx-blocka.webp" }
  ],
  shoulders: [
    { id: 14, name: { ru: "Жим гантелей вверх", en: "Dumbbell Shoulder Press" }, img: "../imajes/exercises/zim-gateley-vverx.webp" },
    { id: 15, name: { ru: "Разведения в стороны", en: "Lateral Raises" }, img: "../imajes/exercises/razvedenie-ganteley-stoya.webp" },
    { id: 16, name: { ru: "Армейский жим", en: "Military Press" }, img: "../imajes/exercises/armejskij-zhim.webp" },
    { id: 17, name: { ru: "Подъёмы гантелей перед собой", en: "Front Raises" }, img: "../imajes/exercises/podem-gantelej-pered-soboj.webp" }
  ],
  abs: [
    { id: 18, name: { ru: "Скручивания", en: "Crunches" }, img: "../imajes/exercises/skruchivaniya.webp" },
    { id: 19, name: { ru: "Планка", en: "Plank" }, img: "../imajes/exercises/planka.webp" },
    { id: 20, name: { ru: "Подъём ног в висе", en: "Hanging Leg Raises" }, img: "../imajes/exercises/podem_nog_v_vise.webp" },
    { id: 21, name: { ru: "Велосипед", en: "Bicycle Crunches" }, img: "../imajes/exercises/velosiped.webp" }
  ]
};

function findExerciseById(id) {
  for (const category in exercises) {
    const found = exercises[category].find(exercise => exercise.id === id);
    if (found) return found;
  }
  return null;
}

function getExerciseNameById(id) {
  const exercise = findExerciseById(id);
  return exercise
    ? exercise.name[currentLanguage]
    : jsTranslations[currentLanguage].unknownExercise;
}

function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("siteLanguage", lang);

  const elements = document.querySelectorAll("[data-lang]");

  elements.forEach(function (element) {
    const key = element.getAttribute("data-lang");

    if (translations[lang] && translations[lang][key] !== undefined) {
      element.innerHTML = translations[lang][key];
    }
  });

  if (typeof rerenderDynamicContent === "function") {
    rerenderDynamicContent();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const exerciseContainer = document.getElementById("exerciseContainer");
  const workoutList = document.getElementById("workoutList");
  const totalCount = document.getElementById("totalCount");
  const categoryButtons = document.querySelectorAll(".category-btn");
  const downloadBtn = document.getElementById("downloadPdfBtn");
  const languageSelect = document.getElementById("languageSelect");

  let workout = JSON.parse(localStorage.getItem("workout")) || [];
  

  // Перенос данных в сайд бар
  workout = workout.map(item => ({
    id: item.id,
    sets: item.sets ?? 1,
    reps: item.reps ?? 10
  }));
  localStorage.setItem("workout", JSON.stringify(workout));

  function renderExercises(category) {
    if (!exerciseContainer) return;

    exerciseContainer.innerHTML = "";

    exercises[category].forEach(exercise => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h4>${exercise.name[currentLanguage]}</h4>
        <img class="exercise-img" src="${exercise.img}" alt="${exercise.name[currentLanguage]}">
        <button class="add-btn">${jsTranslations[currentLanguage].add}</button>
      `;

      card.querySelector(".add-btn").addEventListener("click", () => {
        addToWorkout(exercise);
      });

      exerciseContainer.appendChild(card);
    });
  }

  function addToWorkout(exercise) {
    if (!workout.find(item => item.id === exercise.id)) {
      workout.push({
        id: exercise.id,
        sets: 1,
        reps: 10
      });
      saveAndRenderWorkout();
    }
  }

  function removeFromWorkout(id) {
    workout = workout.filter(item => item.id !== id);
    saveAndRenderWorkout();
  }

  function saveAndRenderWorkout() {
    localStorage.setItem("workout", JSON.stringify(workout));
    renderWorkout();
  }

  function renderWorkout() {
    if (!workoutList || !totalCount) return;

    workoutList.innerHTML = "";

    workout.forEach(item => {
      const exerciseName = getExerciseNameById(item.id);

      const li = document.createElement("li");
      li.classList.add("workout-item");

      li.innerHTML = `
        <div class="workout-left">
          <div class="workout-item-title">${exerciseName}</div>

          <div class="workout-item-controls">
            <span class="control-label">${jsTranslations[currentLanguage].sets}</span>
            <div class="counter">
              <button type="button" class="minus-set">-</button>
              <span class="value-set">${item.sets}</span>
              <button type="button" class="plus-set">+</button>
            </div>

            <span class="control-label">${jsTranslations[currentLanguage].reps}</span>
            <div class="counter">
              <button type="button" class="minus-rep">-</button>
              <span class="value-rep">${item.reps}</span>
              <button type="button" class="plus-rep">+</button>
            </div>
          </div>
        </div>

        <button type="button" class="remove-btn">X</button>
      `;

      li.querySelector(".remove-btn").addEventListener("click", () => {
        removeFromWorkout(item.id);
      });

      li.querySelector(".minus-set").addEventListener("click", () => {
        if (item.sets > 1) {
          item.sets--;
          saveAndRenderWorkout();
        }
      });

      li.querySelector(".plus-set").addEventListener("click", () => {
        item.sets++;
        saveAndRenderWorkout();
      });

      li.querySelector(".minus-rep").addEventListener("click", () => {
        if (item.reps > 1) {
          item.reps--;
          saveAndRenderWorkout();
        }
      });

      li.querySelector(".plus-rep").addEventListener("click", () => {
        item.reps++;
        saveAndRenderWorkout();
      });

      workoutList.appendChild(li);
    });

    totalCount.textContent = workout.length;
  }

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".category-btn.active")?.classList.remove("active");
      button.classList.add("active");
      renderExercises(button.dataset.category);
    });
  });

  if (downloadBtn) {
    downloadBtn.addEventListener("click", generatePDF);
  }

  function saveWorkoutToLibrary() {
    let savedWorkouts = JSON.parse(localStorage.getItem("savedWorkouts")) || [];

    const newWorkout = {
      id: Date.now(),
      name: jsTranslations[currentLanguage].workoutName,
      date: new Date().toLocaleDateString(),
      exercises: workout.map(item => ({
        id: item.id,
        sets: item.sets,
        reps: item.reps
      }))
    };

    savedWorkouts.push(newWorkout);
    localStorage.setItem("savedWorkouts", JSON.stringify(savedWorkouts));
  }

  function generatePDF() {
    if (typeof pdfMake === "undefined") {
      alert(jsTranslations[currentLanguage].pdfError);
      return;
    }

    if (workout.length === 0) {
      alert(jsTranslations[currentLanguage].workoutEmpty);
      return;
    }

    saveWorkoutToLibrary();

    const today = new Date().toLocaleDateString();
    const list = workout.map((ex, i) => {
      const exerciseName = getExerciseNameById(ex.id);
      return `${i + 1}. ${exerciseName} — ${ex.sets}×${ex.reps}`;
    });

    const docDefinition = {
      content: [
        { text: jsTranslations[currentLanguage].workoutName, fontSize: 18, bold: true, margin: [0, 0, 0, 8] },
        { text: `${jsTranslations[currentLanguage].date}: ${today}`, fontSize: 12, margin: [0, 0, 0, 12] },
        { ul: list, fontSize: 12, margin: [0, 0, 0, 12] },
        { text: `${jsTranslations[currentLanguage].totalExercises}: ${workout.length}`, fontSize: 12, bold: true }
      ],
      defaultStyle: { font: "Roboto" }
    };

    pdfMake.createPdf(docDefinition).download(jsTranslations[currentLanguage].pdfFileName);
  }

window.rerenderDynamicContent = function () {
  const activeCategory =
    document.querySelector(".category-btn.active")?.dataset.category || "legs";

  renderExercises(activeCategory);
  renderWorkout();
  renderSavedWorkouts();
};
  if (languageSelect) {
    languageSelect.value = currentLanguage;

    languageSelect.addEventListener("change", function () {
      changeLanguage(this.value);
    });
  }

  changeLanguage(currentLanguage);
});

// Удаление тренировки из сайд бара
function deleteWorkout(id) {
  let savedWorkouts = JSON.parse(localStorage.getItem("savedWorkouts")) || [];

  savedWorkouts = savedWorkouts.filter(w => w.id !== id);

  localStorage.setItem("savedWorkouts", JSON.stringify(savedWorkouts));

  renderSavedWorkouts();
}

// Измнение названия тренировки 
function updateWorkoutName(id, newName) {
  let savedWorkouts = JSON.parse(localStorage.getItem("savedWorkouts")) || [];

  const workoutIndex = savedWorkouts.findIndex(w => w.id === id);
  if (workoutIndex === -1) return;

  savedWorkouts[workoutIndex].name =
    newName.trim() || jsTranslations[currentLanguage].workoutName;

  localStorage.setItem("savedWorkouts", JSON.stringify(savedWorkouts));
}

// Функция скаичвания тренировки в PDF 
function downloadSavedWorkout(workout) {
  if (typeof pdfMake === "undefined") {
    alert(jsTranslations[currentLanguage].pdfError);
    return;
  }

  const list = workout.exercises.map((ex, i) => {
    const exerciseName = getExerciseNameById(ex.id);
    return `${i + 1}. ${exerciseName} — ${ex.sets}×${ex.reps}`;
  });

  const docDefinition = {
    content: [
      { text: workout.name || jsTranslations[currentLanguage].workoutName, fontSize: 18, bold: true },
      { text: `${jsTranslations[currentLanguage].date}: ${workout.date}` },
      { ul: list }
    ],
    defaultStyle: { font: "Roboto" }
  };

  const fileName = (workout.name || jsTranslations[currentLanguage].workoutName) + ".pdf";

  pdfMake.createPdf(docDefinition).download(fileName);
}

// Сохранение Тренировок

function renderSavedWorkouts() {
  const container = document.getElementById("savedWorkoutsContainer");
  if (!container) return;

  let savedWorkouts = JSON.parse(localStorage.getItem("savedWorkouts")) || [];
  container.innerHTML = "";

  savedWorkouts.forEach(workout => {
    const block = document.createElement("div");
    block.classList.add("saved-workout");

    block.innerHTML = `
      <button class="deleteWorkout" data-id="${workout.id}">X</button>

      <input 
        type="text" 
        class="workoutNameInput" 
        data-id="${workout.id}" 
        value="${workout.name}" 
        placeholder="${jsTranslations[currentLanguage].workoutPlaceholder}"
      >

      <p>${jsTranslations[currentLanguage].date}: ${workout.date}</p>

      <button class="downloadWorkout">${jsTranslations[currentLanguage].downloadPdf}</button>
    `;

    block.querySelector(".deleteWorkout").addEventListener("click", () => {
      deleteWorkout(workout.id);
    });

    block.querySelector(".downloadWorkout").addEventListener("click", () => {
      downloadSavedWorkout(workout);
    });

    block.querySelector(".workoutNameInput").addEventListener("input", (e) => {
      updateWorkoutName(workout.id, e.target.value);
    });

    container.appendChild(block);
  });
}

renderSavedWorkouts();