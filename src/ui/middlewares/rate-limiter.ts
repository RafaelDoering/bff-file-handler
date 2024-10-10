import rateLimit from 'express-rate-limit';
import si from 'systeminformation';
import { RATE_LIMIT_MAX_REQUESTS_IN_TIME_WINDOW, RATE_LIMIT_TIME_WINDOW_IN_MS } from '../../env';

const MAX_CPU_THRESHOLD = 80; // 80%
const MIN_MEM_THRESHOLD = 0.1; // 10%

async function getDynamicRateLimit() {
  const cpuData = await si.currentLoad();
  const memData = await si.mem();

  const cpuLoad = cpuData.currentLoad;
  const freeMemory = memData.available;
  const totalMemory = memData.total;
  const freeMemoryPercentage = freeMemory / totalMemory;

  let maxRequestsPerMinute = RATE_LIMIT_MAX_REQUESTS_IN_TIME_WINDOW;

  if (cpuLoad > MAX_CPU_THRESHOLD) {
    maxRequestsPerMinute = maxRequestsPerMinute * 0.5;
  }

  if (freeMemoryPercentage < MIN_MEM_THRESHOLD) {
    maxRequestsPerMinute = maxRequestsPerMinute * 0.5;
  }

  return maxRequestsPerMinute;
}

export default rateLimit({
  windowMs: RATE_LIMIT_TIME_WINDOW_IN_MS,
  max: async () => await getDynamicRateLimit(),
});
