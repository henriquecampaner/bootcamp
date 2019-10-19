module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  port: 5433,
  username: 'postgres',
  password: 91327915,
  database: 'gobarber',
  define: {
    timestamps: true,
    // para colocar createdAt
    underscored: true,
    underscoredAll: true,
  },
};
