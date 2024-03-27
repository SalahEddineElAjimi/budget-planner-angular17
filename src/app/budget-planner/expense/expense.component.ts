import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm: any;
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
    this.selectedMont = new Date().toLocaleString('default' , {month : 'long'});
  }

  ngOnInit() {
    this.expenseForm = this.fb.group({
      month : ['', Validators.required],
      expenseType : ['', Validators.required],
      expenseAmount : ['', Validators.required]
    });
  }

  onSubmitExpense(){
    if(this.expenseForm.valid){
      const newExpense = this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset();
    }
  }

  onChangeExpense(event: any){
    this.selectedMont = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses(){
    switch (this.selectedMont){
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

  calculateTotalExpense(month: string): number{
    return this.getFilteredExpenses().reduce((acc , curr)=> acc + curr.expenseAmount,0);
  }

  onSave(){
    if(this.expenseForm.valid){
      this.expenseForm.reset({ month: this.selectedMont});
      this.getFilteredExpenses();
    }

  }

  saveForm(){
    console.log('Form Saved');
  }

  onBack(){
    this.router.navigate(['/budget-planner/dashboard'])
  }

}
