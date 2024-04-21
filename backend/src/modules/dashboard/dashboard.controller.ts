import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(
        private dashboardService: DashboardService
    ){}

    @Get('dashboard/:showroomId')
  getDashboardData(@Param('showroomId') showroomId: number): Promise<{inventory: number, customer: number, employee: number}>{
    return this.dashboardService.getTotalAvailableInventory(showroomId);
  }
}
