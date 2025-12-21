const fs = require("fs").promises;
const path = require("path");
const Task = require("../models/Task");

class FileStorage {
  constructor(filePath = path.join(__dirname, "../../data/data.json")) {
    this.filePath = filePath;
  }

  async load() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      const tasks = JSON.parse(data);
      return tasks.map((task) => Task.fromJSON(task));
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async save(tasks) {
    try {
      const jsonData = tasks.map((task) =>
        task instanceof Task ? task.toJSON() : task
      );

      await fs.writeFile(
        this.filePath,
        JSON.stringify(jsonData, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.error("Error saving tasks:", error.message);
      throw error;
    }
  }

  async getByID(id) {
    const tasks = await this.load();
    return tasks.find((task) => task.id === id);
  }

  async add(task) {
    const tasks = await this.load();
    tasks.push(task instanceof Task ? task.toJSON() : task);
    await this.save(tasks);
    return task;
  }

  async updateByID(id, updates) {
    const tasks = await this.load();
    const taskIndex = tasks.findIndex((t) => t.id == id);

    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }

    const task = Task.fromJSON(tasks[taskIndex]);
    task.update(updates);
    tasks[taskIndex] = task.toJSON();
    await this.save(tasks);
    return task;
  }

  async deleteById(id) {
    const tasks = await this.load();
    const initialLength = tasks.length;
    const filtered = tasks.filter((task) => task.id !== id);

    if (filtered.length === initialLength) {
      throw new Error(`Task with ID ${id} not found`);
    }

    await this.save(filtered);
    return true;
  }

  async listAll() {
    return await this.load();
  }
}

module.exports = FileStorage;
