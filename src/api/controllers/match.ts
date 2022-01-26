import { NextFunction, Request, Response } from "express";

import Match from "../../models/collections/match";

export default class MatchController {
 
    static async getAllMatches( req: Request, res: Response, next: NextFunction ) {   
    try {   
    const matches = await Match.find()
    res.status(200).json(matches)
    } catch (e) {
        console.log(`api, ${e}`);
        res.status(500).json({ error: e });
      }
  }

  static async addMatch(req: Request, res: Response, next: NextFunction) {
   
    try {

      const newMatch = new Match();
      newMatch.teamOne = req.body.teamOne;
      newMatch.teamTwo = req.body.teamTwo;
      newMatch.date = req.body.date;
      await newMatch.save();

      return res
        .status(201)
        .json(newMatch);
    } catch (e) {
      console.log(`api, ${e}`);

      res.status(500).json("faild");
    }
  }

  static async updatePlayerMatch(
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
        
          if (!req.body.name || typeof req.body.name !== "string") {
            res.status(400).json({ error: "Bad position format, expected string." });
            return;
          }

          if (!req.body.id || typeof req.body.id !== "number") {
            res.status(400).json({ error: "Bad position format, expected string." });
            return;
          }

          let updated
          console.log(updated)

          if(req.body.teamOne && typeof req.body.teamOne == "string"){
   
            updated = await Match.findOneAndUpdate({
              id: req.params.id, "teamOne.name": req.body.teamOne, 'teamOne.players.$.id': req.body.id },
              { '$set':  {'teamOne.players.$.position': req.body.position,
                          'teamOne.players.$.name': req.body.name
          
            }
          }
          )} 
          
          if(req.body.teamTwo && typeof req.body.teamTwo == "string"){
          
            updated =  await Match.findOneAndUpdate({
              id: req.params.id, "teamTwo.name": req.body.teamTwo, 'teamOne.players.$.id': req.body.id},
              { '$set':  {'teamTwo.players.$.position': req.body.position,
                          'teamTwo.players.$.name': req.body.name }
          
            })
          }
          
          if (!updated){
            res.status(400).json({ error: "Bad team format, expected string." });
            return;
           }
       
          
          res.status(201).json("updated!")
      } catch (e) {
        console.log(`api, ${e}`);
  
        res.status(500).json("faild");
      }
  }
}
