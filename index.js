#!/usr/bin/env /usr/local/bin/node

const obj = {
  a: 2,
  b: "hello",
  c: true,
  d: ["something", "else"],
  e: { }
};

const object1 = "non"

const createDataClassFrom = (object) => {
  if(!isObject(object)) {
    console.log("Invalid JSON object");
    pbcopy("Invalid JSON object");
    return;
  }
  let res = "data class J2DC(\n";
  
  Object.keys(object).forEach(key => {
    const type = kotlinTypeOf(object[key]);
    res = res + `\tval ${key}: ${type}?,\n`;
  });

  res = res + ")";
  console.log(res);
  pbcopy(res);
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

const pbcopy = (data) => {
  var proc = require('child_process').spawn('pbcopy'); 
  proc.stdin.write(data); proc.stdin.end();
}

const isObject = object => {
    return typeof object === 'object' && object !== null && !Array.isArray(object);
}

createDataClassFrom(obj);
