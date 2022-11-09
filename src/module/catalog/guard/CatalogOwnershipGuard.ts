import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CatalogRepository } from '../repository/CatalogRepository';
import { PermissionEnum } from '../interface/PermissionEnum';

@Injectable()
export class CatalogOwnershipGuard implements CanActivate {
  constructor(private catalogRepository: CatalogRepository) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const userPermissions: string[] = request.user?.permissions || [];

    if (userPermissions.includes(PermissionEnum.ADMIN_CATALOG)) {
      return true;
    }

    const catalogUuid = request.params['uuid'];
    const userId = request.user.sub;

    return this.catalogRepository.isUserOwns(userId, catalogUuid);
  }
}
