import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'], // Добавляем автоматическую документацию
  argTypes: {
    customClass: {
      control: 'text',
      description: 'Кастомный CSS-класс для карточки',
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

// Базовая история (Default)
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-card>
        <div card-header>
          <h2>Заголовок карточки</h2>
          <p>Краткое описание карточки.</p>
        </div>
        <div card-content>
          <p>Основной контент карточки.</p>
        </div>
        <div card-footer>
          <p>Футер карточки</p>
        </div>
      </app-card>
    `,
  }),
};

// История с кастомным классом
export const WithCustomClass: Story = {
  args: {
    customClass: 'custom-card',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [class]="customClass">
        <div card-header>
          <h2>Заголовок карточки</h2>
          <p>Краткое описание карточки.</p>
        </div>
        <div card-content>
          <p>Основной контент карточки.</p>
        </div>
        <div card-footer>
          <p>Футер карточки</p>
        </div>
      </app-card>
    `,
  }),
};

// История без футера
export const WithoutFooter: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-card>
        <div card-header>
          <h2>Заголовок карточки</h2>
          <p>Краткое описание карточки.</p>
        </div>
        <div card-content>
          <p>Основной контент карточки.</p>
        </div>
      </app-card>
    `,
  }),
};

// История с длинным контентом
export const WithLongContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-card>
        <div card-header>
          <h2>Заголовок карточки</h2>
          <p>Краткое описание карточки.</p>
        </div>
        <div card-content>
          <p>Основной контент карточки.</p>
          <p>Дополнительный текст для демонстрации длинного контента.</p>
          <p>Еще больше текста, чтобы показать, как карточка справляется с большим объемом информации.</p>
        </div>
        <div card-footer>
          <p>Футер карточки</p>
        </div>
      </app-card>
    `,
  }),
};

// История с минимальным контентом
export const MinimalContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-card>
        <div card-header>
          <h2>Заголовок карточки</h2>
        </div>
        <div card-content>
          <p>Основной контент карточки.</p>
        </div>
      </app-card>
    `,
  }),
};