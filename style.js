const translations = {
    ru: {
        title: "Онлайн трекер тренировок",
        description: "Создай свой уникальный план тренировок и скачай его в формате PDF.",
        startBtn: "Начать",
        infoBtn: "Информация о проекте",
        myWorkBtn: "Мои тренировки",
        promoOne: "Составляйте план тренировок",
        promoTwo: "Сохраняйте в формате PDF",
        promoThree: "Становитесь сильнее",
        promoFore: "GYM_Tracker — это бесплатное тестовое Web-приложение для отслеживания тренировок на любом устройстве.<br>Создавайте программы тренировок и скачивайте PDF файл.",
        alarmInfo: "К сожалению, наш сайт существует только в WEB-версии! Приложения не будут доступны для скачивания!",

        projectName: "Название проекта и цель:",
        aboutInfo: "<strong>GYM Tracker</strong> — это веб-приложение для составления индивидуальной программы тренировок. Пользователь может создавать собственный план занятий, редактировать упражнения и скачивать готовую программу в формате PDF для удобного использования в зале.",
        usage: "Для этого проекта я применил:",
        html: "HTML 5 для основы сайта",
        css: "CSS для оформления",
        js: "JS для интерактивных элементов",
        corel: "Corel для создания логотипов",
        autorInfo: "Информация об авторе:",
        name: "<strong>Имя и фамилия:</strong> Кондратьев Валентин Вадимович",
        group: "<strong>Группа / курс:</strong> (13-ТИС)",
        cont: "Контакты:",

        trenDif: "Выберите упражнения",
        legs: "Ноги",
        chest: "Грудь",
        back: "Спина",
        shoulders: "Плечи",
        abs: "Пресс",
        mytren: "Моя тренировка",
        totalsum: "Всего упражнений:",
        saveAsPdf: "Скачать тренировку в PDF",

        mytrenSaved: "Мои тренировки",
        infoSave: "Здесь хранятся все тренировки, которые были сохранены и скачаны с сайта."
    },

    en: {
        title: "Online Workout Tracker",
        description: "Create your own unique workout plan and download it as a PDF file.",
        startBtn: "Start",
        infoBtn: "Project Information",
        myWorkBtn: "My Workouts",
        promoOne: "Create your workout plan",
        promoTwo: "Save it as PDF",
        promoThree: "Become stronger",
        promoFore: "GYM_Tracker is a free demo web application for tracking workouts on any device.<br>Create workout programs and download them as a PDF file.",
        alarmInfo: "Unfortunately, our website is available only in the WEB version! Applications will not be available for download.",

        projectName: "Project Name and Goal:",
        aboutInfo: "<strong>GYM Tracker</strong> is a web application for creating a personalized workout program. The user can build their own training plan, edit exercises, and download the finished program as a PDF for convenient use in the gym.",
        usage: "Technologies used in this project:",
        html: "HTML 5 for the website structure",
        css: "CSS for styling",
        js: "JavaScript for interactive elements",
        corel: "Corel for creating logos",
        autorInfo: "Author Information:",
        name: "<strong>Name:</strong> Valentin Kondratyev",
        group: "<strong>Group / Course:</strong> (13-TIS)",
        cont: "Contacts:",

        trenDif: "Select exercises",
        legs: "Legs",
        chest: "Chest",
        back: "Back",
        shoulders: "Shoulders",
        abs: "Abs",
        mytren: "My workout",
        totalsum: "Total exercises:",
        saveAsPdf: "Download workout as PDF",

        mytrenSaved: "My Workouts",
        infoSave: "All workouts that were saved and downloaded from the website are stored here."
    }
};

let currentLanguage = localStorage.getItem("siteLanguage") || "ru";

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

  if (typeof window.rerenderDynamicContent === "function") {
    window.rerenderDynamicContent();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("languageSelect");

  if (languageSelect) {
    languageSelect.value = currentLanguage;

    languageSelect.addEventListener("change", function () {
      changeLanguage(this.value);
    });
  }

  changeLanguage(currentLanguage);
});