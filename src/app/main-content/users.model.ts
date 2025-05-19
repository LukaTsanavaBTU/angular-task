export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    image: string,
    phone: string,
    gender: string,
    [others: string]: unknown
}