import React from 'react'
import '../../build/tokens-light.css'
import '../../build/tokens-dark.css'
import './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const buttonClasses = `button button--${variant} ${className}`.trim()

  return (
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  )
}
