# Chirr

_Chirr_ is a chat based collaboration tool. The functionality of the chat interface should be considered to be positioned somewhere between IRC and Slack.

Like the cricket´s chirr; a fleeting moment https://www.youtube.com/watch?v=84ktHqOxTLY

See the [Functional & Technical specification](https://github.com/CoEValencia/chirr/wiki/functional_technical_specification)

![Chirr](https://github.com/CoEValencia/chirr/wiki/images/flyer-A4.jpg)


Note that complex types are defined as Tagged Unions for documentation´s sake https://en.wikipedia.org/wiki/Tagged_union but this does not necessarily imply that it absolutely described the required data type
"Either" should represent mutually exclusive ("either" means "one or the other") Success and Failure "options"

### Services (web socket)

Note that the use of web socket implies a message driven protocol rather than a "procedure based" protocol. So "IN" represents "incoming messages" and "OUT" represents "outgoing messages", respectively.

`connect(token) - OUT - connect with server sending token obtained with ReST login`

`disconnect() - OUT - explicit termination of connection. Equivalent to logout`

`send(flowId, text) - OUT - sending chat text to flow `

`error - IN -  error event`

`updateFlow - IN - (flowid, List (item) - reception of new items for a particular flow`

`updateFlowList - IN - (streamId, List (item)  - reception of updates to flow list`


#### Services (ReST)

`login(userid, password) -> Either (Error, token)`

`register(username, registerData) -> Either (Error, OK)`

`getStreams() -> List (stream)  `

`searchStreams(searchTerm) -> List (result)`

`selectStream(streamId) -> Either (Error , (stream , List (items)))  - get stream information with items from [default] flow OR Error`

`getFlows(streamId) -> Either (Error, List (flow)) `

`selectFlow(flowId) -> Either (Error,  (flow , List (item))) - get flow information with items or Error`

`send(flowId , text) -> Either (Error, OK) -  sending chat text to flow`

`sendFile(flowId , file binary) -> Either (Error, OK)  - Not ReST. Represents HTTP  multipart/form-data POST`

`updateTopicFrom(flowId , lastItemid) -> List (item)`

`createStream(name) -> Either (Error, OK)`

`deleteStream(streamId) -> Either (Error, OK)`

`renameStream(streamId, newname) -> Either (Error, OK)`

`createFlow(streamId , name) -> Either (Error, OK)`

`renameFlowc(flowId, newnname) -> Either (Error, OK)`
