
import { 
    HttpException,
    BadRequestException,
    UnauthorizedException,
    NotFoundException,
    ForbiddenException,
    NotAcceptableException,
    RequestTimeoutException,
    ConflictException,
    GoneException,
    PayloadTooLargeException,
    UnsupportedMediaTypeException,
    UnprocessableEntityException,
    InternalServerErrorException,
    NotImplementedException,
    BadGatewayException,
    ServiceUnavailableException,
    GatewayTimeoutException,
    HttpStatus
} from "@nestjs/common";

export interface IEParams {
    type?: string;
    msg: string;
    code?: HttpStatus;
}

export const getError = (opt: IEParams) => {
    switch(opt.type) {
        default: {
            const code = opt.code || HttpStatus.INTERNAL_SERVER_ERROR;
            return new HttpException(opt.msg, code);
        }
    }
}

export const fireError = (opt: IEParams) => {
    throw getError(opt);
}

