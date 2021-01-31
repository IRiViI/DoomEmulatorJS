import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chess-game-page',
  templateUrl: './chess-game-page.component.html',
  styleUrls: ['./chess-game-page.component.css']
})
export class ChessGamePageComponent implements OnInit {

  public board: any[][] = []; 

  public pieces: any = {
    "king": {
      "name":"king",
      "number":0,
      "colour":undefined,
    },
    "queen": {
      "name":"queen",
      "number":1,
      "colour":undefined,
    },
    "bishop": {
      "name":"bishop",
      "number":2,
      "colour":undefined,
    },
    "knight": {
      "name":"knight",
      "number":3,
      "colour":undefined,
    },
    "rook": {
      "name":"rook",
      "number":4,
      "colour":undefined,
    },
    "pawn": {
      "name":"pawn",
      "number":5,
      "colour":undefined,
    },
  }

  public selectedLocation = undefined;

  public players = [
    {
      name:"Player 1",
      colour: "light",
    },
    {
      name:"Player 2",
      colour: "dark",
    }
  ]

  public turnPlayer = undefined;

  public localPlayer = undefined;

  constructor() { }

  ngOnInit(): void {
    this.createBoard();
    this.clearBoard();
    this.setClassicLayout();
    this.initiateStartingPlayer();
    this.localPlayer = this.players[0];
  }

  private initiateStartingPlayer(){
    for (let player of this.players){
      if (player.colour == "light"){
        this.turnPlayer = player;
      }
    }
  }

  private createBoard(){
    for (var y = 0; y < 8; y++){
      var row = [];
      this.board.push(row);
      for (var x = 0; x < 8; x++){
        row.push([]);
      }
    }
  }

  private clearBoard(){
    for (var y = 0; y < 8; y++){
      for (var x = 0; x < 8; x++){
        var even = (x+y)%2;
        this.board[y][x]={
          x:x,
          y:y,
          class: even ? "dark" : "light",
          piece: undefined
        };
      }
    }
  }

  private createPiece(colour, name){
    var newPiece = {}
    Object.assign(newPiece, this.pieces[name]);
    newPiece["colour"] = colour;
    newPiece["moved"]=false;
    newPiece["skin"] = "/assets/images/chess/classic/" + colour + "/" + name + ".png";
    return newPiece;
  }

  private setClassicLayout(){
    this.board[0][0].piece=this.createPiece("dark","rook");
    this.board[0][1].piece=this.createPiece("dark","knight");
    this.board[0][2].piece=this.createPiece("dark","bishop");
    this.board[0][3].piece=this.createPiece("dark","queen");
    this.board[0][4].piece=this.createPiece("dark","king");
    this.board[0][5].piece=this.createPiece("dark","bishop");
    this.board[0][6].piece=this.createPiece("dark","knight");
    this.board[0][7].piece=this.createPiece("dark","rook");
    for (var x = 0; x < 8; x++){
      this.board[1][x].piece=this.createPiece("dark","pawn");
    }

    this.board[7][0].piece=this.createPiece("light","rook");
    this.board[7][1].piece=this.createPiece("light","knight");
    this.board[7][2].piece=this.createPiece("light","bishop");
    this.board[7][3].piece=this.createPiece("light","queen");
    this.board[7][4].piece=this.createPiece("light","king");
    this.board[7][5].piece=this.createPiece("light","bishop");
    this.board[7][6].piece=this.createPiece("light","knight");
    this.board[7][7].piece=this.createPiece("light","rook");
    for (var x = 0; x < 8; x++){
      this.board[6][x].piece=this.createPiece("light","pawn");
    }
  }

  public selectLocation(location){
    // Check if it is players turn
    // if (this.localPlayer != this.turnPlayer ){
    //   return;
    // }
    this.selectedLocation = location;
  }

