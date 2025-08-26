import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoadingService } from './services/loading.service';
import { delay } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, MatProgressSpinnerModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    loading: boolean = false;
    title = 'jpa_database_frontend';
    constructor(private _loading: LoadingService) { }

    ngOnInit(): void {
        this.listenToLoading();
    }

    /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
    listenToLoading(): void {
        this._loading.loadingSub
            .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
            .subscribe((loading) => {
                this.loading = loading;
            });
    }
}

