export const up = (knex) => {
    return knex.schema.createTable('ally_format', (table) => {
      table.increments('allyFormatID').primary();
      table.integer('moralPersonID').unsigned().nullable().references('moralPersonID').inTable('moral_person');
      table.integer('publicScriptureID').unsigned().nullable().references('publicScriptureID').inTable('public_scripture');
      table.integer('taxCertificateID').unsigned().nullable().references('taxCertificateID').inTable('tax_certificate');
      table.integer('representativeID').unsigned().nullable().references('representativeID').inTable('representative');
      table.integer('naturalPersonID').unsigned().nullable().references('naturalPersonID').inTable('natural_person');
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('ally_format');
  };
  