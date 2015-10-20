var fs   = require('fs');
var path = require('path');
var fse  = require('fs-extra');
var archiver = require('archiver');

var TARGETDIR = 'submission';
var TARGETZIP = 'submission.zip';

var files = [
  'package.json',
  '.gitignore',
  '.git',
  '.jshintrc',
  'app.js',
  'lib',
  'public',
  'qa',
  'views',
];

function copyFiles(list, cb) {
  function copy(err, list) {
    if (list.length !== 0) {
      var from = list[0];
      var to   = path.join(TARGETDIR, list[0]);
      fse.copy(from, to, (err) => {
        if (err) {
          console.log('could not copy ' + from + ' to ' + to);
          console.log('the error was ' + err);
          console.log('Skipping file. Talk to instructor!');
        }
        copy(err, list.slice(1));
      });
    } else {
      cb(undefined);
    }
  }

  copy(undefined, list);
}

function zip() {
  var output  = fs.createWriteStream(TARGETZIP);
  var archive = archiver('zip');
  output.on('close', () => {
    fse.remove(TARGETDIR, () => {});
    console.log('submission zipped!');
  });
  archive.pipe(output);
  archive.bulk([
    {
      src: [ '**/*' ], cwd: TARGETDIR, dest: TARGETDIR, expand: true
    }
  ]);
  archive.finalize((err, bytes) => {
    if (err) {
      console.log(err);
    } else {
      console.log('wrote ', bytes);
    }
  });
}

fse.remove(TARGETZIP, () => {
  fse.emptyDir(TARGETDIR, (err) => {
    if (err) {
      console.log('count not create ' + TARGETDIR + ' directory');
      console.err(err);
    } else {
      copyFiles(files, (err) => {
        if (err) throw err;
        zip();
      });
    }
  });
});
