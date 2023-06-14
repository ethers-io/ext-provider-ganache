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
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./index.js");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new index_js_1.TestProvider();
        console.log(provider);
        console.log(yield provider.getBlockNumber());
        const signer = yield provider.getSigner();
        console.log(signer);
        const tx = yield signer.sendTransaction({ to: signer, value: 123 });
        console.log(tx);
        console.log(yield tx.wait());
    });
})();
//# sourceMappingURL=test.js.map