import React, { memo } from 'react';
import clsx from 'clsx';
import './IconButton.css';
import * as Icons from '../../icons/index';
import { GlassSurface as GlassButton } from './GlassSurface';

/* ----------------------------------
 * Types & Helpers
 * ---------------------------------- */
export type IconSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type IconTone = 'default' | 'positive' | 'negative' | 'warning';
export type IconVersion = 'primary' | 'secondary' | 'tertiary';
export type IconName = keyof typeof Icons;

export interface IconButtonProps {
  icon: IconName | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: IconSize;
  tone?: IconTone;
  version?: IconVersion;
  inverse?: boolean;
  className?: string;
  'aria-label'?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

const resolveIcon = (
  icon: IconButtonProps['icon']
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null => {
  if (typeof icon === 'string') return Icons[icon] ?? null;
  return icon;
};



/* ----------------------------------
 * Component
 * ---------------------------------- */
const IconButtonBase: React.FC<IconButtonProps> = ({
  icon,
  size = 'm',
  tone = 'default',
  version = 'primary',
  inverse = false,
  className,
  disabled = false,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const SvgIcon = resolveIcon(icon);

  if (!SvgIcon) return null;

  const wrapperClasses = clsx(
    'icon-button',
    `icon-button--${size}`,
    `icon-button--${tone}--${version}`,
    inverse && 'icon-button--inverse',
    disabled && 'icon-button--disabled',
    className
  );

  return (
    <div className={wrapperClasses}>
      <div className="icon-button__glass-outer">
        <GlassButton size={36} mode="bubble"  style={{ background: "rgb(from #FF5B00 r g b / 0.3)" }}>        
            <button
              className="icon-button__inner"
              title={ariaLabel}
              aria-label={ariaLabel}
              disabled={disabled}
              onClick={onClick}
              type={type}
            >
              <span className="icon-button__glow" aria-hidden />
              <span className="icon-button__icon">
                <SvgIcon />
              </span>
            </button>
        </GlassButton>
        <GlassButton size={36} mode="bubble" style={{ background: "rgb(from #FF5B00 r g b / 0.3)" }}></GlassButton>
      </div>
    </div>
  );
};

IconButtonBase.displayName = 'IconButton';

export const IconButton = memo(IconButtonBase);
export default IconButton;