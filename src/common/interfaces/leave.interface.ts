import { Path, UserRole } from "../enums";

export interface ILeaves{
  id: number;
  role: UserRole;
  path: Path;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canRead: boolean;
  canReadOwn: boolean;
}