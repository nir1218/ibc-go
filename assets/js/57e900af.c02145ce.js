"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[77648],{27253:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=t(85893),c=t(11151);const a={},i="ADR 015: IBC Packet Receiver",s={id:"adr-015-ibc-packet-receiver",title:"ADR 015: IBC Packet Receiver",description:"Changelog",source:"@site/architecture/adr-015-ibc-packet-receiver.md",sourceDirName:".",slug:"/adr-015-ibc-packet-receiver",permalink:"/architecture/adr-015-ibc-packet-receiver",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"ADR 011: ICS-20 transfer state entry for total amount of tokens in escrow",permalink:"/architecture/adr-011-transfer-total-escrow-state-entry"},next:{title:"ADR 025: IBC Passive Channels",permalink:"/architecture/adr-025-ibc-passive-channels"}},o={},l=[{value:"Changelog",id:"changelog",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Status",id:"status",level:2},{value:"Consequences",id:"consequences",level:2},{value:"Positive",id:"positive",level:3},{value:"Negative",id:"negative",level:3},{value:"Neutral",id:"neutral",level:3},{value:"References",id:"references",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,c.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"adr-015-ibc-packet-receiver",children:"ADR 015: IBC Packet Receiver"}),"\n",(0,r.jsx)(n.h2,{id:"changelog",children:"Changelog"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"2019 Oct 22: Initial Draft"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"context",children:"Context"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"https://github.com/cosmos/ibc/tree/master/spec/core/ics-026-routing-module",children:"ICS 26 - Routing Module"})," defines a function ",(0,r.jsx)(n.a,{href:"https://github.com/cosmos/ibc/tree/master/spec/core/ics-026-routing-module#packet-relay",children:(0,r.jsx)(n.code,{children:"handlePacketRecv"})}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["In ICS 26, the routing module is defined as a layer above each application module\nwhich verifies and routes messages to the destination modules. It is possible to\nimplement it as a separate module, however, we already have functionality to route\nmessages upon the destination identifiers in the baseapp. This ADR suggests\nto utilize existing ",(0,r.jsx)(n.code,{children:"baseapp.router"})," to route packets to application modules."]}),"\n",(0,r.jsxs)(n.p,{children:["Generally, routing module callbacks have two separate steps in them,\nverification and execution. This corresponds to the ",(0,r.jsx)(n.code,{children:"AnteHandler"}),"-",(0,r.jsx)(n.code,{children:"Handler"}),"\nmodel inside the SDK. We can do the verification inside the ",(0,r.jsx)(n.code,{children:"AnteHandler"}),"\nin order to increase developer ergonomics by reducing boilerplate\nverification code."]}),"\n",(0,r.jsxs)(n.p,{children:["For atomic multi-message transaction, we want to keep the IBC related\nstate modification to be preserved even the application side state change\nreverts. One of the example might be IBC token sending message following with\nstake delegation which uses the tokens received by the previous packet message.\nIf the token receiving fails for any reason, we might not want to keep\nexecuting the transaction, but we also don't want to abort the transaction\nor the sequence and commitment will be reverted and the channel will be stuck.\nThis ADR suggests new ",(0,r.jsx)(n.code,{children:"CodeType"}),", ",(0,r.jsx)(n.code,{children:"CodeTxBreak"}),", to fix this problem."]}),"\n",(0,r.jsx)(n.h2,{id:"decision",children:"Decision"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"PortKeeper"})," will have the capability key that is able to access only the\nchannels bound to the port. Entities that hold a ",(0,r.jsx)(n.code,{children:"PortKeeper"})," will be\nable to call the methods on it which are corresponding with the methods with\nthe same names on the ",(0,r.jsx)(n.code,{children:"ChannelKeeper"}),", but only with the\nallowed port. ",(0,r.jsx)(n.code,{children:"ChannelKeeper.Port(string, ChannelChecker)"})," will be defined to\neasily construct a capability-safe ",(0,r.jsx)(n.code,{children:"PortKeeper"}),". This will be addressed in\nanother ADR and we will use insecure ",(0,r.jsx)(n.code,{children:"ChannelKeeper"})," for now."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"baseapp.runMsgs"})," will break the loop over the messages if one of the handlers\nreturns ",(0,r.jsx)(n.code,{children:"!Result.IsOK()"}),". However, the outer logic will write the cached\nstore if ",(0,r.jsx)(n.code,{children:"Result.IsOK() || Result.Code.IsBreak()"}),". ",(0,r.jsx)(n.code,{children:"Result.Code.IsBreak()"})," if\n",(0,r.jsx)(n.code,{children:"Result.Code == CodeTxBreak"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"func (app *BaseApp) runTx(tx Tx) (result Result) {\n  msgs := tx.GetMsgs()\n  \n  // AnteHandler\n  if app.anteHandler != nil {\n    anteCtx, msCache := app.cacheTxContext(ctx)\n    newCtx, err := app.anteHandler(anteCtx, tx)\n    if !newCtx.IsZero() {\n      ctx = newCtx.WithMultiStore(ms)\n    }\n\n    if err != nil {\n      // error handling logic\n      return res\n    }\n\n    msCache.Write()\n  }\n  \n  // Main Handler\n  runMsgCtx, msCache := app.cacheTxContext(ctx)\n  result = app.runMsgs(runMsgCtx, msgs)\n  // BEGIN modification made in this ADR\n  if result.IsOK() || result.IsBreak() {\n  // END\n    msCache.Write()\n  }\n\n  return result\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The Cosmos SDK will define an ",(0,r.jsx)(n.code,{children:"AnteDecorator"})," for IBC packet receiving. The\n",(0,r.jsx)(n.code,{children:"AnteDecorator"})," will iterate over the messages included in the transaction, type\n",(0,r.jsx)(n.code,{children:"switch"})," to check whether the message contains an incoming IBC packet, and if so\nverify the Merkle proof."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"type ProofVerificationDecorator struct {\n  clientKeeper ClientKeeper\n  channelKeeper ChannelKeeper\n}\n\nfunc (pvr ProofVerificationDecorator) AnteHandle(ctx Context, tx Tx, simulate bool, next AnteHandler) (Context, error) {\n  for _, msg := range tx.GetMsgs() {\n    var err error\n    switch msg := msg.(type) {\n    case client.MsgUpdateClient:\n      err = pvr.clientKeeper.UpdateClient(msg.ClientID, msg.Header)\n    case channel.MsgPacket:\n      err = pvr.channelKeeper.RecvPacket(msg.Packet, msg.Proofs, msg.ProofHeight)\n    case channel.MsgAcknowledgement:\n      err = pvr.channelKeeper.AcknowledgementPacket(msg.Acknowledgement, msg.Proof, msg.ProofHeight)\n    case channel.MsgTimeoutPacket:\n      err = pvr.channelKeeper.TimeoutPacket(msg.Packet, msg.Proof, msg.ProofHeight, msg.NextSequenceRecv)\n    case channel.MsgChannelOpenInit;\n      err = pvr.channelKeeper.CheckOpen(msg.PortID, msg.ChannelID, msg.Channel)\n    default:\n      continue\n    }\n\n    if err != nil {\n      return ctx, err\n    }\n  }\n  \n  return next(ctx, tx, simulate)\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Where ",(0,r.jsx)(n.code,{children:"MsgUpdateClient"}),", ",(0,r.jsx)(n.code,{children:"MsgPacket"}),", ",(0,r.jsx)(n.code,{children:"MsgAcknowledgement"}),", ",(0,r.jsx)(n.code,{children:"MsgTimeoutPacket"}),"\nare ",(0,r.jsx)(n.code,{children:"sdk.Msg"})," types correspond to ",(0,r.jsx)(n.code,{children:"handleUpdateClient"}),", ",(0,r.jsx)(n.code,{children:"handleRecvPacket"}),",\n",(0,r.jsx)(n.code,{children:"handleAcknowledgementPacket"}),", ",(0,r.jsx)(n.code,{children:"handleTimeoutPacket"})," of the routing module,\nrespectively."]}),"\n",(0,r.jsxs)(n.p,{children:["The side effects of ",(0,r.jsx)(n.code,{children:"RecvPacket"}),", ",(0,r.jsx)(n.code,{children:"VerifyAcknowledgement"}),",\n",(0,r.jsx)(n.code,{children:"VerifyTimeout"})," will be extracted out into separated functions,\n",(0,r.jsx)(n.code,{children:"WriteAcknowledgement"}),", ",(0,r.jsx)(n.code,{children:"DeleteCommitment"}),", ",(0,r.jsx)(n.code,{children:"DeleteCommitmentTimeout"}),", respectively,\nwhich will be called by the application handlers after the execution."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"WriteAcknowledgement"})," writes the acknowledgement to the state that can be\nverified by the counter-party chain and increments the sequence to prevent\ndouble execution. ",(0,r.jsx)(n.code,{children:"DeleteCommitment"})," will delete the commitment stored,\n",(0,r.jsx)(n.code,{children:"DeleteCommitmentTimeout"})," will delete the commitment and close channel in case\nof ordered channel."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"func (keeper ChannelKeeper) WriteAcknowledgement(ctx Context, packet Packet, ack []byte) {\n  keeper.SetPacketAcknowledgement(ctx, packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence(), ack)\n  keeper.SetNextSequenceRecv(ctx, packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence())\n}\n\nfunc (keeper ChannelKeeper) DeleteCommitment(ctx Context, packet Packet) {\n  keeper.deletePacketCommitment(ctx, packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetSequence())\n}\n\nfunc (keeper ChannelKeeper) DeleteCommitmentTimeout(ctx Context, packet Packet) {\n  k.deletePacketCommitment(ctx, packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetSequence())\n  \n  if channel.Ordering == types.ORDERED [\n    channel.State = types.CLOSED\n    k.SetChannel(ctx, packet.GetSourcePort(), packet.GetSourceChannel(), channel)\n  }\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Each application handler should call respective finalization methods on the ",(0,r.jsx)(n.code,{children:"PortKeeper"}),"\nin order to increase sequence (in case of packet) or remove the commitment\n(in case of acknowledgement and timeout).\nCalling those functions implies that the application logic has successfully executed.\nHowever, the handlers can return ",(0,r.jsx)(n.code,{children:"Result"})," with ",(0,r.jsx)(n.code,{children:"CodeTxBreak"})," after calling those methods\nwhich will persist the state changes that has been already done but prevent any further\nmessages to be executed in case of semantically invalid packet. This will keep the sequence\nincreased in the previous IBC packets(thus preventing double execution) without\nproceeding to the following messages.\nIn any case the application modules should never return state reverting result,\nwhich will make the channel unable to proceed."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"ChannelKeeper.CheckOpen"})," method will be introduced. This will replace ",(0,r.jsx)(n.code,{children:"onChanOpen*"})," defined\nunder the routing module specification. Instead of define each channel handshake callback\nfunctions, application modules can provide ",(0,r.jsx)(n.code,{children:"ChannelChecker"})," function with the ",(0,r.jsx)(n.code,{children:"AppModule"}),"\nwhich will be injected to ",(0,r.jsx)(n.code,{children:"ChannelKeeper.Port()"})," at the top level application.\n",(0,r.jsx)(n.code,{children:"CheckOpen"})," will find the correct ",(0,r.jsx)(n.code,{children:"ChennelChecker"})," using the\n",(0,r.jsx)(n.code,{children:"PortID"})," and call it, which will return an error if it is unacceptable by the application."]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"ProofVerificationDecorator"})," will be inserted to the top level application.\nIt is not safe to make each module responsible to call proof verification\nlogic, whereas application can misbehave(in terms of IBC protocol) by\nmistake."]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"ProofVerificationDecorator"})," should come right after the default sybil attack\nresistant layer from the current ",(0,r.jsx)(n.code,{children:"auth.NewAnteHandler"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"// add IBC ProofVerificationDecorator to the Chain of\nfunc NewAnteHandler(\n  ak keeper.AccountKeeper, supplyKeeper types.SupplyKeeper, ibcKeeper ibc.Keeper,\n  sigGasConsumer SignatureVerificationGasConsumer) sdk.AnteHandler {\n  return sdk.ChainAnteDecorators(\n    NewSetUpContextDecorator(), // outermost AnteDecorator. SetUpContext must be called first\n    ...\n    NewIncrementSequenceDecorator(ak),\n    ibcante.ProofVerificationDecorator(ibcKeeper.ClientKeeper, ibcKeeper.ChannelKeeper), // innermost AnteDecorator\n  )\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The implementation of this ADR will also create a ",(0,r.jsx)(n.code,{children:"Data"})," field of the ",(0,r.jsx)(n.code,{children:"Packet"})," of type ",(0,r.jsx)(n.code,{children:"[]byte"}),", which can be deserialised by the receiving module into its own private type. It is up to the application modules to do this according to their own interpretation, not by the IBC keeper.  This is crucial for dynamic IBC."]}),"\n",(0,r.jsx)(n.p,{children:"Example application-side usage:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:'type AppModule struct {}\n\n// CheckChannel will be provided to the ChannelKeeper as ChannelKeeper.Port(module.CheckChannel)\nfunc (module AppModule) CheckChannel(portID, channelID string, channel Channel) error {\n  if channel.Ordering != UNORDERED {\n    return ErrUncompatibleOrdering()\n  }\n  if channel.CounterpartyPort != "bank" {\n    return ErrUncompatiblePort()\n  }\n  if channel.Version != "" {\n    return ErrUncompatibleVersion()\n  }\n  return nil\n}\n\nfunc NewHandler(k Keeper) Handler {\n  return func(ctx Context, msg Msg) Result {\n    switch msg := msg.(type) {\n    case MsgTransfer:\n      return handleMsgTransfer(ctx, k, msg)\n    case ibc.MsgPacket:\n      var data PacketDataTransfer\n      if err := types.ModuleCodec.UnmarshalBinaryBare(msg.GetData(), &data); err != nil {\n        return err\n      }\n      return handlePacketDataTransfer(ctx, k, msg, data)\n    case ibc.MsgTimeoutPacket:\n      var data PacketDataTransfer\n      if err := types.ModuleCodec.UnmarshalBinaryBare(msg.GetData(), &data); err != nil {\n        return err\n      }\n      return handleTimeoutPacketDataTransfer(ctx, k, packet)\n    // interface { PortID() string; ChannelID() string; Channel() ibc.Channel }\n    // MsgChanInit, MsgChanTry implements ibc.MsgChannelOpen\n    case ibc.MsgChannelOpen: \n      return handleMsgChannelOpen(ctx, k, msg)\n    }\n  }\n}\n\nfunc handleMsgTransfer(ctx Context, k Keeper, msg MsgTransfer) Result {\n  err := k.SendTransfer(ctx,msg.PortID, msg.ChannelID, msg.Amount, msg.Sender, msg.Receiver)\n  if err != nil {\n    return sdk.ResultFromError(err)\n  }\n\n  return sdk.Result{}\n}\n\nfunc handlePacketDataTransfer(ctx Context, k Keeper, packet Packet, data PacketDataTransfer) Result {\n  err := k.ReceiveTransfer(ctx, packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetDestinationPort(), packet.GetDestinationChannel(), data)\n  if err != nil {\n    // TODO: Source chain sent invalid packet, shutdown channel\n  }\n  k.ChannelKeeper.WriteAcknowledgement([]byte{0x00}) // WriteAcknowledgement increases the sequence, preventing double spending\n  return sdk.Result{}\n}\n\nfunc handleCustomTimeoutPacket(ctx Context, k Keeper, packet CustomPacket) Result {\n  err := k.RecoverTransfer(ctx, packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetDestinationPort(), packet.GetDestinationChannel(), data)\n  if err != nil {\n    // This chain sent invalid packet or cannot recover the funds\n    panic(err)\n  }\n  k.ChannelKeeper.DeleteCommitmentTimeout(ctx, packet)\n  // packet timeout should not fail\n  return sdk.Result{}\n}\n\nfunc handleMsgChannelOpen(sdk.Context, k Keeper, msg MsgOpenChannel) Result {\n  k.AllocateEscrowAddress(ctx, msg.ChannelID())\n  return sdk.Result{}\n}\n'})}),"\n",(0,r.jsx)(n.h2,{id:"status",children:"Status"}),"\n",(0,r.jsx)(n.p,{children:"Proposed"}),"\n",(0,r.jsx)(n.h2,{id:"consequences",children:"Consequences"}),"\n",(0,r.jsx)(n.h3,{id:"positive",children:"Positive"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Intuitive interface for developers - IBC handlers do not need to care about IBC authentication"}),"\n",(0,r.jsxs)(n.li,{children:["State change commitment logic is embedded into ",(0,r.jsx)(n.code,{children:"baseapp.runTx"})," logic"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"negative",children:"Negative"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Cannot support dynamic ports, routing is tied to the baseapp router"}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"neutral",children:"Neutral"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Introduces new ",(0,r.jsx)(n.code,{children:"AnteHandler"})," decorator."]}),"\n",(0,r.jsx)(n.li,{children:"Dynamic ports can be supported using hierarchical port identifier, see #5290 for detail"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Relevant comment: ",(0,r.jsx)(n.a,{href:"https://github.com/cosmos/ics/issues/289#issuecomment-544533583",children:"cosmos/ics#289"})]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/cosmos/ibc/tree/master/spec/core/ics-026-routing-module",children:"ICS26 - Routing Module"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>i});var r=t(67294);const c={},a=r.createContext(c);function i(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:i(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);