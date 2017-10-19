var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
var ApiProvider = /** @class */ (function () {
    function ApiProvider(http) {
        this.http = http;
        this.url = 'http://jmcastro.esy.es/v1/public';
    }
    ApiProvider.prototype.get = function (endpoint, params, options) {
        if (!options) {
            options = new RequestOptions();
        }
        // Support easy query params for GET requests
        if (params) {
            var p = new URLSearchParams();
            for (var k in params) {
                p.set(k, params[k]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }
        return this.http.get(this.url + '/' + endpoint, options);
    };
    ApiProvider.prototype.post = function (endpoint, bodyPeticion) {
        //build header options
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        //build POST body
        var body = JSON.stringify(bodyPeticion);
        return this.http.post(this.url + '/' + endpoint, body, options);
    };
    ApiProvider.prototype.put = function (endpoint, body, options) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    };
    ApiProvider.prototype.delete = function (endpoint, options) {
        return this.http.delete(this.url + '/' + endpoint, options);
    };
    ApiProvider.prototype.patch = function (endpoint, body, options) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    };
    ApiProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], ApiProvider);
    return ApiProvider;
}());
export { ApiProvider };
//# sourceMappingURL=api.js.map