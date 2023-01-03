#!/usr/bin/env /usr/local/bin/node

const cp = require("copy-paste");

const obj = {
  "a": 2,
  "b": "hello",
  "c": true,
  "d": ["something", "else"],
  "e": { }
};

const object1 = "non"

const createDataClassFrom = (object) => {
  if(!isObject(object)) {
    console.log("Invalid JSON object");
    cp.copy("Invalid JSON object");
    return;
  }
  let res = "data class J2DC(\n";
  
  Object.keys(object).forEach(key => {
    const type = kotlinTypeOf(object[key]);
    res = res + `\tval ${key}: ${type}?,\n`;
  });

  res = res + ")\n";
  console.log(res);
  cp.copy(res);
}

const kotlinTypeOf = (value) => {
  switch(typeof value) {
    case "number": return "Int";
    case "string": return "String";
    case "boolean": return "Boolean";
    case "object": {
      if(isObject(value)) return kotlinTypeOfObject(value);
      else return kotlinTypeOfArray(value);
    }; 
    default: return "Any";
  }
} 

const kotlinTypeOfObject = (object) => {
  return "Any"
}

const kotlinTypeOfArray = (array) => {
  if(array.length > 0 && isSameTypeArray(array)) {
    return `List<${kotlinTypeOf(array[0])}?>`;
  } 
  return "List<Any?>";
}

const isSameTypeArray = (array) => {
  const typeArray = array.map(elem => typeof elem);
  const initialType = typeArray[0];
  let res = true;
  typeArray.forEach(type => { if(type !== initialType) res = false; });
  return res;
}

const isObject = object => {
    return typeof object === 'object' && object !== null && !Array.isArray(object);
}


const execute = () => {
  if (process.argv.length === 2) {
    try {
      const copiedContent = JSON.parse(cp.paste());
      createDataClassFrom(copiedContent);
    } catch (e) {
      console.log("Invalid JSON data");
    }
  } else if(process.argv[2]) {
    switch(process.argv[2]) {
      case '-i' : createDataClassFrom(obj); break;
      default: console.log("Invalid flag"); 
    }
  }
}


execute();
