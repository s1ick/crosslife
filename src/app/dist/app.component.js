"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var buttons_component_1 = require("./common-ui/buttons/buttons.component");
var select_component_1 = require("./common-ui/select/select.component");
var tips_component_1 = require("./common-ui/tips/tips.component");
var AppComponent = /** @class */ (function () {
    function AppComponent(cityService) {
        this.cityService = cityService;
        this.items = [];
        this.isMultiple = false;
        this.selectedItems = [];
        this.selectedItem = null;
        this.selectedRegions = { region1: [], region2: [] };
        this.isSelectVisible = false;
        this.isFirstRegionSelected = false;
        this.region1Tip = [];
        this.region2Tip = [];
        this.report = '';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadCities();
    };
    AppComponent.prototype.loadCities = function () {
        var _this = this;
        this.cityService.getCities().subscribe(function (data) {
            _this.items = data.data;
        });
    };
    AppComponent.prototype.toggleSelectType = function (isMultiple, region) {
        if (region === 1) {
            this.isFirstRegionSelected = true;
        }
        if (region === 2 && !this.isFirstRegionSelected) {
            return;
        }
        this.isSelectVisible = true;
        this.isMultiple = isMultiple;
    };
    AppComponent.prototype.onSelectionChange = function (selectedItems, region) {
        if (region === 1) {
            this.selectedRegions.region1 = this.isMultiple
                ? selectedItems
                : selectedItems.slice(0, 1);
        }
        else if (region === 2) {
            this.selectedRegions.region2 = this.isMultiple
                ? selectedItems
                : selectedItems.slice(0, 1);
        }
        this.updateRegionTips(region);
    };
    AppComponent.prototype.updateRegionTips = function (region) {
        var selectedRegions = region === 1
            ? this.selectedRegions.region1
            : this.selectedRegions.region2;
        var tipArray = selectedRegions.map(function (item) { return item.name; });
        if (region === 1) {
            this.region1Tip = tipArray;
        }
        else {
            this.region2Tip = tipArray;
        }
    };
    AppComponent.prototype.onGoBack = function () {
        this.isSelectVisible = false;
    };
    AppComponent.prototype.removeTag = function (region, tag) {
        if (region === 1) {
            this.region1Tip = this.region1Tip.filter(function (item) { return item !== tag; });
        }
        else {
            this.region2Tip = this.region2Tip.filter(function (item) { return item !== tag; });
        }
    };
    Object.defineProperty(AppComponent.prototype, "isFormValid", {
        get: function () {
            return (this.selectedRegions.region1.length >= 2 ||
                this.selectedRegions.region2.length > 0);
        },
        enumerable: false,
        configurable: true
    });
    AppComponent.prototype.generateReport = function () {
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
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            standalone: true,
            imports: [common_1.CommonModule, buttons_component_1.ButtonsComponent, select_component_1.SelectComponent, tips_component_1.TipsComponent],
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
