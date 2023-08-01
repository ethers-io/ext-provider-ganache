Ethers: GanacheProvider
=======================

The **GanacheProvider** uses an in-memory Ethereum instance (via
[Ganache](https://github.com/trufflesuite/ganache)) which can be
used for testing allowing free transactions and performing
explicit operations against an account not normally possible on a
real network.

Installing
----------

```shell
/home/ricmoo> npm install @ethers-ext/provider-ganache
```

Usage
-----

```javascript
import { GanacheProvider } from "@ethers-ext/provider-ganache";

// Create a new in-memory GanacheProvider
const provider = new GanacheProvider();


///////////////////
// Snapshots
const revert = await provider.snapshot();

// ... perform operations

// Revert back to the snapshot state
await revert();


///////////////////
// Account State

await provider.setAccount(addr, {
    balance: 1000000000000000000n,
    nonce: 5,
    code: "0x00"
});

await provider.setStorageAt(addr, 123, data);
```

API
---

### `new GanacheProvider(optionsOrGanache?)`

When constructing a GanacheProvider, either the standard options
normally passed to Ganache may be used or an existing Ganache
instance created with the desired configuration.

### `provider.snapshot() => Promise<() => void>`

Takes a snapshot of the current state and resolves to a function, that
when called will revert the Provider to the state at the time `snapshot`
was called.

### `provider.setAccount(address, state) => Promise<void>`

Sets account state for `address`. The `state` can include any of the
properties `balance`, `code` or `nonce`.

### `provider.setStorageAt(address, slot, value) => Promise<void>`

Sets the storage for `address` at `slot` to `value`.

### `provider.mine() => Promise<void>`

Mines a block.


License
-------

MIT License.
