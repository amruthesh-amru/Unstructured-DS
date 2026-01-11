import type { Meta, StoryObj } from "@storybook/react";
import * as Icons from "../icons";

type IconName = keyof typeof Icons;

const meta: Meta<{ icon: IconName }> = {
  title: "Icons",
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(Icons),
      description: "Select an icon by name",
    },
  },
  args: {
    icon: 'Ic_Fire_Filled' as IconName,
  },
  parameters: {
    docsOnly: true, 
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
import { Icon_Name } from 'unstructured-ds/icons';
\`\`\`
        `,
      },
    },
  },
};


export default meta;
type Story = StoryObj<{ icon: IconName }>;

// =======================
// Playground (icon name as arg)
// =======================
/*
export const Playground: Story = {
  render: ({ icon }) => {
    const Icon = Icons[icon];
    return (
      <div >
        <Icon />
        <div>{icon}</div>
      </div>
    );
  },
};
*/

// =======================
// All Icons Grid
// =======================
export const AllIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: "24px",
        padding: "24px"
      }}
    >
      {Object.entries(Icons).map(([name, Icon]) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          <Icon />
          <span style={{ marginTop: 10, fontSize: 11 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
