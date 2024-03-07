import { SetMetadata } from '@nestjs/common';
import { MODULE_PATH } from '@nestjs/common/constants';

function ModulePathDecorator(path) {
    return SetMetadata(MODULE_PATH, path);
}

export default ModulePathDecorator;
