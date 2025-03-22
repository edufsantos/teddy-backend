import { CustomLogger } from '@common/loggers/custom.logger';
import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CreateCustomerCommand } from './commands/create-customer/create-customer.command';
import { GetCustomerQuery } from './queries/get-customer/get-customers.queries';
import { GetCustomersQuery } from './queries/get-customers/get-customers.queries';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly logger: CustomLogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('')
  async getCustomers(@Query() queryParams: GetCustomersQuery) {
    const query = plainToClass(GetCustomersQuery, queryParams);
    console.log({ query });

    const result = await this.queryBus
      .execute(query)
      .then((result) => {
        this.logger.log('Customers fetched successfully', result);
        return result;
      })
      .catch((error) => {
        this.logger.error('Error fetching customers', error);
      });

    return result;
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    const query = plainToClass(GetCustomerQuery, { id: +id });
    console.log({ query });
    const result = await this.queryBus
      .execute(query)
      .then((result) => {
        this.logger.log('Customer fetched successfully', result);
        return result;
      })
      .catch((error) => {
        this.logger.error('Error fetching customer', error);
        return error;
      });

    return result;
  }

  @Post()
  async createCustomer(@Body() customerData: CreateCustomerCommand) {
    console.log({ customerData });

    const data = plainToInstance(CreateCustomerCommand, customerData);
    return await this.commandBus.execute(data);
  }
}
