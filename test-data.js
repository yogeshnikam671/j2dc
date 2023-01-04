
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

module.exports = { obj, obj1 }
