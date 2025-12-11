const textElement = document.getElementById('text');
const backlogDiv = document.getElementById('backlog');

const script = [
  "Hey...",
  "So what're you doing in here anyways!?",
  "Whatever... do you need something?",
];

const character = document.getElementById('character');

const TYPING_SPEED = 30;

//add to this for new ones
const EXPRESSIONS = {
  neutral: "url('NeutralExpression.png')",
  agitated: "url('FinalColoredSprite1Agitated.png')"
};

let index = 0;
let autoMode = false;
let skipMode = false;
let typing = false;

function typeLine(line) {
  typing = true;
  textElement.textContent = "";
  let i = 0;

  const interval = setInterval(() => {
    textElement.textContent += line[i];
    i++;
    if (i >= line.length) {
      clearInterval(interval);
      typing = false;
      addToBacklog(line);
      if (autoMode) nextLine();
    }
  }, TYPING_SPEED);
}

function nextLine() {
  if (typing) return;
  if (index >= script.length) return;

  const line = script[index];
  index++;

  //temporary itll be changed again w/ different expressions
  if (index === 2) {
    character.style.backgroundImage = EXPRESSIONS.agitated;
  } else if (index === 3) {
    character.style.backgroundImage = EXPRESSIONS.neutral;
  }



  if (skipMode) {
    textElement.textContent = line;
    addToBacklog(line);
    nextLine();
    return;
  }

  typeLine(line);
}

function addToBacklog(line) {
  backlogDiv.insertAdjacentHTML("beforeend", `<div>${line}</div>`);
}

function handleAdvance() {
  if (!typing && !autoMode && !skipMode) nextLine();
}

document.body.addEventListener('click', handleAdvance);



document.getElementById('autoBtn').onclick = () => {
  autoMode = !autoMode;
  skipMode = false;
  if (autoMode) nextLine();
};

document.getElementById('skipBtn').onclick = () => {
  skipMode = !skipMode;
  autoMode = false;
  if (skipMode) nextLine();
};

document.getElementById('backlogBtn').onclick = () => {
  backlogDiv.style.display = backlogDiv.style.display === 'none' ? 'block' : 'none';
};
