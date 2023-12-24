import UnitOfWork from "../../src/application/uow";

export default class FakeUow implements UnitOfWork {
    async runInTransaction<R>(fn: (manager?: any) => Promise<R>): Promise<R> {
        return console.log('enter') as R
    }
}