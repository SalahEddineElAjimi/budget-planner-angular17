import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  incomeForm: any;
  selectedMont: any;

  januaryIncome: any[]= [
    { source : 'Salary', amount : 5000, investments: '401(k)'  },
    { source : 'Freelancing', amount : 1000, investments: 'Stocks'},
  ];
  februaryIncome: any[]= [
    { source : 'Salary', amount : 5500, investments: '401(k)'  },
    { source : 'Rental Income', amount : 700, investments: 'Real Estate'},
  ];
  marchIncome: any[]= [
    { source : 'Salary', amount : 5200, investments: '401(k)'  },
    { source : 'Freelancing', amount : 1200, investments: 'Stocks'},
    { source : 'Rantal Income', amount : 600, investments: 'Real Estate'},
  ];
monthSelected: boolean= false;

  constructor(private fb : FormBuilder , private router: Router){}

  ngOnInit() {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required],
    });
  }

  onChange(event: any) {
    this.selectedMont = event.target.value;
    this.monthSelected=true;
    this.getFilteredIncomes();
  }

  calculateTotalIncome(month: string): number{
    let totalIncome = 0;
    for (const income of this.getIncomesForMonth(month)){
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getIncomesForMonth(month: string) : any[]{
    switch (month){
      case 'January':
        return this.januaryIncome;
      case 'February':
        return this.februaryIncome;
      case 'March':
        return this.marchIncome;
      default:
        return [];
    }
  }


  getFilteredIncomes(){
    let filteredIncome: any[] = [];
    switch(this.selectedMont){
      case 'January':
        filteredIncome = [...this.januaryIncome];
        break;
      case 'February':
        filteredIncome = [...this.februaryIncome];
        break;
      case 'March':
        filteredIncome = [...this.marchIncome];
        break;
      default:
        break;
    }
    return filteredIncome;
  }

  onSubmit(){
    if(this.incomeForm.valid){
      const newIncome = this.incomeForm.value;
      switch(this.selectedMont){
        case 'January':
          this.januaryIncome.push(newIncome);
          break;
        case 'February':
          this.februaryIncome.push(newIncome);
          break;
        case 'March':
          this.marchIncome.push(newIncome);
          break;
        default:
          break;
      }
      this.incomeForm.reset();
      this.incomeForm.patchValue({ month : '', source : '', amount: '', investments: ''});
    }

  }

  saveForm(){
    console.log("Form Saved");
  }

  onBack(){
    this.router.navigate(['/budget-planner/dashboard']);
  }

}
