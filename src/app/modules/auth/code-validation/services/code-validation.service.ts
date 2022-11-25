import { environment } from 'environments/environment';
/* eslint-disable @typescript-eslint/naming-convention */
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CodeValidationResponse {
    codigo: string;
    mensaje: string;
    id_pin: string;
    codigo_distribuidor: string;
    codigo_comercio: string;
    nombre_comercio: string;
    id_producto: string;
    nombre_producto: string;
    precio: string;
    tipo_documento_PDV: string;
    numero_documento_PDV: string;
    razon_social_PDV: string;
    nro_transaccion_referencia: string;
    telefono_solicitante: string;
    email_solicitante: string;
    fecha_envio: string;
    clave: string;
}

@Injectable({
    providedIn: 'root',
})
export class CodeValidationService {
    private transactionInfo = new BehaviorSubject<CodeValidationResponse>(null);
    // eslint-disable-next-line @typescript-eslint/member-ordering
    transactionInfo$: Observable<CodeValidationResponse> =
        this.transactionInfo.asObservable();

    constructor(private _http: HttpClient) {}

    validateCode(vc_nro_pin: string): Observable<CodeValidationResponse> {
        return this._http.post<CodeValidationResponse>(
            `${environment.API_URL}/Pin/consultar
        `,
            {
                vc_nro_pin,
            }
        );
    }

    setTransactionInfo(transactionInfo: CodeValidationResponse): void {
        this.transactionInfo.next(transactionInfo);
    }
}
