import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const ACCESS_TOKEN = 'access-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    constructor() {}

    signOut(): void {
        window.sessionStorage.clear();
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);

        const user = this.getUser();
        if (user.id) {
            this.saveUser({ ...user, accessToken: token });
        }
    }

    public saveGlobalAccessToken(accessToken: string): void {
        window.sessionStorage.removeItem(ACCESS_TOKEN);
        window.sessionStorage.setItem(ACCESS_TOKEN, accessToken);
    }

    public getGlobalAccessToken(): string | null {
        return window.sessionStorage.getItem(ACCESS_TOKEN);
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public saveRefreshToken(token: string): void {
        window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
        window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
    }

    public getRefreshToken(): string | null {
        return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return {};
    }
}
