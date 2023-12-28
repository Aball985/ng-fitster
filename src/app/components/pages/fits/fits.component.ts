import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MouseCoordinatesState } from '../../../interfaces/mouse-coordinates.state';
import { Observable, take } from 'rxjs';
import {
  selectCoordinates,
  selectXCoordinate,
  selectYCoordinate,
} from '../../../store/selectors/mouse/mouse-coordinates.selector';
import { TrackMouseCoordinatesDirective } from '../../../directives/mouse-coordinates.directive';
import { AsyncPipe, NgOptimizedImage, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../services/modal/modal.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-fits',
  standalone: true,
  imports: [
    TrackMouseCoordinatesDirective,
    AsyncPipe,
    FormsModule,
    NgOptimizedImage,
    JsonPipe,
    ModalComponent,
  ],
  templateUrl: './fits.component.html',
  styleUrl: './fits.component.scss',
})
export class FitsComponent implements OnInit {
  x_Coord$!: Observable<number>;
  y_Coord$!: Observable<number>;
  safeUrl!: SafeResourceUrl;

  isPointsVisible: boolean = true;
  isLinkModalVisible: boolean = false;
  isCursorPointVisible: boolean = false;

  currentPointsLength: number = 0;
  maxNumberOfCords: number = 10;

  linkInputText: string = '';

  points: MouseCoordinatesState[] = [];

  testPoints: MouseCoordinatesState[] = [
    {
      x: 317.5,
      y: 172,
      link: 'https://shopbauhaus.com/products/mlb-new-york-yankees-47-clean-up-cap-white-one-size',
    },
    {
      x: 322.5,
      y: 412,
      link: 'https://www.murdochs.com/products/mens/clothing/coats-jackets/wrangler-mens-blanket-lined-western-jacket/',
    },

    {
      x: 366.5,
      y: 608,
      link: 'https://www.wrangler.com/shop/wrangler-authentics-regular-fit-comfort-waist-jeandark-stonewash3229-10ZM1CSDS%3A32%3A29.html',
    },

    {
      x: 342.5,
      y: 807,
      link: 'https://www.farfetch.com/shopping/men/vans-old-skool-sneakers-item-12174327.aspx?fsb=1&size=31&storeid=11218',
    },

    {
      x: 380.5,
      y: 769,
      link: 'https://www.amazon.com/Dickies-6-Pair-Cushion-Socks-White/dp/B00BU9T0BA/ref=sr_1_5?keywords=plain+white+socks&qid=1703571254&sr=8-5',
    },

    {
      x: 341.5,
      y: 223,
      link: 'https://www.target.com/p/safe-mate-washable-reusable-cloth-masks-kids-multi-packs-includes-filters/-/A-82040846?preselect=82040845#lnk=sametab',
    },

    {
      x: 396.5,
      y: 182,
      link: 'https://www2.hm.com/en_us/productpage.0970819007.html',
    },
  ];

  constructor(
    private store: Store,
    private afAuth: AngularFireAuth,
    private domSanitizer: DomSanitizer,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getCoordinateStoreSelects();
    this.handleLoadingPoints();
    this.countPointLength();
  }

  openAllLinks(fromModal: boolean = false): void {
    this.modalService.open('openAllFitWarning');
    if (fromModal) {
      const filtered: MouseCoordinatesState[] = this.points.filter(
        (point) => point.link
      );

      this.asyncOpenAllLinks(filtered);
    }
  }

  async asyncOpenAllLinks(links: MouseCoordinatesState[]): Promise<void> {
    for (let i = 0; i < links.length; i++) {
      const link = links[i].link;

      await this.openLink(link);
    }
  }

  async openLink(link: string | undefined): Promise<void> {
    window.open(link, '_blank');

    return new Promise((resolve) => {
      setTimeout(() => resolve(), 750);
    });
  }

  sanitizeUrl(url: string): SafeResourceUrl | undefined {
    if (url) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return;
  }

  undoLastPoint(): void {
    this.points.pop();
  }

  countPointLength(): void {
    if (this.points.length) {
      this.currentPointsLength = this.points.length;
    }
  }

  handleLoadingPoints(): void {
    this.points = JSON.parse(JSON.stringify(this.testPoints));
  }

  plotPoint(): void {
    this.store
      .select(selectCoordinates)
      .pipe(take(1))
      .subscribe((newPoint: MouseCoordinatesState) => {
        if (
          (newPoint.x || newPoint.y) &&
          !this.points.find((point) => point === newPoint) &&
          this.points.length < this.maxNumberOfCords
        ) {
          this.points.push(newPoint);
        }
        console.log(this.points);
      });
  }

  clearPoints(): void {
    this.points = [];
  }

  getCoordinateStoreSelects(): void {
    this.x_Coord$ = this.store.select(selectXCoordinate);
    this.y_Coord$ = this.store.select(selectYCoordinate);
  }

  hideAllPoints(): void {
    this.isPointsVisible = !this.isPointsVisible;
  }

  toggleLinkModal(): void {
    this.isLinkModalVisible = !this.isLinkModalVisible;
    this.linkInputText = '';
  }

  addLinkToPoint(pointIndex: number): void {
    if (this.linkInputText.length) {
      this.points[pointIndex].link = this.linkInputText;
      this.linkInputText = '';
    }
  }

  logout(): void {
    this.afAuth.signOut();
  }

  closeModal() {
    this.modalService.close();
  }
}
