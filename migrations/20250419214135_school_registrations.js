export const up = (knex) => {
    return knex.schema.createTable('school_registrations', (table) => {
      table.increments('registrationID').primary();
      
      // Relaciones con tus tablas actuales (ajusta según tus nombres reales)
      table.integer('formatSchoolID').unsigned()
        .references('formatSchoolID').inTable('format_school')
        .onDelete('CASCADE');
      
      table.integer('principalID').unsigned()
        .references('principalID').inTable('principal')
        .onDelete('CASCADE');
      
      table.integer('supervisorID').unsigned()
        .references('supervisorID').inTable('supervisor')
        .onDelete('CASCADE');
      
      table.integer('groupsID').unsigned()
        .references('groupsID').inTable('groups')
        .onDelete('CASCADE');
      
      table.integer('schoolDataID').unsigned()
        .references('schoolDataID').inTable('school_data')
        .onDelete('CASCADE');
  
      // Campos de control
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.enu('status', ['draft', 'completed', 'approved']).defaultTo('draft');
    });
  };
  
  export const down = (knex) => {
    return knex.schema.dropTable('school_registrations');
  };