"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[75184],{55153:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var i=n(85893),s=n(11151);const r={title:"IBC Client Developer Guide to Upgrades",sidebar_label:"IBC Client Developer Guide to Upgrades",sidebar_position:2,slug:"/ibc/upgrades/developer-guide"},a="IBC Client Developer Guide to Upgrades",o={id:"ibc/upgrades/developer-guide",title:"IBC Client Developer Guide to Upgrades",description:"Learn how to implement upgrade functionality for your custom IBC client.",source:"@site/versioned_docs/version-v6.2.x/01-ibc/05-upgrades/02-developer-guide.md",sourceDirName:"01-ibc/05-upgrades",slug:"/ibc/upgrades/developer-guide",permalink:"/v6/ibc/upgrades/developer-guide",draft:!1,unlisted:!1,tags:[],version:"v6.2.x",sidebarPosition:2,frontMatter:{title:"IBC Client Developer Guide to Upgrades",sidebar_label:"IBC Client Developer Guide to Upgrades",sidebar_position:2,slug:"/ibc/upgrades/developer-guide"},sidebar:"defaultSidebar",previous:{title:"How to Upgrade IBC Chains and their Clients",permalink:"/v6/ibc/upgrades/quick-guide"},next:{title:"Genesis Restart Upgrades",permalink:"/v6/ibc/upgrades/genesis-restart"}},d={},l=[];function c(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"ibc-client-developer-guide-to-upgrades",children:"IBC Client Developer Guide to Upgrades"}),"\n",(0,i.jsx)(t.admonition,{title:"Synopsis",type:"note",children:(0,i.jsx)(t.p,{children:"Learn how to implement upgrade functionality for your custom IBC client."})}),"\n",(0,i.jsxs)(t.p,{children:["As mentioned in the ",(0,i.jsx)(t.a,{href:"/v6/ibc/upgrades/intro",children:"README"}),", it is vital that high-value IBC clients can upgrade along with their underlying chains to avoid disruption to the IBC ecosystem. Thus, IBC client developers will want to implement upgrade functionality to enable clients to maintain connections and channels even across chain upgrades."]}),"\n",(0,i.jsx)(t.p,{children:"The IBC protocol allows client implementations to provide a path to upgrading clients given the upgraded client state, upgraded consensus state and proofs for each."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-go",children:"// Upgrade functions\n// NOTE: proof heights are not included as upgrade to a new revision is expected to pass only on the last\n// height committed by the current revision. Clients are responsible for ensuring that the planned last\n// height of the current revision is somehow encoded in the proof verification process.\n// This is to ensure that no premature upgrades occur, since upgrade plans committed to by the counterparty\n// may be cancelled or modified before the last planned height.\nVerifyUpgradeAndUpdateState(\n    ctx sdk.Context,\n    cdc codec.BinaryCodec,\n    store sdk.KVStore,\n    newClient ClientState,\n    newConsState ConsensusState,\n    proofUpgradeClient,\n    proofUpgradeConsState []byte,\n) (upgradedClient ClientState, upgradedConsensus ConsensusState, err error)\n"})}),"\n",(0,i.jsxs)(t.p,{children:["Note that the clients should have prior knowledge of the merkle path that the upgraded client and upgraded consensus states will use. The height at which the upgrade has occurred should also be encoded in the proof. The Tendermint client implementation accomplishes this by including an ",(0,i.jsx)(t.code,{children:"UpgradePath"})," in the ClientState itself, which is used along with the upgrade height to construct the merkle path under which the client state and consensus state are committed."]}),"\n",(0,i.jsxs)(t.p,{children:["Developers must ensure that the ",(0,i.jsx)(t.code,{children:"UpgradeClientMsg"})," does not pass until the last height of the old chain has been committed, and after the chain upgrades, the ",(0,i.jsx)(t.code,{children:"UpgradeClientMsg"})," should pass once and only once on all counterparty clients."]}),"\n",(0,i.jsx)(t.p,{children:"Developers must ensure that the new client adopts all of the new Client parameters that must be uniform across every valid light client of a chain (chain-chosen parameters), while maintaining the Client parameters that are customizable by each individual client (client-chosen parameters) from the previous version of the client."}),"\n",(0,i.jsxs)(t.p,{children:["Upgrades must adhere to the IBC Security Model. IBC does not rely on the assumption of honest relayers for correctness. Thus users should not have to rely on relayers to maintain client correctness and security (though honest relayers must exist to maintain relayer liveness). While relayers may choose any set of client parameters while creating a new ",(0,i.jsx)(t.code,{children:"ClientState"}),", this still holds under the security model since users can always choose a relayer-created client that suits their security and correctness needs or create a Client with their desired parameters if no such client exists."]}),"\n",(0,i.jsxs)(t.p,{children:["However, when upgrading an existing client, one must keep in mind that there are already many users who depend on this client's particular parameters. We cannot give the upgrading relayer free choice over these parameters once they have already been chosen. This would violate the security model since users who rely on the client would have to rely on the upgrading relayer to maintain the same level of security. Thus, developers must make sure that their upgrade mechanism allows clients to upgrade the chain-specified parameters whenever a chain upgrade changes these parameters (examples in the Tendermint client include ",(0,i.jsx)(t.code,{children:"UnbondingPeriod"}),", ",(0,i.jsx)(t.code,{children:"TrustingPeriod"}),", ",(0,i.jsx)(t.code,{children:"ChainID"}),", ",(0,i.jsx)(t.code,{children:"UpgradePath"}),", etc.), while ensuring that the relayer submitting the ",(0,i.jsx)(t.code,{children:"UpgradeClientMsg"})," cannot alter the client-chosen parameters that the users are relying upon (examples in Tendermint client include ",(0,i.jsx)(t.code,{children:"TrustLevel"}),", ",(0,i.jsx)(t.code,{children:"MaxClockDrift"}),", etc)."]}),"\n",(0,i.jsxs)(t.p,{children:["Developers should maintain the distinction between Client parameters that are uniform across every valid light client of a chain (chain-chosen parameters), and Client parameters that are customizable by each individual client (client-chosen parameters); since this distinction is necessary to implement the ",(0,i.jsx)(t.code,{children:"ZeroCustomFields"})," method in the ",(0,i.jsx)(t.code,{children:"ClientState"})," interface:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-go",children:"// Utility function that zeroes out any client customizable fields in client state\n// Ledger enforced fields are maintained while all custom fields are zero values\n// Used to verify upgrades\nZeroCustomFields() ClientState\n"})}),"\n",(0,i.jsxs)(t.p,{children:["Counterparty clients can upgrade securely by using all of the chain-chosen parameters from the chain-committed ",(0,i.jsx)(t.code,{children:"UpgradedClient"})," and preserving all of the old client-chosen parameters. This enables chains to securely upgrade without relying on an honest relayer, however it can in some cases lead to an invalid final ",(0,i.jsx)(t.code,{children:"ClientState"})," if the new chain-chosen parameters clash with the old client-chosen parameter. This can happen in the Tendermint client case if the upgrading chain lowers the ",(0,i.jsx)(t.code,{children:"UnbondingPeriod"})," (chain-chosen) to a duration below that of a counterparty client's ",(0,i.jsx)(t.code,{children:"TrustingPeriod"})," (client-chosen). Such cases should be clearly documented by developers, so that chains know which upgrades should be avoided to prevent this problem. The final upgraded client should also be validated in ",(0,i.jsx)(t.code,{children:"VerifyUpgradeAndUpdateState"})," before returning to ensure that the client does not upgrade to an invalid ",(0,i.jsx)(t.code,{children:"ClientState"}),"."]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>a});var i=n(67294);const s={},r=i.createContext(s);function a(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);