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
var _TestProvider_provider;
import { assertArgument, getAddress, getBigInt, getNumber, hexlify, isHexString, JsonRpcApiProvider, Network } from "ethers";
import ganache from "ganache";
let _nonce = BigInt(1);
export class TestProvider extends JsonRpcApiProvider {
    constructor() {
        const network = new Network("testnet", 13370);
        super(network, {
            staticNetwork: network,
            batchMaxCount: 1,
            batchStallTime: 0,
            cacheTimeout: -1
        });
        _TestProvider_provider.set(this, void 0);
        __classPrivateFieldSet(this, _TestProvider_provider, ganache.provider(), "f");
    }
    _perform(req) {
        const _super = Object.create(null, {
            _perform: { get: () => super._perform }
        });
        return __awaiter(this, void 0, void 0, function* () {
            req.performnonce = _nonce++;
            console.log("PP", req);
            return _super._perform.call(this, req);
        });
    }
    _send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            assertArgument(!Array.isArray(payload), "batch requests unsupported", "UNSUPPORTED_OPERATION", {
                operation: "_send", info: { payload }
            });
            const result = yield __classPrivateFieldGet(this, _TestProvider_provider, "f").request(payload);
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
            const address = getAddress(_address);
            const ops = [];
            if (state.balance != null) {
                const balance = getBigInt(state.balance, "state.balance");
                ops.push({ m: "evm_setAccountBalance", ps: [address, balance] });
            }
            if (state.code != null) {
                const code = hexlify(state.code);
                ops.push({ m: "evm_setAccountCode", ps: [address, code] });
            }
            if (state.nonce != null) {
                const nonce = getNumber(state.nonce, "state.nonce");
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
            const address = getAddress(_address);
            const slot = getBigInt(_slot, "slot");
            assertArgument(isHexString(value, 32), "value must be 32 bytes", "value", value);
            yield this.send("evm_setAccountStorageAt", [address, slot, value]);
        });
    }
    mine() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send("evm_mine", []);
        });
    }
}
_TestProvider_provider = new WeakMap();
//# sourceMappingURL=provider-test.js.map