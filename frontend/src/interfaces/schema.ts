export interface Properties {
  mothername: Name;
  slider: Slider;
  name: Name;
  description: Description;
  done: Done;
  due_date: DueDate;
  rating: Rating;
  recurrence: RadioGroup;
  recurrence_interval: Done;
  oneOfEnum: OneOfEnum;
  radioGroup: RadioGroup;
}

export interface Description {
  title: string;
  type: string;
}

export interface Done {
  type: string;
}

export interface DueDate {
  type: string;
  format: string;
}

export interface Name {
  type: string;
  minLength: number;
}

export interface OneOfEnum {
  type: string;
  oneOf: OneOf[];
}

export interface OneOf {
  const: string;
  title: string;
}

export interface RadioGroup {
  type: string;
  enum: string[];
}

export interface Rating {
  type: string;
  maximum: number;
}

export interface Slider {
  type: string;
  minimum: number;
  maximum: number;
  default: number;
  description: string;
}

export interface schema {
  properties: Properties;
}
