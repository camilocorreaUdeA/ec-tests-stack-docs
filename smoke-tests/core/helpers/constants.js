module.exports = {
  SAVE_TEST_RESULTS_ENDPOINT: '/smokeTesting/saveResult',
  METRICS_WAIT_TIME: 50,
  METRICS_SMOKE_TESTS_TOTAL: 'smoke_tests_total',
  METRICS_SMOKE_TESTS_STATUS: 'smoke_test_status',
  METRICS_SMOKE_TESTS_DURATION: 'smoke_test_duration_seconds',
  METRICS_SMOKE_TESTS_LAST_TIME: 'smoke_tests_last_time',
  METRICS_SMOKE_TESTS_SUITE_STATUS: 'smoke_service_suite_status',
  PUPPETEER: {
    ERROR_NAVIGATION_IN_PROGRESS:
      'Execution context was destroyed, most likely because of a navigation.',
    BROWSER_DEFAULT_OPTIONS: {
      headless: true,
      slowMo: 0,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-profile']
    },
    PAGE_VIEW_PORT_DEFAULT_OPTIONS: {
      width: 1024,
      height: 900
    },
    TIME_OUT: +process.env.PUPPETEER_TIMEOUT || 60000,
    PAGE_GOTO_DEFAULT_OPTIONS: {
      waitUntil: 'networkidle0'
    },
    PAGE_DEFAULT_TIMEOUT: 1000 * 30,
    PAGE_DEFAULT_NAVIGATION_TIMEOUT: 1000 * 30,
    PAGE_DEFAULT_NAVIGATION_TIMEOUT_LONG: 1000 * 90,
    PAGE_WAIT_TIME_BEFORE_TEST: 500
  },

  APPS_OWNERS: {
    'api.evercheck.com/v1': 'ecdevteam',
    'api.wallet.evercheck.com': 'ecdevteam',
    'auth.evercheck.com': 'ecdevteam',
    'evercheck.com/api': 'ecdevteam',
    'monitoring.evercheck.com/api': 'ecdevteam',
    'payment.evercheck.com/api/v1': 'ecdevteam',
    'secure.evercheck.com/api': 'ecdevteam',
    'posthire.evercheck.com': 'ecdevteam',
    'workgroups.evercheck.com': 'ecdevteam',
    'evercheckwallet.com/api/v1': 'ecdevteam',
    'mobile.evercheckwallet.com/api/v1': 'ecdevteam',
    'upload.evercheck.com': 'ecdevteam',
    'prehire.evercheck.com/api/applicants/v1': 'ecdevteam',
    'workers-lv.evercheck.com/scraping-queue': 'ecdevteam',
    'workers-lv.evercheck.com/screenshot-queue': 'ecdevteam',
    'workers-lv.evercheck.com/verification-queue': 'ecdevteam',
    'verification.evercheck.com': 'ecdevteam',
    'screenshot.evercheck.com': 'ecdevteam',
    'scraping.evercheck.com': 'ecdevteam',
    'lvjobs.evercheck.com': 'ecdevteam',
    'ocr.evercheck.com': 'ecdevteam',
    'workers-prehire.evercheck.com/upload': 'ecdevteam',
    'workers-prehire.evercheck.com/lvservice': 'ecdevteam',
    'workers-prehire.evercheck.com/events': 'ecdevteam',
    'workers-prehire.evercheck.com/export': 'ecdevteam',
    'messagecenter.evercheck.com': 'ecdevteam',
    'workers-prehire.evercheck.com/imagenow': 'ecdevteam',
    'storage.evercheck.com': 'ecdevteam',
    'education.evercheck.com/api': 'ecdevteam',
    'education.evercheck.com/workers': 'ecdevteam'
  }
};
