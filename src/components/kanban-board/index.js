import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
        { name: "1", stage: 0 },
        { name: "2", stage: 0 },
      ],
      currentTask: {},
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];

    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }

    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    const handleInput = (e) => {
      const taskText = e.target.value;
      const currentTask = { name: taskText, stage: 0 };
      this.setState({
        currentTask,
      });
    };

    const addTask = (e) => {
      e.preventDefault();
      const newTask = this.state.currentTask;
      if (newTask.name !== "") {
        const tasks = [...this.state.tasks, newTask];
        this.setState({
          tasks: tasks,
          currentTask: { name: "", stage: 0 },
        });
      }
    };

    const deleteTask = (name) => {
      const filterTasks = this.state.tasks.filter((task) => {
        return task.name !== name;
      });
      this.setState({
        tasks: filterTasks,
      });
    };

    const incrementTask = (name) => {};

    const decrementTask = (name) => {};

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <form onSubmit={addTask}>
            <input
              id="create-task-input"
              type="text"
              className="large"
              placeholder="New task name"
              data-testid="create-task-input"
              value={this.state.currentTask.name}
              onChange={handleInput}
            />
            <button
              type="submit"
              className="ml-30"
              data-testid="create-task-button"
            >
              Create task
            </button>
          </form>
        </section>
        <h1>{this.state.value}</h1>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return (
                        <li className="slide-up-fade-in" key={`${i}${index}`}>
                          <div className="li-content layout-row justify-content-between align-items-center">
                            <span
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-name`}
                            >
                              {task.name}
                            </span>
                            <div className="icons">
                              <button
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-back`}
                                onClick={() => decrementTask(task.name)}
                              >
                                <i className="material-icons">arrow_back</i>
                              </button>
                              <button
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-forward`}
                                onClick={() => incrementTask(task.name)}
                              >
                                <i className="material-icons">arrow_forward</i>
                              </button>
                              <button
                                className="icon-only danger x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-delete`}
                                onClick={() => deleteTask(task.name)}
                              >
                                <i className="material-icons">delete</i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
