import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common'
import {plainToClass} from 'class-transformer'
import {validate} from 'class-validator'
import {ValidationException} from './validation.exception'

@Injectable()
export class ValidatorPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)

    if (errors.length) {
      const message = []
      errors
        .map((err) => {
          return Object.values(err.constraints).map((item) => {
            return {[err.property]: item}
          })
        })
        .map((i) => {
          message.push(...i)
        })
      throw new ValidationException(message)
    }
    return value
  }
}
