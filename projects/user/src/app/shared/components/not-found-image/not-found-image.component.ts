import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'projects/admin/src/environments/environment';
import { HideMissingDirective } from '../../../directives/hide-missing.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-not-found-image',
  standalone: true,
  imports: [CommonModule, HideMissingDirective, MatProgressSpinnerModule],
  templateUrl: './not-found-image.component.html',
  styleUrls: ['./not-found-image.component.scss']
})
export class NotFoundImageComponent implements OnInit {
  img = "";
  alt = "";
  width: any;
  isLoading = true;
  @Input("image") set image(sr: string) {
    this.img = sr
  };
  @Input("alt") set altImage(alt: string) {
    this.alt = alt
  };
  @Input("width") set widthImage(width: string) {
    this.width = width
  };
  imageSourceNotFound = ""
  baseApi = environment.baseApi;

  constructor() { }

  ngOnInit(): void {
  }

  onImageLoad(event: Event) {
    this.imageSourceNotFound = "";
    this.isLoading = false
  }
  showMissingImage(event: any) {
    if (event) {
      this.imageSourceNotFound = event;
      this.isLoading = false

    }
  }

}
