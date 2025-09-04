import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Place } from "../place.model";
import { PlacesComponent } from "../places.component";
import { PlacesContainerComponent } from "../places-container/places-container.component";

@Component({
  selector: "app-available-places",
  standalone: true,
  templateUrl: "./available-places.component.html",
  styleUrl: "./available-places.component.css",
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  // Alternative to the inject(HttpClient)
  // constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const subscription = this.httpClient
      .get<{ places: Place[] }>("http://localhost:3000/places", {
        observe: "events", // 'response', 'events'
      })
      .subscribe({
        next: (event) => {
          // event, redData
          console.log(event); // this is for observe: 'event'
          // console.log(resData.body?.places); this is for observe: 'response'
          // console.log(resData.body?.places);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
