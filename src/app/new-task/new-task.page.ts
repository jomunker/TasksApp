import { Component, OnInit } from '@angular/core';

import { TasksService } from '../services/tasks.service';
import { CategoriesService } from '../services/categories.service';

import { Location } from '@angular/common';

import { Task } from '../interfaces/task';
import { Category } from '../interfaces/category';
import { format, parseISO } from 'date-fns'


import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})

export class NewTaskPage implements OnInit {

  public task: Task;
  public category: Category;

  constructor(private tasksService: TasksService, private categoriesService: CategoriesService, private location: Location, private alertCtrl: AlertController) {

    this.task = {
      id: '',
      title: '',
      category: '',
      content: '',
      timed: false,
      date: '',
      isoDate: '',
      time: '',
    };

    this.category = {
      id: '',
      title: '',
    }

  }


  ngOnInit() { }

  // create and save task
  addTask() {

    console.log(this.task.time);
    console.log(this.task.date);

    this.checkTime();
    this.checkDate();

    console.log(this.task.category);
    console.log(this.task);
    this.tasksService.createTask(this.task.title, this.task.category, this.task.content, this.task.timed, this.task.date, this.task.isoDate, this.task.time);
    console.log(this.task);


    // go back to overview
    this.location.back();
    console.log(this.task);

  }

  checkTime() {
    // parse time if a time is entered
    if (this.task.time) {
      let timeString = parseISO(this.task.time);
      this.task.time = format(timeString, 'HH:mm');
      console.log(this.task.time);
    } else {
      // set task.time to "" if no time is entered
      this.task.time = "";
    }
  }

  checkDate() {
    // parse date if a date is entered
    if (this.task.isoDate) {
      let dateString = parseISO(this.task.isoDate);
      this.task.date = format(dateString, 'dd.MM.yyyy')
      console.log(this.task.date);
    } else {
      // set task.date and isoDate to "" if no date is entered
      this.task.isoDate = "";
      this.task.date = "";
    }
  }

  // add category via alert
  addCategory() {
    this.alertCtrl.create({
      header: 'New Category',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.categoriesService.createCategory(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

}
