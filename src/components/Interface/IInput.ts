export interface isInput {
  label?: any;
  type?: any;
  value?: any;
  placeholder?: string
  className?:string
  classNameLabel?:string
  classNameParent?:string
  onChange: (e: any) => void;
  required?:any
  error?:any
  name?:string;
}
