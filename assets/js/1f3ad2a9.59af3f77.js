"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[56888],{31840:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>r});var n=s(85893),i=s(11151);const o={title:"Consensus State interface",sidebar_label:"Consensus State interface",sidebar_position:3,slug:"/ibc/light-clients/consensus-state"},c="Implementing the ConsensusState interface",a={id:"light-clients/developer-guide/consensus-state",title:"Consensus State interface",description:"A ConsensusState is the snapshot of the counterparty chain, that an IBC client uses to verify proofs (e.g. a block).",source:"@site/versioned_docs/version-v8.0.x/03-light-clients/01-developer-guide/03-consensus-state.md",sourceDirName:"03-light-clients/01-developer-guide",slug:"/ibc/light-clients/consensus-state",permalink:"/v8/ibc/light-clients/consensus-state",draft:!1,unlisted:!1,tags:[],version:"v8.0.x",sidebarPosition:3,frontMatter:{title:"Consensus State interface",sidebar_label:"Consensus State interface",sidebar_position:3,slug:"/ibc/light-clients/consensus-state"},sidebar:"defaultSidebar",previous:{title:"Client State interface",permalink:"/v8/ibc/light-clients/client-state"},next:{title:"Handling Updates and Misbehaviour",permalink:"/v8/ibc/light-clients/updates-and-misbehaviour"}},l={},r=[{value:"<code>ClientType</code> method",id:"clienttype-method",level:2},{value:"<code>GetTimestamp</code> method",id:"gettimestamp-method",level:2},{value:"<code>ValidateBasic</code> method",id:"validatebasic-method",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.h1,{id:"implementing-the-consensusstate-interface",children:["Implementing the ",(0,n.jsx)(t.code,{children:"ConsensusState"})," interface"]}),"\n",(0,n.jsxs)(t.p,{children:["A ",(0,n.jsx)(t.code,{children:"ConsensusState"})," is the snapshot of the counterparty chain, that an IBC client uses to verify proofs (e.g. a block)."]}),"\n",(0,n.jsxs)(t.p,{children:["The further development of multiple types of IBC light clients and the difficulties presented by this generalization problem (see ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/main/docs/architecture/adr-006-02-client-refactor.md",children:"ADR-006"})," for more information about this historical context) led to the design decision of each client keeping track of and set its own ",(0,n.jsx)(t.code,{children:"ClientState"})," and ",(0,n.jsx)(t.code,{children:"ConsensusState"}),", as well as the simplification of client ",(0,n.jsx)(t.code,{children:"ConsensusState"})," updates through the generalized ",(0,n.jsx)(t.code,{children:"ClientMessage"})," interface."]}),"\n",(0,n.jsxs)(t.p,{children:["The below ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/core/exported/client.go#L133",children:(0,n.jsx)(t.code,{children:"ConsensusState"})})," interface is a generalized interface for the types of information a ",(0,n.jsx)(t.code,{children:"ConsensusState"})," could contain. For a reference ",(0,n.jsx)(t.code,{children:"ConsensusState"})," implementation, please see the ",(0,n.jsxs)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/light-clients/07-tendermint/consensus_state.go",children:["Tendermint light client ",(0,n.jsx)(t.code,{children:"ConsensusState"})]}),"."]}),"\n",(0,n.jsxs)(t.h2,{id:"clienttype-method",children:[(0,n.jsx)(t.code,{children:"ClientType"})," method"]}),"\n",(0,n.jsxs)(t.p,{children:["This is the type of client consensus. It should be the same as the ",(0,n.jsx)(t.code,{children:"ClientType"})," return value for the ",(0,n.jsxs)(t.a,{href:"/v8/ibc/light-clients/client-state",children:["corresponding ",(0,n.jsx)(t.code,{children:"ClientState"})," implementation"]}),"."]}),"\n",(0,n.jsxs)(t.h2,{id:"gettimestamp-method",children:[(0,n.jsx)(t.code,{children:"GetTimestamp"})," method"]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"GetTimestamp"})," should return the timestamp (in nanoseconds) of the consensus state snapshot."]}),"\n",(0,n.jsxs)(t.h2,{id:"validatebasic-method",children:[(0,n.jsx)(t.code,{children:"ValidateBasic"})," method"]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"ValidateBasic"})," should validate every consensus state field and should return an error if any value is invalid. The light client implementer is in charge of determining which checks are required."]})]})}function h(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,t,s)=>{s.d(t,{Z:()=>a,a:()=>c});var n=s(67294);const i={},o=n.createContext(i);function c(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);