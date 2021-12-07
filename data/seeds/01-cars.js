exports.seed = function (knex) {
  return knex('cars')
    .truncate()
    .then(function () {
      return knex('cars').insert([
        {
          vin: '1HGCT2B88DA000025',
          make: 'Honda',
          model: 'Accord',
          mileage: 120000,
          title: 'clean',
          transmission: 'automatic',
        },
        {
          vin: 'WDDZF6BB9KA649XXX',
          make: 'Mercedes-Benz',
          model: 'AMG E53',
          mileage: 10000,
          title: 'clean',
          transmission: 'automatic',
        },
        {
          vin: 'WAUHGAFC6DN030356',
          make: 'Audi',
          model: 'A6',
          mileage: 20000,
          transmission: 'automatic',
        },
      ]);
    });
};
