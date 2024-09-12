import axios, { AxiosRequestConfig } from 'axios';
import { IHttpAdapter } from '../interfaces';



export class AxiosHttpAdapter implements IHttpAdapter {
  async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.post<T>(url, data, config);
    return response.data;
  }
  
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.get<T>(url, config);
    return response.data;
  }

  async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.delete<T>(url, config);
    return response.data;
  }

  async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.patch<T>(url, data, config);
    return response.data;
  }

}