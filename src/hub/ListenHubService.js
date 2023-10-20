import { DeviceEventEmitter } from "react-native";
import { HubConnection } from "./HubClient";
export const ListenHub = () => {
    const webSocket = HubConnection();
    webSocket.on("ReceieveFriendRequest", (msg) => {
        var data = JSON.stringify(msg);
        console.error(data);
        DeviceEventEmitter.emit("notifications", data)
    });
}