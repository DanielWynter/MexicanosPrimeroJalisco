export const up = (knex) => {
    return knex.schema.createTable('school_data', (table) => {
      table.increments('schoolDataID').primary();
      table.string('externalSupport').nullable();
      table.string('externalSupportReceived').nullable();
      table.boolean('interestedPerson').nullable();
      table.string('interestedPersonName').nullable();
      table.boolean('inProgram').nullable();
      table.string('inProgramDetails').nullable();
      table.boolean('pendingProcedure').nullable();
      table.string('pendingProcedureDetails').nullable();
      table.timestamps(true, true);
    });
  };
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('school_data');
  };