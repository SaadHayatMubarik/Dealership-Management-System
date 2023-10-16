import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ILoaderState } from '../../interfaces/common';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject<void>();

  show = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.loaderState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state: ILoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
