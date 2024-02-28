"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[24593],{34433:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var n=i(85893),s=i(11151);const a={title:"Handling Updates and Misbehaviour",sidebar_label:"Handling Updates and Misbehaviour",sidebar_position:4,slug:"/ibc/light-clients/updates-and-misbehaviour"},o="Handling ClientMessages: updates and misbehaviour",c={id:"light-clients/developer-guide/updates-and-misbehaviour",title:"Handling Updates and Misbehaviour",description:"As mentioned before in the documentation about implementing the ConsensusState interface, ClientMessage is an interface used to update an IBC client. This update may be performed by:",source:"@site/docs/03-light-clients/01-developer-guide/04-updates-and-misbehaviour.md",sourceDirName:"03-light-clients/01-developer-guide",slug:"/ibc/light-clients/updates-and-misbehaviour",permalink:"/main/ibc/light-clients/updates-and-misbehaviour",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Handling Updates and Misbehaviour",sidebar_label:"Handling Updates and Misbehaviour",sidebar_position:4,slug:"/ibc/light-clients/updates-and-misbehaviour"},sidebar:"defaultSidebar",previous:{title:"Consensus State interface",permalink:"/main/ibc/light-clients/consensus-state"},next:{title:"Handling Upgrades",permalink:"/main/ibc/light-clients/upgrades"}},d={},l=[{value:"Implementing the <code>ClientMessage</code> interface",id:"implementing-the-clientmessage-interface",level:2},{value:"Handling updates and misbehaviour",id:"handling-updates-and-misbehaviour",level:2},{value:"<code>VerifyClientMessage</code>",id:"verifyclientmessage",level:2},{value:"<code>CheckForMisbehaviour</code>",id:"checkformisbehaviour",level:2},{value:"<code>UpdateStateOnMisbehaviour</code>",id:"updatestateonmisbehaviour",level:2},{value:"<code>UpdateState</code>",id:"updatestate",level:2},{value:"Putting it all together",id:"putting-it-all-together",level:2}];function r(e){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.h1,{id:"handling-clientmessages-updates-and-misbehaviour",children:["Handling ",(0,n.jsx)(t.code,{children:"ClientMessage"}),"s: updates and misbehaviour"]}),"\n",(0,n.jsxs)(t.p,{children:["As mentioned before in the documentation about ",(0,n.jsxs)(t.a,{href:"/main/ibc/light-clients/consensus-state",children:["implementing the ",(0,n.jsx)(t.code,{children:"ConsensusState"})," interface"]}),", ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/core/exported/client.go#L147",children:(0,n.jsx)(t.code,{children:"ClientMessage"})})," is an interface used to update an IBC client. This update may be performed by:"]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"a single header"}),"\n",(0,n.jsx)(t.li,{children:"a batch of headers"}),"\n",(0,n.jsx)(t.li,{children:"evidence of misbehaviour,"}),"\n",(0,n.jsx)(t.li,{children:"or any type which when verified produces a change to the consensus state of the IBC client."}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"This interface has been purposefully kept generic in order to give the maximum amount of flexibility to the light client implementer."}),"\n",(0,n.jsxs)(t.h2,{id:"implementing-the-clientmessage-interface",children:["Implementing the ",(0,n.jsx)(t.code,{children:"ClientMessage"})," interface"]}),"\n",(0,n.jsxs)(t.p,{children:["Find the ",(0,n.jsx)(t.code,{children:"ClientMessage"}),"interface in ",(0,n.jsx)(t.code,{children:"modules/core/exported"}),":"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-go",children:"type ClientMessage interface {\n  proto.Message\n\n  ClientType() string\n  ValidateBasic() error\n}\n"})}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"ClientMessage"})," will be passed to the client to be used in ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/core/02-client/keeper/client.go#L48",children:(0,n.jsx)(t.code,{children:"UpdateClient"})}),", which retrieves the ",(0,n.jsx)(t.code,{children:"ClientState"})," by client ID (available in ",(0,n.jsx)(t.code,{children:"MsgUpdateClient"}),"). This ",(0,n.jsx)(t.code,{children:"ClientState"})," implements the ",(0,n.jsxs)(t.a,{href:"/main/ibc/light-clients/client-state",children:[(0,n.jsx)(t.code,{children:"ClientState"})," interface"]})," for its specific consenus type (e.g. Tendermint)."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"UpdateClient"})," will then handle a number of cases including misbehaviour and/or updating the consensus state, utilizing the specific methods defined in the relevant ",(0,n.jsx)(t.code,{children:"ClientState"}),"."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-go",children:"VerifyClientMessage(ctx sdk.Context, cdc codec.BinaryCodec, clientStore sdk.KVStore, clientMsg ClientMessage) error\nCheckForMisbehaviour(ctx sdk.Context, cdc codec.BinaryCodec, clientStore sdk.KVStore, clientMsg ClientMessage) bool\nUpdateStateOnMisbehaviour(ctx sdk.Context, cdc codec.BinaryCodec, clientStore sdk.KVStore, clientMsg ClientMessage)\nUpdateState(ctx sdk.Context, cdc codec.BinaryCodec, clientStore sdk.KVStore, clientMsg ClientMessage) []Height\n"})}),"\n",(0,n.jsx)(t.h2,{id:"handling-updates-and-misbehaviour",children:"Handling updates and misbehaviour"}),"\n",(0,n.jsxs)(t.p,{children:["The functions for handling updates to a light client and evidence of misbehaviour are all found in the ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/core/exported/client.go#L36",children:(0,n.jsx)(t.code,{children:"ClientState"})})," interface, and will be discussed below."]}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:["It is important to note that ",(0,n.jsx)(t.code,{children:"Misbehaviour"})," in this particular context is referring to misbehaviour on the chain level intended to fool the light client. This will be defined by each light client."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"verifyclientmessage",children:(0,n.jsx)(t.code,{children:"VerifyClientMessage"})}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"VerifyClientMessage"})," must verify a ",(0,n.jsx)(t.code,{children:"ClientMessage"}),". A ",(0,n.jsx)(t.code,{children:"ClientMessage"})," could be a ",(0,n.jsx)(t.code,{children:"Header"}),", ",(0,n.jsx)(t.code,{children:"Misbehaviour"}),", or batch update. To understand how to implement a ",(0,n.jsx)(t.code,{children:"ClientMessage"}),", please refer to the ",(0,n.jsxs)(t.a,{href:"#implementing-the-clientmessage-interface",children:["Implementing the ",(0,n.jsx)(t.code,{children:"ClientMessage"})," interface"]})," section."]}),"\n",(0,n.jsxs)(t.p,{children:["It must handle each type of ",(0,n.jsx)(t.code,{children:"ClientMessage"})," appropriately. Calls to ",(0,n.jsx)(t.code,{children:"CheckForMisbehaviour"}),", ",(0,n.jsx)(t.code,{children:"UpdateState"}),", and ",(0,n.jsx)(t.code,{children:"UpdateStateOnMisbehaviour"})," will assume that the content of the ",(0,n.jsx)(t.code,{children:"ClientMessage"})," has been verified and can be trusted. An error should be returned if the ",(0,n.jsx)(t.code,{children:"ClientMessage"})," fails to verify."]}),"\n",(0,n.jsxs)(t.p,{children:["For an example of a ",(0,n.jsx)(t.code,{children:"VerifyClientMessage"})," implementation, please check the ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/light-clients/07-tendermint/update.go#L20",children:"Tendermint light client"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"checkformisbehaviour",children:(0,n.jsx)(t.code,{children:"CheckForMisbehaviour"})}),"\n",(0,n.jsxs)(t.p,{children:["Checks for evidence of a misbehaviour in ",(0,n.jsx)(t.code,{children:"Header"})," or ",(0,n.jsx)(t.code,{children:"Misbehaviour"})," type. It assumes the ",(0,n.jsx)(t.code,{children:"ClientMessage"})," has already been verified."]}),"\n",(0,n.jsxs)(t.p,{children:["For an example of a ",(0,n.jsx)(t.code,{children:"CheckForMisbehaviour"})," implementation, please check the ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/light-clients/07-tendermint/misbehaviour_handle.go#L19",children:"Tendermint light client"}),"."]}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:["The Tendermint light client ",(0,n.jsxs)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/light-clients/07-tendermint/misbehaviour.go",children:["defines ",(0,n.jsx)(t.code,{children:"Misbehaviour"})]})," as two different types of situations: a situation where two conflicting ",(0,n.jsx)(t.code,{children:"Header"}),"s with the same height have been submitted to update a client's ",(0,n.jsx)(t.code,{children:"ConsensusState"})," within the same trusting period, or that the two conflicting ",(0,n.jsx)(t.code,{children:"Header"}),"s have been submitted at different heights but the consensus states are not in the correct monotonic time ordering (BFT time violation). More explicitly, updating to a new height must have a timestamp greater than the previous consensus state, or, if inserting a consensus at a past height, then time must be less than those heights which come after and greater than heights which come before."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"updatestateonmisbehaviour",children:(0,n.jsx)(t.code,{children:"UpdateStateOnMisbehaviour"})}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"UpdateStateOnMisbehaviour"})," should perform appropriate state changes on a client state given that misbehaviour has been detected and verified. This method should only be called when misbehaviour is detected, as it does not perform any misbehaviour checks. Notably, it should freeze the client so that calling the ",(0,n.jsx)(t.code,{children:"Status"})," function on the associated client state no longer returns ",(0,n.jsx)(t.code,{children:"Active"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["For an example of a ",(0,n.jsx)(t.code,{children:"UpdateStateOnMisbehaviour"})," implementation, please check the ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/light-clients/07-tendermint/update.go#L199",children:"Tendermint light client"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"updatestate",children:(0,n.jsx)(t.code,{children:"UpdateState"})}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"UpdateState"})," updates and stores as necessary any associated information for an IBC client, such as the ",(0,n.jsx)(t.code,{children:"ClientState"})," and corresponding ",(0,n.jsx)(t.code,{children:"ConsensusState"}),". It should perform a no-op on duplicate updates."]}),"\n",(0,n.jsxs)(t.p,{children:["It assumes the ",(0,n.jsx)(t.code,{children:"ClientMessage"})," has already been verified."]}),"\n",(0,n.jsxs)(t.p,{children:["For an example of a ",(0,n.jsx)(t.code,{children:"UpdateState"})," implementation, please check the ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/light-clients/07-tendermint/update.go#L131",children:"Tendermint light client"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"putting-it-all-together",children:"Putting it all together"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"02-client"})," ",(0,n.jsx)(t.code,{children:"Keeper"})," module in ibc-go offers a reference as to how these functions will be used to ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/core/02-client/keeper/client.go#L48",children:"update the client"}),"."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-go",children:"if err := clientState.VerifyClientMessage(clientMessage); err != nil {\n  return err\n}\n\nfoundMisbehaviour := clientState.CheckForMisbehaviour(clientMessage)\nif foundMisbehaviour {\n  clientState.UpdateStateOnMisbehaviour(clientMessage)\n  // emit misbehaviour event\n  return \n}\n\nclientState.UpdateState(clientMessage) // expects no-op on duplicate header\n// emit update event\nreturn\n"})})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}},11151:(e,t,i)=>{i.d(t,{Z:()=>c,a:()=>o});var n=i(67294);const s={},a=n.createContext(s);function o(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);