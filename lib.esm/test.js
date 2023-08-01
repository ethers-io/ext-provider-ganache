var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ethers } from "ethers";
import ganache from "ganache";
import { GanacheProvider } from "./index.js";
function test(provider) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("PROVIDER", provider);
        console.log("BLOCK NUMBER", yield provider.getBlockNumber());
        const signer = yield provider.getSigner();
        console.log("SIGNER", signer);
        const wallet = new ethers.Wallet(ethers.id("foo"), provider);
        console.log("WALLET", wallet);
        {
            const tx = yield signer.sendTransaction({ to: wallet, value: "123000000000000" });
            console.log("TX1", tx);
            console.log("RECEIPT1", yield tx.wait());
        }
        {
            const tx = yield wallet.sendTransaction({ to: signer, value: 123 });
            console.log("TX2", tx);
            console.log("RECEIPT2", yield tx.wait());
        }
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield test(new GanacheProvider(ganache.provider({ chain: { chainId: 1336 } })));
        yield test(new GanacheProvider({ chain: { chainId: 13370 } }));
    });
})();
//# sourceMappingURL=test.js.map