# Reusable Module Template

This repository is meant to be a scaffolding starting point to build reusable holochain modules (zome & UI module).

This is what is has included:

- UI and Zome Instructions to use the module in a bigger app
- Github Actions automatic integration with building and testing
- Zome
  - Basic sample code 
  - Integrated tests with tryorama
  - Instructions to include the zome as a crate in any DNA
- UI
  - Reusable CustomElements with `lit-element`
  - Automated demoing with `storybook`, also publishing to `gh-pages`
  - Automated testing with `web-test-runner`
  - Automated end-to-end testing with the holochain zome
  - See [open-wc](https://open-wc.org/) for all the available tools and documentation

## How to scaffold a holochain reusable module

1. Create a new repository from this template (you can use the `Use this template` button on the top of this page).
2. Look for all the `TODO` keyword to see the places that need to be changed. (NOTE: replacing it inside the files can easily be done with your IDE, and for renaming files & directories you can use this bash one-liner: `new_name=YOUR_NEW_NAME_HERE find . -name "*todo_rename*" | while read line ; do mv $line $(echo $line | sed 's/todo_rename/$new_name/g') ; done`)
3. Remove this section of this README.md until this next line.

---

# TODO_RENAME_MODULE

> TODO: carefully change whatever needed in this README.

Small zome to create and see calendar events, in holochain RSM.

This module is designed to be included in other DNAs, assuming as little as possible from those. It is packaged as a holochain zome, and an npm package that offers native Web Components that can be used across browsers and frameworks.

## Documentation

See our [`storybook`](https://holochain-open-dev.github.io/todo_rename_zome).

## Installation and usage

### Including the zome in your DNA

1. Create a new folder in the `zomes` of the consuming DNA, with the name you want to give to this zome in your DNA.
2. Add a new `Cargo.toml` in that folder. In its content, paste the `Cargo.toml` content from any zome.
3. Change the `name` properties of the `Cargo.toml` file to the name you want to give to this zome in your DNA.
4. Add this zome as a dependency in the `Cargo.toml` file:
```toml
[dependencies]
todo_rename_zome = {git = "TODO_CHANGE_MODULE_URL", package = "todo_rename_zome"}
```
5. Create a `src` folder besides the `Cargo.toml` with this content:
```rust
extern crate todo_rename_zome;
```
6. If you haven't yet, in the top level `Cargo.toml` file of your DNA, add this to specify which version of holochain you want to target:
```toml
hc_utils = {git = "https://github.com/guillemcordoba/hc-utils", branch = "develop", package = "hc_utils"}
hdk3 = {git = "https://github.com/holochain/holochain", rev = "7037aa2ccfb1ad9a8ece98eb379686f605dc1a0c", package = "hdk3"}
holo_hash = {git = "https://github.com/holochain/holochain", rev = "7037aa2ccfb1ad9a8ece98eb379686f605dc1a0c", package = "holo_hash"}
```
7. Add the zome into your `*.dna.workdir/dna.json` file.
8. Compile the DNA with the usual `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown`.

### Using the UI module

1. Install the module with `npm install https://github.com/holochain-open-dev/todo_rename#ui-build`.

2. Import and create the `mobx` store for profiles and for this module, and define the custom elements you need in your app:

```js
import {
  CreateOffer,
  MyOffers,
  PendingOfferList,
  MyBalance,
  PublicTransactorService,
  TransactorStore,
} from "@llavors-mutues/public-transactor";
import { connectStore } from "@holochain-open-dev/common";
import {
  ProfilePrompt,
  ProfilesStore,
  ProfilesService,
} from "@holochain-open-dev/profiles";
import { AppWebsocket } from "@holochain/conductor-api";

async function setupTransactor() {
  const appWebsocket = await ConductorApi.AppWebsocket.connect(
    process.env.CONDUCTOR_URL,
    12000
  );
  const appInfo = await appWebsocket.appInfo({
    installed_app_id: "test-app",
  });

  const cellId = appInfo.cell_data[0][0];

  const profilesService = new ProfilesService(appWebsocket, cellId);
  const profilesStore = new ProfilesStore(profilesService);
  const service = new PublicTransactorService(appWebsocket, cellId);
  const store = new TransactorStore(service, profilesStore);

  customElements.define(
    "profile-prompt",
    connectStore(ProfilePrompt, profilesStore)
  );
  customElements.define("create-offer", connectStore(CreateOffer, store));
  customElements.define("my-offers", connectStore(MyOffers, store));
  customElements.define("my-balance", connectStore(MyBalance, store));
}
```

3. All the elements you have defined are now available to use as normal HTML tags:

```html
...
<body>
  <create-offer style="height: 400px; width: 500px"></create-offer>
</body>
```

Take into account that at this point the elements already expect a holochain conductor running at `ws://localhost:8888`.

You can see a full working example [here](/ui/demo/index.html).

## Developer Setup

See our [developer setup guide](/dev-setup.md).