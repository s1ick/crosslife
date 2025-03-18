import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials', // Включает Docs
    '@storybook/addon-interactions',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: true, // Включаем автоматическую генерацию документации
  },
};

export default config;