import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../users.model';
import { UsersService } from '../../users.service';
import { UpdatedUser } from '../updated-user.model';

@Component({
  selector: 'app-edit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
  host: { '(document:keydown.esc)': 'onStopEditingUser()' },
})
export class EditDialogComponent implements AfterViewInit {
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);
  showDialog = input(false);
  selectedUser = input.required<User>();
  closeDialog = output();

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  ngAfterViewInit() {
    this.form.setValue({
      email: this.selectedUser().email,
      firstName: this.selectedUser().firstName,
      lastName: this.selectedUser().lastName,
    });
  }

  onStopEditingUser() {
    this.closeDialog.emit();
  }

  onSubmit() {
    if (this.form.valid) {
      const subscription = this.usersService
        .editUser(this.selectedUser().id, this.form.value as UpdatedUser)
        .subscribe((val) => {
          console.log(val);
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }
}
