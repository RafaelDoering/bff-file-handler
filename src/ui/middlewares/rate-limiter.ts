import rateLimit from 'express-rate-limit';
import si from 'systeminformation';

const MAX_CPU_THRESHOLD = 80; // 80%
const MIN_MEM_THRESHOLD = 0.1; // 10%
const RATE_LIMIT_WINDOW_IN_MS = 10 * 1000; // 10 seconds
const MAX_REQUESTS_IN_WINDOW = 1;

async function getDynamicRateLimit() {
  const cpuData = await si.currentLoad();
  const memData = await si.mem();

  const cpuLoad = cpuData.currentLoad;
  const freeMemory = memData.available;
  const totalMemory = memData.total;
  const freeMemoryPercentage = freeMemory / totalMemory;

  let maxRequestsPerMinute = MAX_REQUESTS_IN_WINDOW;

  if (cpuLoad > MAX_CPU_THRESHOLD) {
    maxRequestsPerMinute = maxRequestsPerMinute * 0.5;
  }

  if (freeMemoryPercentage < MIN_MEM_THRESHOLD) {
    maxRequestsPerMinute = maxRequestsPerMinute * 0.5;
  }

  return maxRequestsPerMinute;
}

export default rateLimit({
  windowMs: RATE_LIMIT_WINDOW_IN_MS,
  max: async () => await getDynamicRateLimit(),
});
