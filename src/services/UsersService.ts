import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {

    private usersRepository: Repository<User>;

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository);
    }
    
    async create(email: string){
        // verificar se usuário existe        
        const userExist = await this.usersRepository.findOne({ email });
        
        // se existir, retornar user        
        if (userExist) return userExist;

        const user = this.usersRepository.create({ email });

        await this.usersRepository.save(user);

        // se não exisitr, salvar no DB
        return user;
    }

    async findByEmail(email: string){
        const user = await this.usersRepository.findOne({ email });
        
        return user;
    }
}

export { UsersService };