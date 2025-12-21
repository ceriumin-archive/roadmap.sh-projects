const FileStorage = require("../storage/fileStorage");

async function mark(args) {
  try {
    const storage = new FileStorage();
    const tasks = await storage.load();

    const taskId = parseInt(args[0]);
    const status = args[1];

    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      console.log(`Task with id ${taskId} not found`);
      return;
    }

    if (status === "complete") {
      task.complete();
    } else if (status === "working") {
      task.working();
    } else if (status === "uncomplete") {
      task.uncomplete();
    } else {
      console.log(
        `Invalid status: ${status}. Use 'complete', 'working', or 'uncomplete'`
      );
    }

    await storage.save(tasks);
    console.log(`Task marked as ${status}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

module.exports = mark;
