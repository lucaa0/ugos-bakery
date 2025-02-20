"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("./firebase"); // Import the db instance
var addProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var menuItems, _i, menuItems_1, item, docRef;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                menuItems = [
                    {
                        name: "Ciabatta Classica",
                        description: "Pane tradizionale italiano con crosta croccante",
                        price: 3.50,
                        category: "Pane",
                        image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fciabatta.jpg?alt=media&token=71775156-555f-4462-9855-553781c54519",
                    },
                    {
                        name: "Focaccia Genovese",
                        description: "Pane piatto con olio d'oliva e rosmarino",
                        price: 4.00,
                        category: "Pane",
                        image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Ffocaccia.jpg?alt=media&token=7ee75538-82d5-4441-a444-859875579581",
                    },
                    {
                        name: "Pane Casereccio",
                        description: "Pane a lievitazione naturale con pasta madre",
                        price: 4.50,
                        category: "Pane",
                        image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fcasereccio.jpg?alt=media&token=a8588994-8183-4124-a709-555f5484c746",
                    },
                    {
                        name: "Cornetti",
                        description: "Cornetti freschi fatti a mano",
                        price: 3.00,
                        category: "Dolci",
                        image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fcornetti.jpg?alt=media&token=5889c95f-955a-4995-879f-898c89955b5f",
                    },
                    {
                        name: "Sfogliatelle",
                        description: "Pasta sfoglia ripiena di ricotta",
                        price: 3.50,
                        category: "Dolci",
                        image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fsfogliatelle.jpg?alt=media&token=75841980-f15c-4f9c-b19d-99c598588f0f",
                    },
                    {
                        name: "Torta al Cioccolato",
                        description: "Torta al cioccolato con ganache",
                        price: 28.00,
                        category: "Dolci",
                        image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Ftorta.jpg?alt=media&token=4b599f91-9e59-4499-8453-950f88959859",
                    },
                    {
                        name: "Espresso",
                        description: "Caffè espresso tradizionale italiano",
                        price: 1.50,
                        category: "Caffetteria",
                        image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fespresso.jpg?alt=media&token=a76c8c9f-9893-4cc8-9751-71f9591f0e9b",
                    },
                    {
                        name: "Cappuccino",
                        description: "Espresso con latte montato e schiuma",
                        price: 2.50,
                        category: "Caffetteria",
                        image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fcappuccino.jpg?alt=media&token=d5bd5595-179c-4b8a-b595-5855f99f5555",
                    },
                    {
                        name: "Caffè Latte",
                        description: "Caffè con tanto latte caldo",
                        price: 2.80,
                        category: "Caffetteria",
                        image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fcaffelatte.jpg?alt=media&token=f855555b-5555-4555-5555-55555555c55e",
                    },
                ];
                _i = 0, menuItems_1 = menuItems;
                _a.label = 1;
            case 1:
                if (!(_i < menuItems_1.length)) return [3 /*break*/, 4];
                item = menuItems_1[_i];
                return [4 /*yield*/, (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, "products"), item)];
            case 2:
                docRef = _a.sent();
                console.log("Document written with ID: ", docRef.id);
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                console.log("All products added successfully!");
                return [2 /*return*/];
        }
    });
}); };
addProducts();
exports.default = addProducts;
