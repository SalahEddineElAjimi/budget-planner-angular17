import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todoForm: any;
  selectedMont: any;

  expenses: {month: string, expenseAmount: number}[]= [
    { month: 'January' , expenseAmount: 1500},
    { month: 'February' , expenseAmount: 3000},
    { month: 'March' , expenseAmount: 1800},
  ];

  monthSelected: boolean = false;

  januaryExpense: any[] = [
    { expenseType: 'Rent' , expenseAmount: 1000},
    { expenseType: 'Groceries' , expenseAmount: 500},
  ];

  februaryExpense: any[] = [
    { expenseType: 'Utilities' , expenseAmount: 200},
    { expenseType: 'Groceries' , expenseAmount: 400},
  ];

  marchExpense: any[] = [
    { expenseType: 'Rent' , expenseAmount: 1100},
    { expenseType: 'Utilities' , expenseAmount: 250},
  ];

  constructor(private fb: FormBuilder, private router : Router){
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long'});
    this.selectedMont = currentMonth;
  }

  ngOnInit() {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount : ['',Validators.required]
    });
  }

  onSubmitExpense(){
    if(this.todoForm.valid){
      const newExpense = this.todoForm.value;
      switch(this.selectedMont){
        case 'January':
          this.januaryExpense.push(newExpense);
          break;
        case 'February':
          this.februaryExpense.push(newExpense);
          break;
        case 'March':
          this.marchExpense.push(newExpense);
          break;
        default:
          break;
      }
      this.todoForm.reset();
      this.todoForm.patchValue({ month: '', expenseType: '', expenseAmount: ''});
    }
  }

  onChangeExpense(event: any){
    this.selectedMont = event.target.value;
    this.monthSelected= true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses(){
    let filteredExpense: any[] = [];
    switch(this.selectedMont){
      case 'January':
        filteredExpense = [...this.januaryExpense];
        break;
      case 'February':
        filteredExpense = [...this.februaryExpense];
        break;
      case 'March':
        filteredExpense = [...this.marchExpense];
        break;
      default:
        break;
    }
    return filteredExpense;
  }

  calculateTotalExpense(month: string):number {
    let totalExpense = 0;
    for (const income of this.gettodoFormonth(month)){
      totalExpense += income.expenseAmount;
    }
    return totalExpense;

  }

  gettodoFormonth(month: string): any[]{
    switch(month){
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      default:
        return [];
    }
  }

  onSave(){
    if(this.todoForm.valid){
      const incomeData = this.todoForm.value;
      this.todoForm.reset({month: this.selectedMont});
      this.getFilteredExpenses();
    }

  }

  saveForm(){
    console.log("Form Saved");
  }

  onBack(){
    this.router.navigate(['/budget-planner/dashboard']);
  }

}