export default interface UnitOfWork {
  runInTransaction<R>(fn: (manager?: any) => Promise<R>): Promise<R>;
}