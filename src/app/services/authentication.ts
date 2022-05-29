import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthResponse } from '../models/authresponse';
import { ProductDataService } from '../services/product-data.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    constructor(
        private http: HttpClient,
        @Inject(BROWSER_STORAGE) private storage: Storage,
        private productDataService: ProductDataService
    ) { }

    private apiBaseUrl = 'https://localhost:44345/api/Account';
    public getToken(): string {
        return this.storage.getItem('web-token') as string;
    }

    public saveToken(token: string): void {
        this.storage.setItem('web-token', token);
    }

    public register(user: User): Promise<AuthResponse> {
        return this.makeAuthApiCall("register", user);
    }

    public logout(): void {
        this.storage.removeItem('web-token');
    }

    public isLoggedIn(): boolean {
        const token: string = this.getToken();
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > (Date.now() / 1000);
        } else {
            return false;
        }
    }


    public login(user: User): Promise<any> {
        return this.makeAuthApiCall("login", user).then((authResp: AuthResponse) => this.saveToken(authResp.token));
    }

    private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
        const url: string = `${this.apiBaseUrl}/${urlPath}`;
        return this.http
            .post(url, user)
            .toPromise()
            .then((response) => response as AuthResponse)
            .catch(this.handleError);
    }
    
    public getCurrentUser(): User {
        try {
            if (this.isLoggedIn()) {
                const token: string = this.getToken();
                const { email, name } = JSON.parse(atob(token.split('.')[1]));
                return { email, name } as User;
            } else {
                throw new Error("WRONG");
            }
            
        } catch(err) {
            throw(err);
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('Something has gone wrong', error);
        return Promise.reject(error.message || error);
      }
}