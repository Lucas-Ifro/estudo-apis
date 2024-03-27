"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CrateCourseServices {
    execute({ name, duraction = 8, educator }) {
        console.log(name, duraction, educator);
    }
}
exports.default = new CrateCourseServices;
