"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TipsComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var TipsComponent = /** @class */ (function () {
    function TipsComponent() {
        this.tips = [];
        this.removeTagEvent = new core_1.EventEmitter();
    }
    TipsComponent.prototype.removeTag = function (tag) {
        this.removeTagEvent.emit(tag);
    };
    __decorate([
        core_1.Input()
    ], TipsComponent.prototype, "tips");
    __decorate([
        core_1.Output()
    ], TipsComponent.prototype, "removeTagEvent");
    TipsComponent = __decorate([
        core_1.Component({
            selector: 'app-tips',
            standalone: true,
            imports: [common_1.CommonModule],
            templateUrl: './tips.component.html',
            styleUrls: ['./tips.component.scss']
        })
    ], TipsComponent);
    return TipsComponent;
}());
exports.TipsComponent = TipsComponent;
