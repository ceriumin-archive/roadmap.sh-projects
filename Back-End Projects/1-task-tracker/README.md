## Task Tracker CLI

A simple command-line task tracker built with Node.js. Manage your tasks with add, update, delete, mark, and list commands. Tasks are stored locally in a `data.json` file.

## Features

- Add new tasks
- Update task descriptions
- Delete tasks
- Mark tasks as `todo`, `in-progress`, or `done`
- List all tasks or filter by status

## Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/task-tracker-cli.git
   cd task-tracker-cli
   ```
2. Install dependencies (if any):
   ```sh
   npm install
   ```
3. Make the script executable:
   ```sh
   chmod +x index.js
   ```

## Usage

Run the CLI using Node.js:

```sh
node index.js <command> [arguments]
```

Or, if you have made it executable:

```sh
./index.js <command> [arguments]
```

### Commands

#### Add a Task

```sh
node index.js add "Your task description"
```

Adds a new task with status `todo`.

#### Update a Task

```sh
node index.js update <id> "New description"
```

Updates the description of the task with the given ID.

#### Delete a Task

```sh
node index.js delete <id>
```

Deletes the task with the given ID.

#### Mark a Task

```sh
node index.js mark <id> <status>
```

Marks the task with the given ID as `todo`, `in-progress`, or `done`.

#### List Tasks

```sh
node index.js list
```

Lists all tasks.

```sh
node index.js list <status>
```

Lists tasks filtered by status (`todo`, `in-progress`, or `done`).

### Example

```sh
node index.js add "Write documentation"
node index.js add "Fix bug #42"
node index.js list
node index.js mark 2 done
node index.js update 1 "Write detailed documentation"
node index.js delete 2
node index.js list done
```

## Data Storage

Tasks are stored in a local `data.json` file in the project directory.

## Valid Statuses

- `todo`
- `in-progress`
- `done`

## License

MIT

## Author

Your Name
