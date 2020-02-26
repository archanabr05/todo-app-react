import React from "react";

export class TaskContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInputText: "",
      taskItemSelected: "",
      istaskPending: ""
    };
    this.setTaskName = this.setTaskName.bind(this.setTaskName);
    this.updateTaskStatus = this.updateTaskStatus.bind(this.updateTaskStatus);
  }

  setTaskName = evt => {
    this.setState({ taskInputText: evt.target.value });
  };

  createTask = e => {
    e.preventDefault();
    this.props.createNewTask(this.state.taskInputText);
    this.setState({ taskInputText: "" });
  };

  setTaskItemToBeDeleted = taskID => {
    this.setState({ taskItemSelected: taskID });
    this.props.deleteTask(taskID);
  };

  updateTaskStatus = evt => {
    this.props.updateTaskStatus(evt.target.value);
  };

  render() {
    let taskItems;
    if (
      this.props.toDoList.selectedListItem !== "" &&
      this.props.toDoList.items.length > 0
    ) {
      const listItem = this.props.toDoList.items.find(
        itemList => itemList.listID === this.props.toDoList.selectedListItem
      );

      if (listItem) {
        taskItems = listItem.listTasks.map(itemTask => {
          return (
            <li key={itemTask.taskID}>
              <input
                type="checkbox"
                defaultChecked={itemTask.isCompleted}
                value={itemTask.taskID}
                onChange={this.updateTaskStatus}
              />
              {itemTask.taskName}
              <button
                onClick={() => this.setTaskItemToBeDeleted(itemTask.taskID)}
              >
                Remove
              </button>
            </li>
          );
        });
      }
    }

    return (
      <div>
        <input
          type="text"
          value={this.state.taskInputText}
          onChange={this.setTaskName}
        />
        <button onClick={this.createTask}>Add New Task</button>
        <ul>{taskItems}</ul>
      </div>
    );
  }
}
