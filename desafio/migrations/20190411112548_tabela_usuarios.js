exports.up = function(knex) {
  return knex.schema
    .createTable('usuarios', table => {
      table.increments('id').primary();
      table.string('nome').notNull();
      table
        .string('email')
        .notNull()
        .unique();
      table.string('senha', 60);
      table
        .boolean('ativo')
        .notNull()
        .defaultTo(true);
      table.timestamp('data_criacao').defaultTo(knex.fn.now());
    })
    .then(function() {
      return knex('usuarios').insert([
        {
          nome: 'Paulo Roberto',
          email: 'prmorais1302@gmail.com',
          senha: 'Paulo13'
        },
        {
          nome: 'Maria Fernanda',
          email: 'nanda04@gmail.com',
          senha: 'Nanda04'
        },
        {
          nome: 'Ana Paula',
          email: 'anapaula09@gmail.com',
          senha: 'Ana09'
        }
      ]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};
