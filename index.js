#!/usr/bin/env /usr/local/bin/node

const { obj, obj1 } = require("./test-data.js"); // TODO - Remove this dependency once the tool is properly tested
const { isSameTypeArray, isObject, toNormalCase } = require("./utils.js");
const cp = require("copy-paste");

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
  });

  res = res + ")\n";
  return res;
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
  const type = toNormalCase(key);
  insertSubType(type, object, subTypeMap);
  return type;
}

const insertSubType = (type, object, subTypeMap) => {
  subTypeMap[type] = object;
}

const kotlinTypeOfArray = (array, key, subTypeMap) => {
  if(array.length > 0 && isSameTypeArray(array)) {
    return `List<${kotlinTypeOf(array[0], key, subTypeMap)}?>`;
  } 
  return "List<Any?>";
}

const executeDefault = () => {
   try {
      createDataClassFromHelper(JSON.parse(cp.paste()));
    } catch (e) {
      console.log("Invalid JSON data");
    }
}

const execute = () => {
  if (process.argv.length === 2) {
    executeDefault();
  } else if(process.argv[2]) {
    switch(process.argv[2]) {
      case '-i' : createDataClassFromHelper(obj); break;
      default: console.log("Invalid flag"); 
    }
  }
}


execute();
