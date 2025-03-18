import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Компонент кнопки, который поддерживает различные типы кнопок, иконки, доступность и события клика.
 * 
 * @component
 */
@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {
  
  /**
   * Текст, который будет отображаться на кнопке.
   * 
   * @type {string}
   */
  @Input() textButtons: string = '';

  /**
   * Тип кнопки, который определяет её стиль.
   * Может быть 'primary', 'secondary' или 'close'.
   * 
   * @type {'primary' | 'secondary' | 'close'}
   */
  @Input() typeButton: 'primary' | 'secondary' | 'close' = 'primary';

  /**
   * Состояние кнопки, включена ли она или заблокирована.
   * Если значение true, кнопка будет заблокирована.
   * 
   * @type {boolean}
   */
  @Input() disabled: boolean = false;

  /**
   * Иконка, которая будет отображаться на кнопке.
   * 
   * @type {string}
   */
  @Input() icon: string = '';

  /**
   * Атрибут для доступности (aria-label), который используется для описания кнопки.
   * 
   * @type {string}
   */
  @Input() ariaLabel: string = '';

  /**
   * Событие, которое срабатывает при клике на кнопку.
   * 
   * @output
   * @type {EventEmitter<void>}
   */
  @Output() buttonClick = new EventEmitter<void>();

  /**
   * Обработчик события клика по кнопке.
   * Если кнопка не заблокирована, эмиттируется событие buttonClick.
   */
  onClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }

  /**
   * Метод для получения значения aria-label для кнопки.
   * Сначала возвращается значение ariaLabel, если оно задано,
   * иначе возвращается текст кнопки (textButtons),
   * если и оно пустое — возвращается строка 'Button'.
   * 
   * @returns {string} - aria-label кнопки.
   */
  getAriaLabel(): string {
    return this.ariaLabel || this.textButtons || 'Button';
  }
}
