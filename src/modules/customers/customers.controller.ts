import { CustomLogger } from '@common/loggers/custom.logger';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CreateCustomerCommand } from './commands/create-customer/create-customer.command';
import { CreateCustomerDto } from './commands/create-customer/create-customer.dto';
import { DeleteCustomerCommand } from './commands/delete-customer/delete-customer.command';
import { UpdateCustomerCommand } from './commands/update-customer/update-customer.command';
import { UpdateCustomerDto } from './commands/update-customer/update-customer.dto';
import { GetCustomerQuery } from './queries/get-customer/get-customers.queries';
import { GetCustomersQuery } from './queries/get-customers/get-customers.queries';
import {
  ApiCreateCustomer,
  ApiCustomers,
  ApiDeleteCustomer,
  ApiGetCustomer,
  ApiGetCustomers,
  ApiUpdateCustomer,
} from './customers.docs';

@Controller('customers')
@ApiCustomers()
export class CustomersController {
  constructor(
    private readonly logger: CustomLogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('')
  @ApiGetCustomers()
  async getCustomers(@Query() queryParams: GetCustomersQuery) {
    const query = plainToClass(GetCustomersQuery, queryParams);

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
  @ApiGetCustomer()
  async getCustomer(@Param('id') id: string) {
    const query = plainToClass(GetCustomerQuery, { id: +id });
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
  @ApiCreateCustomer()
  async createCustomer(@Body() customerData: CreateCustomerDto) {
    const data = plainToInstance(CreateCustomerCommand, customerData);
    return await this.commandBus.execute(data);
  }

  @Patch(':id')
  @ApiUpdateCustomer()
  async updateCustomer(@Param('id') id: string, @Body() customerData: UpdateCustomerDto) {
    const data = plainToInstance(UpdateCustomerCommand, {
      id: +id,
      ...customerData,
    });
    return await this.commandBus.execute(data);
  }

  @Delete(':id')
  @ApiDeleteCustomer()
  async deleteCustomer(@Param('id') id: string) {
    const data = plainToInstance(DeleteCustomerCommand, { id: +id });

    return await this.commandBus.execute(data);
  }
}
