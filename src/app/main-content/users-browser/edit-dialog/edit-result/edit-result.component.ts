import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-edit-result',
  imports: [],
  templateUrl: './edit-result.component.html',
  styleUrl: './edit-result.component.css'
})
export class EditResultComponent {
  close = output();
  result = input.required<"success" | "fail">();

  onClose() {
    this.close.emit();
  }
}
