import { NextFunction, Request, Response } from "express";

import Position from "../../models/collections/position";

export default class PositionController {
  static async getAllPositions( req: Request, res: Response, next: NextFunction ) {
   
    try {   
    const positons = await Position.find() 
    res.status(200).json(positons)
    } catch (e) {
        console.log(`api, ${e}`);
        res.status(500).json({ error: e });
      }
  }

  static async addPosition(req: Request, res: Response, next: NextFunction) {
   
    try {

      if (!req.body.position || typeof req.body.position !== "string") {
        res.status(400).json({ error: "Bad postion format, expected string." });
        return;
      }

      const newPosition = new Position();
      newPosition.position = req.body.position;
      await newPosition.save();

      return res
        .status(201)
        .json(`id: ${newPosition._id}, position: ${newPosition.position} `);
    } catch (e) {
      console.log(`api, ${e}`);

      res.status(500).json("faild");
    }
  }

  static async updatePosition(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
      try {
        if (!req.params.id) {
            res.status(400).json({ error: "Missing argument, expected id." });
            return;
          }

          if (!req.body.position || typeof req.body.position !== "string") {
            res.status(400).json({ error: "Bad position format, expected string." });
            return;
          }

          await Position.findOneAndUpdate({ id: req.params.id }, {position: req.body.position })
          
          res.status(201).json("updated!")
      } catch (e) {
        console.log(`api, ${e}`);
  
        res.status(500).json("faild");
      }
  }
}
