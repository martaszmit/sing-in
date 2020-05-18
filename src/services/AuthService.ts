export class AuthService {

    static isLoggedIn() {
        return !!localStorage.getItem('user');
    }
}
