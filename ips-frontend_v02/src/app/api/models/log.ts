/* tslint:disable */
export interface Log {
  id?: number;
  planId?: string;

  /**
   * Plan id
   */
  planDbId?: number;

  /**
   * Object coordinate x on plan
   */
  coordinateX?: number;

  /**
   * Object coordinate y on plan
   */
  coordinateY?: number;

  /**
   * Date and time, when object coordinates was registered
   */
  regDateTime?: string;

  /**
   * Tracking object indentf. code
   */
  objectId?: string;

  /**
   * Object name
   */
  objectName?: string;

  /**
   * Tracking object type
   */
  objectType?: string;

  /**
   * Object access level
   */
  objectAccessLevel?: string;
}
