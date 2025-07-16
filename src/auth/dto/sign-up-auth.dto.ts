export class SignUpDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive?: boolean; // Optional field, defaults to true in User entity
}
 