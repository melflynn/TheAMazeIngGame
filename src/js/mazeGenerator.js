const Graph = require('./graph');
const DisjointSet = require('./disjointSet');

class Maze {
  constructor (width, height) {
    this.width = width;
    this.height = height;
    const graph = new Graph(width, height);
    this.grid = graph.grid;
    this.AdjacencyCellList = this.grid.AdjacencyCellList;
    this.canvasEl = document.getElementsByTagName("canvas")[0];
  }

  kruskal () {
    let walls = [];
    let keptWalls = [];
    for (let i = 0; i < this.height - 1; i++) {
      for (let j = 0; j < this.width - 1; j++) {
        walls.push([[i, j], [i + 1, j]], [[i, j], [i, j + 1]]);
      }
    }
    for (let i = 0; i < this.height - 1; i++) {
      walls.push([[this.height - 1, i], [this.height - 1, i + 1]])
    }
    for (let j = 0; j < this.width - 1; j++) {
      walls.push([[j, this.width -1], [j + 1, this.width - 1]]);
    }

    let cells = new DisjointSet();
    this.grid.forEach((row, rowNum) => {
      row.forEach((col, colNum) => {
        cells.makeSet([rowNum, colNum]);
      })
    })
    while (walls.length > 0) {
      let i = Math.floor(Math.random() * (walls.length - 1))
      let wall = walls[i];
      let first = cells.find(wall[0]);
      let second = cells.find(wall[1]);
      if (first === second || first === undefined || second === undefined) {
        keptWalls.push(wall);
        walls.splice(i, 1);
      } else {
        walls.splice(i, 1);
        cells.union(wall[0], wall[1]);
      }
    }

    this.printKruskal(keptWalls);
  }

  printKruskal (keptWalls) {
    // const canvasEl = document.getElementsByTagName("canvas")[0];
    this.canvasEl.height = this.height * 20 + 10;
    this.canvasEl.width = this.width * 20 + 10;
    const ctx = this.canvasEl.getContext("2d");
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    // canvasEl.style.border = '1px solid black';
    ctx.beginPath();
    ctx.moveTo(5,5);
    ctx.lineTo(this.width * 20 + 5, 5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(5,5);
    ctx.lineTo(5, 25);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(5, 45);
    ctx.lineTo(5, this.height * 20 + 5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(5, this.height * 20 + 5);
    ctx.lineTo(this.width * 20 + 5, this.height * 20 + 5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.width * 20 + 5, 5);
    ctx.lineTo(this.width * 20 + 5, this.height * 20 + 5 - 40);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.width * 20 + 5, this.height * 20 + 5 - 20);
    ctx.lineTo(this.width * 20 + 5, this.height * 20 + 5);
    ctx.stroke();
    keptWalls.forEach((wall) => {
      const first = wall[0];
      const second = wall[1];
      if (first[0] < second[0]) { //horizontal line
        ctx.beginPath();
        ctx.moveTo(second[1] * 20 + 5, (second[0] * 20) + 5);
        ctx.lineTo((second[1] + 1) * 20 + 5, second[0] * 20 + 5);
        ctx.stroke();
      } else { //vertical line
        ctx.beginPath();
        ctx.moveTo(second[1] * 20 + 5, (second[0] * 20) + 5);
        ctx.lineTo((second[1]) * 20 + 5, (second[0] + 1) * 20 + 5);
        ctx.stroke();
      }
    })
  }
}

// let maze = new Maze(5, 5);
// maze.kruskal();

module.exports = Maze;