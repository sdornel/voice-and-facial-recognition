import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-facial-recognition',
  standalone: true,
  templateUrl: './facial-recognition.component.html',
  styleUrls: ['./facial-recognition.component.css'],
  imports: [CommonModule]
})
export class FacialRecognitionComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    this.initWebcam();
  }

  async initWebcam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.onplay = () => this.onPlay();
      }
    } catch (err) {
      console.error('Error accessing webcam: ', err);
    }
  }

  // keep on processing the frames from camera
  onPlay() {

  }
}