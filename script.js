const textElement = document.getElementById('text');
const backlogDiv = document.getElementById('backlog');

const script = [
  "Hey...",
  "So what're you doing in here anyways!?",
  "Whatever... do you need something?",
];

const character = document.getElementById('character');

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
  }, 30);
}

function nextLine() {
  if (typing) return;
  if (index >= script.length) return;

  const line = script[index];
  index++;

  //temporary itll be changed again w/ different expressions
  if (index === 2) {
    character.style.backgroundImage = "url('FinalColoredSprite1Agitated.png')";
  } else if (index === 3) {
    character.style.backgroundImage = "url('NeutralExpression.png')";
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
  const entry = document.createElement('div');
  entry.textContent = line;
  backlogDiv.appendChild(entry);
}

document.body.addEventListener('click', () => {
  if (!typing && !autoMode && !skipMode) nextLine();
});

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
