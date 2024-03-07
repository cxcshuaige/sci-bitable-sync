
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

export const getHttpException = (msg, code = HttpStatus.INTERNAL_SERVER_ERROR) => {
    return new HttpException(msg, code);
}