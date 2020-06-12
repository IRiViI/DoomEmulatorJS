import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public options: FormGroup;

  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  @Input() extended: boolean = false;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      email: new FormControl(""),
      password: new FormControl(""),
    });
  }

  ngOnInit(): void {

  }

  public onSubmit(){
    if (this.options.invalid) return

    let user: any = {
      email: this.options.value.email,
      password: this.options.value.password
    };

    this.save.emit(user);
    
  }

}
