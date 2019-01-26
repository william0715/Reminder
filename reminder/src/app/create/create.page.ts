import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  ref = firebase.database().ref('items/');
  itemForm: FormGroup;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { 
      this.itemForm = this.formBuilder.group({
        'item_name' : [null, Validators.required],
        'item_cycle' : [null, Validators.required],
        'item_description' : [null, Validators.required]
      });
    }

  ngOnInit() {
  }

  save() {
    let newItem = firebase.database().ref('items/').push();
    newItem.set(this.itemForm.value);
    this.router.navigate(['/detail/' + newItem.key]);
  }
}
