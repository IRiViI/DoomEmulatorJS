import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public options: FormGroup;

  // public password: FormControl = new FormControl("", [Validators.required, Validators.minLength(6)]);
  public password: FormControl = new FormControl("", [Validators.required, Validators.minLength(6)]);

  public matcher = new MyErrorStateMatcher();

  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      name: new FormControl(""),
      email: new FormControl(""),
      password: this.password,
      confirmPassword: new FormControl("", [Validators.required]),

    }, {validator: this.checkPasswords });
  }

  ngOnInit(): void {

  }

  public onSubmit(){
    if (this.options.invalid) return

    let user: any = {
      name: this.options.value.name,
      email: this.options.value.email,
      password: this.options.value.password
    };

    this.save.emit(user);

  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }


}