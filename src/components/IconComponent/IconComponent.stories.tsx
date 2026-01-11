import type { Meta, StoryObj } from '@storybook/react';
import type { IconProps } from './IconComponent';
import IconComponent from './IconComponent';
import { BorderRadiusFull } from '../..';
import React from 'react';
//import IconSearchControl from '../../../.storybook/controls/IconSearchControl';


/**
 * 1️⃣ Import every folder's index.ts automatically
 */
const modules = import.meta.glob('../../icons/*/index.ts', {
  eager: true,
});

/**
 * 2️⃣ Build category → icons map
 */
const IconRegistry = Object.fromEntries(
  Object.entries(modules).map(([path, exports]) => {
    // '../../icons/Archive/index.ts' → 'Archive'
    const category = path.split('/').slice(-2, -1)[0];
    return [category, exports];
  })
);

/**
 * 3️⃣ Flatten IconRegistry to get complete list of icon names
 */
const allIconNames = Object.values(IconRegistry)
  .flatMap((icons) =>
    Object.keys(icons as any).filter(
      (name) => name !== 'default'
    )
  )
  .sort((a, b) => a.localeCompare(b));


/**
 * Pick a safe default icon from the registry
 */

const meta: Meta<typeof IconComponent> = {
  title: 'Components/IconComponent',
  component: IconComponent,
  tags: ['autodocs'],

  args: {
    icon: "Ic_Fire_Filled",
    size: 'm',
    tone: 'Brand',
    withBackground: false,
    inverse: false,
    'aria-label': 'IconComponent',
  },

  argTypes: {
    icon: {
      control: 'select',
      options: allIconNames.filter(name => name !== 'default'),
    },
    size: {
      control: 'radio',
      options: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
    },
    tone: {
      control: 'select',
      options: [
        'Brand',
        'Brand-secondary',
        'Success',
        'Critical',
        'Caution',
        'Neutral',
        'Neutral-secondary',
        'Disabled',
        'White',
      ],
    },
    withBackground: { control: 'boolean' },
    inverse: { control: 'boolean' },
  },

  parameters: {
    docs: {
      description: {
        component: `
IconComponents are used to represent actions, states, or concepts.

  • Token-based sizing  
  • Optional background for sizes > xs  
  • Inverse support for dark surfaces  
  • Interactive state support  
  • Accessible via aria-label  
Use Unstructured-DS using command below:
\`\`\`bash
npm install unstructured-ds
# or
yarn add unstructured-ds
\`\`\`

To import this component:

\`\`\`tsx
import { IconComponent } from '../node_modules/unstructured-ds/dist/components/IconComponent';
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconComponent>;


// --------------------
// BASIC STORIES
// --------------------

export const Default: Story = {};

export const WithBackground: Story = {
  args: {
    withBackground: true,
    size: 'l',
  },
};

export const Inverse: Story = {
  args: {
    withBackground: true,
    inverse: true,
    size: 'l',
  },
};


// --------------------
// SHOWCASES
// --------------------

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {(['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const).map((size) => (
        <IconComponent key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Tones: Story = {
  args: {
    size: "xxs"
  },

  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        gap: 16,
      }}
    >
      {[
        'Brand',
        'Brand-secondary',
        'Success',
        'Critical',
        'Caution',
        'Neutral',
        'Neutral-secondary',
        'Disabled',
        'White',
      ].map((tone) => (
        <div style={{ borderRadius: BorderRadiusFull, overflow: 'hidden', display: 'inline-flex' }}>
          <IconComponent
            key={tone}
            {...args}
            tone={tone as IconProps['tone']}
            withBackground
            size="l"
          />
        </div>
      ))}
    </div>
  )
};

/*
export const IconSearch: Story = {
  render: (args, { updateArgs }) => {
    const [search, setSearch] = React.useState('');

    const filteredIcons = allIconNames.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 260 }}>
          <input
            placeholder="Search icon…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />

          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {filteredIcons.map((icon) => (
              <div
                key={icon}
                onClick={() => updateArgs({ icon })}
                style={{ cursor: 'pointer', padding: 6 }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        <IconComponent {...args} />
      </div>
    );
  },
};
*/