import { Reflector } from '@nestjs/core';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CallHandler } from '@nestjs/common/interfaces';

import { get } from 'lodash';
import { Observable, of } from 'rxjs';
import { Cache } from 'cache-manager';

const THREE_HOURS_IN_SECONDS = 1000 * 60 * 3;

@Injectable()
export class AuthCacheInterceptor extends CacheInterceptor {
  private readonly excludePaths = ['/login'];

  constructor(
    @Inject(CACHE_MANAGER) readonly cacheManager: Cache,
    readonly reflector: Reflector,
  ) {
    super(cacheManager, reflector);
  }

  protected isRequestCacheable(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    return (
      this.allowedMethods.includes(req.method) &&
      !this.excludePaths.includes(req.url)
    );
  }

  private cacheResponse(
    context: ExecutionContext,
    response: Observable<any>,
    cacheKey: string,
  ): void {
    response.subscribe((data) => {
      if (!this.isRequestCacheable(context)) return;
      this.cacheManager.set(cacheKey, data, THREE_HOURS_IN_SECONDS);
    });
  }

  trackBy(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = get(request, 'headers.authorization', '');
    const authorizationToken = authorizationHeader.replace('Bearer ', '');
    const route = get(request, 'route.path', '');

    return `${authorizationToken}-${route}`;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const cacheKey = this.trackBy(context);
    const cachedResponse = await this.cacheManager.get(cacheKey);

    if (!cachedResponse) {
      const response = next.handle();
      this.cacheResponse(context, response, cacheKey);
      return response;
    }

    return of(cachedResponse);
  }
}
