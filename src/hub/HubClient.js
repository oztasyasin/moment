import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getCommonState } from '../store/_redux/common/service';

export const HubConnection = () => {
    const url = getCommonState().url + "/friendRequestHub";
    const connection = new HubConnectionBuilder()
        .withUrl(getCommonState().url + "/friendRequestHub")
        .configureLogging(LogLevel.Information)
        .build();

    connection.start()
        .then(() => {
            console.log("SignalR bağlantısı başarılı bir şekilde kuruldu.");
        })
        .catch((error) => {
            console.log("SignalR bağlantısında hata oluştu: ", error);
        });
    return connection;
}
