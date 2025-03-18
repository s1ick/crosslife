import { Meta, StoryFn } from '@storybook/angular';
import { ButtonsComponent } from './buttons.component';

/**
 * Конфигурация Storybook для компонента ButtonsComponent.
 * 
 * @type {Meta<ButtonsComponent>} 
 */
export default {
  title: 'Components/Button',  // Название, которое отображается в боковой панели Storybook
  component: ButtonsComponent, // Компонент, к которому относится данный story
  argTypes: {
    /**
     * Текст, который отображается на кнопке.
     * 
     * @type {string}
     */
    textButtons: { control: 'text' },

    /**
     * Тип кнопки, определяющий её стиль.
     * Может быть 'primary', 'secondary' или 'close'.
     * 
     * @type {'primary' | 'secondary' | 'close'}
     */
    typeButton: { control: 'select', options: ['primary', 'secondary', 'close'] },

    /**
     * Определяет, будет ли кнопка отключена.
     * Если значение true, кнопка будет заблокирована.
     * 
     * @type {boolean}
     */
    disabled: { control: 'boolean' },

    /**
     * Иконка, которая будет отображаться на кнопке.
     * 
     * @type {string}
     */
    icon: { control: 'text' },

    /**
     * Действие, которое выполняется при клике на кнопку.
     * 
     * @type {Function}
     */
    buttonClick: { action: 'clicked' },
  },
} as Meta;

/**
 * Шаблон функции, которая связывает свойства компонента для различных состояний кнопки.
 * 
 * @param {ButtonsComponent} args - Аргументы для компонента кнопки
 * @returns {Object} - Объект, содержащий свойства для компонента ButtonsComponent
 */
const Template: StoryFn<ButtonsComponent> = (args) => ({
  props: args,
});

/**
 * История для кнопки типа "Primary".
 */
export const Primary = Template.bind({});
Primary.args = {
  textButtons: 'Primary Button',
  typeButton: 'primary',
  disabled: false,
  icon: '',
};

/**
 * История для кнопки типа "Secondary".
 */
export const Secondary = Template.bind({});
Secondary.args = {
  textButtons: 'Secondary Button',
  typeButton: 'secondary',
  disabled: false,
  icon: '',
};

/**
 * История для кнопки, которая заблокирована (Disabled).
 */
export const Disabled = Template.bind({});
Disabled.args = {
  textButtons: 'Disabled Button',
  disabled: true,
  icon: '',
};
