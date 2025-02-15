/* tslint:disable */
export interface DeviceData {

  /**
   * 1 Beacon name, from which signal was received
   */
  TransmitterId1?: string;

  /**
   * Tracking object 1 indentif. code
   */
  objectId1?: string;

  /**
   * Tracking object 3 indentif. code
   */
  objectId3?: string;

  /**
   * Received signal strength 1
   */
  signal1?: number;

  /**
   * Received signal strength 2
   */
  signal2?: number;

  /**
   * Received signal strength 3
   */
  signal3?: number;

  /**
   * Tracking object 2 indentif. code
   */
  objectId2?: string;

  /**
   * 2 Beacon name, from which signal was received
   */
  TransmitterId2?: string;

  /**
   * 3 Beacon name, from which signal was received
   */
  TransmitterId3?: string;
  TxPower1?: number;
  TxPower2?: number;
  TxPower3?: number;
}
