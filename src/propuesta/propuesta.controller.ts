import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { PropuestaService } from './propuesta.service';

@Controller('propuestas')
@UseInterceptors(BusinessErrorsInterceptor)
export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) {}

    @Get()
    async findAll() {
        return this.propuestaService.findAllPropuesta();
    }
}
