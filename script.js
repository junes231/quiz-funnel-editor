const correctPassword = "hersupps2025";

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === correctPassword) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("editor").style.display = "block";
  } else {
    alert("Wrong password!");
  }
}

function addQuestion() {
  const container = document.getElementById("questionsContainer");
  const qIndex = container.children.length;

  const block = document.createElement("div");
  block.className = "question-block";

  block.innerHTML = `
    <label>Question ${qIndex + 1}</label>
    <input type="text" class="question-input" placeholder="Enter your question" />
    <label>Answers (comma separated)</label>
    <input type="text" class="answer-input" placeholder="e.g. Option 1, Option 2" />
  `;

  container.appendChild(block);
}

function generateHTML() {
  const version = document.getElementById("funnelVersion").value;
  const bgColor = document.getElementById("bgColor").value;
  const btnColor = document.getElementById("btnColor").value;
  const redirectLink = document.getElementById("redirectLink").value;

  const questionEls = document.querySelectorAll(".question-input");
  const answerEls = document.querySelectorAll(".answer-input");

  const questions = [];
  for (let i = 0; i < questionEls.length; i++) {
    questions.push({
      question: questionEls[i].value,
      answers: answerEls[i].value.split(",").map(a => a.trim())
    });
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Quiz Funnel</title>
  <style>
    body { background: ${bgColor}; font-family: sans-serif; padding: 20px; }
    .question { margin-bottom: 20px; }
    button { background: ${btnColor}; color: white; padding: 10px; border: none; margin-top: 10px; width: 100%; }
  </style>
</head>
<body>
  <div id="quiz"></div>
  <script>
    const questions = ${JSON.stringify(questions)};
    const version = "${version}";
    const redirectLink = "${redirectLink}";

    let current = 0;
    const quizDiv = document.getElementById("quiz");

    function renderQuestion() {
      if (current >= questions.length) {
        if (version === "A") {
          quizDiv.innerHTML = '<input id="email" placeholder="Enter email" /><button onclick="finish()">Submit</button>';
        } else {
          window.location.href = redirectLink;
        }
        return;
      }

      const q = questions[current];
      let html = "<div class='question'><h2>" + q.question + "</h2>";
      q.answers.forEach(a => {
        html += "<button onclick='next()'>" + a + "</button>";
      });
      html += "</div>";
      quizDiv.innerHTML = html;
    }

    function next() {
      current++;
      renderQuestion();
    }

    function finish() {
      const email = document.getElementById("email").value;
      if (email) {
        window.location.href = redirectLink;
      }
    }

    renderQuestion();
  </script>
</body>
</html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.getElementById("downloadLink");
  a.href = url;
  a.download = "quiz-funnel.html";
  a.textContent = "Download HTML";
  a.style.display = "inline-block";
}
