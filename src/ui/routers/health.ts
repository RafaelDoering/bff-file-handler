import { Router } from "express";
import si from 'systeminformation';

const router = Router();

router.get('/', async (req, res) => {
  const cpuData = await si.currentLoad();
  const memData = await si.mem();

  const cpuLoadPercentage = cpuData.currentLoad;
  const freeMemory = memData.available;
  const totalMemory = memData.total;
  const freeMemoryPercentage = (freeMemory / totalMemory) * 100;

  res.status(200).json({
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
    cpuLoadPercentage: cpuLoadPercentage,
    totalMemory: totalMemory,
    freeMemory: freeMemory,
    freeMemoryPercentage: freeMemoryPercentage
  });
});

export default router;
