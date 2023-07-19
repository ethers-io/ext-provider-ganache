import { GanacheProvider } from "./index.js";

(async function() {
    const provider = new GanacheProvider();
    console.log(provider);
    console.log(await provider.getBlockNumber());

    const signer = await provider.getSigner();
    console.log(signer);

    const tx = await signer.sendTransaction({ to: signer, value: 123 });
    console.log(tx);
    console.log(await tx.wait());
})();
