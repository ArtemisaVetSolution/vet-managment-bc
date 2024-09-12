import { UserRole } from "../enums";
import { ILeaves } from "./leave.interface";

export interface JwtPayload {
    id: string;
    email: string;
    permisions: ILeaves[];
    role: UserRole

}