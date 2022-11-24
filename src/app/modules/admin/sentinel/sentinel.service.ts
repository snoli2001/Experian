import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidateDocumentIDResponse } from './interfaces/ValidateDocumentIDResponse.interface';

export interface GenerateSentinelReportRequest {
    codigo_distribuidor: string;
    codigo_comercio: string;
    nombre_comercio: string;
    id_producto: string;
    tipo_documento_PDV: string;
    numero_documento_PDV: string;
    razon_social_PDV: string;
    nro_transaccion_referencia: string;
    clave: string;
    fecha_envio: string;
    id_pin: string;
    telefono_solicitante: string;
    email_solicitante: string;
    tipo_documento_solicitante: string;
    numero_documento_solicitante: string;
    tipo_documento_consultado: string;
    numero_documento_consultado: string;
    tipo_documento_facturacion: string;
    numero_ruc: string;
}

@Injectable({
    providedIn: 'root',
})
export class SentinelService {
    constructor(private _http: HttpClient) {}

    generateSentinelReport(
        request: GenerateSentinelReportRequest
    ): Observable<any> {
        return this._http.post<any>(
            `${environment.API_URL}/ReporteCrediticio/generar`,
            request
        );
    }

    validateDocumentID(
        tipo_documento_consultado: string,
        numero_documento_consultado: string
    ): Observable<ValidateDocumentIDResponse> {
        return this._http.post<ValidateDocumentIDResponse>(
            `${environment.API_URL}/ReporteCrediticio/validarPersona`,
            {
                tipo_documento_consultado,
                numero_documento_consultado,
            }
        );
    }
}
