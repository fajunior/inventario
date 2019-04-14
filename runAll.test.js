var fs = require('fs-extra')
  //child_process `exec` will let you normal bash-style executions
  //eg, exec('ls') is like programmatically entering the ls command
  //into a terminal window
  , exec = require("child_process").exec;

//callback for after our exec process finishes
function execCallback(error, stdout, stderr) { 
  console.log(stdout);
}
//fs.readdir will give us a list of files in the current ('.') directory
var testFiles = fs.readdir('./tests', function(err, files){
  if (err){
    console.log('error reading files', err);
  }else{
    //use this regex to reduce the list of files to only those which
    //adhere to the pattern you specified using a wildcar "*.test.js"
    files.filter(function(file){
      return /^.*?\.test\.js/.test(file)
    })
    //filter returns the reduced array which is immediately passed to
    //this forEach loop which will use our `exec` command to execute
    //the shell command `node xxxxxx.test.js` for every file in the array we just created
    .forEach(function(testFile){
        //console.log(testFile);
      exec('node tests/' + testFile, execCallback);
    });
  }
});