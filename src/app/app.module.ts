import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { TranslocoRootModule } from './core/i18n/transloco-root.module';
import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CoreModule,
    TranslocoRootModule,
    LayoutModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
