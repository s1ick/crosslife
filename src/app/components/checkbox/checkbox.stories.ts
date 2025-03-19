import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

export default {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  argTypes: {
    label: {
      control: 'boolean',
      description: 'Показывать ли текст внутри чекбокса',
    },
    checked: {
      control: 'boolean',
      description: 'Состояние чекбокса',
    },
    checkedChange: {
      action: 'checkedChange',
      description: 'Событие при изменении состояния',
    },
  },
} as Meta;

type Story = StoryObj<CheckboxComponent>;

const Template: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-checkbox
        [checked]="checked"
        [label]="label"
        (checkedChange)="checkedChange($event)"
      >
        <span>Checkbox Label</span>
      </app-checkbox>
    `,
  }),
};

export const Default: Story = {
  ...Template,
  args: {
    checked: false,
    label: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Чекбокс в состоянии по умолчанию (не выбран).',
      },
    },
  },
};

export const Checked: Story = {
  ...Template,
  args: {
    checked: true,
    label: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Чекбокс в выбранном состоянии.',
      },
    },
  },
};

export const WithoutLabel: Story = {
  ...Template,
  args: {
    checked: false,
    label: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Чекбокс без текста (label = false).',
      },
    },
  },
};