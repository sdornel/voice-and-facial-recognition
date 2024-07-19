import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FacialRecognitionComponent } from './facial-recognition/facial-recognition.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FacialRecognitionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-voice-and-facial-recognition';
}
