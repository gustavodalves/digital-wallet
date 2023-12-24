import axios, { AxiosInstance } from "axios"
import HttpClient from "./http-client"

export default class AxiosAdapter implements HttpClient {
    axios: AxiosInstance = axios

    async delete<T>(url: string): Promise<T> {
        const { data } = await this.axios.delete<T>(url)

        return data
    }

    async get<T = any>(url: string): Promise<T> {
        const { data } = await this.axios.get<T>(url)

        return data
    }

    async post<T = any>(url: string, body: any): Promise<T> {
        const { data } = await this.axios.post<T>(url, body)

        return data
    }

    async put<T>(url: string, body: any): Promise<T> {
        const { data } = await this.axios.put<T>(url, body)

        return data
    }
}
