import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Points } from '../entity/Points';
import { User } from '../entity/User';
import { CurrentUser } from '../CurrentUser';

@Controller()
export class PointsController {
    constructor(private entityManager: EntityManager, private currentUser: CurrentUser) {}

    @Query()
    points() {
        return this.entityManager
            .getRepository(Points)
            .createQueryBuilder('points')
            .innerJoin('points.user', 'user', 'user.id = :id', {
                id: this.currentUser.id,
            })
            .getMany();
    }

    @Query()
    pointsGet({ id }) {
        return this.entityManager.findOne(Points, id);
    }

    @Mutation()
    pointsSave(args) {
        if (this.currentUser) {
            const user = new User();
            user.id = this.currentUser.id;
            user.firstName = this.currentUser.firstName;
            user.lastName = this.currentUser.lastName;
            args.user = user;
        }
        const points = this.entityManager.create(Points, args);
        return this.entityManager.save(Points, points);
    }

    @Mutation()
    async pointsDelete({ id }) {
        await this.entityManager.remove(Points, { id });
        return true;
    }
}
