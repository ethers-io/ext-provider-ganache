import { ethers } from "ethers";
import ganache from "ganache";

import { GanacheProvider } from "./index.js";

async function test(provider: GanacheProvider): Promise<void> {
    console.log("PROVIDER", provider);
    console.log("BLOCK NUMBER", await provider.getBlockNumber());

    const signer = await provider.getSigner();
    console.log("SIGNER", signer);

    const wallet = new ethers.Wallet(ethers.id("foo"), provider);
    console.log("WALLET", wallet);

    {
        const tx = await signer.sendTransaction({ to: wallet, value: "123000000000000" });
        console.log("TX1", tx);
        console.log("RECEIPT1", await tx.wait());
    }

    {
        const tx = await wallet.sendTransaction({ to: signer, value: 123 });
        console.log("TX2", tx);
        console.log("RECEIPT2", await tx.wait());
    }
}

(async function() {
    await test(new GanacheProvider(ganache.provider({ chain: { chainId: 1336 } })));
    await test(new GanacheProvider({ chain: { chainId: 13370 } }));
})();
