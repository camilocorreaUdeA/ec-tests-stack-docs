const { config } = require(`./_config/${process.env.NODE_ENV}.config`);
const axios = require('axios');

describe(`${config.url}`, () => {
  describe('Worker: Check internal components status', () => {
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
  });
});
