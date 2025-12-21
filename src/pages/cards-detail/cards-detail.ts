import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { YugiohCard } from '../../core/models/card.models';
import { YugiohService } from '../../core/service/yugioh.service';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-cards-detail',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './cards-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsDetail implements OnInit {

  loading = true;
  loadingRelated = true;

  card!: YugiohCard;
  relatedCards: YugiohCard[] = [];

  backIcon = ArrowLeft;

  constructor(
    private _cardService: YugiohService,
    private _route: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading = false;
      return;
    }

    this._cardService.getCardById(id).subscribe({
      next: card => {
        this.card = card;
        this.loading = false;

        this.loadRelatedCards(card);
      },
      error: err => {
        console.error('Error cargando carta', err);
        this.loading = false;
      }
    });
  }

  private loadRelatedCards(card: YugiohCard) {
    this.loadingRelated = true;

    // 👉 PRIORIDAD: ARQUETIPO
    const related$ = card.archetype
      ? this._cardService.getCardsByArchetype(card.archetype)
      : this._cardService.getCardsByTypeAndRace(card.type, card.race);

    related$.subscribe({
      next: cards => {
        this.relatedCards = cards
          .filter((c: { id: number; }) => c.id !== card.id)
          .slice(0, 6);

        this.loadingRelated = false;
        this._cdr.detectChanges();
      },
      error: () => {
        this.loadingRelated = false;
        this._cdr.detectChanges();
      }
    });
  }
}


