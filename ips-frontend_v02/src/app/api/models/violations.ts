/* tslint:disable */
export interface Violations {
  id?: number;

  /**
   * Object identification code
   */
  objectCode?: string;

  /**
   * What kinf of object
   */
  objectType?: string;
  objectName?: string;

  /**
   * Which access level has object
   */
  objectAccessLevel?: string;
  ViolationDateTime?: string;
  RestrictedArea?: string;
  PlanName?: string;
}
