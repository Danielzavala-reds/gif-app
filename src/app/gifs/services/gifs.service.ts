import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'dvBg3xj32IJm3sqazMsrPqPtPDSHIwyP'
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = [];

  // TODO: Cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  get historial(){
    // this._historial = this._historial.splice(0,10) /* Recortamos el arreglo, decimos que queremos de la posicion 1 a la 10, limite de 10 */
    return [...this._historial];
  }

  constructor(private http: HttpClient){ // Inyectamos el servicio de HttpClient

    /* Dos formas de hacer localStorage*/

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []

    this.resultados = JSON.parse(localStorage.getItem('imagenes')!) || [];

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')! );
    // }


  } 

   buscarGifs(query: string = ''){  /* El query es el termino a buscar */

    query = query.trim().toLowerCase();
    
    /* Logica para que no existan duplicados en el historial */
    if( !this._historial.includes( query ) ){
      this._historial.unshift( query )
      this._historial = this._historial.splice(0,10)

      localStorage.setItem('historial', JSON.stringify(this._historial)); /*Transformamos el this._historial a string porque asi lo requiere el setItem, dos valores de tipo string */

    }

    /* Peticion a la Api mediante HttpClient que retorna Observables*/

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    // console.log(params.toString());


    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe( ( res ) => {
        // console.log(res.data);
        this.resultados = res.data;
        localStorage.setItem('imagenes', JSON.stringify(this.resultados));
      });



    // console.log(this._historial);
  }
}
