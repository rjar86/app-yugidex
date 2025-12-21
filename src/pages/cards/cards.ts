import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { YugiohCard } from '../../core/models/card.models';
import { YugiohService } from '../../core/service/yugioh.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cards',
  imports: [CommonModule, RouterModule],
  templateUrl: './cards.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cards implements OnInit {

  loading = true;


  allCards: YugiohCard[] = [];
  filteredCards: YugiohCard[] = [];
  pagedCards: YugiohCard[] = [];


  query = '';
  page = 1;
  pageSize = 10;
  totalPages = 0;

  constructor(
    private _cardService: YugiohService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._cardService.getAllCards().subscribe({
      next: cards => {
        this.allCards = cards;
        this.applyFilterAndPagination();
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this._cdr.detectChanges();
      }
    });
  }


  applyFilterAndPagination() {

    if (this.query) {
      const q = this.query.toLowerCase();
      this.filteredCards = this.allCards.filter(card =>
        card.name.toLowerCase().includes(q)
      );
    } else {
      this.filteredCards = [...this.allCards];
    }

    this.totalPages = Math.ceil(this.filteredCards.length / this.pageSize);

    if (this.page > this.totalPages) {
      this.page = this.totalPages || 1;
    }

    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.pagedCards = this.filteredCards.slice(start, end);
  }


  onSearch(value: string) {
    this.query = value;
    this.page = 1;
    this.applyFilterAndPagination();
  }


  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.applyFilterAndPagination();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.applyFilterAndPagination();
    }
  }
}

