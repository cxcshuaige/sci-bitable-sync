import { Global, Module, Logger } from '@nestjs/common';
import { Helpers } from './helpers';

@Global()
@Module({
  imports: [],
  providers: [Helpers, Logger],
  exports: [Helpers, Logger]
})
export class ShareModuleProviders {}
