import { Roles } from "src/entities/user.entity";

export type IUser = {id: number, name: string, email: string, password: string, role: Roles};
