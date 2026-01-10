import React, { memo, Suspense } from 'react';
import clsx from 'clsx';
import './IconComponent.css';
import * as Icons from '../../icons/index';
import { BorderRadiusFull } from '../../build/tokens';

/* ----------------------------------
 * Types
 * ---------------------------------- */

export type IconSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type IconTone =
  | 'Brand'
  | 'Brand-secondary'
  | 'Success'
  | 'Critical'
  | 'Caution'
  | 'Neutral'
  | 'Neutral-secondary'
  | 'Disabled'
  | 'White';

export type IconName = keyof typeof Icons;

export interface IconProps {
  icon: IconName | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: IconSize;
  tone?: IconTone;
  withBackground?: boolean;
  inverse?: boolean;
  className?: string;
  'aria-label'?: string;
}

/* ----------------------------------
 * Helpers
 * ---------------------------------- */

const SIZE_ORDER: IconSize[] = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

const canHaveBackground = (size: IconSize) =>
  SIZE_ORDER.indexOf(size) > SIZE_ORDER.indexOf('xs');

const resolveIcon = (
  icon: IconProps['icon']
): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
  if (typeof icon === 'string') {
    return Icons[icon];
  }
  return icon;
};

/* ----------------------------------
 * Component
 * ---------------------------------- */

export const IconComponent: React.FC<IconProps> = ({
  icon,
  size = 'm',
  tone = 'Brand',
  withBackground = false,
  inverse = false,
  className,
  'aria-label': ariaLabel,
}) => {
  const showBackground = withBackground && canHaveBackground(size);
  const SvgIcon = resolveIcon(icon);

  const classes = clsx(
    'icon',

    // size
    showBackground ? `icon--wbg--${size}` : `icon--${size}`,

    // tone without background
    !showBackground && `icon--${tone}`,

    // tone with background
    showBackground &&
      `icon--wbg--${tone}${inverse ? '-inverse' : ''}`,

    className
  );

  const iconNode = (
    <Suspense>
      <SvgIcon
        className={classes}
        aria-hidden={!ariaLabel}
        aria-label={ariaLabel}
        role={ariaLabel ? 'img' : undefined}
      />
    </Suspense>
  );

  return showBackground ? (
    <div
      style={{
        borderRadius: BorderRadiusFull,
        overflow: 'hidden',
        display: 'inline-flex',
      }}
    >
      {iconNode}
    </div>
  ) : (
    iconNode
  );
};

IconComponent.displayName = 'Icon';
export default memo(IconComponent);