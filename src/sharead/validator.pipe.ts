import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common'
import {plainToClass} from 'class-transformer'
import {validate} from 'class-validator'
import {ValidationException} from './validation.exception'
export interface ErrorMessage {
  type: string
  message: string
}
@Injectable()
export class ValidatorPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)

    if (errors.length) {
      const message = errors.map((err) => {
        return Object.values(err.constraints).map((item) => {
          const erMes = <ErrorMessage>{}
          erMes.type = err.property
          erMes.message = item
          return erMes
        })
      })
      const erArray = []
      message.map((item) => {
        erArray.push(...item)
      })
      throw new ValidationException(erArray)
    }
    return value
  }
}
