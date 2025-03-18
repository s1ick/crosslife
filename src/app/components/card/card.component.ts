import { CommonModule } from '@angular/common';
import { Component, ContentChild, AfterContentInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements AfterContentInit {
  @Input() customClass: string = ''; 
  @ContentChild('cardHeader') cardHeader: any;
  @ContentChild('cardContent') cardContent: any;
  @ContentChild('cardFooter') cardFooter: any;

  hasHeaderContent = false;
  hasContent = false;
  hasFooterContent = false;

  ngAfterContentInit(): void {
    this.hasHeaderContent = !!this.cardHeader;
    this.hasContent = !!this.cardContent;
    this.hasFooterContent = !!this.cardFooter;
  }
}