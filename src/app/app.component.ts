import { Component, OnInit } from '@angular/core';
import { CityService, City } from './services/city.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ButtonsComponent } from './common-ui/buttons/buttons.component';
import { SelectComponent } from './common-ui/select/select.component';
import { TipsComponent } from './common-ui/tips/tips.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ButtonsComponent, SelectComponent, TipsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  items: City[] = [];
  isMultiple: boolean = false;
  selectedItems: City[] = [];
  selectedItem: City | null = null;
  selectedRegions: { region1: City[]; region2: City[] } = { region1: [], region2: [] };
  isSelectVisible: boolean = false;
  isFirstRegionSelected: boolean = false;
  isSecondRegionSelected: boolean = false;

  region1Tip: string[] = [];
  region2Tip: string[] = [];

  report: string = '';

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.cityService.getCities().subscribe((response) => {
      this.items = response.data;
    });
  }

  toggleSelectType(isMultiple: boolean, region: number): void {
    this.isSelectVisible = true;
    this.isMultiple = isMultiple;

    if (region === 1) {
      this.isFirstRegionSelected = true;
    }

    if (region === 2) {
      this.isSecondRegionSelected = true;
    }
  }

  onSelectionChange(selectedItems: City[], region: number): void {
    if (region === 1) {
      this.selectedRegions.region1 = this.isMultiple
        ? selectedItems
        : selectedItems.slice(0, 1);
    } else if (region === 2) {
      this.selectedRegions.region2 = this.isMultiple
        ? selectedItems
        : selectedItems.slice(0, 1);
    }
    this.updateRegionTips(region);
  }

  updateRegionTips(region: number): void {
    const selectedRegions =
      region === 1
        ? this.selectedRegions.region1
        : this.selectedRegions.region2;
    const tipArray = selectedRegions.map((item) => item.name);

    if (region === 1) {
      this.region1Tip = tipArray;
    } else {
      this.region2Tip = tipArray;
    }
  }

  onGoBack(): void {
    this.isSelectVisible = false;
    this.isFirstRegionSelected = false;
    this.isSecondRegionSelected = false;
  }

  removeTag(region: number, tag: string): void {
    console.log(`Удаление тега: ${tag} из региона ${region}`);

    if (region === 1) {
      this.selectedRegions.region1 = this.selectedRegions.region1.filter(
        (item) => item.name !== tag
      );
    } else {
      this.selectedRegions.region2 = this.selectedRegions.region2.filter(
        (item) => item.name !== tag
      );
    }

    this.updateRegionTips(region);

    console.log('Актуальные данные:', this.selectedRegions);
  }

  get isFormValid(): boolean {
    return (
      this.selectedRegions.region1.length >= 2 ||
      this.selectedRegions.region2.length > 0
    );
  }

  transliterate(text: string): string {
    const translitMap: { [key: string]: string } = {
      а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y',
      к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
      х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ы: 'y', э: 'e', ю: 'yu', я: 'ya',
      А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'Yo', Ж: 'Zh', З: 'Z', И: 'I', Й: 'Y',
      К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O', П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U', Ф: 'F',
      Х: 'Kh', Ц: 'Ts', Ч: 'Ch', Ш: 'Sh', Щ: 'Shch', Ы: 'Y', Э: 'E', Ю: 'Yu', Я: 'Ya'
    };
    
    return text.split('').map(char => translitMap[char] || char).join('');
  }

  generateReport(): void {
    const region1Names = this.selectedRegions.region1.map((city) => this.transliterate(city.name));
    const region2Names = this.selectedRegions.region2.map((city) => this.transliterate(city.name));

    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Region 1', 'Region 2']],
      body: [
        [region1Names.join(', '), region2Names.join(', ')],
      ],
    });

    doc.save('report.pdf');
  }
}
