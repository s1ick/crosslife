"use strict";
// src/app/services/city.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CityService = void 0;
var core_1 = require("@angular/core");
var CityService = /** @class */ (function () {
    function CityService(http) {
        this.http = http;
        this.apiUrl = 'https://run.mocky.io/v3/f1b708f1-0162-4f9c-881f-002d35684cf5';
    }
    CityService.prototype.getCities = function () {
        return this.http.get(this.apiUrl);
    };
    CityService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CityService);
    return CityService;
}());
exports.CityService = CityService;
