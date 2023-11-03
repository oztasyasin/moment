import { DeviceEventEmitter } from "react-native";
import { HubConnection } from "./HubClient";
import store from "../store/Store";
export const ListenHub = () => {
    const webSocket = HubConnection();
    webSocket.on("ReceiveFriendRequest", (msg) => {
        var data = JSON.stringify(msg);
        data = data.replace(`"`,'');
        data = data.replace(`"`,'');
        if (data.toString() == store.getState()?.auth?.user?.id.toString()) {
            DeviceEventEmitter.emit("notifications", true)
        }
    });
}