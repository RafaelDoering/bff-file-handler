import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  });
});

export default router;
