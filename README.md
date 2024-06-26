# j2dc
A CLI tool to convert JSON object into Kotlin data class


# Installation
To install this CLI tool, run the command `npm i -g j2dc`

# Usages

## Default behaviour

1. Copy the JSON you want to convert to kotlin data class to your clipboard.
2. Run the command `j2dc` in terminal.
3. You will see the resultant data class on terminal and the data class will also be automatically copied to your clipboard.
4. Now you don't have to explicitly copy the data class since it is already copied.
5. You can paste it in your kotlin file and use it.

## `-i` flag to take JSON as user input

1. Run the command `j2dc -i` in terminal.
2. It will open a vim session where you can input your JSON.
3. Once you provide the input, the resultant data class will be printed on terminal and also copied to clipboard.

## `-j` flag to get data class with Jackson annotations as output

1. Run the command `j2dc -j` in terminal.
2. This will return you data class with jackson annotations based on the json object copied in your clipboard.
3. The same data class will also be copied to your clipboard (default behaviour).

## `-n` flag to get data class with non nullable field types

1. In default behaviour, the data class output will always have nullable field types.
2. If you want the data types to be non-nullable, this flag can be passed. `j2dc -n`

## Misc

1. This tool does not understand `Double` or `Float` data types. It will always consider any number as `Int`.
   So in a case where you require the data type to be one of those, you will have to manually change the data types of those fields.
2. You can pass multiple flags at once : `j2dc -i -n -j`   
3. Pass the flag `--help` to understand how to use the tool.

# Troubleshooting

1. If you are getting the error `env: /usr/local/bin/node: No such file or directory`.
   - Run `which node`. This shows the node executable path in your machine.
   - Run `sudo cp <node_executable_path_in_your_machine> /usr/local/bin/node`. (temporary solution)
   - Now, run j2dc again. It should solve the issue.

# Roadmap

1. Add -s flag to get the output data class with keys in sorted manner.
2. Add support for Float/Double data types.


