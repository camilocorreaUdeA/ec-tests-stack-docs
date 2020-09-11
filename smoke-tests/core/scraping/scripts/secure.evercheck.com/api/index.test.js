const { config } = require(`./_config/${process.env.NODE_ENV}.config`);
const axios = require('axios');

describe(`${config.url}`, () => {
  describe('Check internal components status', () => {
    let resultApi;
    beforeAll(async () => {
      resultApi = await axios.get(config.url);
    });

    it('Internet connection', async () => {
      const {
        status,
        config: { url }
      } = resultApi;
      expect(status).toBe(200);
      expect(url).toBe(config.url);
    });

    it('Service connection', async () => {
      const {
        data: { service }
      } = resultApi;
      expect(service).toMatch('Evercheck One service is still running');
    });
    it('Database connection', async () => {
      const {
        data: { database }
      } = resultApi;

      expect(database).toBe('Connection with Database has been established successfully');
    });
  });
});
