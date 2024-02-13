const generateMatrix = (rows, cols) => {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
  const row = [];
  for (let j = 0; j < cols; j++) {
  // Generate a random integer between -100 and 100
  const num = Math.floor(Math.random() * 201) - 100;
  row.push(num);
  }
  matrix.push(row);
  }
  return matrix;
  };

const printMatrix = (matrix) => {
  const markedRow = lowestRow(matrix); // Get the marked row index from lowestRow()

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];

    if (i === markedRow) {
      process.stdout.write('*\t'); // Append an asterisk at the start of the marked row
    } else {
      process.stdout.write('\t'); // Add an empty space at the start of other rows
    }

    for (const num of row) {
      process.stdout.write(num + '\t');
    }

    const changes = countChanges(row);
    process.stdout.write(`(Lowest number: ${Math.min(...row)}, Changes required: ${changes})`); // Append the count of changes at the end of the row

    process.stdout.write('\n');
  }
};

const countChanges = (row) => {
  let changeCounter = 0;
  let add = 1
  const countedCombinations = new Set();

  for (let i = 0; i < row.length - 2; i = i + add) {
    const combination = [row[i], row[i + 1], row[i + 2]].join(',');

    if (!countedCombinations.has(combination)) {
      if (row[i] > 0 && row[i + 1] > 0 && row[i + 2] > 0) {
        changeCounter++;
        add = 3;
        countedCombinations.add(combination);
        continue;
      } else if (row[i] < 0 && row[i + 1] < 0 && row[i + 2] < 0) {
        changeCounter++;
        add = 3;
        countedCombinations.add(combination);
        continue;
      }
      add = 1;
    }
  }

  return changeCounter;
};

  
const lowestRow = (matrix) => {
  let lowestRow = null;
  let lowestNum = Infinity;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] < lowestNum) {
        lowestNum = matrix[i][j];
        lowestRow = i;
      }
    }
  }
  return lowestRow;
};
  
  // Example usage
  const rows = 10;
  const cols = 10;
  const matrix = generateMatrix(rows, cols);
  printMatrix(matrix);