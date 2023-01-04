
const jsonIgnoreProps = "\n@JsonIgnoreProperties(ignoreUnknown = true)";
const jsonProperty = (prop) => `\t@JsonProperty("${prop}")\n`;

module.exports = {
  jsonIgnoreProps,
  jsonProperty
}
