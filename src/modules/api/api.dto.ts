import { IsNotEmpty, IsString, IsOptional, IsObject } from "class-validator"

export class CacheDto{
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsObject()
    data?: any;
}

export class CacheGetDto{
    @IsNotEmpty()
    @IsString()
    userId: string;
}