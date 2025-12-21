const fileStorage = require("../storage/fileStorage");

async function list(status) {
  try {
    const storage = new fileStorage();
    const tasks = await storage.listAll();
    const filtered = status
      ? tasks.filter((task) => task.status === status)
      : tasks;
    console.log(JSON.stringify(filtered, null, 2));
  } catch (error) {
    console.error("Error listing tasks:", error.message);
  }
}

module.exports = list;
