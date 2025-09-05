import { Component, OnInit } from '@angular/core';
import { Task } from '../../interface/task';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, NgFor],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class Todo implements OnInit {
  newTask: string = '';
  tasks: Task[] = [];

  ngOnInit(): void {
    this.loadTasks();
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ tittle: this.newTask, complete: false });
      this.newTask = '';
      this.saveTask();

      Swal.fire({
        icon: 'success',
        title: 'Task Added!',
        text: 'Your task has been added successfully.',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid task!'
      });
    }
  }

  deleteTask(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasks.splice(index, 1);
        this.saveTask();

        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      }
    });
  }

  toggleTask(index: number) {
    this.tasks[index].complete = !this.tasks[index].complete;
    this.saveTask();

    if (this.tasks[index].complete) {
      Swal.fire({
        icon: 'success',
        title: 'Task Completed!',
        text: 'Great job 🎉',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Task Marked Incomplete',
        text: 'You can complete it later ',
        timer: 1500,
        showConfirmButton: false
      });
    }
  }

  saveTask() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
}
