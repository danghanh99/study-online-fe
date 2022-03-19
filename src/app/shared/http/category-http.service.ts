import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, } from '@angular/common/http';
import { Observable } from "rxjs";
import { Category } from "../models/group.model";


@Injectable({ providedIn: 'root' })
export class CategoryHttpService {
    private resource = `${environment.APILink}`;

    constructor(private http: HttpClient) { }

    public getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.resource}/categories`);
    }
}
