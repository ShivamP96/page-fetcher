const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const input = process.argv.slice(2);

URL = input[0];
filePath = input[1];

const writingFile = function () {

  request(URL, (error, response, body) => {
    console.log('error:', error); // Print the error if one occured
    console.log('statusCode:', response && response.statusCode); 
   


    fs.writeFile(filePath, body, function(err) {
      if (err) {
        return console.log(err);
      }
      let stats = fs.statSync(filePath)
      let bytes = stats['size']
      console.log(`Downloaded and saved ${bytes} bytes to ${filePath}`)
    })
  });
}


if (fs.existsSync(filePath)) {
  rl.question("Do you want to overwrite this file Y/N: ", (answer) => {
    rl.close();
    if (answer.toLowerCase() === 'y') writingFile() 
  })
} else {
  writingFile();
}







