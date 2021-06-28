import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "../entities/Compliment";

@EntityRepository(Compliment)
class ComplimentsRepository extends Repository<Compliment>{ }

export { ComplimentsRepository }
