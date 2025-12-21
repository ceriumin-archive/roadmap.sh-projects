class Task {
  constructor(
    id,
    title,
    description = "",
    status = "To-Do",
    createdAt = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = new Date();
  }

  complete() {
    this.status = "Complete";
    this.updatedAt = new Date();
  }

  working() {
    this.status = "In-Progress";
    this.updatedAt = new Date();
  }

  uncomplete() {
    this.status = "To-Do";
    this.updatedAt = new Date();
  }

  update(updates) {
    if (updates.title) this.title = updates.title;
    if (updates.description !== undefined) {
      this.description = updates.description;
    }
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  static fromJSON(data) {
    return new Task(
      data.id,
      data.title,
      data.description,
      data.status,
      new Date(data.createdAt)
    );
  }
}

module.exports = Task;
