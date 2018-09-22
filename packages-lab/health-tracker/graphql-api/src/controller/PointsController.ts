import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Points } from '../entity/Points';

@Controller()
export class PointsController {
    constructor(private entityManager: EntityManager) {

    }

    @Query()
    points() {
        return this.entityManager.find(Points);
    }

    @Query()
    pointsGet({ id }) {
        return this.entityManager.findOne(Points, id);
    }

    @Mutation()
    pointsSave(args) {
        const points = this.entityManager.create(Points, args);
        return this.entityManager.save(Points, points);
    }

    @Mutation()
    async pointsDelete({ id }) {
        await this.entityManager.remove(Points, { id: id });
        return true;
    }
}