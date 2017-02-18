/* eslint-disable no-console */

'use strict';

function removeFields(database, connection) {
  console.log('Removing fields `status` from `stations` table...');

  return new Promise((resolve, reject) => {
    database.db('radio_api')
      .table('stations')
      .replace(station => station.without('status'))
      .run(connection, results => {
        console.log('...done');
        resolve();
      });
  });
}

function addFields(database, connection) {
  console.log('Adding fields `status` to `stations` table...');

  return new Promise((resolve, reject) => {
    database.db('radio_api')
      .table('stations')
      .update({ status: null })
      .run(connection, results => {
        console.log('...done');
        resolve();
      });
  });
}

function up(database, connection) {
  return removeFields(database, connection)
    .catch(console.log);
}

function down(database, connection) {
  return addFields(database, connection)
    .catch(console.log);
}

module.exports.up   = up;
module.exports.down = down;