import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {

    private readonly users = [
        {
            userId: 1,
            username: 'admin',
            password: '112233',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}


// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { UserEntity } from './entities/user.entity';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(UserEntity)
//     private usersRepository: Repository<UserEntity>
//     ) {}
//   create(createUserDto: CreateUserDto) {
//     return 'This action adds a new user';
//   }

//   findAll() {
//     return `This action returns all user`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} user`;
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     return `This action updates a #${id} user`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }


//   async getUserById(id:string) {
//     return await this.usersRepository.find({where: {id: id}});
//   }
  
//   getUserByName(name: string): Promise<UserEntity> {
//     return this.usersRepository.findOne({ where: { name: name } });
// }

// }
