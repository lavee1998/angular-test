import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  computed,
  ContentChild,
  ContentChildren,
  ElementRef,
  input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-hang-tree',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './hang-tree.component.html',
  styleUrl: './hang-tree.component.css',
})
export class HangTreeComponent {
  get wrongTips() {
    return this.gameService.wrongTips;
  }

  full = input<boolean>(false);

  constructor(private gameService: GameService) {}

  // @ViewChild('hangTree') hangTreeSvg: ElementRef<SVGElement> | undefined;
  // ngAfterViewInit() {
  //   console.log('???', this.hangTreeSvg?.nativeElement.childNodes.item);
  //   this.hangTreeSvg?.nativeElement.innerHTML = this.hangTreeSvg?.nativeElement.childNodes;
  // }
  pathCount = computed<number>(() => this.pathsArray.length - this.wrongTips());
  pathsArray: string[] = [
    '<path d="M1,11 h8" />',
    '<path d="M9,11 v-10" />',
    '<path d="M9,1 h-4" />',
    '<path d="M5,1 v2" />',
    '<circle cx="5" cy="4" r="1" />',
    '<path d="M5,5 v3" />',
    '<path d="M5,5 l-2,2" />',
    '<path d="M5,5 l2,2" />',
    '<path d="M5,8 l-2,2" />',
    '<path d="M5,8 l2,2" />',
  ];
}
