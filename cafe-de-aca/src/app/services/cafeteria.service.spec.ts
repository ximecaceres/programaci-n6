
import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { provideHttpClient } from '@angular/common/http';
import { CafeteriaService } from './cafeteria.service';

describe('CafeteriaService', () => {
  let service: CafeteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });

    service = TestBed.inject(CafeteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
