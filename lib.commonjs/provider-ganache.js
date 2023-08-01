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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GanacheProvider = void 0;
const ethers_1 = require("ethers");
const ganache_1 = __importDefault(require("ganache"));
class GanacheProvider extends ethers_1.JsonRpcApiProvider {
    constructor(providerOrOptions) {
        let provider;
        if (providerOrOptions == null || typeof (providerOrOptions.getOptions) !== "function") {
            provider = ganache_1.default.provider(providerOrOptions);
        }
        else {
            provider = providerOrOptions;
        }
        const network = new ethers_1.Network("testnet", provider.getOptions().chain.chainId);
        super(network, {
            staticNetwork: network,
            batchMaxCount: 1,
            batchStallTime: 0,
            cacheTimeout: -1
        });
        this.ganache = provider;
    }
    _send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ethers_1.assertArgument)(!Array.isArray(payload), "batch requests unsupported", "UNSUPPORTED_OPERATION", {
                operation: "_send", info: { payload }
            });
            const result = yield this.ganache.request(payload);
            return [{ id: payload.id, result }];
        });
    }
    snapshot() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.send("evm_snapshot", []);
            return () => __awaiter(this, void 0, void 0, function* () {
                return yield this.send("evm_revert", [id]);
            });
        });
    }
    setAccount(_address, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = (0, ethers_1.getAddress)(_address);
            const ops = [];
            if (state.balance != null) {
                const balance = (0, ethers_1.getBigInt)(state.balance, "state.balance");
                ops.push({ m: "evm_setAccountBalance", ps: [address, balance] });
            }
            if (state.code != null) {
                const code = (0, ethers_1.hexlify)(state.code);
                ops.push({ m: "evm_setAccountCode", ps: [address, code] });
            }
            if (state.nonce != null) {
                const nonce = (0, ethers_1.getNumber)(state.nonce, "state.nonce");
                ops.push({ m: "evm_setAccountNonce", ps: [address, nonce] });
            }
            if (ops.length === 0) {
                return;
            }
            yield Promise.all(ops.map(({ m, ps }) => this.send(m, ps)));
        });
    }
    setStorageAt(_address, _slot, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = (0, ethers_1.getAddress)(_address);
            const slot = (0, ethers_1.getBigInt)(_slot, "slot");
            (0, ethers_1.assertArgument)((0, ethers_1.isHexString)(value, 32), "value must be 32 bytes", "value", value);
            yield this.send("evm_setAccountStorageAt", [address, slot, value]);
        });
    }
    mine() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send("evm_mine", []);
        });
    }
}
exports.GanacheProvider = GanacheProvider;
//# sourceMappingURL=provider-ganache.js.map