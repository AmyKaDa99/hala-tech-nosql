import { NextFunction, Request, Response } from "express";

import Player from "../../models/collections/player";

export default class PlayerController {
  static async getAllPlayers( req: Request, res: Response, next: NextFunction ) {
   
    try {   
    const players = await Player.find().populate('position') 
    res.status(200).json(players)
    } catch (e) {
        console.log(`api, ${e}`);
        res.status(500).json({ error: e });
      }
  }

  static async addPlayer(req: Request, res: Response, next: NextFunction) {
   
    try {

      if (!req.body.name || typeof req.body.name !== "string") {
        res.status(400).json({ error: "Bad player format, expected string." });
        return;
      }

      if (!req.body.positionId || typeof req.body.positionId !== "string") {
        res.status(400).json({ error: "Bad player positionId, expected string." });
        return;
      }

      const newPlayer = new Player();
      newPlayer.position = req.body.positionId;
      newPlayer.name = req.body.name;
      await newPlayer.save();

      return res
        .status(201)
        .json(`id: ${newPlayer._id}, name: ${newPlayer.name} `);
    } catch (e) {
      console.log(`api, ${e}`);

      res.status(500).json("faild");
    }
  }

  static async updatePlayer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
      try {
        if (!req.params.id) {
            res.status(400).json({ error: "Missing argument, expected id." });
            return;
          }

          if (!req.body.positionId || typeof req.body.positionId !== "string") {
            res.status(400).json({ error: "Bad positionId format, expected string." });
            return;
          }

          
          if (!req.body.name || typeof req.body.name !== "string") {
            res.status(400).json({ error: "Bad position format, expected string." });
            return;
          }

          await Player.findOneAndUpdate({ id: req.params.id }, {position: req.body.positionId, name:req.body.name })
          
          res.status(201).json("updated!")
      } catch (e) {
        console.log(`api, ${e}`);
  
        res.status(500).json("faild");
      }
  }
}
