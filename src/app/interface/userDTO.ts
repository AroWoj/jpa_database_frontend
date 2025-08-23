export interface UserDTO {
    id: number;
    name: string;
    age: number;
    email: string;
    addresses: Array<{
        street: string,
        city: string,
        zipcode: string
    }>
}
