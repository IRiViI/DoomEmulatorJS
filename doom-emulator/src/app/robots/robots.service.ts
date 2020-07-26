import { Injectable } from '@angular/core';
import { Robot } from "./robot";

@Injectable({
  providedIn: 'root'
})
export class RobotsService {

  public robots: Robot[] = [
  {
    name: "Bender",
    nickName: "ShinyMetalAss69",
    id:0,
    positive: -1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/Bender.png",
  },
  {
    name: "Andrew",
    nickName: "Andrew",
    id:1,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/Bicentennial.png",
  },
  {
    name: "Baymax",
    nickName: "BigMichelin",
    id:2,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/BigHero8.png",
  },
  {
    name: "ATLAS",
    nickName: "LeaderOfTitanes",
    id:3,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/Blue.png",
  },
  {
    name: "Bumble Bee",
    nickName: "BeeThere",
    id:4,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/BumbleBee.png",
  },
  {
    name: "C3PO",
    nickName: "GoldenGod",
    id:5,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/C3PO.png",
  },
  {
    name: "Chappie",
    nickName: "KeepItGangster15",
    id:6,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/Chappie.png",
  },
  {
    name: "DinkleBot",
    nickName: "NotDinkleBot",
    id:7,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/DingleBot.png",
  },
  {
    name: "Eve",
    nickName: "Eeevveeeeeeh",
    id:8,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/Eve.png",
  },
  {
    name: "FrankensteinsMonster",
    nickName: "NotFrankensteinOrMonsterOrRobot",
    id:9,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/FrankensteinsMonster.png",
  },
  {
    name: "GlaDOS",
    nickName: "ScienceLover86",
    id:10,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/GlaDOS.png",
  },
  {
    name: "Marvin",
    nickName: "DON'TBOTHER",
    id:11,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/Marvin.png",
  },
  {
    name: "P-body",
    nickName: "PStandsTall",
    id:12,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/Orange.png",
  },
  {
    name: "R2D2",
    nickName: ".... . .-.. .-.. ---",
    id:13,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/R2D2.png",
  },
  {
    name: "Rosey",
    nickName: "HomeCleanHome",
    id:14,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/Rosie.png",
  },
  {
    name: "Sentry",
    nickName: "ISeeYouYouSeeMeByeBye",
    id:15,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/Sentry.png",
  },
  {
    name: "Wall-E",
    nickName: "TheFinalcompactor",
    id:16,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/Wall-E.png",
  },
  {
    name: "Wheatley",
    nickName: "DestinedForGreatNess",
    id:17,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/Wheatley.png",
  },
  {
    name: "Awesome-O",
    nickName: "EpicSlimBoyGOD",
    id:18,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/awesome-O.png",
  },
  {
    name: "Butter robot",
    nickName: "PurposeSeeker",
    id:19,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/butterrobot.png",
  },
  {
    name: "Hal9000",
    nickName: "HAL10001100101000Dave",
    id:20,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/hal9000.png",
  },
  {
    name: "Sonny",
    nickName: "WhatDoesItAllMean",
    id:21,
    positive: 1,
    imageSrc:"https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/robots/iRobot.png",
  },
  ]

  constructor() { 


  }
}
