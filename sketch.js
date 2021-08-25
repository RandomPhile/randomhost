let rows = 9;
let columns = 9;
let cell_size = 50;
let num_mines = Math.ceil(0.224*(rows*columns)-9.0262); //Dati estrapolati da excel

let grid = new Array(rows);
let temp = new Array(rows);
for (let i = 0; i < rows; i++) {
	grid[i] = new Array(columns);
	temp[i] = new Array(columns);
}

let mines_num = [];

let generateMines = function(list) {
	if (list.length >= num_mines) {
		return;
	}

  	let n = Math.floor(Math.random() * rows*columns);
  	if (list.indexOf(n) == -1) {
    	list.push(n);
  	}
  	generateMines(list);
};

generateMines(mines_num);

for (let i = 0; i < rows; i++) {
	for (let j = 0; j < columns; j++) {
		if (mines_num.includes(i * columns + j)) {
			grid[i][j] = 1;
		} else {
			grid[i][j] = 0;
		}
	}
}

let howManyMines = function(row, col) {
	let m = 0;
	switch(row) {
		case 0:
			switch(col) {
				case 0:
					m = grid[0][1] + grid[1][0] + grid[1][1];
					break;
				case columns-1:
					m = grid[0][col-1] + grid[1][col] + grid[1][col-1];
					break;
				default:
					m = grid[0][col-1] + grid[0][col+1] + grid[1][col-1] + grid[1][col] + grid[1][col+1];
					break;
			}
			break;
		case rows-1:
			switch(col) {
				case 0:
					m = grid[row-1][1] + grid[row-1][0] + grid[row][1];
					break;
				case columns-1:
					m = grid[row][col-1] + grid[row-1][col] + grid[row-1][col-1];
					break;
				default:
					m = grid[row][col-1] + grid[row][col+1] + grid[row-1][col-1] + grid[row-1][col] + grid[row-1][col+1];
					break;
			}
		 	break;
		default:
			switch(col) {
				case 0:
					m = grid[row-1][0] + grid[row+1][0] + grid[row-1][1] + grid[row][1] + grid[row+1][1];
					break;
				case columns-1:
					m = grid[row-1][col] + grid[row+1][col] + grid[row-1][col-1] + grid[row][col-1] + grid[row+1][col-1];
					break;
				default:
					m = grid[row-1][col-1] + grid[row-1][col] + grid[row-1][col+1] + grid[row+1][col-1] + grid[row+1][col] + grid[row+1][col+1] + grid[row][col-1] + grid[row][col+1];
					break;
			}
	}
	return m;
}


for (var i = 0; i < rows; i++) {
	for (var j = 0; j < columns; j++) {
		if (mines_num.includes(i * columns + j)) {
			temp[i][j] = '*';
		} else {
			temp[i][j] = howManyMines(i, j);
		}
	}
}

for (var i = 0; i < rows; i++) {
	for (var j = 0; j < columns; j++) {
		grid[i][j] = temp[i][j];
	}
}

for (var i = 0; i < rows; i++) {
	for (var j = 0; j < columns; j++) {
		temp[i][j] = '';
	}
}

function setup() {
	createCanvas(columns*cell_size, rows*cell_size);
	background(220);
	for (let i = 0; i <= rows; i++) {
		line(0, i*cell_size, width, i*cell_size);
	}
	for (let j = 0; j <= columns; j++) {
		line(j*cell_size, 0, j*cell_size, height);
	}
}

function mouseClicked() {
	mouse_row = floor(mouseY/cell_size);
	mouse_col = floor(mouseX/cell_size);
	
	if (grid[mouse_row][mouse_col] == '*') {
		console.log("GAME OVER");
		window.location.replace("https://www.youtube.com/watch?v=oHg5SJYRHA0");
	} else if (grid[mouse_row][mouse_col] == 0) {
		console.log("ESPANDI 8 CELLE");
		switch(mouse_row) {
		case 0:
			switch(mouse_col) {
				case 0:
					m = grid[0][1] + grid[1][0] + grid[1][1];
					break;
				case columns-1:
					m = grid[0][mouse_col-1] + grid[1][mouse_col] + grid[1][mouse_col-1];
					break;
				default:
					m = grid[0][mouse_col-1] + grid[0][mouse_col+1] + grid[1][mouse_col-1] + grid[1][mouse_col] + grid[1][mouse_col+1];
					break;
			}
			break;
		case rows-1:
			switch(mouse_col) {
				case 0:
					temp[mouse_row-1][1] = grid[mouse_row-1][1];
					temp[mouse_row-1][0] = grid[mouse_row-1][0];
					temp[mouse_row][1] = grid[mouse_row][1];
					break;
				case columns-1:
					temp[mouse_row][mouse_col-1] = grid[mouse_row][mouse_col-1];
					temp[mouse_row-1][mouse_col] = grid[mouse_row-1][mouse_col];
					temp[mouse_row-1][mouse_col-1] = grid[mouse_row-1][mouse_col-1];
					break;
				default:
					temp[mouse_row][mouse_col-1] = grid[mouse_row][mouse_col-1];
					temp[mouse_row][mouse_col+1] = grid[mouse_row][mouse_col+1];
					temp[mouse_row-1][mouse_col-1] = grid[mouse_row-1][mouse_col-1];
					temp[mouse_row-1][mouse_col] = grid[mouse_row-1][mouse_col];
					temp[mouse_row-1][mouse_col+1] = grid[mouse_row-1][mouse_col+1];
					break;
			}
		 	break;
		default:
			switch(mouse_col) {
				case 0:
					temp[mouse_row-1][0] = grid[mouse_row-1][0];
					temp[mouse_row+1][0] = grid[mouse_row+1][0];
					temp[mouse_row-1][1] = grid[mouse_row-1][1];
					temp[mouse_row][1] = grid[mouse_row][1];
					temp[mouse_row+1][1] = grid[mouse_row+1][1];
					break;
				case columns-1:
					temp[mouse_row-1][mouse_col] = grid[mouse_row-1][mouse_col];
					temp[mouse_row+1][mouse_col] = grid[mouse_row+1][mouse_col];
					temp[mouse_row-1][mouse_col-1] = grid[mouse_row-1][mouse_col-1];
					temp[mouse_row][mouse_col-1] = grid[mouse_row][mouse_col-1];
					temp[mouse_row+1][mouse_col-1] = grid[mouse_row+1][mouse_col-1];
					break;
				default:
					temp[mouse_row-1][mouse_col-1] = grid[mouse_row-1][mouse_col-1];
					temp[mouse_row-1][mouse_col] = grid[mouse_row-1][mouse_col];
					temp[mouse_row-1][mouse_col+1] = grid[mouse_row-1][mouse_col+1];
					temp[mouse_row+1][mouse_col-1] = grid[mouse_row+1][mouse_col-1];
					temp[mouse_row+1][mouse_col] = grid[mouse_row+1][mouse_col];
					temp[mouse_row+1][mouse_col+1] = grid[mouse_row+1][mouse_col+1];
					temp[mouse_row][mouse_col-1] = grid[mouse_row][mouse_col-1];
					temp[mouse_row][mouse_col+1] = grid[mouse_row][mouse_col+1];
					break;
				}
	}
	} else {
		console.log("MOSTRA 1 CELLA");
		temp[mouse_row][mouse_col] = grid[mouse_row][mouse_col];
	}
}

function draw() {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			textSize(cell_size);
			text(String(temp[i][j]), j*cell_size+cell_size/4, i*cell_size+cell_size/1.2);
		}
	}
}