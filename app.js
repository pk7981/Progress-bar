var background = document.querySelector("#background");
var myButton = document.getElementById("button");
var Button = document.getElementById("done");
var progress_circle = document.querySelector(".progressValue");
var innerValue = document.querySelector("#progressPercent");
var progressInterval;
var isprogressBarActive = false;
var progress_line = document.querySelector(".progressLine");
var lineValue = document.getElementById("Linepercent");
var title = document.querySelector("#title");

function randomColor() {
  if (progressStart >= progressEnd) {
    clearInterval(colorInterval);
    return;
  }
  var symbols = "0123456789abcdefABCDEF";
  var color = "#";

  for (let i = 0; i < 6; i++) {
    color = color + symbols[Math.floor(Math.random() * 16)];
  }

  background.style.backgroundColor = color;
}
setInterval(randomColor, 3000);

let progressStart = 0;
let progressEnd = 100;
let speed = 200;

function startprogressBar() {
  progressInterval = setInterval(() => {
    progressStart++;
    innerValue.textContent = `${
      progressStart > progressEnd ? progressEnd : progressStart
    }%`;
    progress_circle.style.background = `conic-gradient(
      rgb(168, 54, 214) ${progressStart * 3.6}deg, rgb(218, 208, 208) 0deg
     )`;

    lineValue.textContent = `${
      progressStart > progressEnd ? progressEnd : progressStart
    }%`;
    progress_line.style.width = `${progressStart}%`;

    if (progressStart >= progressEnd) {
      clearInterval(progressInterval);
    }
    if (progressStart == 100) {
      background.style.backgroundColor = "transparent";
      background.style.backgroundImage = "url('./Images/giphy.gif')";
      background.style.backgroundSize = "cover";
      Button.style.display = "block";
      myButton.style.display = "none";
    }
    if (progressStart >= progressEnd) {
      title.innerHTML = "Congratulations";
      title.style.color = "black";
    }
  }, speed);
}

function toggleProgressBar() {
  if (isprogressBarActive) {
    clearInterval(progressInterval);
    isprogressBarActive = false;
  } else {
    startprogressBar();
    isprogressBarActive = true;
  }
}

myButton.addEventListener("click", function () {
  toggleProgressBar();
});

Button.addEventListener("click", function () {
  Button.style.display = "none";
  myButton.style.display = "block";
  progressStart = 0;
  background.style.backgroundColor = "transparent";
  background.style.backgroundImage = "none";
  innerValue.textContent = "0%";
  progress_circle.style.background =
    "conic-gradient(green 0deg, rgb(218, 208, 208) 0deg)";
  lineValue.textContent = "0%";
  progress_line.style.width = "0%";
  title.innerHTML = "Progress Bar";
  title.style.color = "rgb(110, 108, 108)";
});
