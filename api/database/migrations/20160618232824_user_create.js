exports.up = function (knex, Promise) { // eslint-disable-line func-names
  return Promise.all([
    knex.schema.createTableIfNotExists('user', table => {
      table.increments('id').primary();
      table.string('email').unique();
      table.string('password');
      table.timestamps();
    })
  ]);
};


exports.down = function (knex, Promise) { // eslint-disable-line func-names
  return Promise.all([
    knex.schema.dropTableIfExists('user')
  ]);
};