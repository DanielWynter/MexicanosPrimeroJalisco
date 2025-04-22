export const up = (knex) => {
    return knex.schema.createTable('tax_certificate', (table) => {
      table.increments('taxCertificateID').primary();
      table.string('rfc').notNullable();
      table.string('socialReason').notNullable();
      table.string('regimen').notNullable();
      table.string('taxAddress').notNullable();
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('tax_certificate');
  };
  