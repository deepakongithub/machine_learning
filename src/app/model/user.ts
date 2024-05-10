import { Role } from "./role"

export interface User {
    id: number
    username: string
    email: string
    fullName: string
    password: string
    createdAt: string
    modifiedAt: string
    enabled: boolean;
    roles: Role[]
}
