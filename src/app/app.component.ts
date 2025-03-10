import { Component, OnInit } from '@angular/core';
import { CityService } from './services/city.service';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './common-ui/buttons/buttons.component';
import { SelectComponent } from './common-ui/select/select.component';
import { TipsComponent } from './common-ui/tips/tips.component';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { font } from './font';  // Correct font import

interface City {
  name: string;
  [key: string]: any;
}

interface SelectedRegions {
  region1: City[];
  region2: City[];
}

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
  selectedRegions: SelectedRegions = { region1: [], region2: [] };
  isSelectVisible: boolean = false;
  isFirstRegionSelected: boolean = false;

  region1Tip: string[] = [];
  region2Tip: string[] = [];

  report: string = '';

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.cityService.getCities().subscribe((data) => {
      this.items = data.data;
    });
  }

  toggleSelectType(isMultiple: boolean, region: number): void {
    if (region === 1) {
      this.isFirstRegionSelected = true;
    }

    if (region === 2 && !this.isFirstRegionSelected) {
      return;
    }

    this.isSelectVisible = true;
    this.isMultiple = isMultiple;
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
  }

  removeTag(region: number, tag: string): void {
    if (region === 1) {
      this.region1Tip = this.region1Tip.filter((item) => item !== tag);
    } else {
      this.region2Tip = this.region2Tip.filter((item) => item !== tag);
    }
  }

  get isFormValid(): boolean {
    return (
      this.selectedRegions.region1.length >= 2 ||
      this.selectedRegions.region2.length > 0
    );
  }

  generateReport(): void {
    // const region1Names = this.selectedRegions.region1.map((city) => city.name);
    // const region2Names = this.selectedRegions.region2.map((city) => city.name);
    // const doc = new jsPDF();
    // doc.addFileToVFS('font.ttf', font);  // Ensure the font is correctly added
    // doc.addFont('font.ttf', 'font', 'normal');
    // doc.setFont('font');
    // doc.setFontSize(16);
    // doc.text('Region report', 10, 10);
    
    // const headers = [['Region 1', 'Region 2']];
    // const data = [
    //   region1Names,
    //   region2Names,
    // ];
    // autoTable(doc, {
    //   head: headers,
    //   body: data,
    //   startY: 30, 
    // });
    // doc.save('table.pdf');
  }
}