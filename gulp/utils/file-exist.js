import fs from 'node:fs';

const fileExist = (filepath) => {
  let flag = true;
  try{
    fs.accessSync(filepath, fs.F_OK);
  }catch(e){
    flag = false;
  }
  return flag;
};

export { fileExist };
