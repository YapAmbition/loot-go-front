import {notification} from 'antd';

export const openNotification = (title: string, description: string) => {
    notification.info({
        message: `${title}`,
        description: `${description}`,
        placement: "topRight"
    });
}

export const openWarning = (title: string, description: string) => {
    notification.warning({
        message: `${title}`,
        description: `${description}`,
        placement: "topRight"
    });
}

export const openError = (title: string, description: string) => {
    notification.error({
        message: `${title}`,
        description: `${description}`,
        placement: "topRight"
    });
}

export const openSuccess = (title: string, description: string) => {
    notification.success({
        message: `${title}`,
        description: `${description}`,
        placement: "topRight"
    });
}