"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.principal = exports.ejecutar = void 0;
var ejecutar = function (req, res) {
    res.json("hoa");
    // res.send("hola");
};
exports.ejecutar = ejecutar;
var principal = function (req, res) {
    res.json("Servidor Funcionando :D!");
};
exports.principal = principal;
