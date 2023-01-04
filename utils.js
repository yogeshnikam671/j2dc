const process = require('process');

const isSameTypeArray = (array) => {
  const typeArray = array.map(elem => typeof elem);
  const initialType = typeArray[0];
  let res = true;
  typeArray.forEach(type => { if(type !== initialType) res = false; });
  
  // check the structure of objects if it is an array containing objects
  if(res && initialType === "object") {
   const initialKeys = Object.keys(array[0]);
   array.forEach(elem => {
      const currKeys = Object.keys(elem);
      if(initialKeys.length !== currKeys.length) res = false;
      else if(!initialKeys.every((val,idx) => val === currKeys[idx])) res = false;
   });   
  }

  return res;
}

const isObject = object => {
    return typeof object === 'object' && object !== null && !Array.isArray(object);
}

const toNormalCase = value => {
  const firstChar = value[0].toUpperCase();
  const otherChars = value.slice(1, value.length);
  return firstChar + otherChars;
}

const jsonParse = data => {
  try {
    return JSON.parse(data);
  } catch(e) {
    console.log("Invalid JSON input");
    process.exit(1);
  }
}

module.exports = {
  isSameTypeArray,
  isObject,
  toNormalCase,
  jsonParse
}

