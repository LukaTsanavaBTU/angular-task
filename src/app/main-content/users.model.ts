export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    image: string,
    [others: string]: unknown
}