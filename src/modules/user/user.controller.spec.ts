import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: '1',
        ...dto,
      };
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          isActive: true,
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          isActive: false,
        },
      ];
    }),
    findOne: jest.fn((id) => {
      return {
        id,
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn((id) => {
      return {
        id,
        deleted: true,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {
    it('should create a new User', () => {
      const dto = {
        firstName: 'Jose',
        lastName: 'deamore',
        isActive: false,
      };
      expect(controller.create(dto)).toEqual({
        id: expect.any(String),
        ...dto,
      });
      expect(mockUserService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('FindAll', () => {
    it('should return an array of Users', () => {
      expect(controller.findAll()).toEqual([
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          isActive: true,
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          isActive: false,
        },
      ]);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('FindOne', () => {
    it('should return a User by ID', async () => {
      const userId = '1';
      expect(await controller.findOne(userId)).toEqual({
        id: +userId,
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      });
      expect(mockUserService.findOne).toHaveBeenCalledWith(+userId);
    });
  });

  describe('Update', () => {
    it('should update a User', async () => {
      const userId = '1';
      expect(
        await controller.update(userId, {
          firstName: 'Updated',
          lastName: 'User',
          isActive: false,
        }),
      ).toEqual({
        id: +userId,
        firstName: 'Updated',
        lastName: 'User',
        isActive: false,
      });
      expect(mockUserService.update).toHaveBeenCalledWith(+userId, {
        firstName: 'Updated',
        lastName: 'User',
        isActive: false,
      });
    });
  });

  describe('Remove', () => {
    it('should remove a User', async () => {
      const userId = '1';
      expect(await controller.remove(userId)).toEqual({
        id: +userId,
        deleted: true,
      });
      expect(mockUserService.remove).toHaveBeenCalledWith(+userId);
    });
  });
});
