"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crateCourse = void 0;
const express_1 = require("express");
const CreateCourseServices_1 = __importDefault(require("./CreateCourseServices"));
function crateCourse(req, res) {
    CreateCourseServices_1.default.execute({
        name: "como lutar contra o sono",
        duraction: 10,
        educator: "lucas"
    });
    CreateCourseServices_1.default.execute({
        name: "como lutar contra o sono",
        educator: "lucas"
    });
    return express_1.response.send();
}
exports.crateCourse = crateCourse;
