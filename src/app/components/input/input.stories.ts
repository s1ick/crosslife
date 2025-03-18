import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  tags: ['autodocs'], // Добавляем автоматическую документацию
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Текст плейсхолдера',
    },
    prefixIcon: {
      control: 'text',
      description: 'Иконка префикса (Material icon name)',
    },
    suffixIcon: {
      control: 'text',
      description: 'Иконка суффикса (Material icon name)',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: 'Тип инпута',
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние disabled',
    },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

// Базовая история (Default)
export const Default: Story = {
  args: {
    placeholder: 'Поиск...',
    prefixIcon: 'search',
  },
};

// История с иконкой суффикса
export const WithSuffixIcon: Story = {
  args: {
    placeholder: 'Введите email',
    type: 'email',
    suffixIcon: 'email',
  },
};

// История с отключенным инпутом
export const Disabled: Story = {
  args: {
    placeholder: 'Отключенный инпут',
    disabled: true,
  },
};

// История с паролем
export const PasswordInput: Story = {
  args: {
    placeholder: 'Введите пароль',
    type: 'password',
    prefixIcon: 'lock',
  },
};

// История с числовым инпутом
export const NumberInput: Story = {
  args: {
    placeholder: 'Введите число',
    type: 'number',
    prefixIcon: 'numbers',
  },
};

// История с кастомной иконкой
export const CustomIcon: Story = {
  args: {
    placeholder: 'Введите текст',
    prefixIcon: 'edit',
    suffixIcon: 'send',
  },
};