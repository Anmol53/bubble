async function generateBubbles(id, n) {
  for(let i = 1; i <= n; i++){
    let bubble = document.createElement("div");
    bubble.id = id + "_bubble_" + i;
    bubble.classList.add("bubble");
    bubble.innerHTML = '<img src="http://anmolagrawal.me/images/bubble2.png">';
//     await sleep(150);
    document.getElementById(id).appendChild(bubble);
    randomGradientBackground(bubble.id);
    bubbleMotion(id, bubble.id);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomGradientBackground(id){
  let elem = document.getElementById(id);
  let x = Math.random();
  let randomColor1 = Math.floor(x*16777215).toString(16);
  let randomColor2 = Math.floor(x*16700000).toString(16);
  elem.style.backgroundColor = "#" + randomColor1;
  elem.style.backgroundImage = "linear-gradient(90deg, #" + randomColor1 + " 0%, #" + randomColor2 + " 100%)";
}

function bubbleMotion(parentId, id) {
  let parent = document.getElementById(parentId);
  let dim = parent.getBoundingClientRect();
  let top = dim.bottom - dim.height;
  let bottom = dim.bottom - 108;
  let left = dim.right - dim.width;
  let right = dim.right - 108;
  let elem = document.getElementById(id);
  let posX = left + 10;
  let posY = top + 10;
  var id = setInterval(move, 25);
  let xD = Math.random() * 8;
  let yD = Math.random() * 8;
  function move() {
    if(posX <= left || posX >= right){
      xD *= -1;
    }
    if(posY <= top || posY >= bottom){
      yD *= -1;
    }
    posX += xD;
    posY += yD;
    elem.style.left = posX + "px";
    elem.style.top = posY + "px";
  }
}
