const fileStorage = require("../storage/fileStorage");

async function update(args) {
  try {
    const id = args[0];
    const title = args[1];
    const description = args[2] || "";

    const storage = new fileStorage();
    await storage.updateByID(id, { title, description });

    console.log(`Task Updated Successfully (ID:${id})`);
  } catch (error) {
    console.error("Error updating tasks:", error.message);
  }
}

module.exports = update;
