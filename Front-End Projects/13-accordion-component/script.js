document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".question");
  const answers = document.querySelectorAll(".answer");

  questions.forEach((question, idx) => {
    question.addEventListener("click", (e) => {
      e.preventDefault();
      answers.forEach((ans, i) => {
        if (i === idx) {
          ans.classList.toggle("open");
        } else {
          ans.classList.remove("open");
        }
      });
    });
  });
});
