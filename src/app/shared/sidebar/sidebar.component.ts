import { Component, Input } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  constructor(private gifsService: GifsService) { }

  get historial() {
    return this.gifsService.historial
  }  


  /* Metodo para que el historial funcione y nos arroje esos resultados */
  buscar(termino: string){
    this.gifsService.buscarGifs(termino)
  }

}
