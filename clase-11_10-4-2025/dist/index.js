"use strict";
// toma del input
// return del output
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logicaDeNegocio_1 = require("./logicaDeNegocio");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    // array de argumentos -> node index.js 
    const args = process.argv.slice(2);
    // definiendo parametros en código
    let action = args[0];
    let id = "";
    let name = "";
    let newUser = {};
    let body = {};
    switch (action) {
        case "getUsers":
            response = yield (0, logicaDeNegocio_1.getUsers)();
            break;
        case "getUserById":
            response = yield (0, logicaDeNegocio_1.getUserById)(id);
            break;
        case "getUserByName":
            response = yield (0, logicaDeNegocio_1.getUserByName)(name);
            break;
        case "createUser":
            response = yield (0, logicaDeNegocio_1.createUser)(newUser);
            break;
        case "updateUser":
            response = yield (0, logicaDeNegocio_1.updateUser)(id, body);
            break;
        case "deleteUser":
            response = yield (0, logicaDeNegocio_1.deleteUser)(id);
            break;
        default:
            response = { error: "Acción no valida..." };
    }
    console.log(response);
});
main();
