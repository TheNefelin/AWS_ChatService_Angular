import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
})
export class Error {
  @Input() statusCode?: number = 0;
  @Input() message?: string = 'Ocurrió un error';
}
