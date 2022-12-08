import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  /**** */

  // Una de las formas a parte del NgModel, para eliminar los strings después de hacer una búsqueda

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; //El signo ! se asegura de que el objeto no es null y se pueda inicializar


  constructor(private gifsService: GifsService){} /* Mandamos a llamar el servicio */

  // Eliminamos el argumento porque ya definimos el tipo del ElementRef que sea de IE ya que originalmente es genérico
  buscar( /*terminoBusqueda: String*/) {
    // console.log(terminoBusqueda);

    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs(valor);
    // console.log(valor);

    this.txtBuscar.nativeElement.value = '';
  }

}
  /**** */
