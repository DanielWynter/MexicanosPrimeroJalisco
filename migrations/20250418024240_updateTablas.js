export const up = async (knex) => {
    // 1. Eliminar columnas de format_school
    await knex.schema.alterTable('format_school', (table) => {
      table.dropColumn('principalID');
      table.dropColumn('supervisorID');
      table.dropColumn('groupID');
      table.dropColumn('shoolDataID');
    });
  
    // 2. Agregar formatSchoolID a principal
    await knex.schema.alterTable('principal', (table) => {
      table
        .integer('formatSchoolID')
        .unsigned()
        .references('formatSchoolID')
        .inTable('format_school')
        .onDelete('CASCADE');
    });
  
    // 3. Agregar formatSchoolID a supervisor
    await knex.schema.alterTable('supervisor', (table) => {
      table
        .integer('formatSchoolID')
        .unsigned()
        .references('formatSchoolID')
        .inTable('format_school')
        .onDelete('CASCADE');
    });
  
    // 4. Modificar groups: eliminar groupID de format_school y agregar formatSchoolID
    await knex.schema.alterTable('groups', (table) => {
      table
        .integer('formatSchoolID')
        .unsigned()
        .references('formatSchoolID')
        .inTable('format_school')
        .onDelete('CASCADE');
    });
  
    // 5. Modificar school_data: eliminar schoolDataID de format_school y agregar formatSchoolID
    await knex.schema.alterTable('school_data', (table) => {
      table
        .integer('formatSchoolID')
        .unsigned()
        .references('formatSchoolID')
        .inTable('format_school')
        .onDelete('CASCADE');
    });
  };
  
  export const down = async (knex) => {
    // 1. Revertir school_data
    await knex.schema.alterTable('school_data', (table) => {
      table.dropColumn('formatSchoolID');
    });
  
    // 2. Revertir groups
    await knex.schema.alterTable('groups', (table) => {
      table.dropColumn('formatSchoolID');
    });
  
    // 3. Revertir supervisor
    await knex.schema.alterTable('supervisor', (table) => {
      table.dropColumn('formatSchoolID');
    });
  
    // 4. Revertir principal
    await knex.schema.alterTable('principal', (table) => {
      table.dropColumn('formatSchoolID');
    });
  
    // 5. Volver a agregar columnas a format_school
    await knex.schema.alterTable('format_school', (table) => {
      table
        .integer('principalID')
        .unsigned()
        .nullable()
        .references('principalID')
        .inTable('principal');
  
      table
        .integer('supervisorID')
        .unsigned()
        .nullable()
        .references('supervisorID')
        .inTable('supervisor');
  
      table
        .integer('groupID')
        .unsigned()
        .nullable()
        .references('groupID')
        .inTable('groups');
  
      table
        .integer('shoolDataID')
        .unsigned()
        .nullable()
        .references('schoolDataID')
        .inTable('school_data');
    });
  };
  