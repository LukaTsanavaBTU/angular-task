export interface User {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    image: string,
    [others: string]: unknown
}