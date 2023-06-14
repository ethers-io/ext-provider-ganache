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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _TestProvider_provider;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestProvider = void 0;
const ethers_1 = require("ethers");
const ganache_1 = __importDefault(require("ganache"));
class TestProvider extends ethers_1.JsonRpcApiProvider {
    constructor() {
        const network = new ethers_1.Network("testnet", 13370);
        super(network, {
            staticNetwork: network,
            batchMaxCount: 1,
            batchStallTime: 0,
        });
        _TestProvider_provider.set(this, void 0);
        __classPrivateFieldSet(this, _TestProvider_provider, ganache_1.default.provider(), "f");
    }
    _send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ethers_1.assertArgument)(!Array.isArray(payload), "batch requests unsupported", "UNSUPPORTED_OPERATION", {
                operation: "_send", info: { payload }
            });
            const result = yield __classPrivateFieldGet(this, _TestProvider_provider, "f").request(payload);
            return [{ id: payload.id, result }];
        });
    }
}
exports.TestProvider = TestProvider;
_TestProvider_provider = new WeakMap();
//# sourceMappingURL=provider-test.js.map