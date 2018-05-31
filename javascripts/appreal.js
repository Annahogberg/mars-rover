/*
var mars = [
  ["Brussels", null, null, null, "Rock", null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, "Life", null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, "Rock", null, null],
  [null, null, "Stockholm", null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, "Rock", null, null, null, null, null, "Life", null, null],
  [null, null, null, null, null, "Madrid", null, null, null, null],
  [null, null, null, null, null, null, null, null, "Rock", null],
];
*/

var rover1 = {
  name: "Stockholm",
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
};

var rover2 = {
  name: "Madrid",
  direction: "N",
  x: 3,
  y: 5,
  travelLog: [],
};

var obstacles = {
  x: [0, 4, 7, 7, 9],
  y: [4, 7, 1, 7, 8],
};

var life = {
  x: [2, 7],
  y: [2, 7],
};

var xborder = 10;
var yborder = 10;
var activeRover = rover1;

function turnLeft(rover){
  switch(rover.direction) {
    case "N":
      rover.direction = "W";
      messageTurn(rover);
      break;
    case "W":
      rover.direction ="S";
      messageTurn(rover);
      break;
    case "S":
      rover.direction = "E";
      messageTurn(rover);
      break;
    case "E":
      rover.direction = "N";
      messageTurn(rover);
      break;
  }
}

function turnRight(rover){
  switch(rover.direction) {
    case "N":
      rover.direction = "E";
      messageTurn(rover);
    break;
      case "E":
      rover.direction ="S";
      messageTurn(rover);
      break;
    case "S":
      rover.direction = "W";
      messageTurn(rover);
      break;
    case "W":
      rover.direction = "N";
      messageTurn(rover);
      break;
  }
}

function moveForward(rover){
  if (rover.direction === "N") {
    if (status(rover.x, rover.y +1)) {
      logPositions(rover);
      rover.y++;
      messageForward(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    }
  }
  if (rover.direction === "W") {
    if (status(rover.x - 1, rover.y)) {
      logPositions(rover);
      rover.x--;
      messageForward(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    }
  }
  if (rover.direction === "S") {
    if (status(rover.x, rover.y - 1)) {
      logPositions(rover);
      rover.y--;
      messageForward(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    }
  }
  if (rover.direction === "E") {
    if (status(rover.x + 1, rover.y)) {
      rover.x++;
      return true;
    } else {
      return false;
    }
  }


}
function moveBackwards(rover){ 
  if (rover.direction === "N") {
    if (status(rover.x, rover.y - 1)) {
      logPositions(rover);
      rover.y --;
      messageBackwards(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    }
  }
  if (rover.direction === "W") {
    if (status(rover.x + 1, rover.y)) {
      logPositions(rover);
      rover.x++;
      messageBackwards(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    }
  }

  if (rover.direction === "S") {
    if (status(rover.x, rover.y - 1)) {
      logPositions(rover);
      rover.y--;
      messageBackwards(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    }
  }
  
  if (rover.direction === "E") {
    if (status(rover.x - 1, rover.y)) {
      logPositions(rover);
      rover.x--;
      messageBackwards(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    }
  }
}


//check if found obstacle/life
function status(x, y) {
  if (x === life.x && y === life.y) {
  console.log("Yay!! You're not alone! You found something!");
  exit();
  }

  if (x === obstacles.x && y === obstacles.y || rover1.x === rover2.x && rover1.y === rover2.y) {
    console.log("Ouch, you hit something! You've lost your turn");
    return false;
  }

  if (x > xborder || x < -xborder || y > yborder || y < -yborder) {
    console.log("Oh no, you fell of the grid, literally!");
    return false;
  }
  return true;
}

//change rovers
function changeRover() {
  if (activeRover === rover1) {
    activeRover = rover2;
  } else {
    activeRover = rover1;
  }
  console.log("It's your turn now " + activeRover.name);
  positions(activeRover);
}

//commands for the rovers
function go(command) {
  for (var i = 0; i < command.length; i++) {
    switch (command[i]) {
      case "l":
        turnLeft(activeRover);
        break;
      case "r":
        turnRight(activeRover);
        break;
      case "f":
        moveForward(activeRover);
        break;
      case "b":
        moveBackwards(activeRover);
        break;
    }
  }
  changeRover();
}

function logPositions(rover) {
  rover.travelLog.push(rover.x,rover.y);
}

//messages
function positions(rover) {
  console.log(rover.name + " is at [" + rover.x + "," + rover.y + "] facing " + rover.direction);
}

function info() {
  console.log("It's " + activeRover.name +"'s turn, it's located at [" + activeRover.x + "," + activeRover.y + "] facing " + activeRover.direction);
}

function help() {
  console.log("Type 'go('command')' move the rovers");
  console.log("'f' --> forward & 'b' --> backwards");
  console.log("'l' --> left & 'r' --> right");
  console.log("Please note you may take several steps in one go - just type each letter after each other.");
  console.log("Type 'info()' to know the positions of each rover");
  console.log("Type 'log(rover)' to show the rover's log");
}

function log(rover) {
  console.log(rover.name + " has been in the following places: ");
  console.log(activeRover.travelLog);
}

function start() {
  console.log("Welcome to Mars!");
  console.log("For instructions - please type 'help()'");
  console.log(rover1.name + " and " + rover2.name + " will be driving you around.");
  info();
  positions(rover2);
}

function messageTurn(rover) {
  console.log(rover.name + " is facing " + rover.direction);
}

function messageForward(rover, x, y) {
  console.log(rover.name + " moved forward. Is now positioned at [" + x + "," + y + "].");
}

function messageBackwards(rover, x, y) {
  console.log(rover.name + " moved backward. Is now positioned at [" + x + "," + y + "].");
}

start();
