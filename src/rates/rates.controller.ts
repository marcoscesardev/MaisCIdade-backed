import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/create-rate.dto';

@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Post()
  create(@Headers() headers: any, @Body() createRateDto: CreateRateDto) {
    const { userId } = headers;
    return this.ratesService.create({
      ...createRateDto,
      userId,
    });
  }

  @Get('complaint/:id')
  findOne(@Headers() headers: any, @Param('id') id: string) {
    const { userId } = headers;
    return this.ratesService.findByComplaintIdAndUserId(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratesService.remove(+id);
  }
}
