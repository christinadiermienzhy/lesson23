"use strict";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

today = dd + '/' + mm + '/' + yyyy;
var toDoList = {
  tasks: [],
  createTasks: function createTasks(taskText) {
    var currentTaskIndex = this.tasks.findIndex(function (task) {
      if (task.text.toUpperCase() === taskText.toUpperCase()) {
        return task;
      }
    });

    if (currentTaskIndex >= 0) {
      alert('Такая заметка уже существует?!');
    } else {
      this.tasks.push({
        text: taskText,
        creationDate: today,
        status: false,
        id: (Math.random() * 1000000).toFixed(0)
      });
      var taskItem = document.createElement('li');
      var taskItemBlock = document.createElement('div');
      var addedValue = document.querySelector('input').value;
      taskItemBlock.innerText = addedValue;
      var taskId = this.tasks.find(function (element) {
        return element.text === addedValue;
      }).id;
      taskItem.setAttribute('id', taskId);
      document.querySelector('.taskList').prepend(taskItem);
      document.querySelector('li:first-child').append(taskItemBlock);
      var deleteButton = document.createElement('button');
      deleteButton.classList.add('deleteTaskfromList');
      deleteButton.innerText = 'Remove';
      document.querySelector('li:first-child').append(deleteButton);
      deleteButton.addEventListener('click', function (event) {
        toDoList.deleteTasks(taskId);
      });
      var changeStatusButton = document.createElement('button');
      changeStatusButton.classList.add('changeStatus');
      changeStatusButton.innerText = 'Done';
      document.querySelector('li:first-child').append(changeStatusButton);
      changeStatusButton.addEventListener('click', function (event) {
        toDoList.checkDone(taskId);
        changeStatusButton.setAttribute('disabled', false);
        editButton.setAttribute('disabled', false);
        event.target.parentElement.classList.add('inactive');
      });
      var editButton = document.createElement('button');
      editButton.classList.add('editTask');
      editButton.innerText = 'Edit';
      document.querySelector('li:first-child').append(editButton);
      editButton.addEventListener('click', function (event) {
        var newText = prompt('Введите новое содержание заметки');

        if (newText === null) {
          return alert('Изменения не сохранены!');
        } else if (newText.length > 0) {
          toDoList.editTasks(taskId, newText);
        } else {
          return alert('Заметка не может быть пустой!');
        }
      });
    }
  },
  deleteTasks: function deleteTasks(id, verificationStatus) {
    var verificationStatusDelete = confirm('Вы уверены, что необходимо удалить выбранную заметку?');
    var currentTaskIndex = this.tasks.findIndex(function (task) {
      if (task.id === id) {
        return task;
      }
    });

    if (verificationStatusDelete === true) {
      this.tasks.splice(currentTaskIndex, 1);
      event.target.parentElement.remove();
    }
  },
  editTasks: function editTasks(id, editedTask, verificationStatus) {
    var currentTaskIndex = this.tasks.findIndex(function (task) {
      if (task.id === id) {
        return task;
      }
    });
    var verificationStatusEdit = confirm('Сохранить сделанные изменения?');

    if (verificationStatusEdit === true) {
      if (editedTask.length > 0) {
        var currentTaskIndexEdit = this.tasks.findIndex(function (task) {
          if (task.text.toUpperCase() === editedTask.toUpperCase()) {
            return task;
          }
        });

        if (currentTaskIndexEdit >= 0) {
          alert('Такая заметка уже существует!');
        } else {
          this.tasks[currentTaskIndex].text = editedTask;
          event.target.parentElement.querySelector('div').innerText = editedTask;
        }
      } else {
        return alert('Заметка не может быть пустой!');
      }
    }
  },
  checkDone: function checkDone(id) {
    var currentTaskIndex = this.tasks.findIndex(function (task) {
      if (task.id === id) {
        return task;
      }
    });
    return this.tasks[currentTaskIndex].status = !this.tasks[currentTaskIndex].status;
  }
};

var createToDolit = function createToDolit() {
  var formBlock = document.createElement('form');
  formBlock.setAttribute('name', 'ToDoList');
  formBlock.classList.add('toDoForm');
  var labelElement = document.createElement('label');
  labelElement.setAttribute('for', 'inputId');
  labelElement.innerText = 'Введите свою заметку и кликните на кнопку Add';
  var inputBlock = document.createElement('input');
  inputBlock.setAttribute('type', 'text');
  inputBlock.setAttribute('class', 'inputField');
  inputBlock.setAttribute('id', 'inputId');
  inputBlock.setAttribute('placeholder', 'Напишите заметку');
  var sendButton = document.createElement('button');
  sendButton.setAttribute('type', 'Submit');
  sendButton.innerText = 'Add';
  sendButton.classList.add('submitNewTask');
  var tasksBlock = document.createElement('div');
  tasksBlock.classList.add('tasksBlock');
  var tasksBlockList = document.createElement('ul');
  tasksBlockList.classList.add('taskList');
  document.body.prepend(tasksBlock);
  document.body.prepend(formBlock);
  document.body.querySelector('form').prepend(inputBlock);
  document.body.querySelector('form').prepend(labelElement);
  document.body.querySelector('form').append(sendButton);
  document.body.querySelector('div').append(tasksBlockList);
  var submitButton = document.querySelector('.submitNewTask');
  submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    var addedValue = document.querySelector('input').value;

    if (addedValue.length === 0) {
      return alert('Заметка не может быть пустой!');
    } else {
      toDoList.createTasks(addedValue);
      document.querySelector('input').value = '';
    }
  });
};

createToDolit();