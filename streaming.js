var path = './public/songs';

var fs = require('fs'),
  files = fs.readdirSync(path),
  stream;

module.exports = {
  streamFiles: function (response) {
    function main() {
      if (!files.length) {
        return;
      }
      currentfile = path + '/' + files.shift();
      stream = fs.createReadStream(currentfile);
      stream.pipe(response);
      stream.on("end", function() {
        main();
      });
    }
    main();
  }
};
