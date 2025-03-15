import { Component, signal, computed, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

import { ButtonsComponent } from './../../common-ui/buttons/buttons.component';
import { SelectComponent } from './../../common-ui/select/select.component';
import { PopulationChartComponent } from './../../common-ui/population-chart/population-chart.component';
import { TipsComponent } from './../../common-ui/tips/tips.component';

import { CityService } from './../../services/city.service';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TipsComponent,
    PopulationChartComponent,
    SelectComponent,
    ButtonsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  items = this.cityService.cities;
  isMultiple = signal<boolean>(false);
  selectedRegions = signal<{ region1: City[]; region2: City[] }>({
    region1: [],
    region2: [],
  });
  isSelectVisible = signal(false);
  selectedRegionType = signal<number | null>(null);

  region1Tip = computed(() => this.selectedRegions().region1);
  region2Tip = computed(() => this.selectedRegions().region2);
  isFirstRegionSelected = computed(() => this.selectedRegions().region1.length > 0);
  isSecondRegionSelected = computed(() => this.selectedRegions().region2.length > 0);
  isFormValid = computed(() => this.isFirstRegionSelected() && this.isSecondRegionSelected());

  constructor(private cityService: CityService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cityService.loadCities(); 
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(TextPlugin);
    this.animateText();
  }

  animateText(): void {
    const pastelColors = [
      '#A0A0A0', 
      '#FFB6B6', 
      '#C0C0C0', 
      '#D3D3D3', 
      '#DA7E3C', 
      '#E0E0E0', 
      '#FFFFFF', 
    ];
  
    gsap.fromTo('.letter', {
      opacity: 0,
      y: 20, 
      color: '#ffffff', 
    }, {
      opacity: 1,
      y: 0, 
      duration: 1, 
      stagger: 0.1, 
      ease: 'power2.out', 
      color: () => pastelColors[Math.floor(Math.random() * pastelColors.length)], // Случайный цвет из пастельной палитры
    });
  }

  toggleSelectType(isMultiple: boolean, region: number): void {
    this.isSelectVisible.set(true);
    this.isMultiple.set(isMultiple);
    this.selectedRegionType.set(region);
  }

  onSelectionChange(selectedItems: City[], region: number): void {
    this.selectedRegions.update((regions) => {
      const key = region === 1 ? 'region1' : 'region2';
      return {
        ...regions,
        [key]: this.isMultiple() ? selectedItems : selectedItems.slice(0, 1), 
      };
    });
  }

  onGoBack(): void {
    this.isSelectVisible.set(false);
    this.selectedRegionType.set(null);
  }

  removeTag(region: number, tag: City): void {
    this.selectedRegions.update((regions) => {
      const key = region === 1 ? 'region1' : 'region2';
      return {
        ...regions,
        [key]: regions[key].filter((item) => item.name !== tag.name),
      };
    });
  }

  transliterate(text: string): string {
    const translitMap: { [key: string]: string } = {
      а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y',
      к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
      х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ы: 'y', э: 'e', ю: 'yu', я: 'ya',
      А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'Yo', Ж: 'Zh', З: 'Z', И: 'I', Й: 'Y',
      К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O', П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U', Ф: 'F',
      Х: 'Kh', Ц: 'Ts', Ч: 'Ch', Ш: 'Sh', Щ: 'Shch', Ы: 'Y', Э: 'E', Ю: 'Yu', Я: 'Ya',
    };
    return text.split('').map((char) => translitMap[char] || char).join('');
  }

  async generateReport(): Promise<void> {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['Region 1', 'Region 2']],
      body: [
        [
          this.selectedRegions().region1.map((city) => this.transliterate(city.name)).join(', '),
          this.selectedRegions().region2.map((city) => this.transliterate(city.name)).join(', '),
        ],
      ],
    });

    const canvas = document.getElementById('populationChart') as HTMLCanvasElement;
    if (canvas) {
      const chartImage = await html2canvas(canvas);
      const imgData = chartImage.toDataURL('image/png');

      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth() - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(
        imgData,
        'PNG',
        10,
        (doc as any).lastAutoTable.finalY + 10,
        pdfWidth,
        pdfHeight
      );
    }

    doc.save('report.pdf'); 
  }
}