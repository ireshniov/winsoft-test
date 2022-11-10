import { TestingModule } from '@nestjs/testing';
import { createUnitTestingModule } from '../../AppModule.stub';
import { CatalogOwnershipGuard } from '../../../../src/module/catalog/guard/CatalogOwnershipGuard';
import { ExecutionContext } from '@nestjs/common';
import { PermissionEnum } from '../../../../src/module/catalog/interface/PermissionEnum';
import { CatalogRepository } from '../../../../src/module/catalog/repository/CatalogRepository';
import { buildSchema } from '@typegoose/typegoose';
import { Catalog } from '../../../../src/module/catalog/model/Catalog';

describe('CatalogOwnershipGuard', () => {
  let module: TestingModule;
  let catalogOwnershipGuard: CatalogOwnershipGuard;
  let catalogRepository: CatalogRepository;

  beforeEach(async () => {
    module = await createUnitTestingModule({
      providers: [
        {
          provide: 'CatalogModel',
          useValue: buildSchema(Catalog),
        },
        CatalogRepository,
        CatalogOwnershipGuard,
      ],
    });
    catalogOwnershipGuard = module.get(CatalogOwnershipGuard);
    catalogRepository = module.get(CatalogRepository);
  });

  afterEach(async () => {
    jest.clearAllMocks();

    await module.close();
  });

  describe('canActivate', () => {
    it('Should return true when user has admin:catalog permission', async (): Promise<any> => {
      const givenContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              permissions: [PermissionEnum.ADMIN_CATALOG],
            },
          }),
        }),
      };

      const result: boolean = await catalogOwnershipGuard.canActivate(
        <ExecutionContext>givenContext,
      );

      expect(result).toEqual(true);
    });
    it('Should return true when user owns catalog', async (): Promise<any> => {
      const catalogRepositoryIsUserOwnsSpec = jest
        .spyOn(catalogRepository, 'isUserOwns')
        .mockResolvedValue(true);

      const givenContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              permissions: [],
              sub: 'auth0|636bb6921f04433c4715c95c',
            },
            params: {
              uuid: 'f6917991-0e84-4602-bebb-ad755a8c4411',
            },
          }),
        }),
      };

      const result: boolean = await catalogOwnershipGuard.canActivate(
        <ExecutionContext>givenContext,
      );

      expect(catalogRepositoryIsUserOwnsSpec).toBeCalledWith(
        'auth0|636bb6921f04433c4715c95c',
        'f6917991-0e84-4602-bebb-ad755a8c4411',
      );

      expect(result).toEqual(true);
    });
    it('Should return false when user not owns catalog', async (): Promise<any> => {
      const catalogRepositoryIsUserOwnsSpec = jest
        .spyOn(catalogRepository, 'isUserOwns')
        .mockResolvedValue(false);

      const givenContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              permissions: [],
              sub: 'auth0|636bb6921f04433c4715c95c',
            },
            params: {
              uuid: 'f6917991-0e84-4602-bebb-ad755a8c4411',
            },
          }),
        }),
      };

      const result: boolean = await catalogOwnershipGuard.canActivate(
        <ExecutionContext>givenContext,
      );

      expect(catalogRepositoryIsUserOwnsSpec).toBeCalledWith(
        'auth0|636bb6921f04433c4715c95c',
        'f6917991-0e84-4602-bebb-ad755a8c4411',
      );

      expect(result).toEqual(false);
    });
  });
});
