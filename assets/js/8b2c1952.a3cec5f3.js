"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[38512],{94030:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>a});var i=t(85893),o=t(11151);const r={title:"IBC-Go v8 to v9",sidebar_label:"IBC-Go v8 to v9",sidebar_position:13,slug:"/migrations/v8-to-v9"},s="Migrating from v8 to v9",c={id:"migrations/v8-to-v9",title:"IBC-Go v8 to v9",description:"This guide provides instructions for migrating to a new version of ibc-go.",source:"@site/docs/05-migrations/13-v8-to-v9.md",sourceDirName:"05-migrations",slug:"/migrations/v8-to-v9",permalink:"/main/migrations/v8-to-v9",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:13,frontMatter:{title:"IBC-Go v8 to v9",sidebar_label:"IBC-Go v8 to v9",sidebar_position:13,slug:"/migrations/v8-to-v9"},sidebar:"defaultSidebar",previous:{title:"IBC-Go v8 to v8.1",permalink:"/main/migrations/v8-to-v8_1"}},d={},a=[{value:"Chains",id:"chains",level:2},{value:"IBC Apps",id:"ibc-apps",level:2},{value:"API removals",id:"api-removals",level:3},{value:"API deprecation notice",id:"api-deprecation-notice",level:3},{value:"IBC testing package",id:"ibc-testing-package",level:3},{value:"Relayers",id:"relayers",level:2},{value:"IBC Light Clients",id:"ibc-light-clients",level:2},{value:"API removals",id:"api-removals-1",level:3},{value:"07-tendermint",id:"07-tendermint",level:3},{value:"08-wasm",id:"08-wasm",level:3}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"migrating-from-v8-to-v9",children:"Migrating from v8 to v9"}),"\n",(0,i.jsx)(n.p,{children:"This guide provides instructions for migrating to a new version of ibc-go."}),"\n",(0,i.jsx)(n.p,{children:"There are four sections based on the four potential user groups of this document:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#chains",children:"Chains"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#ibc-apps",children:"IBC Apps"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#relayers",children:"Relayers"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#ibc-light-clients",children:"IBC Light Clients"})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Note:"})," ibc-go supports golang semantic versioning and therefore all imports must be updated on major version releases."]}),"\n",(0,i.jsx)(n.h2,{id:"chains",children:"Chains"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"No relevant changes were made in this release."}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"ibc-apps",children:"IBC Apps"}),"\n",(0,i.jsx)(n.h3,{id:"api-removals",children:"API removals"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"exported.ChannelI"})," and ",(0,i.jsx)(n.code,{children:"exported.CounterpartyChannelI"})," interfaces have been removed. Please use the concrete types.\nThe ",(0,i.jsx)(n.code,{children:"exported.ConnectionI"})," and ",(0,i.jsx)(n.code,{children:"exported.CounterpartyConnectionI"})," interfaces have been removed. Please use the concrete types."]}),"\n",(0,i.jsxs)(n.p,{children:["The functions ",(0,i.jsx)(n.code,{children:"GetState()"}),", ",(0,i.jsx)(n.code,{children:"GetOrdering()"}),", ",(0,i.jsx)(n.code,{children:"GetCounterparty()"}),", ",(0,i.jsx)(n.code,{children:"GetConnectionHops()"}),", ",(0,i.jsx)(n.code,{children:"GetVersion()"})," of the ",(0,i.jsx)(n.code,{children:"Channel"})," type have been removed.\nThe functions ",(0,i.jsx)(n.code,{children:"GetPortID()"}),", ",(0,i.jsx)(n.code,{children:"GetChannelID()"})," of the ",(0,i.jsx)(n.code,{children:"CounterpartyChannel"})," type have been removed.\nThe functions ",(0,i.jsx)(n.code,{children:"GetClientID()"}),", ",(0,i.jsx)(n.code,{children:"GetState()"}),", ",(0,i.jsx)(n.code,{children:"GetCounterparty()"}),", ",(0,i.jsx)(n.code,{children:"GetVersions()"}),", and ",(0,i.jsx)(n.code,{children:"GetDelayPeriod"})," of the ",(0,i.jsx)(n.code,{children:"Connection"})," type have been removed.\nThe functions ",(0,i.jsx)(n.code,{children:"GetClientID()"}),", ",(0,i.jsx)(n.code,{children:"GetConnectionID()"}),", and ",(0,i.jsx)(n.code,{children:"GetPrefix()"})," of the ",(0,i.jsx)(n.code,{children:"CounterpartyConnection"})," type have been removed."]}),"\n",(0,i.jsx)(n.h3,{id:"api-deprecation-notice",children:"API deprecation notice"}),"\n",(0,i.jsxs)(n.p,{children:["The testing package functions ",(0,i.jsx)(n.code,{children:"coordinator.Setup"}),", ",(0,i.jsx)(n.code,{children:"coordinator.SetupClients"}),", ",(0,i.jsx)(n.code,{children:"coordinator.SetupConnections"}),", ",(0,i.jsx)(n.code,{children:"coordinator.CreateConnections"}),", and ",(0,i.jsx)(n.code,{children:"coordinator.CreateChannels"})," have been deprecated and will be removed in v10.\nPlease use the new functions ",(0,i.jsx)(n.code,{children:"path.Setup"}),", ",(0,i.jsx)(n.code,{children:"path.SetupClients"}),", ",(0,i.jsx)(n.code,{children:"path.SetupConnections"}),", ",(0,i.jsx)(n.code,{children:"path.CreateConnections"}),", ",(0,i.jsx)(n.code,{children:"path.CreateChannels"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"ibc-testing-package",children:"IBC testing package"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"mock.PV"})," type has been removed in favour of ",(0,i.jsx)(n.a,{href:"https://github.com/cometbft/cometbft/blob/v0.38.5/types/priv_validator.go#L50",children:(0,i.jsx)(n.code,{children:"cmttypes.MockPV"})})," (",(0,i.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/pull/5709",children:"#5709"}),")."]}),"\n",(0,i.jsxs)(n.li,{children:["Functions ",(0,i.jsx)(n.code,{children:"ConstructUpdateTMClientHeader"})," and ",(0,i.jsx)(n.code,{children:"ConstructUpdateTMClientHeaderWithTrustedHeight"})," of ",(0,i.jsx)(n.code,{children:"TestChain"})," type have been replaced with ",(0,i.jsx)(n.code,{children:"IBCClientHeader"}),". This function will construct a ",(0,i.jsx)(n.code,{children:"07-tendermint"})," header to update the light client on the counterparty chain. The trusted height must be passed in as a non-zero height."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"GetValsAtHeight"})," has been renamed to ",(0,i.jsx)(n.code,{children:"GetTrustedValidators"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"relayers",children:"Relayers"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Renaming of event attribute keys in ",(0,i.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/pull/5603",children:"#5603"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"ibc-light-clients",children:"IBC Light Clients"}),"\n",(0,i.jsx)(n.h3,{id:"api-removals-1",children:"API removals"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"ExportMetadata"})," interface function has been removed from the ",(0,i.jsx)(n.code,{children:"ClientState"})," interface. Core IBC will export all key/value's within the 02-client store."]}),"\n",(0,i.jsx)(n.h3,{id:"07-tendermint",children:"07-tendermint"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"IterateConsensusMetadata"})," function has been removed."]}),"\n",(0,i.jsx)(n.h3,{id:"08-wasm",children:"08-wasm"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"ExportMetadataMsg"})," struct has been removed and is no longer required for contracts to implement. Core IBC will handle exporting all key/value's written to the store by a light client contract.\nThe ",(0,i.jsx)(n.code,{children:"ZeroCustomFields"})," interface function has been removed from the ",(0,i.jsx)(n.code,{children:"ClientState"})," interface. Core IBC only used this function to set tendermint client states when scheduling an IBC software upgrade. The interface function has been replaced by a type assertion."]})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>s});var i=t(67294);const o={},r=i.createContext(o);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);