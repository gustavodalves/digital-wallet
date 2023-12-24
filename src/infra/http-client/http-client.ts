export default interface HttpClient {
	get<T = any>(url: string): Promise<T>;
	post<T = any>(url: string, body: any): Promise<T>;
	put<T>(url: string, body: any): Promise<T>;
	delete<T>(url: string): Promise<T>;
}
