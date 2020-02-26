import React from "react";
import { TaskContainer } from "./TaskContainer";

export class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          listID: 1,
          listName: "List-1",
          listTasks: [
            {
              taskID: 1,
              taskName: "Task-1",
              isCompleted: true
            },
            {
              taskID: 2,
              taskName: "Task-2",
              isCompleted: false
            }
          ]
        },
        {
          listID: 2,
          listName: "List-2",
          listTasks: [
            {
              taskID: 3,
              taskName: "Task-1",
              isCompleted: true
            },
            {
              taskID: 4,
              taskName: "Task-2",
              isCompleted: false
            },
            {
              taskID: 5,
              taskName: "Task-3",
              isCompleted: true
            }
          ]
        }
      ],
      listInputText: "",
      selectedListItem: ""
    };
    this.setListName = this.setListName.bind(this.setListName);
  }

  createNewList = () => {
    if (this.state.listInputText.length !== 0) {

      const toDoList = [...this.state.items];
      const listObj = {
        listID: new Date().valueOf(),
        listName: this.state.listInputText,
        listTasks: []
      };
      toDoList.push(listObj);
      this.setState({ items: toDoList });
      this.setState({ listInputText: "" });
    } else {
      alert("Please enter valid List Name");
    }
  };

  deleteList = listID => {
    const listItemToDelete = listID;
    const toDoList = [...this.state.items];
    const listIndex = toDoList.findIndex(
      item => item.listID === listItemToDelete
    );
    toDoList.splice(listIndex, 1);
    this.setState({ items: toDoList });
  };

  setListName = evt => {
    this.setState({ listInputText: evt.target.value });
  };

  selectedListItem = listID => {
    this.setState({ selectedListItem: listID });
  };

  setTaskName = () => {
    this.setState({ taskInputText: this.state.taskInputText });
  };

  createNewTask = newTaskName => {
    if (newTaskName.length !== 0) {

      const toDoList = [...this.state.items];
      const listItems = toDoList.find(
        item => item.listID === this.state.selectedListItem
      );

      const taskObj = {
        taskID: new Date().valueOf(),
        taskName: newTaskName,
        isCompleted: false
      };
      listItems.listTasks.push(taskObj);
      this.setState({ items: toDoList });
    } else {
      alert("Please enter valid Task Name");
    }
  };

  deleteTask = taskID => {
    const taskItemToDelete = taskID;
    const toDoList = [...this.state.items];
    const listItem = toDoList.find(
      item => item.listID === this.state.selectedListItem
    );
    const taskIndex = listItem.listTasks.findIndex(
      item => item.taskID === taskItemToDelete
    );
    listItem.listTasks.splice(taskIndex, 1);
    this.setState({ items: toDoList });
  };

  updateTaskStatus = selectedTaskID => {
    debugger;
    const toDoList = JSON.parse(JSON.stringify(this.state.items));

    const listItem = toDoList.find(
      item => item.listID === this.state.selectedListItem
    );

    const taskItem = listItem.listTasks.find(
      item => item.taskID === parseInt(selectedTaskID)
    );

    taskItem.isCompleted = !taskItem.isCompleted;
    this.setState({ items: toDoList });
  };

  render() {
    const toDoList = this.state.items;
    debugger;
    const listItems = toDoList.map(item => {
      return (
        <li key={item.listID}>
          <span onClick={() => this.selectedListItem(item.listID)}>
            {item.listName}
          </span>
          <button onClick={() => this.deleteList(item.listID)}>Remove</button>
        </li>
      );
    });

    return (
      <div>
        <div>
          <input
            type="text"
            value={this.state.listInputText}
            onChange={this.setListName}
          />
          <button onClick={this.createNewList}>Add New List</button>
          <ul>{listItems}</ul>
        </div>
        <div>
          <TaskContainer
            createNewTask={this.createNewTask}
            deleteTask={this.deleteTask}
            updateTaskStatus={this.updateTaskStatus}
            toDoList={this.state}
          />
        </div>
      </div>
    );
  }
}
