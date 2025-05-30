import type { Meta, StoryObj } from '@storybook/angular';
import { ListComponent } from './list.component';

const meta: Meta<ListComponent> = {
  title: 'Components/List',
  component: ListComponent,
  tags: ['autodocs'], // Добавляем автоматическую документацию
};

export default meta;
type Story = StoryObj<ListComponent>;

// Моковые данные для списка
const mockMenuItems = [
  { route: '/dashboard', labelRoute: 'Главная', icon: 'home' },
  { route: '/regions', labelRoute: 'Регионы', icon: 'location_city' },
  { route: '/settings', labelRoute: 'Настройки', icon: 'settings' },
];

// Базовая история (Default)
export const Default: Story = {
  args: {
    items: mockMenuItems, // Передаем моковые данные
    isExpanded: true, // Список развернут
    activeItem: mockMenuItems[0], // Активный элемент
  },
};

// История для свернутого списка (Collapsed)
export const Collapsed: Story = {
  args: {
    items: mockMenuItems, // Передаем моковые данные
    isExpanded: false, // Список свернут
    activeItem: mockMenuItems[1], // Активный элемент
  },
};

// История для списка с одним элементом
export const SingleItem: Story = {
  args: {
    items: [mockMenuItems[0]], // Только один элемент
    isExpanded: true,
    activeItem: mockMenuItems[0], // Активный элемент
  },
};

// История для списка с большим количеством элементов
export const LongList: Story = {
  args: {
    items: [
      ...mockMenuItems,
      { route: '/profile', labelRoute: 'Профиль', icon: 'person' },
      { route: '/help', labelRoute: 'Помощь', icon: 'help' },
      { route: '/logout', labelRoute: 'Выйти', icon: 'logout' },
    ],
    isExpanded: true,
    activeItem: mockMenuItems[2], // Активный элемент
  },
};

// История для списка с отключенными элементами
export const DisabledItems: Story = {
  args: {
    items: mockMenuItems.map((item) => ({ ...item, disabled: true })), // Все элементы отключены
    isExpanded: true,
    activeItem: null, // Нет активного элемента
  },
};

// История для списка с активным элементом
export const WithActiveItem: Story = {
  args: {
    items: mockMenuItems,
    isExpanded: true,
    activeItem: mockMenuItems[1], // Активный элемент
  },
};