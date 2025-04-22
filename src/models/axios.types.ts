interface ErrorData {
  messageCode: string;
  [key: string]: string;
}

interface AxiosResponseData {
  message: string;
  data: ErrorData;
}

export default AxiosResponseData;
