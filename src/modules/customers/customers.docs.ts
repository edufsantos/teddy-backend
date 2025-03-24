import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from './commands/create-customer/create-customer.dto';
import { UpdateCustomerDto } from './commands/update-customer/update-customer.dto';

export function ApiCustomers() {
  return applyDecorators(ApiTags('Customers'));
}

export function ApiGetCustomers() {
  return applyDecorators(
    ApiOperation({ summary: 'Listar clientes' }),
    ApiQuery({ name: 'skip', required: false, type: Number, description: 'Número de itens a pular' }),
    ApiQuery({ name: 'take', required: false, type: Number, description: 'Número de itens a retornar' }),
    ApiQuery({ name: 'name', required: false, type: String, description: 'Nome do cliente para filtro' }),
    ApiResponse({ status: 200, description: 'Lista de clientes retornada com sucesso.' }),
  );
}

export function ApiGetCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Obter um cliente pelo ID' }),
    ApiParam({ name: 'id', required: true, type: Number, description: 'ID do cliente' }),
    ApiResponse({ status: 200, description: 'Cliente retornado com sucesso.' }),
    ApiResponse({ status: 404, description: 'Cliente não encontrado.' }),
  );
}

export function ApiCreateCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Criar um novo cliente' }),
    ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' }),
    ApiResponse({ status: 400, description: 'Dados inválidos.' }),
    ApiBody({
      type: CreateCustomerDto,
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nome do cliente.',
          },
        },
      },
      examples: {
        exemplo1: {
          summary: 'Exemplo de Cliente',
          description: 'Este é um exemplo válido de criação de cliente.',
          value: {
            name: 'Eduardo - Tech Lead',
          } as CreateCustomerDto,
        },
      },
    }),
  );
}

export function ApiUpdateCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar um cliente pelo ID' }),
    ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso.' }),
    ApiResponse({ status: 404, description: 'Cliente não encontrado.' }),
    ApiBody({
      type: UpdateCustomerDto,
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nome do cliente.',
          },
        },
      },
      examples: {
        exemplo1: {
          summary: 'Exemplo de Cliente',
          description: 'Este é um exemplo válido de atualização de cliente.',
          value: {
            name: 'Carol - Tech Lead',
          } as UpdateCustomerDto,
        },
      },
    }),
  );
}

export function ApiDeleteCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Deletar um cliente pelo ID' }),
    ApiParam({ name: 'id', required: true, type: Number, description: 'ID do cliente' }),
    ApiResponse({ status: 200, description: 'Cliente deletado com sucesso.' }),
    ApiResponse({ status: 404, description: 'Cliente não encontrado.' }),
  );
}
