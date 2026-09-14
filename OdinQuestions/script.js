import coursesData from "./questions.js";

// DOM Selectors
const filterButtonsNav = document.getElementById("filter-buttons");
const questionsContainer = document.getElementById("questions-container");

// Render an array of questions into the DOM
function renderQuestions(questionsList) {
  questionsContainer.innerHTML = ""; // Clear previous items

  if (!questionsList || questionsList.length === 0) {
    questionsContainer.textContent = "No questions found.";
    return;
  }

  const list = document.createElement("ul");
  questionsList.forEach((questionText) => {
    const li = document.createElement("li");
    li.textContent = questionText;
    list.appendChild(li);
  });

  questionsContainer.appendChild(list);
}

// Flatten all questions across all course keys for the "All" view
function getAllQuestions() {
  return Object.values(coursesData).flat();
}

// Dynamically build buttons for "All" and each specific course
function initializeUI() {
  filterButtonsNav.innerHTML = "";

  // 1. Create 'All' default button
  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.addEventListener("click", () => renderQuestions(getAllQuestions()));
  filterButtonsNav.appendChild(allBtn);

  // 2. Create course-specific buttons dynamically
  Object.keys(coursesData).forEach((courseName) => {
    const btn = document.createElement("button");
    btn.textContent = courseName;
    btn.addEventListener("click", () =>
      renderQuestions(coursesData[courseName]),
    );
    filterButtonsNav.appendChild(btn);
  });

  // Default view on initial load
  renderQuestions(getAllQuestions());
}

initializeUI();