  public dropLocation(location){
    if (location == this.selectedLocation){
      this.selectedLocation = undefined;
      return
    }

    var startPosition = [this.selectedLocation.x, this.selectedLocation.y];
    var endPosition = [location.x, location.y];
    var piece = this.selectedLocation.piece;
    var targetPiece = location.piece;

    var validMove = this.checkMovement(piece, targetPiece, startPosition, endPosition);
    if (validMove == false){
      this.selectedLocation = undefined;
      return
    }

    location.piece = this.selectedLocation.piece;
    this.selectedLocation.piece = undefined;
    piece.moved = true;
    this.selectedLocation = undefined;
  }

  public onMousemove(event){
    if(event.stopPropagation) event.stopPropagation();
    if(event.preventDefault) event.preventDefault();
  }

  private checkMovement(piece, targetPiece, startPosition, endPosition){
    // No piece can remove their own pieces
    if (targetPiece && targetPiece.colour == piece.colour){
      return false;
    }
    // Check pawn movements
    if (piece.name=="pawn"){
      return this.isLegalPawnMove(piece, targetPiece, startPosition, endPosition);
    }
    // Check rooky movements
    if (piece.name=="rook"){
      return this.isLegalRookMove(piece, targetPiece, startPosition, endPosition);
    }
    return false
  }

  private isLegalRookMove(piece, targetPiece, startPosition, endPosition){
    if (startPosition[0]==endPosition[0]){
      let counter = 0;
      var direction = endPosition[1] > startPosition[1] ? 1 : -1;
      if (direction == 1){
        let hasPiece = false;
        for (let y = startPosition[1]+1; y<endPosition[1]; y++){
          hasPiece = this.hasPieceByPosition([startPosition[0], y]);
          if (hasPiece){
            return false;
          }
        }
      } else {
        let hasPiece = false;
        for (let y = startPosition[1]-1; y>endPosition[1]; y--){
          hasPiece = this.hasPieceByPosition([startPosition[0], y]);
          if (hasPiece){
            return false;
          }
        }
      }
      return true;
    } 

    else if(startPosition[1]==endPosition[1]){
      let counter = 0;
      var direction = endPosition[0] > startPosition[0] ? 1 : -1;
      if (direction == 1){
        let hasPiece = false;
        for (let x = startPosition[0]+1; x<endPosition[0]; x++){
          hasPiece = this.hasPieceByPosition([x, startPosition[1]]);
          if (hasPiece){
            return false;
          }
        }
      } else {
        let hasPiece = false;
        for (let x = startPosition[0]-1; x>endPosition[0]; x--){
          hasPiece = this.hasPieceByPosition([x, startPosition[1]]);
          if (hasPiece){
            return false;
          }
        }
      }
      return true;
    }

    else {
      return false;
    }
  }

  private isLegalPawnMove(piece, targetPiece, startPosition, endPosition){
    var direction = (piece.colour == "dark") ? 1 : -1;
    // Check going in the same lane
    if (startPosition[0]==endPosition[0]){
      // Check performing 1 step
      if (endPosition[1]== startPosition[1] + direction){
        if (!targetPiece){
          return true;
        }
      } 
      // Check performing two steps
      else if(endPosition[1]== startPosition[1] + 2*direction){
        if (piece.moved){
          return false;
        }
        var hasPiece = this.hasPiecesByPosition([
          endPosition,
          [startPosition[0], startPosition[1] + 2*direction]
        ]);
        if (!hasPiece){
          return true;
        }
      }
    } 
    // Check diagonal
    else if(
      // Lane next to it
      (startPosition[0]==endPosition[0]+1 || startPosition[0]==endPosition[0]-1) &&
      // Next row
      (endPosition[1]== startPosition[1] + direction)){
      if (targetPiece){
        return true;
      }
    }
    return false;
  }

  private hasPiecesByPosition(positions){
    var hasPiece = false;
    for(var position of positions){
      hasPiece = this.hasPieceByPosition(position);
      if (hasPiece){
        break;
      }
    }
    return hasPiece;
  }

  private hasPieceByPosition(position){
    var location = this.getLocationByPosition(position);
    return location.piece ? true : false;
  }

  private getLocationByPosition(position){
    return this.board[position[1]][position[0]];
  }

  // private getPieceByPosition(position){
  //   return this.board[position[1]][position[0]].piece;
  // }

}