class Snake {

  constructor(gridSize, x) {
    this.gridSize = gridSize;
    this.squares = new Array(2).fill(createVector(
      width % this.gridSize / 2 +
      this.gridSize * floor(width / this.gridSize * x),
      height % this.gridSize / 2 +
      this.gridSize * floor(height / this.gridSize / 2)
    ));
    this.dead = false;
    this.dir = createVector(0, 0);
    this.dirStack = [];
  }

  draw() {
    noStroke();
    fill(0, 150, 0);
    circle(this.squares[0].x + this.gridSize / 2,
      this.squares[0].y + this.gridSize / 2,
      this.gridSize * sqrt(2));
    for (let i = 1; i < this.squares.length - (this.dead ? 0 : 1); i++) {
      rect(this.squares[i].x, this.squares[i].y, this.gridSize, this.gridSize);
    }
  }

  move(apple = false) {
    this.squares.unshift(p5.Vector.add(this.squares[0], this.dir));
    if (!apple) {
      this.squares.pop();
    }
  }

  dirStackCheck() {
    if (this.dirStack.length > 0) {
      if (this.dirStack[0].x != -this.dir.x || this.dirStack[0].y != -this.dir.y || this.squares.length <= 3) {
        this.dir = this.dirStack[0];
      }
      this.dirStack.shift();
    }
  }

  changeDir(dir) {
    switch (dir) {
      case "up":
        this.dirStack.push(createVector(0, -this.gridSize));
        break;
      case "left":
        this.dirStack.push(createVector(-this.gridSize, 0));
        break;
      case "down":
        this.dirStack.push(createVector(0, this.gridSize));
        break;
      case "right":
        this.dirStack.push(createVector(this.gridSize, 0));
        break;
    }
  }

  deathCheck() {
    // Check if snake hit walls
    if (
      width - width % this.gridSize / 2 - this.gridSize < this.squares[0].x ||
      this.squares[0].x < width % this.gridSize / 2 ||
      height - height % this.gridSize / 2 - this.gridSize < this.squares[0].y ||
      this.squares[0].y < height % this.gridSize / 2
    ) {
      this.dead = true;
    }
    // Check if snake hit self
    for (let i = 1; i < this.squares.length - 1; i++) {
      if (this.squares[0].x == this.squares[i].x &&
        this.squares[0].y == this.squares[i].y) {
        this.dead = true;
      }
    }
  }

  die() {
    this.squares.shift();
  }

}