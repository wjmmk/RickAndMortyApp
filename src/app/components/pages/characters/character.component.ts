import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Character } from '../../../shared/interfaces/character.interface';

@Component({
  selector: 'app-character',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CharacterComponent {
  // tslint:disable-next-line:typedef-whitespace
  @Input() character: Character;

}
