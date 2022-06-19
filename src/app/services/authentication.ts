import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import {map} from 'rxjs/operators';
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

    // expand on this to register new admin users maybe by a screen only visible to pre-existing admins?
    public register(user: User) {
        return this.makeAuthApiCall("register", user);
    }

    public logout(): void {
        this.storage.removeItem('web-token');
    }

    // check to see if user is logged in to allow certain views
    public isLoggedIn(): boolean {
        const token: string = this.getToken();
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > (Date.now() / 1000);
        } else {
            return false;
        }
    }


    public login(user: User) {
        return this.makeAuthApiCall("login", user).pipe(map((authResp: AuthResponse) => this.saveToken(authResp.token)));
    }

    private makeAuthApiCall(urlPath: string, user: User) {
        const url: string = `${this.apiBaseUrl}/${urlPath}`;
        return this.http
            .post<AuthResponse>(url, user)
            .pipe(map((response) => response as AuthResponse));
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