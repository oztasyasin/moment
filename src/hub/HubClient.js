import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getCommonState } from '../store/_redux/common/service';
const url = getCommonState().url + "/friendRequestHub";

export const HubConnection = () => {
    const connection = new HubConnectionBuilder()
        .withUrl(url)
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
