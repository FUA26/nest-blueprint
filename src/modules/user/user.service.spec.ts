import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([]), // Mengubah userArray menjadi []
            findOne: jest.fn().mockResolvedValue({}), // Mengubah singleUser menjadi null
            save: jest.fn(),
            create: jest.fn().mockReturnValue({}), // Menambahkan mockReturnValue untuk create
            remove: jest.fn().mockReturnValue({}), // Menambahkan mockReturnValue untuk remove
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      };
      const newUser = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      };

      jest.spyOn(repository, 'create').mockReturnValue(newUser);
      jest.spyOn(repository, 'save').mockResolvedValue(newUser);

      const result = await service.create(createUserDto);

      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledWith(newUser);
      expect(result).toEqual(newUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          isActive: true,
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          isActive: true,
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(users); // Mengubah findOne menjadi find

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 1;
      const updateUserDto = {
        firstName: 'Updated',
      };
      const existingUser = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      };
      const updatedUser = {
        id: 1,
        firstName: 'Updated',
        lastName: 'Doe',
        isActive: true,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingUser);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedUser);

      const result = await service.update(userId, updateUserDto);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(repository.save).toHaveBeenCalledWith({
        ...existingUser,
        ...updateUserDto,
      });
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = 1;
      const user = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      jest.spyOn(repository, 'remove').mockResolvedValue(user);

      const result = await service.remove(userId);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(repository.remove).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = 1;
      const user = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(userId);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(result).toEqual(user);
    });
  });
});
