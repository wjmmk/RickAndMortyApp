import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Character } from '@app/shared/interfaces/character.interface';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '@app/shared/services/character.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character$: Observable<Character>;

  constructor(private route: ActivatedRoute,
              private characterSvc: CharacterService,
              private location: Location) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe( (params) => {
      console.log(params);
      // tslint:disable-next-line:no-string-literal
      const id = params['id'];
      this.character$ = this.characterSvc.getDetails(id);
    });
  }

  onGoBack(): void {
    this.location.back();
    // window.history.back(); // Da el Mismo Resultado de la Linea de Arriba
  }
}
