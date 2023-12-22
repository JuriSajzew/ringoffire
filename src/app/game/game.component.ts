import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { GameInfoComponent } from '../game-info/game-info.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) {
    this.game = new Game();
  };

  ngOnInit(): void {
  }

  pickCard() {
    if (!this.pickCardAnimation) { //wenn "pickCardAnimation = true" ist dann wird diese Funktion ausgeführt
      const poppedCard = this.game.stack.pop();
      if (poppedCard !== undefined) {
        this.currentCard = poppedCard;
        this.pickCardAnimation = true;

        this.activePlayer();
      }
      setTimeout(() => { //nach 1,5sekunden wird die "pickCardAnimation" auf "false" gesetzt
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

  activePlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }
}
