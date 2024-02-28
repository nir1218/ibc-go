"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[60488],{94948:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var a=t(85893),r=t(11151);const i={title:"Authentication Modules",sidebar_label:"Authentication Modules",sidebar_position:2,slug:"/apps/interchain-accounts/auth-modules"},o="Building an authentication module",s={id:"apps/interchain-accounts/auth-modules",title:"Authentication Modules",description:"Authentication modules play the role of the Base Application as described in ICS30 IBC Middleware, and enable application developers to perform custom logic when working with the Interchain Accounts controller API.",source:"@site/versioned_docs/version-v4.5.x/02-apps/02-interchain-accounts/02-auth-modules.md",sourceDirName:"02-apps/02-interchain-accounts",slug:"/apps/interchain-accounts/auth-modules",permalink:"/v4/apps/interchain-accounts/auth-modules",draft:!1,unlisted:!1,tags:[],version:"v4.5.x",sidebarPosition:2,frontMatter:{title:"Authentication Modules",sidebar_label:"Authentication Modules",sidebar_position:2,slug:"/apps/interchain-accounts/auth-modules"},sidebar:"defaultSidebar",previous:{title:"Overview",permalink:"/v4/apps/interchain-accounts/overview"},next:{title:"Active Channels",permalink:"/v4/apps/interchain-accounts/active-channels"}},c={},l=[{value:"IBCModule implementation",id:"ibcmodule-implementation",level:2},{value:"<code>RegisterInterchainAccount</code>",id:"registerinterchainaccount",level:2},{value:"<code>SendTx</code>",id:"sendtx",level:2},{value:"<code>OnAcknowledgementPacket</code>",id:"onacknowledgementpacket",level:2},{value:"Integration into <code>app.go</code> file",id:"integration-into-appgo-file",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"building-an-authentication-module",children:"Building an authentication module"}),"\n",(0,a.jsx)(n.admonition,{title:"Synopsis",type:"note",children:(0,a.jsxs)(n.p,{children:["Authentication modules play the role of the ",(0,a.jsx)(n.code,{children:"Base Application"})," as described in ",(0,a.jsx)(n.a,{href:"https://github.com/cosmos/ibc/tree/master/spec/app/ics-030-middleware",children:"ICS30 IBC Middleware"}),", and enable application developers to perform custom logic when working with the Interchain Accounts controller API."]})}),"\n",(0,a.jsx)(n.p,{children:"The controller submodule is used for account registration and packet sending.\nIt executes only logic required of all controllers of interchain accounts.\nThe type of authentication used to manage the interchain accounts remains unspecified.\nThere may exist many different types of authentication which are desirable for different use cases.\nThus the purpose of the authentication module is to wrap the controller module with custom authentication logic."}),"\n",(0,a.jsxs)(n.p,{children:["In ibc-go, authentication modules are connected to the controller chain via a middleware stack.\nThe controller module is implemented as ",(0,a.jsx)(n.a,{href:"https://github.com/cosmos/ibc/tree/master/spec/app/ics-030-middleware",children:"middleware"})," and the authentication module is connected to the controller module as the base application of the middleware stack.\nTo implement an authentication module, the ",(0,a.jsx)(n.code,{children:"IBCModule"})," interface must be fulfilled.\nBy implementing the controller module as middleware, any amount of authentication modules can be created and connected to the controller module without writing redundant code."]}),"\n",(0,a.jsx)(n.p,{children:"The authentication module must:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Authenticate interchain account owners"}),"\n",(0,a.jsx)(n.li,{children:"Track the associated interchain account address for an owner"}),"\n",(0,a.jsxs)(n.li,{children:["Claim the channel capability in ",(0,a.jsx)(n.code,{children:"OnChanOpenInit"})]}),"\n",(0,a.jsx)(n.li,{children:"Send packets on behalf of an owner (after authentication)"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"ibcmodule-implementation",children:"IBCModule implementation"}),"\n",(0,a.jsxs)(n.p,{children:["The following ",(0,a.jsx)(n.code,{children:"IBCModule"})," callbacks must be implemented with appropriate custom logic:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// OnChanOpenInit implements the IBCModule interface\nfunc (im IBCModule) OnChanOpenInit(\n    ctx sdk.Context,\n    order channeltypes.Order,\n    connectionHops []string,\n    portID string,\n    channelID string,\n    chanCap *capabilitytypes.Capability,\n    counterparty channeltypes.Counterparty,\n    version string,\n) (string, error) {\n    // the authentication module *must* claim the channel capability on OnChanOpenInit\n    if err := im.keeper.ClaimCapability(ctx, chanCap, host.ChannelCapabilityPath(portID, channelID)); err != nil {\n        return version, err\n    }\n\n    // perform custom logic\n\n    return version, nil\n}\n\n// OnChanOpenAck implements the IBCModule interface\nfunc (im IBCModule) OnChanOpenAck(\n    ctx sdk.Context,\n    portID,\n    channelID string,\n    counterpartyVersion string,\n) error {\n    // perform custom logic\n\n    return nil\n}\n\n// OnChanCloseConfirm implements the IBCModule interface\nfunc (im IBCModule) OnChanCloseConfirm(\n    ctx sdk.Context,\n    portID,\n    channelID string,\n) error {\n    // perform custom logic\n\n    return nil\n}\n\n// OnAcknowledgementPacket implements the IBCModule interface\nfunc (im IBCModule) OnAcknowledgementPacket(\n    ctx sdk.Context,\n    packet channeltypes.Packet,\n    acknowledgement []byte,\n    relayer sdk.AccAddress,\n) error {\n    // perform custom logic\n\n    return nil\n}\n\n// OnTimeoutPacket implements the IBCModule interface.\nfunc (im IBCModule) OnTimeoutPacket(\n    ctx sdk.Context,\n    packet channeltypes.Packet,\n    relayer sdk.AccAddress,\n) error {\n    // perform custom logic\n\n    return nil\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.strong,{children:"Note"}),": The channel capability must be claimed by the authentication module in ",(0,a.jsx)(n.code,{children:"OnChanOpenInit"})," otherwise the authentication module will not be able to send packets on the channel created for the associated interchain account."]}),"\n",(0,a.jsxs)(n.p,{children:["The following functions must be defined to fulfill the ",(0,a.jsx)(n.code,{children:"IBCModule"})," interface, but they will never be called by the controller module so they may error or panic."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:'// OnChanOpenTry implements the IBCModule interface\nfunc (im IBCModule) OnChanOpenTry(\n    ctx sdk.Context,\n    order channeltypes.Order,\n    connectionHops []string,\n    portID,\n    channelID string,\n    chanCap *capabilitytypes.Capability,\n    counterparty channeltypes.Counterparty,\n    counterpartyVersion string,\n) (string, error) {\n    panic("UNIMPLEMENTED")\n}\n\n// OnChanOpenConfirm implements the IBCModule interface\nfunc (im IBCModule) OnChanOpenConfirm(\n    ctx sdk.Context,\n    portID,\n    channelID string,\n) error {\n    panic("UNIMPLEMENTED")\n}\n\n// OnChanCloseInit implements the IBCModule interface\nfunc (im IBCModule) OnChanCloseInit(\n    ctx sdk.Context,\n    portID,\n    channelID string,\n) error {\n    panic("UNIMPLEMENTED")\n}\n\n// OnRecvPacket implements the IBCModule interface. A successful acknowledgement\n// is returned if the packet data is successfully decoded and the receive application\n// logic returns without error.\nfunc (im IBCModule) OnRecvPacket(\n    ctx sdk.Context,\n    packet channeltypes.Packet,\n    relayer sdk.AccAddress,\n) ibcexported.Acknowledgement {\n    panic("UNIMPLEMENTED")\n}\n'})}),"\n",(0,a.jsx)(n.h2,{id:"registerinterchainaccount",children:(0,a.jsx)(n.code,{children:"RegisterInterchainAccount"})}),"\n",(0,a.jsxs)(n.p,{children:["The authentication module can begin registering interchain accounts by calling ",(0,a.jsx)(n.code,{children:"RegisterInterchainAccount"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"if err := keeper.icaControllerKeeper.RegisterInterchainAccount(ctx, connectionID, owner.String(), version); err != nil {\n    return err\n}\n\nreturn nil\n"})}),"\n",(0,a.jsxs)(n.p,{children:["The ",(0,a.jsx)(n.code,{children:"version"})," argument is used to support ICS29 fee middleware for relayer incentivization of ICS27 packets. Consumers of the ",(0,a.jsx)(n.code,{children:"RegisterInterchainAccount"})," are expected to build the appropriate JSON encoded version string themselves and pass it accordingly. If an empty string is passed in the ",(0,a.jsx)(n.code,{children:"version"})," argument, then the version will be initialized to a default value in the ",(0,a.jsx)(n.code,{children:"OnChanOpenInit"})," callback of the controller's handler, so that channel handshake can proceed."]}),"\n",(0,a.jsxs)(n.p,{children:["The following code snippet illustrates how to construct an appropriate interchain accounts ",(0,a.jsx)(n.code,{children:"Metadata"})," and encode it as a JSON bytestring:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"icaMetadata := icatypes.Metadata{\n    Version:                icatypes.Version,\n    ControllerConnectionId: controllerConnectionID,\n    HostConnectionId:       hostConnectionID,\n    Encoding:               icatypes.EncodingProtobuf,\n    TxType:                 icatypes.TxTypeSDKMultiMsg,\n}\n\nappVersion, err := icatypes.ModuleCdc.MarshalJSON(&icaMetadata)\nif err != nil {\n    return err\n}\n\nif err := keeper.icaControllerKeeper.RegisterInterchainAccount(ctx, controllerConnectionID, owner.String(), string(appVersion)); err != nil {\n    return err\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Similarly, if the application stack is configured to route through ICS29 fee middleware and a fee enabled channel is desired, construct the appropriate ICS29 ",(0,a.jsx)(n.code,{children:"Metadata"})," type:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"icaMetadata := icatypes.Metadata{\n    Version:                icatypes.Version,\n    ControllerConnectionId: controllerConnectionID,\n    HostConnectionId:       hostConnectionID,\n    Encoding:               icatypes.EncodingProtobuf,\n    TxType:                 icatypes.TxTypeSDKMultiMsg,\n}\n\nappVersion, err := icatypes.ModuleCdc.MarshalJSON(&icaMetadata)\nif err != nil {\n    return err\n}\n\nfeeMetadata := feetypes.Metadata{\n    AppVersion: string(appVersion),\n    FeeVersion: feetypes.Version,\n}\n\nfeeEnabledVersion, err := feetypes.ModuleCdc.MarshalJSON(&feeMetadata)\nif err != nil {\n    return err\n}\n\nif err := keeper.icaControllerKeeper.RegisterInterchainAccount(ctx, controllerConnectionID, owner.String(), string(feeEnabledVersion)); err != nil {\n    return err\n}\n"})}),"\n",(0,a.jsx)(n.h2,{id:"sendtx",children:(0,a.jsx)(n.code,{children:"SendTx"})}),"\n",(0,a.jsxs)(n.p,{children:["The authentication module can attempt to send a packet by calling ",(0,a.jsx)(n.code,{children:"SendTx"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:'\n// Authenticate owner\n// perform custom logic\n    \n// Construct controller portID based on interchain account owner address\nportID, err := icatypes.NewControllerPortID(owner.String())\nif err != nil {\n    return err\n}\n\nchannelID, found := keeper.icaControllerKeeper.GetActiveChannelID(ctx, portID)\nif !found {\n    return sdkerrors.Wrapf(icatypes.ErrActiveChannelNotFound, "failed to retrieve active channel for port %s", portID)\n}\n    \n// Obtain the channel capability, claimed in OnChanOpenInit\nchanCap, found := keeper.scopedKeeper.GetCapability(ctx, host.ChannelCapabilityPath(portID, channelID))\nif !found {\n    return sdkerrors.Wrap(channeltypes.ErrChannelCapabilityNotFound, "module does not own channel capability")\n}\n    \n// Obtain data to be sent to the host chain. \n// In this example, the owner of the interchain account would like to send a bank MsgSend to the host chain. \n// The appropriate serialization function should be called. The host chain must be able to deserialize the transaction. \n// If the host chain is using the ibc-go host module, `SerializeCosmosTx` should be used. \nmsg := &banktypes.MsgSend{FromAddress: fromAddr, ToAddress: toAddr, Amount: amt}\ndata, err := icatypes.SerializeCosmosTx(keeper.cdc, []sdk.Msg{msg})\nif err != nil {\n    return err\n}\n\n// Construct packet data\npacketData := icatypes.InterchainAccountPacketData{\n    Type: icatypes.EXECUTE_TX,\n    Data: data,\n}\n\n// Obtain timeout timestamp\n// An appropriate timeout timestamp must be determined based on the usage of the interchain account.\n// If the packet times out, the channel will be closed requiring a new channel to be created \ntimeoutTimestamp := obtainTimeoutTimestamp()\n\n// Send the interchain accounts packet, returning the packet sequence\nseq, err = keeper.icaControllerKeeper.SendTx(ctx, chanCap, portID, packetData, timeoutTimestamp)\n'})}),"\n",(0,a.jsxs)(n.p,{children:["The data within an ",(0,a.jsx)(n.code,{children:"InterchainAccountPacketData"})," must be serialized using a format supported by the host chain.\nIf the host chain is using the ibc-go host chain submodule, ",(0,a.jsx)(n.code,{children:"SerializeCosmosTx"})," should be used. If the ",(0,a.jsx)(n.code,{children:"InterchainAccountPacketData.Data"})," is serialized using a format not support by the host chain, the packet will not be successfully received."]}),"\n",(0,a.jsx)(n.h2,{id:"onacknowledgementpacket",children:(0,a.jsx)(n.code,{children:"OnAcknowledgementPacket"})}),"\n",(0,a.jsxs)(n.p,{children:["Controller chains will be able to access the acknowledgement written into the host chain state once a relayer relays the acknowledgement.\nThe acknowledgement bytes will be passed to the auth module via the ",(0,a.jsx)(n.code,{children:"OnAcknowledgementPacket"})," callback.\nAuth modules are expected to know how to decode the acknowledgement."]}),"\n",(0,a.jsx)(n.p,{children:"If the controller chain is connected to a host chain using the host module on ibc-go, it may interpret the acknowledgement bytes as follows:"}),"\n",(0,a.jsx)(n.p,{children:"Begin by unmarshaling the acknowledgement into sdk.TxMsgData:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"var ack channeltypes.Acknowledgement\nif err := channeltypes.SubModuleCdc.UnmarshalJSON(acknowledgement, &ack); err != nil {\n    return err\n}\n\ntxMsgData := &sdk.TxMsgData{}\nif err := proto.Unmarshal(ack.GetResult(), txMsgData); err != nil {\n    return err\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"If the txMsgData.Data field is non nil, the host chain is using SDK version <= v0.45.\nThe auth module should interpret the txMsgData.Data as follows:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"switch len(txMsgData.Data) {\ncase 0:\n    // see documentation below for SDK 0.46.x or greater\ndefault:\n    for _, msgData := range txMsgData.Data {\n        if err := handler(msgData); err != nil {\n            return err\n        }\n    }\n...\n}            \n"})}),"\n",(0,a.jsx)(n.p,{children:"A handler will be needed to interpret what actions to perform based on the message type sent.\nA router could be used, or more simply a switch statement."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"func handler(msgData sdk.MsgData) error {\nswitch msgData.MsgType {\ncase sdk.MsgTypeURL(&banktypes.MsgSend{}):\n    msgResponse := &banktypes.MsgSendResponse{}\n    if err := proto.Unmarshal(msgData.Data, msgResponse}; err != nil {\n        return err\n    }\n\n    handleBankSendMsg(msgResponse)\n\ncase sdk.MsgTypeURL(&stakingtypes.MsgDelegate{}):\n    msgResponse := &stakingtypes.MsgDelegateResponse{}\n    if err := proto.Unmarshal(msgData.Data, msgResponse}; err != nil {\n        return err\n    }\n\n    handleStakingDelegateMsg(msgResponse)\n\ncase sdk.MsgTypeURL(&transfertypes.MsgTransfer{}):\n    msgResponse := &transfertypes.MsgTransferResponse{}\n    if err := proto.Unmarshal(msgData.Data, msgResponse}; err != nil {\n        return err\n    }\n\n    handleIBCTransferMsg(msgResponse)\n \ndefault:\n    return\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"If the txMsgData.Data is empty, the host chain is using SDK version > v0.45.\nThe auth module should interpret the txMsgData.Responses as follows:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"...\n// switch statement from above\ncase 0:\n    for _, any := range txMsgData.MsgResponses {\n        if err := handleAny(any); err != nil {\n            return err\n        }\n    }\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["A handler will be needed to interpret what actions to perform based on the type url of the Any.\nA router could be used, or more simply a switch statement.\nIt may be possible to deduplicate logic between ",(0,a.jsx)(n.code,{children:"handler"})," and ",(0,a.jsx)(n.code,{children:"handleAny"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"func handleAny(any *codectypes.Any) error {\nswitch any.TypeURL {\ncase banktypes.MsgSend:\n    msgResponse, err := unpackBankMsgSendResponse(any)\n    if err != nil {\n        return err\n    }\n\n    handleBankSendMsg(msgResponse)\n\ncase stakingtypes.MsgDelegate:\n    msgResponse, err := unpackStakingDelegateResponse(any)\n    if err != nil {\n        return err\n    }\n\n    handleStakingDelegateMsg(msgResponse)\n\n    case transfertypes.MsgTransfer:\n    msgResponse, err := unpackIBCTransferMsgResponse(any)\n    if err != nil {\n        return err\n    }\n\n    handleIBCTransferMsg(msgResponse)\n \ndefault:\n    return\n}\n"})}),"\n",(0,a.jsxs)(n.h3,{id:"integration-into-appgo-file",children:["Integration into ",(0,a.jsx)(n.code,{children:"app.go"})," file"]}),"\n",(0,a.jsxs)(n.p,{children:["To integrate the authentication module into your chain, please follow the steps outlined above in ",(0,a.jsx)(n.a,{href:"/v4/apps/interchain-accounts/integration#example-integration",children:"app.go integration"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>o});var a=t(67294);const r={},i=a.createContext(r);function o(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);