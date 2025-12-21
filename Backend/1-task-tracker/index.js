#!/usr/bin/env node
const commands = require("./src/commands/_index");

let command = process.argv.slice(2);
let args = command.slice(1);

console.log(args);

switch (command[0]) {
  case "add":
    commands.add(args);
    break;
  case "remove":
    commands.remove(args);
    break;
  case "list":
    commands.list();
    break;
  case "update":
    commands.update(args);
    break;
  case "mark":
    commands.mark(args);
    break;
  default:
    console.log("Unknown command");
}
