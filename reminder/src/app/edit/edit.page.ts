import { Component, OnInit } from '@angular/core';

import * as firebase from 'Firebase';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  ref = firebase.database().ref('items/');
  infoForm: FormGroup;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private formBuilder: FormBuilder) {
      this.infoForm = this.formBuilder.group({
        'item_name' : [null, Validators.required],
        'item_cycle' : [null, Validators.required],
        'item_description' : [null, Validators.required]
      });
      this.getInfo(this.route.snapshot.paramMap.get('key'));
  }

  ngOnInit() {
  }

  getInfo(key) {
    firebase.database().ref('items/'+ key).on('value', resp => {
      let item = snapshotToObject(resp);
      this.infoForm.controls['item_name'].setValue(item.item_name);
      this.infoForm.controls['item_cycle'].setValue(item.item_cycle);
      this.infoForm.controls['item_description'].setValue(item.item_description);
    });
  }

  updateInfo() {
    let newInfo = firebase.database().ref('items/'+this.route.snapshot.paramMap.get('key')).update(this.infoForm.value);
    //this.router.navigate(['/detail/'+this.route.snapshot.paramMap.get('key')]);
    this.router.navigate(['/home']);
  }  
}

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}
