import { Router } from "express";
import si from 'systeminformation';

import { Request, Response, Next } from "../http-client";

const router = Router();

router.get('/', async (req: Request, res: Response, next: Next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

export default router;
