import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlunoDto {
  @IsString({ message: 'O campo "nome" deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo "nome" não pode ser vazio.' })
  nome: string;

  @IsEmail({}, { message: 'O campo "email" deve conter um e-mail válido.' })
  @IsNotEmpty({ message: 'O campo "email" não pode ser vazio.' })
  email: string;

  @IsString({ message: 'O campo "curso" deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo "curso" não pode ser vazio.' })
  curso: string;
}
