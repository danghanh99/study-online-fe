import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { RouteConstant } from 'src/app/shared/constants/route.constant';

@Component({
  selector: 'ah-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent implements OnInit {
  private roomId = this.route.snapshot.params.id;
  private room = 0;
  public employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public translateService: TranslateService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  get f() {
    return this.employeeForm.controls;
  }

  public onSubmit(): void {

  }

  public back(): void {
    this.router.navigateByUrl(`/${RouteConstant.rooms}`);
  }
}
