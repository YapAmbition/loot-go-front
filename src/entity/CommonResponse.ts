// 后端响应
export interface CommonResponse {
    code: number,
    type: string,
    errMsg: string,
    data: any
}