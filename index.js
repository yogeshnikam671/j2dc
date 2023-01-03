#!/usr/bin/env /usr/local/bin/node

const cp = require("copy-paste");

const obj = {
  "a": 2,
  "b": "hello",
  "c": true,
  "d": ["something", "else"],
  "e": { },
  "f": {
    "f1": "hello",
   },
  "g": {
    "g1": { "random": 10 },
    "g2": {
        "g3": {
            "g4": [],
            "g5": {
                "g6": 10
             }
         }
     }
   }
};

const obj1 = "non"

const createDataClassFromHelper = (object) => {
  let res = "data class J2DC(\n";
  const subTypeMap = {};

  res = createDataClassFrom(object, res, subTypeMap);

  while(Object.keys(subTypeMap).length > 0) {
    Object.keys(subTypeMap).forEach(key => {
      res += `\ndata class ${key}(\n`;
      res = createDataClassFrom(subTypeMap[key], res, subTypeMap);
      delete subTypeMap[key];
    });
  }

  console.log(res);
  cp.copy(res);
};

const createDataClassFrom = (object, res, subTypeMap) => {
  if(!isObject(object)) {
    return "Invalid JSON object";
  }

  Object.keys(object).forEach(key => {
    const type = kotlinTypeOf(object[key], key);
    res = res + `\tval ${key}: ${type}?,\n`;
    addSubTypeDetails(subTypeMap, object, key, type);
  });

  res = res + ")\n";
  return res;
}

const addSubTypeDetails = (subTypeMap, object, key, type) => {
  if(type.toLowerCase() === key.toLowerCase()) {
    subTypeMap[type] = object[key];
  }
}

const kotlinTypeOf = (value, key) => {
  switch(typeof value) {
    case "number": return "Int";
    case "string": return "String";
    case "boolean": return "Boolean";
    case "object": {
      if(isObject(value)) return kotlinTypeOfObject(value, key);
      else return kotlinTypeOfArray(value);
    }; 
    default: return "Any";
  }
} 

const kotlinTypeOfObject = (object, key) => {
  if(Object.keys(object).length === 0) return "Any";
  return key; // TODO - make this a normal first character capital and other characters small word
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
      createDataClassFromHelper(copiedContent);
    } catch (e) {
      console.log("Invalid JSON data");
    }
  } else if(process.argv[2]) {
    switch(process.argv[2]) {
      case '-i' : createDataClassFromHelper(obj); break;
      default: console.log("Invalid flag"); 
    }
  }
}


execute();
