import {IsInt, isInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCastDto {
    
    @IsString()
    @MinLength(1)
    name: string;

    @IsInt()
    @IsPositive()
    age: number;

    @IsString()
    @IsOptional()
    breed?: string;
}
