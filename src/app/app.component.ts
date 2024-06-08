import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { fromEvent, map } from 'rxjs';

export const SCROLL_CONTAINER = 'mat-sidenav-content';
export const TEXT_LIMIT = 50;
export const SHADOW_LIMIT = 100;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isSmallScreen = false;
  public popText = false;
  public applyShadow = false;

  constructor(private breakPointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    const content = document.getElementsByClassName(SCROLL_CONTAINER)[0];


    fromEvent(content, 'scroll')
    .pipe(
      map(() => content.scrollTop),
    )
    .subscribe({
      next: (value) => this.headerDeterminer(value),
    })
  }

  headerDeterminer(scrollTop: number) {
    this.popText = scrollTop >= TEXT_LIMIT;
    this.applyShadow = scrollTop >= SHADOW_LIMIT;
  }

  ngAfterContentInit(): void {
    this.breakPointObserver
      .observe(['(max-width: 800px)'])
      .subscribe((res) => (this.isSmallScreen = res.matches));
  }

  get sidenavMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }
}
