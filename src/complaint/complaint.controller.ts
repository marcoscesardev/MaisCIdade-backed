import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';

@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Post()
  create(
    @Headers() headers: any,
    @Body() createComplaintDto: CreateComplaintDto,
  ) {
    const { userId } = headers;
    return this.complaintService.create({
      ...createComplaintDto,
      userId,
    });
  }

  @Get()
  findAll() {
    return this.complaintService.findAll();
  }

  @Get('resolved')
  async getResolvedComplaints(): Promise<CreateComplaintDto[]> {
    return this.complaintService.findResolvedComplaints();
  }

  @Get('top-rated')
  async getTopRatedComplaints(): Promise<CreateComplaintDto[]> {
    return this.complaintService.findTopRatedComplaints();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complaintService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComplaintDto: UpdateComplaintDto,
  ) {
    return this.complaintService.update(+id, updateComplaintDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complaintService.remove(+id);
  }
}
