const { config } = require(`./_config/${process.env.NODE_ENV}.config`);
const axios = require('axios');

describe(`${config.url}`, () => {
  describe('Check API functionality', () => {
    it('Health Check', async () => {
      const resultApi = await axios.get(config.url);
      const {
        status,
        config: { url }
      } = resultApi;
      expect(status).toBe(200);
      expect(url).toBe(config.url);
    });
    it('Data finder scraping license', async () => {
      const resultApi = await axios.post(`${config.url}/verifyLicense`, {
        licenseNumber: 700085,
        professionCode: 'RN',
        stateId: 9
      });
      const { status, data } = resultApi;
      expect(status).toBe(200);
      expect(data.inFound).toBe(true);
      expect(typeof data.screenshotToken).toBe('string');
    });
  });
});
