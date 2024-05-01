import React, { FunctionComponent, MouseEvent, FormEvent } from "react";

interface CommonButtonProps {
  text: string;
  onClick?: any;
  type?: "primary" | "secondary" | "submit" | undefined;
  className?: string;
  disabled?: boolean; // Add the disabled property
}

const CommonButton: FunctionComponent<CommonButtonProps> = ({
  text,
  onClick,
  type,
  className,
}: CommonButtonProps) => {
  const buttonClasses = `common-button ${type} ${className}`.trim();

  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default CommonButton;
