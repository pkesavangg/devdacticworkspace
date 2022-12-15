import { DevdacticLibService } from './devdactic-lib.service';
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { DevdacticLibComponent } from './devdactic-lib.component';
import { CustomCardComponent } from './custom-card/custom-card.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { FeedSettingComponent } from './feed-setting/feed-setting.component';
import { NowidowPipe } from './pipes/nowidow.pipe';
import { FeedTemplatePipe } from './pipes/feed-template.pipe';
import { FeedModalComponentComponent } from './feed-modal-component/feed-modal-component.component';

export interface LibConfig {
  apiUrl: string;
}

export const LibConfigService = new InjectionToken<LibConfig>('LibConfig');

@NgModule({
  declarations: [DevdacticLibComponent, CustomCardComponent, FeedItemComponent, FeedSettingComponent, NowidowPipe, FeedTemplatePipe, FeedModalComponentComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule
  ],
  exports: [DevdacticLibComponent, CustomCardComponent]
})
export class DevdacticLibModule {
  static forRoot(config: LibConfig): ModuleWithProviders<DevdacticLibModule> {
    return {
      ngModule: DevdacticLibModule,
      providers: [
        DevdacticLibService,
        {
          provide: LibConfigService,
          useValue: config
        }
      ]
    };
  }
}
