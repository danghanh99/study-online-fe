import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CategoryHttpService } from 'src/app/shared/http/category-http.service';
import { Category } from 'src/app/shared/models/group.model';

@Component({
  selector: 'ah-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];
  constructor(private categoryHttpService: CategoryHttpService) { }

  ngOnInit(): void {
    this.categoryHttpService.getAllCategories().pipe(
      tap(res => this.categories = res)
    ).toPromise();
  }
}
