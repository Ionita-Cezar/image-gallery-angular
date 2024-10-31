import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImagesService, Image } from '../../services/images.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images: Image[] = [];
  authors: string[] = [];
  selectedAuthor: string = 'All';
  filteredImages: Image[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private ImagesService: ImagesService) {}

  ngOnInit(): void {
    this.ImagesService.fetchImages().subscribe((images) => {
      this.images = images;
      this.authors = Array.from(new Set(images.map(image => image.author)));
      this.filterImages();
    });
  }

  filterImages(): void {
    this.filteredImages = this.images.filter(image =>
      this.selectedAuthor === 'All' || image.author === this.selectedAuthor
    );
    this.currentPage = 1;
  }

  get paginatedImages(): Image[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredImages.slice(start, start + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredImages.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
