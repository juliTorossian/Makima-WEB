import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlobService {
  toBlob(file: string): Observable<Blob> {
    return from(
      fetch(file)
        .then(res => res.blob())
        .then(blob => blob)
    );
  }
}
