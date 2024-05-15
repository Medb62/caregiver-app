import Toast from "react-native-root-toast";

export function ToastComponent(message: string, severity: string) {

const toastColor = severity === 'success' ? '#36AE7C' : '#EB5353';


    const toast = Toast.show(message, {
        duration: Toast.durations.SHORT,
        backgroundColor: toastColor,
        position: 30,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
    return toast;
}