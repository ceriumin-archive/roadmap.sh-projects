#!/usr/bin/env node

const fs = require("fs");
const DATA_FILE = "data.json";
const VALID_STATUSES = ["todo", "in-progress", "done"];
const args = process.argv.slice(2);

function readTasks() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    const content = fs.readFileSync(DATA_FILE, "utf8");
    return content ? JSON.parse(content) : [];
  } catch (err) {
    console.error("Error reading data:", err);
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

function addTask(description) {
  const tasks = readTasks();
  const newTask = {
    id: tasks.length + 1,
    task: description,
    status: "todo",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  tasks.push(newTask);
  writeTasks(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

function updateTask(id, description) {
  const tasks = readTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return console.log(`Error: Task with ID ${id} not found.`);
  tasks[idx].task = description;
  tasks[idx].updatedAt = Date.now();
  writeTasks(tasks);
  console.log(`Task ${id} updated.`);
}

function deleteTask(id) {
  const tasks = readTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return console.log(`Error: Task with ID ${id} not found.`);
  tasks.splice(idx, 1);
  writeTasks(tasks);
  console.log(`Task ${id} deleted.`);
}

function markTask(id, status) {
  const tasks = readTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return console.log(`Error: Task with ID ${id} not found.`);
  tasks[idx].status = status;
  tasks[idx].updatedAt = Date.now();
  writeTasks(tasks);
  console.log(`Task ${id} marked as ${status}.`);
}

function listTasks(status) {
  const tasks = readTasks();
  const filtered =
    status && VALID_STATUSES.includes(status)
      ? tasks.filter((t) => t.status === status)
      : tasks;
  if (!filtered.length) {
    console.log(status ? `No tasks with status: ${status}` : "No tasks found.");
    return;
  }
  filtered.forEach((t) => {
    console.log(
      `ID: ${t.id}\nTask: ${t.task}\nStatus: ${t.status}\nCreated: ${new Date(
        t.createdAt
      ).toLocaleString()}\nUpdated: ${new Date(
        t.updatedAt
      ).toLocaleString()}\n---`
    );
  });
}

switch (args[0]) {
  case "add":
    if (args[1]) addTask(args[1]);
    else console.log("Error: Provide a task description.");
    break;
  case "update":
    {
      const id = parseInt(args[1], 10);
      if (!isNaN(id) && args[2]) updateTask(id, args[2]);
      else console.log("Error: Provide valid task ID and description.");
    }
    break;
  case "delete":
    {
      const id = parseInt(args[1], 10);
      if (!isNaN(id)) deleteTask(id);
      else console.log("Error: Provide a valid task ID.");
    }
    break;
  case "mark":
    {
      const id = parseInt(args[1], 10);
      const status = args[2];
      if (!isNaN(id) && VALID_STATUSES.includes(status)) markTask(id, status);
      else console.log("Error: Provide valid task ID and status.");
    }
    break;
  case "list":
    listTasks(args[1]);
    break;
  default:
    console.log(
      `Unknown command. Valid commands: add, update, delete, mark, list. Valid statuses: ${VALID_STATUSES.join(
        ", "
      )}.`
    );
}
