/* tslint:disable */
export interface PreferenceDefinition {
  id?: string;
  name?: string;
  order?: number;
  category?: string;

  /**
   * JSON Schema
   */
  schema?: {};

  /**
   * Layout Instructions
   */
  layout?: {};
}
