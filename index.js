#!/usr/bin/env /usr/local/bin/node

const object = {
  a: 2,
  b: "hello",
  c: true,
  d: ["something", "else"],
  e: { }
};

const createDataClassFrom = (object) => {
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
    case "object": return kotlinTypeOfObject(value);
    default: return "Any";
  }
} 

const kotlinTypeOfObject = (object) => {
  if(object.length === undefined) return "Any";
  if(object.length > 0 && isSameTypeArray(object)) {
    return `List<${kotlinTypeOf(object[0])}?>`;
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
createDataClassFrom(object);
