
const jsonIgnoreProps = "\n@JsonIgnoreProperties(ignoreUnknown = true)";
const jsonProperty = (prop) => `\t@JsonProperty("${prop}")\n`;

const help = () => {
    console.log("------------------------------------------------------------------------------");
    console.log("Default Behaviour:\n");
    console.log("1. Copy the JSON to be converted to clipboard.");
    console.log("2. Run the command j2dc.");
    console.log("3. The resultant data class will be printed.");
    console.log("4. The resultant data class will also be automatically copied to the clipboard.\n");

    console.log("Options: ");
    console.log("-i  : takes user input");
    console.log("-j  : returns data class with Jackson annotations");
    console.log("-n  : returns data class with non-nullable field types");
}

module.exports = {
  jsonIgnoreProps,
  jsonProperty,
  help
}
