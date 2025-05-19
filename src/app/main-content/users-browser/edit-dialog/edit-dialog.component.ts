import {
  AfterViewInit,
  Component,
  ElementRef,
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

@Component({
  selector: 'app-edit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
})
export class EditDialogComponent implements AfterViewInit {
  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  showDialog = input(false);
  selectedUser = input.required<User>();
  closeDialog = output();

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  ngAfterViewInit() {
    this.dialog().nativeElement.showModal();
    this.form.setValue({
      email: this.selectedUser().email,
      firstName: this.selectedUser().firstName,
      lastName: this.selectedUser().lastName,
    });
  }

  onStopEditingUser() {
    this.form.reset();
    this.closeDialog.emit();
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
