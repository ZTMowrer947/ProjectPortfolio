module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/projects',
        permanent: true,
      },
    ];
  },
};
