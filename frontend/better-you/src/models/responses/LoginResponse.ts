export default interface LoginResponse {
    token: string;
    profilePicture?: string;
    errorMessage?: string;
}