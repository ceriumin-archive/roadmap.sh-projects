const Task = require("../models/Task");
const fileStorage = require("../storage/fileStorage");

async function add(args) {
  try {
    const title = args[0];
    const description = args[1] || "";

    const storage = new fileStorage();
    const tasks = await storage.load();

    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

    const newTask = new Task(newId, title, description);

    tasks.push(newTask.toJSON());

    await storage.save(tasks);

    console.log(`Task Added Successfully (ID:${newId})`);
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

module.exports = add;
