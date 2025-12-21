const fileStorage = require("../storage/fileStorage");

async function remove(args) {
  try {
    const storage = new fileStorage();
    const id = parseInt(args[0], 10);

    await storage.deleteById(id);

    console.log(`Task Deleted Successfully (ID:${id})`);
  } catch (error) {
    console.error("Error deleting task:", error.message);
  }
}

module.exports = remove;
