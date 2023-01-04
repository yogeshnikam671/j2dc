#!/usr/bin/env /usr/local/bin/node

const { obj, obj1 } = require("./test-data.js"); // TODO - Remove this dependency once the tool is properly tested
const { isSameTypeArray, isObject, toNormalCase, jsonParse } = require("./utils.js");
const cp = require("copy-paste");
const fs = require("fs");

const nullFlagCharacter = process.argv.includes('-n') ? "" : "?";

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
    res = res + `\tval ${key}: ${type}${nullFlagCharacter},\n`;
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
    return `List<${kotlinTypeOf(array[0], key, subTypeMap)}${nullFlagCharacter}>`;
  } 
  return `List<Any${nullFlagCharacter}>`;
}

const executeDefaultFlow = () => {
    const inputObj = jsonParse(cp.paste());
    createDataClassFromHelper(inputObj);
}

const executeFlagBasedFlow = () => {
  if(process.argv.includes('-i')) {
    const tmpFilePath = '/tmp/j2dc_file.json';
    require('child_process').spawnSync('vim', [tmpFilePath], {stdio:"inherit"});
    const inputJson = fs.readFileSync('/tmp/j2dc_file.json', { encoding: 'utf8' });
    fs.unlinkSync(tmpFilePath); 
    const inputObj = jsonParse(inputJson);
    createDataClassFromHelper(inputObj);
  }
}

const execute = () => {
  if (process.argv.length === 2) {
    executeDefaultFlow();
  } else if(process.argv.length > 2) {
    executeFlagBasedFlow();
  }
}


execute();
