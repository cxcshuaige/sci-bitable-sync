import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors';

function SerializeInterceptorDecorator(dto) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export default SerializeInterceptorDecorator;
