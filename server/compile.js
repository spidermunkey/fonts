const fs = require('fs-extra');
const path = require('path');
const {uuid} = require('./utils/uuid');
const {countFiles} = require('./utils/readdirp');

exports.compile_fonts = async function compile_fonts() {
  const dir = "C:/Users/justi/dev/data/fonts";
  const data = {};
  const folders = await fs.readdir(dir,{withFileTypes:true});
  for (const item of folders){
    const name = item.name;
    const fontName = name.split(/[_\-]/).join(' ');
    if (item.isFile()){
      // single file

    } else if (item.isDirectory()){
      // parse directory
      console.log('parsing font directory', fontName);
      data[fontName] = {
        name: fontName,
        cid: uuid(),
        count: await countFiles(path.join(dir,item.name),['.ttf','.otf','.wof']),
        fonts: await parse_font_directory(path.join(dir,item.name)),
    }
  }
  }
  console.log(data)
  return data;
}

async function parse_font_directory(dir) {
  const data = {};
  const isFont = filename => {
    let ext = path.extname(filename);
    return ext === '.ttf' || ext === '.wof' || ext === '.otf'
  }
  async function readdir_recursive(dir){
    const directory = await fs.readdir(dir,{withFileTypes:true});
    for (const item of directory){
      if (item.isFile() && isFont(item.name)){
        console.log('font found!', item.name)
        data[item.name.slice(0,-4)] = {
          name: item.name.slice(0,-4).split(/[_\-]/).join(' '),
          path:path.join(item.path,item.name),
          type:item.name.slice(-3),
          size: Math.round((await fs.stat(path.join(item.path,item.name))).size / 1000),
          content: await fs.readFile(path.join(item.path,item.name)),
        };
      } else if (item.isDirectory()){
        readdir_recursive(path.join(dir,item.name))
      }
    }
  }
  await readdir_recursive(dir);
  return data;
}
