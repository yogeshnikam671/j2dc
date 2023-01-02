#!/usr/bin/env /usr/local/bin/node

const object = {
  a: 2,
  b: "hello",
  c: true,
  d: ["something"],
  e: { }
};

const createDataClassFrom = (object) => {
  let str = "data class J2DC(\n";
  
  Object.keys(object).forEach(key => {
    const type = kotlinTypeOf(object[key]);
    str = str + `\tval ${key}: ${type}?,\n`;
  });

  str = str + ")";
  console.log(str);
  pbcopy(str);
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
  if(object.length > 0) {
    return `List<${kotlinTypeOf(object[0])}?>`;
  } 
  return "List<Any?>";
}

const pbcopy = (data) => {
  var proc = require('child_process').spawn('pbcopy'); 
  proc.stdin.write(data); proc.stdin.end();
}
createDataClassFrom(object);
