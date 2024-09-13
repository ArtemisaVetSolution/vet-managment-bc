export interface IHttpAdapter {
    post<T>(url: string, data: any, config?: any): Promise<T>;
    get<T>(url: string, config?: any): Promise<T>;
    put<T>(url: string, data: any, config?: any): Promise<T>;
    delete<T>(url: string, config?: any): Promise<T>;
    patch<T>(url: string, data: any, config?: any): Promise<T>;

 
}