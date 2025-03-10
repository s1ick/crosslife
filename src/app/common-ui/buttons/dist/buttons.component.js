"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ButtonsComponent = void 0;
var core_1 = require("@angular/core");
var button_1 = require("@angular/material/button");
var ButtonsComponent = /** @class */ (function () {
    function ButtonsComponent() {
        this.textButtons = '';
        this.typeIcon = '';
        this.disabled = false;
        this.buttonClick = new core_1.EventEmitter();
    }
    ButtonsComponent.prototype.onClick = function () {
        this.buttonClick.emit();
    };
    __decorate([
        core_1.Input()
    ], ButtonsComponent.prototype, "textButtons");
    __decorate([
        core_1.Input()
    ], ButtonsComponent.prototype, "typeIcon");
    __decorate([
        core_1.Input()
    ], ButtonsComponent.prototype, "disabled");
    __decorate([
        core_1.Output()
    ], ButtonsComponent.prototype, "buttonClick");
    ButtonsComponent = __decorate([
        core_1.Component({
            selector: 'app-buttons',
            standalone: true,
            imports: [button_1.MatButtonModule],
            templateUrl: './buttons.component.html',
            styleUrls: ['./buttons.component.scss']
        })
    ], ButtonsComponent);
    return ButtonsComponent;
}());
exports.ButtonsComponent = ButtonsComponent;
