interface IFormInputGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type?: "text" | "date";
}

export const FormInputGroup: React.FC<IFormInputGroupProps> = ({
  id,
  label,
  type = "text",
  ...restProps
}) => (
  <div className="form-group">
    {label && <label htmlFor={id}>{label}</label>}
    <input className="form-control" id={id} type={type} {...restProps} />
  </div>
);
