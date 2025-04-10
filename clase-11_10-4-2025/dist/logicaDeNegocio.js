"use strict";
// procesar el input
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteUser = exports.updateUser = exports.getUserByName = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongo_1 = require("./config/mongo");
(0, mongo_1.connectDB)();
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 18 },
    email: { type: String, required: true, unique: true, match: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ },
    city: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: false, versionKey: false });
userSchema.set("strict", true);
const User = mongoose_1.default.model("user", userSchema);
// CRUD -> create, read, update, detele
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User(newUser);
        return yield user.save(); // insertOne()
    }
    catch (error) {
        return { message: error.message };
    }
});
exports.createUser = createUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        return users;
    }
    catch (error) {
        console.log("Error al recuperar los usuarios...");
    }
});
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.default.Types.ObjectId(id);
        const user = yield User.findById(id);
        if (!user) {
            console.log("No existe el user...");
        }
        else {
            console.log(user);
        }
    }
    catch (error) {
        console.log("Error al recuperar los usuarios...");
    }
});
exports.getUserById = getUserById;
const getUserByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const users = await getUsers()
        // const user = users?.find(user => user.name.toLowerCase().includes(name.toLowerCase()))
        // console.log(user)
        const user = yield User.findOne({ name: { $regex: name, $options: "i" } });
        if (!user) {
            console.log("No existe el user...");
        }
        else {
            console.log(user);
        }
    }
    catch (error) {
        console.log("Error al recuperar los usuarios...");
    }
});
exports.getUserByName = getUserByName;
const updateUser = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User.findByIdAndUpdate(id, body, { new: true });
        if (!updatedUser) {
            console.log("No se encuentra el usuario...");
        }
        else {
            console.log(updatedUser);
        }
    }
    catch (error) {
        console.log("Error al actualizar el usuario...");
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User.findByIdAndDelete(id);
        if (!deletedUser) {
            console.log("Ususario no encontrado...");
        }
        else {
            console.log(deletedUser);
        }
    }
    catch (error) {
        console.log("Error al borrar el usuario...");
    }
});
exports.deleteUser = deleteUser;
