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
            "g4": [{ "h": "h1" }, { "h": "h2" }],
            "g5": {
                "g6": 10
             }
         }
     }
   },
  "dynamicFieldsJson": [ { "checkListId": "1000001", "submitVal": "Resolved"}]
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
    const type = kotlinTypeOf(object[key], key, subTypeMap);
    res = res + `\tval ${key}: ${type}?,\n`;
    //addSubTypeDetails(subTypeMap, object, key, type);
  });

  res = res + ")\n";
  return res;
}

const addSubTypeDetails = (subTypeMap, object, key, type) => {
  if(type.toLowerCase() === key.toLowerCase()) {
    subTypeMap[type] = object[key];
  }
}

const kotlinTypeOf = (value, key, subTypeMap) => {
  switch(typeof value) {
    case "number": return "Int";
    case "string": return "String";
    case "boolean": return "Boolean";
    case "object": {
      if(isObject(value)) return kotlinTypeOfObject(value, key, subTypeMap);
      else return kotlinTypeOfArray(value, key, subTypeMap);
    }; 
    default: return "Any";
  }
} 

const kotlinTypeOfObject = (object, key, subTypeMap) => {
  if(Object.keys(object).length === 0) return "Any";
  subTypeMap[key] = object;
  return key; // TODO - make this a normal first character capital and other characters small word
}

const kotlinTypeOfArray = (array, key, subTypeMap) => {
  if(array.length > 0 && isSameTypeArray(array)) {
    return `List<${kotlinTypeOf(array[0], key, subTypeMap)}?>`;
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
