import {
  Component,
  effect,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  imports: [FormsModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
})
export class EditDialogComponent {
  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  showDialog = input(false);
  closeDialog = output();

  constructor() {
    effect(() => {
      if (this.showDialog()) {
        this.dialog().nativeElement.showModal();
      } else {
        this.dialog().nativeElement.close();
      }
    });
  }

  onStopEditingUser() {
    this.closeDialog.emit();
    //reset form
  }
}
