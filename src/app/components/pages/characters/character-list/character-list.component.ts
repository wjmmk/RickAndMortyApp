import { Component, OnInit, Inject, HostListener, ɵConsole } from '@angular/core';
import { Character } from '../../../../shared/interfaces/character.interface';
import { CharacterService } from '../../../../shared/services/character.service';
import { take, filter } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { TrackHttpError } from '@app/shared/models/trackHttpError';


type RequestInfo = {
  next: string;
};

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];

  info: RequestInfo = {
    next: null,
  };
  showGoUpButton = false;
  private pageNum = 1;
  private query: string;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;

  constructor(@Inject(DOCUMENT) private document: Document,
              private characterSvc: CharacterService,
              private route: ActivatedRoute,
              private router: Router ) { this.onUrlChanged(); }

  ngOnInit(): void {
    // this.getDataFromServices();
    this.getCharactersByQuery();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    if ((yOffSet || this.document.documentElement.scrollTop ||
      this.document.body.scrollTop) > this.showScrollHeight){
          this.showGoUpButton = true;
      } else if ( this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop
                 || this.document.body.scrollTop) < this.hideScrollHeight){
                  this.showGoUpButton = true;
                 }
  }

   onScrollDown(): void {
      if (this.info.next){
        this.pageNum++;
        this.getDataFromServices();
      }
  }

    onScrollTop(): void {
      this.document.body.scrollTop = 0; // Navegador SAFARI
      this.document.documentElement.scrollTop = 0; // Resto de Nacegadores WEB
    }

  private onUrlChanged(): void {
    // Emplea el Modulo Router
    this.router.events
    .pipe( filter( (event) => event instanceof NavigationEnd))
    .subscribe( () => {
      this.characters = [];
      this.pageNum = 1;
      this.getCharactersByQuery();
    });
  }

  private getCharactersByQuery(): void {
    // Routes
    this.route.queryParams.pipe(take(1)).subscribe( (params: ParamMap) => {
     // console.log('params ->', params);
      // tslint:disable-next-line:no-string-literal
      this.query = params['q'];
      this.getDataFromServices();
    });
  }

  private getDataFromServices(): void {
    this.characterSvc
      .searchCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe( (res: any) => {
       if ( res?.results?.length){
        const { info, results } = res;
        this.characters = [ ...this.characters, ...results];
        this.info = info;
       } else{ this.characters = []; }
    }, (error: TrackHttpError) => console.log( (error.friendlyMessage)));
  }
}
