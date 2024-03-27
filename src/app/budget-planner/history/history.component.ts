import { Component } from '@angular/core';
import { SideNavComponent } from "../side-nav/side-nav.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-history',
    standalone: true,
    templateUrl: './history.component.html',
    styleUrl: './history.component.scss',
    imports: [SideNavComponent, ReactiveFormsModule,CommonModule]
})
export class HistoryComponent {
  todoForm: any;
  selectedMont: any;

  expenses: {month: string, expenseAmount: number}[]= [
    { month: 'January' , expenseAmount: 1500},
    { month: 'February' , expenseAmount: 3000},
    { month: 'March' , expenseAmount: 1800},
  ];

  monthSelected: boolean = false;

  januaryExpense: any[] = [
    { expenseType: 'Recharge' , expenseAmount: 1000},
    { expenseType: 'Light Bills' , expenseAmount: 500},
  ];

  februaryExpense: any[] = [
    { expenseType: 'Essentials' , expenseAmount: 200},
    { expenseType: 'Light Bills' , expenseAmount: 400},
  ];

  marchExpense: any[] = [
    { expenseType: 'Recharge' , expenseAmount: 1100},
    { expenseType: 'Essentials' , expenseAmount: 250},
  ];

  constructor(private fb: FormBuilder, private router : Router){
    this.selectedMont= new Date().toLocaleString('default', {month: 'long'});

  }

  ngOnInit() {
    this.todoForm = this.fb.group({
      month : ['', Validators.required],
      expenseType : ['', Validators.required],
      exoenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense(){
    if(this.todoForm.valid){
      const newExpense = this.todoForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.todoForm.reset();
    }
  }

  onChangeExpense(event: any){
    this.selectedMont = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses(){
    switch(this.selectedMont){
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

  calculateTotalExpense(month: string):number{
    return this.getFilteredExpenses().reduce((acc , curr) => acc + curr.expenseAmount,0);
  }

  onSave(){
    if(this.todoForm.valid){
      this.todoForm.reset({month: this.selectedMont});
      this.getFilteredExpenses();
    }
  }

  saveForm(){
    console.log("Form Saved!");
  }

  onBack(){
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
