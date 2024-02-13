function generateMatrix(rows, cols) {
  // Create a new matrix with the specified number of rows and columns
  const matrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.floor(Math.random() * 201) - 100));
  return matrix;
}

  function printMatrix(rows, cols) {
    let matrix = generateMatrix(rows, cols)
    // Find the index of the lowest row
    const lowestRowIdx = lowestRow(matrix); 
  
    // Loop through each row of the matrix
    matrix.forEach((row, i) => {
      // Print an asterisk at the start of the marked row, otherwise an empty space
      process.stdout.write(i === lowestRowIdx ? '*\t' : '\t');
  
      // Print each number in the row separated by tabs
      row.forEach(num => process.stdout.write(num + '\t'));
  
      // Calculate the number of changes needed in the row and print the lowest number and changes required
      const changes = countChanges(row);
      process.stdout.write(`(Lowest number: ${Math.min(...row)}, Changes required: ${changes})\n`);
    });
  }

  function countChanges(row) {
    let changeCounter = 0; // initialize a counter for the number of changes needed
    const countedCombinations = new Set(); // use a Set to store unique combinations of triplets
  
    for (let i = 0; i < row.length - 2; i++) { // iterate through the row
      const combination = [row[i], row[i + 1], row[i + 2]].join(','); // create a triplet of numbers to check against later
  
      if (countedCombinations.has(combination)) { // if the combination has already been encountered, skip it
        continue;
      }
  
      if ((row[i] > 0 && row[i + 1] > 0 && row[i + 2] > 0) || (row[i] < 0 && row[i + 1] < 0 && row[i + 2] < 0)) { // if the triplet is all positive or all negative
        changeCounter++; // increment the counter
        countedCombinations.add(combination); // add the combination to the set to avoid recounting it
        i += 2; // skip the next two indexes, as we won't be needing them again in counting
      } else {
        countedCombinations.add(combination); // add the combination to the set
      }
    }
  
    return changeCounter; // return the number of changes needed to the row so that it doesn't contain three consecutive positive or negative numbers
  }

  
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
  
  printMatrix(10, 10); 
  /*
  Generate a matrix with specified dimensions(any combination is supported), and print it out with specified conditions:
  1. row with the lowest number is marked with '*' at the start of it
  2. every row has it's lowest number at the end
  3. every row has the ammount of changes requirted so that there's < 3 consecutive numbers < 0 or > 0
  */