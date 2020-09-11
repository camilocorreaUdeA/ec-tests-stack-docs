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

    it('Check if employer use image now', async () => {
      const resultApi = await axios.post(`${config.url}/imageNow/useImageNow`, {
        employerId: config.employerUserImageNow
      });
      const { status, data } = resultApi;
      expect(status).toBe(200);
      expect(data.useImageNow === 1 || data.useNewImageNow == 1).toBeTruthy();
    });
  });
});
