"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SelectComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var checkbox_1 = require("@angular/material/checkbox");
var form_field_1 = require("@angular/material/form-field");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var SelectComponent = /** @class */ (function () {
    function SelectComponent() {
        this.items = [];
        this.isMultiple = false;
        this.selectedItemsChange = new core_1.EventEmitter();
        this.searchTerm = '';
        this.selectedItems = [];
        this.selectedItem = null;
        this.goBackEvent = new core_1.EventEmitter();
    }
    SelectComponent.prototype.filteredItems = function () {
        var _this = this;
        return this.items.filter(function (item) {
            return item.name.toLowerCase().includes(_this.searchTerm.toLowerCase());
        });
    };
    SelectComponent.prototype.onItemSelect = function (item) {
        if (this.isMultiple) {
            this.selectedItems.includes(item)
                ? this.selectedItems = this.selectedItems.filter(function (i) { return i !== item; })
                : this.selectedItems.push(item);
        }
        else {
            this.selectedItem = this.selectedItem === item ? null : item;
        }
        this.selectedItemsChange.emit(this.isMultiple ? this.selectedItems : [this.selectedItem]);
    };
    SelectComponent.prototype.goBack = function () {
        this.goBackEvent.emit();
    };
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "items");
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "isMultiple");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "selectedItemsChange");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "goBackEvent");
    SelectComponent = __decorate([
        core_1.Component({
            selector: 'select-component',
            standalone: true,
            imports: [
                forms_1.FormsModule, common_1.CommonModule, checkbox_1.MatCheckboxModule,
                form_field_1.MatFormFieldModule, icon_1.MatIconModule, input_1.MatInputModule
            ],
            templateUrl: './select.component.html',
            styleUrls: ['./select.component.scss']
        })
    ], SelectComponent);
    return SelectComponent;
}());
exports.SelectComponent = SelectComponent;
