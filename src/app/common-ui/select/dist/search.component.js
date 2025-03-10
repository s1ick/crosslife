"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var ng_select_1 = require("@ng-select/ng-select");
var forms_1 = require("@angular/forms");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(dataService) {
        this.dataService = dataService;
        this.selectedPeople = [];
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.people$ = this.dataService.getPeople();
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'app-search',
            standalone: true,
            imports: [ng_select_1.NgSelectModule, common_1.CommonModule, forms_1.FormsModule],
            templateUrl: './search.component.html',
            styleUrl: './search.component.scss'
        })
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
