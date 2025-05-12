import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from '@angular/material/card';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { RestService } from './rest.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatIcon, MatCardModule, NgbPopoverModule, MatChipsModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('popover') popover!: ElementRef<HTMLDivElement>;

  title = 'upwork-frontend'
  private left?: number;
  private right?: number;
  private selectEvent!: HTMLTextAreaElement;

  constructor(private restService: RestService) {}

  public onSelect(event: Event) {
    this.selectEvent = event.target as HTMLTextAreaElement;
    this.popover.nativeElement.style.display = 'block';
    this.popover.nativeElement.style.left = this.left + 'px';
    this.popover.nativeElement.style.top = this.right + 'px';
  }

  public showContext(event: MouseEvent) {
    this.left = event.clientX;
    this.right = event.clientY;
  }

  public onParaphrase() {
    let value = this.selectEvent.value.substring(this.selectEvent.selectionStart, this.selectEvent.selectionEnd);
    this.restService.postParapharse(value).subscribe({
      next: (response: String) => {
        console.log(response)
        this.selectEvent.value = this.selectEvent.value.substring(0, this.selectEvent.selectionStart) + response + this.selectEvent.value.substring(this.selectEvent.selectionEnd);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.popover.nativeElement.style.display = 'none';
      }
    })
  }
}
