export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    status: {
        code: number;
        description: string;
    };
    data: {
        token: string;
    };
}

