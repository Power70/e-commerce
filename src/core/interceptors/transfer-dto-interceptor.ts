import { 
    CallHandler, 
    ExecutionContext, 
    Injectable, 
    UseInterceptors 
} from "@nestjs/common";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

export function TransformDTO<T>(dto: ClassConstructor<T>) {
    return UseInterceptors(new TransformDTOInterceptor(dto));
}

@Injectable()
export class TransformDTOInterceptor<T> {
    constructor(private readonly dtoClass: ClassConstructor<T>) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
        return next.handle().pipe(
            map((data) => {
                return plainToInstance(this.dtoClass, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}