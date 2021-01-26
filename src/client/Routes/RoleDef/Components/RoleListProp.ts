import { IRoleDef } from '../../../Types/Domain/Role';

export interface RoleListProp {
  roleDefs: IRoleDef[];
  theme?: any;
  searchByNameAndDescription(searchText:any):any;
  handleCheckBox(value:any):any;
}
