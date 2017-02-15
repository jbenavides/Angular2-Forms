import {Component} from '@angular/core';
import { Employee } from '../models/employee.model'
import { FormPoster } from '../services/form-poster.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages = [];
  model = new Employee('name', 'last name', true, 'w2', 'default');
  hasPrimaryLanguageError: boolean = false;
  startDate: Date;
  minDate: Date = new Date('Oct 12 2016');

  constructor(private formPoster: FormPoster){
    this.formPoster.getLanguages()
              .subscribe(
                data => this.languages = data.languages,
                err => console.log('get error: ', err)
              );
  }

  firstNameToUpperCase(value : string) : void{
      if(value.length > 0)
        this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
      else
        this.model.firstName = value;
  }

  validatePrimaryLanguage(event): void{
      console.log("lang: " + this.model.primaryLanguage);

      if(event === "default")
        this.hasPrimaryLanguageError = true;
      else
        this.hasPrimaryLanguageError = false;
  }

  submitForm(form: NgForm): void{
    console.log(this.model);
    console.log(form.value);

    this.validatePrimaryLanguage(this.model.primaryLanguage)
    if(this.hasPrimaryLanguageError)
    return;

    this.formPoster.postEmployeeForm(this.model)
                    .subscribe(
                        data => console.log('success: ', data),
                        err => console.log('error: ', err)
                    );

  }

}
