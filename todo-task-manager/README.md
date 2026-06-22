# Task Management TODO App

A React and Tailwind CSS task manager built for the Web Gelistirme JavaScript project assignment. The app lets users create, list, update, delete, filter, search, and persist tasks in the browser with LocalStorage.

## Live Project

- Netlify: https://spontaneous-gecko-e8e865.netlify.app/
- GitHub: https://github.com/AlperZ23/JavaScriptProject

## Features

- Add new tasks with title, description, category, and priority.
- List saved tasks with status, priority, category, created date, and updated date.
- Update existing task details through the edit form.
- Delete tasks from the task list.
- Mark tasks as active or completed.
- Filter tasks by all, active, and completed states.
- Search tasks by title, description, category, or priority.
- Save tasks to LocalStorage so data remains after page refresh.

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- LocalStorage
- Netlify

## Project Structure

```text
src/
  Components/
    TaskFilters.jsx
    TaskForm.jsx
    TaskItem.jsx
    TaskList.jsx
    TaskStats.jsx
  Interfaces/
    task.js
  Pages/
    Home.jsx
```

## Screenshot

The project screenshot is included in the submission as `Task Manager _ React TODO App.pdf`.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```
