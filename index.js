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
    str = str + `val ${key}: ${type}?,\n`;
  });

  str = str + ")";
  console.log(str);
}

const kotlinTypeOf = (value) => {
  switch(typeof value) {
    case "number": return "Int";
    case "string": return "String";
    case "boolean": return "Boolean";
    default: return "Any";
  }
} 

createDataClassFrom(object);
