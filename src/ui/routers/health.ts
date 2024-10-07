import os from "os-utils";
import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  os.cpuFree((percentage) => {
    return res.status(200).json({
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date(),
      freeCpuPercentage: percentage,
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      freeMemoryPercentage: os.freememPercentage()
    });
  })
});

export default router;
