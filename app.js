function generateMatrix (rows, cols) {
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

function printMatrix (matrix) {
  const markedRow = lowestRow(matrix); // Get the marked row index from lowestRow()

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];

    if (i === markedRow) {
      process.stdout.write('*\t'); // Append an asterisk at the start of the marked row
    } else {
      process.stdout.write('\t'); // Add an empty space at the start of other rows, symmetry damn it!
    }

    for (const num of row) {
      process.stdout.write(num + '\t');
    }

    const changes = countChanges(row);
    process.stdout.write(`(Lowest number: ${Math.min(...row)}, Changes required: ${changes})`);
    // Append the lowest number in the row and the count of changes needed at the end of the row

    process.stdout.write('\n');
  }
};

function countChanges (row) {
  let changeCounter = 0;
  let add = 1
  const countedCombinations = new Set();
  /*
  create a set for all the triplets of numbers we know of in a row
  if the triplet needs a change the numbers of said truplet will occur only in the two triplets before the one that needs a change, as we skip the rest of the numbers in the triplet and continue checking after it
  */

  for (let i = 0; i < row.length - 2; i = i + add) {
    const combination = [row[i], row[i + 1], row[i + 2]].join(',');// create a triplet of numbers to check against later

    if (!countedCombinations.has(combination)) {//check if we had encountered this combination before, skip if we did
      if (row[i] > 0 && row[i + 1] > 0 && row[i + 2] > 0) {// check if the current and two further indexes after current one are positive...
        changeCounter++; //...if so, increment the counter...
        add = 3; //...and instruct the loop to skip the next two indexes, as we won't be needing them again in counting
        continue;
      } else if (row[i] < 0 && row[i + 1] < 0 && row[i + 2] < 0) {//same as above, but for negative numbers
        changeCounter++;
        add = 3;
        continue;
      }
      add = 1;
      countedCombinations.add(combination); //add the current combination to the set
      continue;
    }//Note that we don't add the triplets that require changes, as they might occur again later, and we need to count them all if they do occur again
     //if that happens by sheer luck this code is ready
  }

  return changeCounter; //finnaly, return the ammount of changes we need to make to the row so that it doesn't contain three consecutive positive or negative numbers
};

  
function lowestRow(matrix) { //check which row has the lowest value and return it's index
  let lowestRow = 0;
  let lowestNum = Infinity;
  //initialize variables

  for (let i = 0; i < matrix.length; i++) {
    let minInRow = Math.min(...matrix[i]); //find lowest number in the row
    if (minInRow < lowestNum) {//check if it's the lowest overall, if not, skip
      lowestNum = minInRow;
      lowestRow = i; //set the iteration index as the lowest row index to be returned later
    }
  }
  return lowestRow; //Finnaly, return the index
}
  
  const rows = 10;
  const cols = 10;
  const matrix = generateMatrix(rows, cols); //generate the matrix, with specified dimensions above
  printMatrix(matrix); //print the matrix out(all the magic is inside this function)