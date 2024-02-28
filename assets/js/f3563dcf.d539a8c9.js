"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[13845],{75267:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var a=t(85893),o=t(11151);const i={title:"IBC Applications",sidebar_label:"IBC Applications",sidebar_position:1,slug:"/ibc/apps/apps"},s="IBC Applications",c={id:"ibc/apps/apps",title:"IBC Applications",description:"Learn how to configure your application to use IBC and send data packets to other chains.",source:"@site/docs/01-ibc/03-apps/01-apps.md",sourceDirName:"01-ibc/03-apps",slug:"/ibc/apps/apps",permalink:"/main/ibc/apps/apps",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"IBC Applications",sidebar_label:"IBC Applications",sidebar_position:1,slug:"/ibc/apps/apps"},sidebar:"defaultSidebar",previous:{title:"Integration",permalink:"/main/ibc/integration"},next:{title:"Implement IBCModule interface and callbacks",permalink:"/main/ibc/apps/ibcmodule"}},r={},l=[{value:"Pre-requisites Readings",id:"pre-requisites-readings",level:2},{value:"Create a custom IBC application module",id:"create-a-custom-ibc-application-module",level:2},{value:"Implement <code>IBCModule</code> Interface and callbacks",id:"implement-ibcmodule-interface-and-callbacks",level:3},{value:"Channel Handshake Version Negotiation",id:"channel-handshake-version-negotiation",level:4},{value:"Bind Ports",id:"bind-ports",level:3},{value:"Custom Packets",id:"custom-packets",level:3},{value:"Packet Flow Handling",id:"packet-flow-handling",level:4},{value:"Sending Packets",id:"sending-packets",level:5},{value:"Receiving Packets",id:"receiving-packets",level:5},{value:"Acknowledgements",id:"acknowledgements",level:3},{value:"Acknowledging Packets",id:"acknowledging-packets",level:4},{value:"Timeout Packets",id:"timeout-packets",level:4},{value:"Routing",id:"routing",level:3},{value:"Working Example",id:"working-example",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"ibc-applications",children:"IBC Applications"}),"\n",(0,a.jsx)(n.p,{children:"Learn how to configure your application to use IBC and send data packets to other chains."}),"\n",(0,a.jsx)(n.p,{children:"This document serves as a guide for developers who want to write their own Inter-blockchain\nCommunication Protocol (IBC) applications for custom use cases."}),"\n",(0,a.jsxs)(n.p,{children:["Due to the modular design of the IBC protocol, IBC\napplication developers do not need to concern themselves with the low-level details of clients,\nconnections, and proof verification. Nevertheless a brief explanation of the lower levels of the\nstack is given so that application developers may have a high-level understanding of the IBC\nprotocol. Then the document goes into detail on the abstraction layer most relevant for application\ndevelopers (channels and ports), and describes how to define your own custom packets, and\n",(0,a.jsx)(n.code,{children:"IBCModule"})," callbacks."]}),"\n",(0,a.jsxs)(n.p,{children:["To have your module interact over IBC you must: bind to a port(s), define your own packet data and acknowledgement structs as well as how to encode/decode them, and implement the\n",(0,a.jsx)(n.code,{children:"IBCModule"})," interface. Below is a more detailed explanation of how to write an IBC application\nmodule correctly."]}),"\n",(0,a.jsxs)(n.admonition,{type:"note",children:[(0,a.jsx)(n.h2,{id:"pre-requisites-readings",children:"Pre-requisites Readings"}),(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"/main/ibc/overview",children:"IBC Overview"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"/main/ibc/integration",children:"IBC default integration"})}),"\n"]})]}),"\n",(0,a.jsx)(n.h2,{id:"create-a-custom-ibc-application-module",children:"Create a custom IBC application module"}),"\n",(0,a.jsxs)(n.h3,{id:"implement-ibcmodule-interface-and-callbacks",children:["Implement ",(0,a.jsx)(n.code,{children:"IBCModule"})," Interface and callbacks"]}),"\n",(0,a.jsxs)(n.p,{children:["The Cosmos SDK expects all IBC modules to implement the ",(0,a.jsxs)(n.a,{href:"https://github.com/cosmos/ibc-go/tree/main/modules/core/05-port/types/module.go",children:[(0,a.jsx)(n.code,{children:"IBCModule"}),"\ninterface"]}),". This\ninterface contains all of the callbacks IBC expects modules to implement. This section will describe\nthe callbacks that are called during channel handshake execution."]}),"\n",(0,a.jsx)(n.p,{children:"Here are the channel handshake callbacks that modules are expected to implement:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// Called by IBC Handler on MsgOpenInit\nfunc (k Keeper) OnChanOpenInit(ctx sdk.Context,\n  order channeltypes.Order,\n  connectionHops []string,\n  portID string,\n  channelID string,\n  channelCap *capabilitytypes.Capability,\n  counterparty channeltypes.Counterparty,\n  version string,\n) error {\n  // OpenInit must claim the channelCapability that IBC passes into the callback\n  if err := k.ClaimCapability(ctx, chanCap, host.ChannelCapabilityPath(portID, channelID)); err != nil {\n    return err\n }\n\n  // ... do custom initialization logic\n\n  // Use above arguments to determine if we want to abort handshake\n  // Examples: Abort if order == UNORDERED,\n  // Abort if version is unsupported\n  err := checkArguments(args)\n  return err\n}\n\n// Called by IBC Handler on MsgOpenTry\nOnChanOpenTry(\n  ctx sdk.Context,\n  order channeltypes.Order,\n  connectionHops []string,\n  portID,\n  channelID string,\n  channelCap *capabilitytypes.Capability,\n  counterparty channeltypes.Counterparty,\n  counterpartyVersion string,\n) (string, error) {\n  // OpenTry must claim the channelCapability that IBC passes into the callback\n  if err := k.scopedKeeper.ClaimCapability(ctx, chanCap, host.ChannelCapabilityPath(portID, channelID)); err != nil {\n    return err\n  }\n  \n  // ... do custom initialization logic\n\n  // Use above arguments to determine if we want to abort handshake\n  if err := checkArguments(args); err != nil {\n    return err\n  }\n\n  // Construct application version \n  // IBC applications must return the appropriate application version\n  // This can be a simple string or it can be a complex version constructed\n  // from the counterpartyVersion and other arguments. \n  // The version returned will be the channel version used for both channel ends. \n  appVersion := negotiateAppVersion(counterpartyVersion, args)\n  \n  return appVersion, nil\n}\n\n// Called by IBC Handler on MsgOpenAck\nOnChanOpenAck(\n  ctx sdk.Context,\n  portID,\n  channelID string,\n  counterpartyVersion string,\n) error {\n  // ... do custom initialization logic\n\n  // Use above arguments to determine if we want to abort handshake\n  err := checkArguments(args)\n  return err\n}\n\n// Called by IBC Handler on MsgOpenConfirm\nOnChanOpenConfirm(\n  ctx sdk.Context,\n  portID,\n  channelID string,\n) error {\n  // ... do custom initialization logic\n\n  // Use above arguments to determine if we want to abort handshake\n  err := checkArguments(args)\n  return err\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["The channel closing handshake will also invoke module callbacks that can return errors to abort the\nclosing handshake. Closing a channel is a 2-step handshake, the initiating chain calls\n",(0,a.jsx)(n.code,{children:"ChanCloseInit"})," and the finalizing chain calls ",(0,a.jsx)(n.code,{children:"ChanCloseConfirm"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// Called by IBC Handler on MsgCloseInit\nOnChanCloseInit(\n  ctx sdk.Context,\n  portID,\n  channelID string,\n) error {\n  // ... do custom finalization logic\n\n  // Use above arguments to determine if we want to abort handshake\n  err := checkArguments(args)\n  return err\n}\n\n// Called by IBC Handler on MsgCloseConfirm\nOnChanCloseConfirm(\n  ctx sdk.Context,\n  portID,\n  channelID string,\n) error {\n  // ... do custom finalization logic\n\n  // Use above arguments to determine if we want to abort handshake\n  err := checkArguments(args)\n  return err\n}\n"})}),"\n",(0,a.jsx)(n.h4,{id:"channel-handshake-version-negotiation",children:"Channel Handshake Version Negotiation"}),"\n",(0,a.jsx)(n.p,{children:"Application modules are expected to verify versioning used during the channel handshake procedure."}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"ChanOpenInit"})," callback should verify that the ",(0,a.jsx)(n.code,{children:"MsgChanOpenInit.Version"})," is valid"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"ChanOpenTry"})," callback should construct the application version used for both channel ends. If no application version can be constructed, it must return an error."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"ChanOpenAck"})," callback should verify that the ",(0,a.jsx)(n.code,{children:"MsgChanOpenAck.CounterpartyVersion"})," is valid and supported."]}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["IBC expects application modules to perform application version negotiation in ",(0,a.jsx)(n.code,{children:"OnChanOpenTry"}),". The negotiated version\nmust be returned to core IBC. If the version cannot be negotiated, an error should be returned."]}),"\n",(0,a.jsxs)(n.p,{children:["Versions must be strings but can implement any versioning structure. If your application plans to\nhave linear releases then semantic versioning is recommended. If your application plans to release\nvarious features in between major releases then it is advised to use the same versioning scheme\nas IBC. This versioning scheme specifies a version identifier and compatible feature set with\nthat identifier. Valid version selection includes selecting a compatible version identifier with\na subset of features supported by your application for that version. The struct is used for this\nscheme can be found in ",(0,a.jsx)(n.code,{children:"03-connection/types"}),"."]}),"\n",(0,a.jsx)(n.p,{children:"Since the version type is a string, applications have the ability to do simple version verification\nvia string matching or they can use the already implemented versioning system and pass the proto\nencoded version into each handhshake call as necessary."}),"\n",(0,a.jsx)(n.p,{children:"ICS20 currently implements basic string matching with a single supported version."}),"\n",(0,a.jsx)(n.h3,{id:"bind-ports",children:"Bind Ports"}),"\n",(0,a.jsxs)(n.p,{children:["Currently, ports must be bound on app initialization. A module may bind to ports in ",(0,a.jsx)(n.code,{children:"InitGenesis"}),"\nlike so:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"func InitGenesis(ctx sdk.Context, keeper keeper.Keeper, state types.GenesisState) {\n  // ... other initialization logic\n\n  // Only try to bind to port if it is not already bound, since we may already own\n  // port capability from capability InitGenesis\n  if !hasCapability(ctx, state.PortID) {\n    // module binds to desired ports on InitChain\n    // and claims returned capabilities\n    cap1 := keeper.IBCPortKeeper.BindPort(ctx, port1)\n    cap2 := keeper.IBCPortKeeper.BindPort(ctx, port2)\n    cap3 := keeper.IBCPortKeeper.BindPort(ctx, port3)\n\n    // NOTE: The module's scoped capability keeper must be private\n    keeper.scopedKeeper.ClaimCapability(cap1)\n    keeper.scopedKeeper.ClaimCapability(cap2)\n    keeper.scopedKeeper.ClaimCapability(cap3)\n  }\n\n  // ... more initialization logic\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"custom-packets",children:"Custom Packets"}),"\n",(0,a.jsxs)(n.p,{children:["Modules connected by a channel must agree on what application data they are sending over the\nchannel, as well as how they will encode/decode it. This process is not specified by IBC as it is up\nto each application module to determine how to implement this agreement. However, for most\napplications this will happen as a version negotiation during the channel handshake. While more\ncomplex version negotiation is possible to implement inside the channel opening handshake, a very\nsimple version negotiation is implemented in the ",(0,a.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/tree/main/modules/apps/transfer/module.go",children:"ibc-transfer module"}),"."]}),"\n",(0,a.jsxs)(n.p,{children:["Thus, a module must define its custom packet data structure, along with a well-defined way to\nencode and decode it to and from ",(0,a.jsx)(n.code,{children:"[]byte"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// Custom packet data defined in application module\ntype CustomPacketData struct {\n  // Custom fields ...\n}\n\nEncodePacketData(packetData CustomPacketData) []byte {\n  // encode packetData to bytes\n}\n\nDecodePacketData(encoded []byte) (CustomPacketData) {\n  // decode from bytes to packet data\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"Then a module must encode its packet data before sending it through IBC."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// retrieve the dynamic capability for this channel\nchannelCap := scopedKeeper.GetCapability(ctx, channelCapName)\n// Sending custom application packet data\ndata := EncodePacketData(customPacketData)\npacket.Data = data\n// Send packet to IBC, authenticating with channelCap\nsequence, err := IBCChannelKeeper.SendPacket(\n  ctx, \n  channelCap, \n  sourcePort, \n  sourceChannel, \n  timeoutHeight, \n  timeoutTimestamp, \n  data,\n)\n"})}),"\n",(0,a.jsxs)(n.p,{children:["A module receiving a packet must decode the ",(0,a.jsx)(n.code,{children:"PacketData"})," into a structure it expects so that it can\nact on it."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// Receiving custom application packet data (in OnRecvPacket)\npacketData := DecodePacketData(packet.Data)\n// handle received custom packet data\n"})}),"\n",(0,a.jsx)(n.h4,{id:"packet-flow-handling",children:"Packet Flow Handling"}),"\n",(0,a.jsx)(n.p,{children:"Just as IBC expected modules to implement callbacks for channel handshakes, IBC also expects modules\nto implement callbacks for handling the packet flow through a channel."}),"\n",(0,a.jsx)(n.p,{children:"Once a module A and module B are connected to each other, relayers can start relaying packets and\nacknowledgements back and forth on the channel."}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{src:"https://media.githubusercontent.com/media/cosmos/ibc/old/spec/ics-004-channel-and-packet-semantics/channel-state-machine.png",alt:"IBC packet flow diagram"})}),"\n",(0,a.jsx)(n.p,{children:"Briefly, a successful packet flow works as follows:"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"module A sends a packet through the IBC module"}),"\n",(0,a.jsx)(n.li,{children:"the packet is received by module B"}),"\n",(0,a.jsx)(n.li,{children:"if module B writes an acknowledgement of the packet then module A will process the\nacknowledgement"}),"\n",(0,a.jsx)(n.li,{children:"if the packet is not successfully received before the timeout, then module A processes the\npacket's timeout."}),"\n"]}),"\n",(0,a.jsx)(n.h5,{id:"sending-packets",children:"Sending Packets"}),"\n",(0,a.jsxs)(n.p,{children:["Modules do not send packets through callbacks, since the modules initiate the action of sending\npackets to the IBC module, as opposed to other parts of the packet flow where msgs sent to the IBC\nmodule must trigger execution on the port-bound module through the use of callbacks. Thus, to send a\npacket a module simply needs to call ",(0,a.jsx)(n.code,{children:"SendPacket"})," on the ",(0,a.jsx)(n.code,{children:"IBCChannelKeeper"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// retrieve the dynamic capability for this channel\nchannelCap := scopedKeeper.GetCapability(ctx, channelCapName)\n// Sending custom application packet data\ndata := EncodePacketData(customPacketData)\n// Send packet to IBC, authenticating with channelCap\nsequence, err := IBCChannelKeeper.SendPacket(\n  ctx, \n  channelCap, \n  sourcePort, \n  sourceChannel, \n  timeoutHeight, \n  timeoutTimestamp, \n  data,\n)\n"})}),"\n",(0,a.jsx)(n.p,{children:"::: warning\nIn order to prevent modules from sending packets on channels they do not own, IBC expects\nmodules to pass in the correct channel capability for the packet's source channel.\n:::"}),"\n",(0,a.jsx)(n.h5,{id:"receiving-packets",children:"Receiving Packets"}),"\n",(0,a.jsxs)(n.p,{children:["To handle receiving packets, the module must implement the ",(0,a.jsx)(n.code,{children:"OnRecvPacket"})," callback. This gets\ninvoked by the IBC module after the packet has been proved valid and correctly processed by the IBC\nkeepers. Thus, the ",(0,a.jsx)(n.code,{children:"OnRecvPacket"})," callback only needs to worry about making the appropriate state\nchanges given the packet data without worrying about whether the packet is valid or not."]}),"\n",(0,a.jsx)(n.p,{children:"Modules may return to the IBC handler an acknowledgement which implements the Acknowledgement interface.\nThe IBC handler will then commit this acknowledgement of the packet so that a relayer may relay the\nacknowledgement back to the sender module."}),"\n",(0,a.jsx)(n.p,{children:"The state changes that occurred during this callback will only be written if:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["the acknowledgement was successful as indicated by the ",(0,a.jsx)(n.code,{children:"Success()"})," function of the acknowledgement"]}),"\n",(0,a.jsx)(n.li,{children:"if the acknowledgement returned is nil indicating that an asynchronous process is occurring"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["NOTE: Applications which process asynchronous acknowledgements must handle reverting state changes\nwhen appropriate. Any state changes that occurred during the ",(0,a.jsx)(n.code,{children:"OnRecvPacket"})," callback will be written\nfor asynchronous acknowledgements."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"OnRecvPacket(\n  ctx sdk.Context,\n  packet channeltypes.Packet,\n) ibcexported.Acknowledgement {\n  // Decode the packet data\n  packetData := DecodePacketData(packet.Data)\n\n  // do application state changes based on packet data and return the acknowledgement\n  // NOTE: The acknowledgement will indicate to the IBC handler if the application \n  // state changes should be written via the `Success()` function. Application state\n  // changes are only written if the acknowledgement is successful or the acknowledgement\n  // returned is nil indicating that an asynchronous acknowledgement will occur.\n  ack := processPacket(ctx, packet, packetData)\n\n  return ack\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"The Acknowledgement interface:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// Acknowledgement defines the interface used to return\n// acknowledgements in the OnRecvPacket callback.\ntype Acknowledgement interface {\n  Success() bool\n  Acknowledgement() []byte\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"acknowledgements",children:"Acknowledgements"}),"\n",(0,a.jsx)(n.p,{children:"Modules may commit an acknowledgement upon receiving and processing a packet in the case of synchronous packet processing.\nIn the case where a packet is processed at some later point after the packet has been received (asynchronous execution), the acknowledgement\nwill be written once the packet has been processed by the application which may be well after the packet receipt."}),"\n",(0,a.jsx)(n.p,{children:"NOTE: Most blockchain modules will want to use the synchronous execution model in which the module processes and writes the acknowledgement\nfor a packet as soon as it has been received from the IBC module."}),"\n",(0,a.jsx)(n.p,{children:"This acknowledgement can then be relayed back to the original sender chain, which can take action\ndepending on the contents of the acknowledgement."}),"\n",(0,a.jsx)(n.p,{children:"Just as packet data was opaque to IBC, acknowledgements are similarly opaque. Modules must pass and\nreceive acknowledegments with the IBC modules as byte strings."}),"\n",(0,a.jsxs)(n.p,{children:["Thus, modules must agree on how to encode/decode acknowledgements. The process of creating an\nacknowledgement struct along with encoding and decoding it, is very similar to the packet data\nexample above. ",(0,a.jsx)(n.a,{href:"https://github.com/cosmos/ibc/blob/master/spec/core/ics-004-channel-and-packet-semantics#acknowledgement-envelope",children:"ICS 04"}),"\nspecifies a recommended format for acknowledgements. This acknowledgement type can be imported from\n",(0,a.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/tree/main/modules/core/04-channel/types",children:"channel types"}),"."]}),"\n",(0,a.jsxs)(n.p,{children:["While modules may choose arbitrary acknowledgement structs, a default acknowledgement types is provided by IBC ",(0,a.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/main/proto/ibc/core/channel/v1/channel.proto",children:"here"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-proto",children:"// Acknowledgement is the recommended acknowledgement format to be used by\n// app-specific protocols.\n// NOTE: The field numbers 21 and 22 were explicitly chosen to avoid accidental\n// conflicts with other protobuf message formats used for acknowledgements.\n// The first byte of any message with this format will be the non-ASCII values\n// `0xaa` (result) or `0xb2` (error). Implemented as defined by ICS:\n// https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#acknowledgement-envelope\nmessage Acknowledgement {\n  // response contains either a result or an error and must be non-empty\n  oneof response {\n    bytes  result = 21;\n    string error  = 22;\n  }\n}\n"})}),"\n",(0,a.jsx)(n.h4,{id:"acknowledging-packets",children:"Acknowledging Packets"}),"\n",(0,a.jsxs)(n.p,{children:["After a module writes an acknowledgement, a relayer can relay back the acknowledgement to the sender module. The sender module can\nthen process the acknowledgement using the ",(0,a.jsx)(n.code,{children:"OnAcknowledgementPacket"})," callback. The contents of the\nacknowledgement is entirely up to the modules on the channel (just like the packet data); however, it\nmay often contain information on whether the packet was successfully processed along\nwith some additional data that could be useful for remediation if the packet processing failed."]}),"\n",(0,a.jsxs)(n.p,{children:["Since the modules are responsible for agreeing on an encoding/decoding standard for packet data and\nacknowledgements, IBC will pass in the acknowledgements as ",(0,a.jsx)(n.code,{children:"[]byte"})," to this callback. The callback\nis responsible for decoding the acknowledgement and processing it."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"OnAcknowledgementPacket(\n  ctx sdk.Context,\n  packet channeltypes.Packet,\n  acknowledgement []byte,\n) (*sdk.Result, error) {\n  // Decode acknowledgement\n  ack := DecodeAcknowledgement(acknowledgement)\n\n  // process ack\n  res, err := processAck(ack)\n  return res, err\n}\n"})}),"\n",(0,a.jsx)(n.h4,{id:"timeout-packets",children:"Timeout Packets"}),"\n",(0,a.jsxs)(n.p,{children:["If the timeout for a packet is reached before the packet is successfully received or the\ncounterparty channel end is closed before the packet is successfully received, then the receiving\nchain can no longer process it. Thus, the sending chain must process the timeout using\n",(0,a.jsx)(n.code,{children:"OnTimeoutPacket"})," to handle this situation. Again the IBC module will verify that the timeout is\nindeed valid, so our module only needs to implement the state machine logic for what to do once a\ntimeout is reached and the packet can no longer be received."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"OnTimeoutPacket(\n  ctx sdk.Context,\n  packet channeltypes.Packet,\n) (*sdk.Result, error) {\n  // do custom timeout logic\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"routing",children:"Routing"}),"\n",(0,a.jsxs)(n.p,{children:["As mentioned above, modules must implement the IBC module interface (which contains both channel\nhandshake callbacks and packet handling callbacks). The concrete implementation of this interface\nmust be registered with the module name as a route on the IBC ",(0,a.jsx)(n.code,{children:"Router"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// app.go\nfunc NewApp(...args) *App {\n// ...\n\n// Create static IBC router, add module routes, then set and seal it\nibcRouter := port.NewRouter()\n\nibcRouter.AddRoute(ibctransfertypes.ModuleName, transferModule)\n// Note: moduleCallbacks must implement IBCModule interface\nibcRouter.AddRoute(moduleName, moduleCallbacks)\n\n// Setting Router will finalize all routes by sealing router\n// No more routes can be added\napp.IBCKeeper.SetRouter(ibcRouter)\n"})}),"\n",(0,a.jsx)(n.h2,{id:"working-example",children:"Working Example"}),"\n",(0,a.jsxs)(n.p,{children:["For a real working example of an IBC application, you can look through the ",(0,a.jsx)(n.code,{children:"ibc-transfer"})," module\nwhich implements everything discussed above."]}),"\n",(0,a.jsx)(n.p,{children:"Here are the useful parts of the module to look at:"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/main/modules/apps/transfer/keeper/genesis.go",children:"Binding to transfer\nport"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/main/modules/apps/transfer/keeper/relay.go",children:"Sending transfer\npackets"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/main/modules/apps/transfer/ibc_module.go",children:"Implementing IBC\ncallbacks"})})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>s});var a=t(67294);const o={},i=a.createContext(o);function s(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);