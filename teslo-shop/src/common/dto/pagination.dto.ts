import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
  @ApiPropertyOptional({
    default: 10,
    description: 'Rows needed',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // the same as globalPipe enableImplicitConversions: true
  limit?: number;

  @ApiPropertyOptional({
    default: 0,
    description: 'Rows skipped',
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}
