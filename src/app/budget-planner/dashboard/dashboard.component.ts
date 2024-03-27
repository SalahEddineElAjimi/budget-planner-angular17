import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  lastMonthsIncome = ['January: $1000', 'February: $1500', 'March: $1200'];
  currentMonthIncome = '$2000';
  lastMonthsExpense= ['January: $1000', 'February: $1500', 'March: $1200'];
  currentMonthExpense= '$2000';

  todoTransaction = [
    { description: 'Pay electricity bill'},
    { description : 'Submit monthly report'},
    { description : 'Buy groceries' },
    { description : 'Call insurance company'}
  ];

  totalCurrentMonthIncome = 3000;
  totalCurrentMonthExpense = 2000;


  constructor(private router : Router){

  }

  onIncome(){
    this.router.navigate(['/budget-planner/income']);
  }

  onExpense(){
    this.router.navigate(['/budget-planner/expense']);
  }

  onTodo(){
    this.router.navigate(['/budget-planner/todo']);
  }

  get currentMonthSavings(): number{
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }

}
