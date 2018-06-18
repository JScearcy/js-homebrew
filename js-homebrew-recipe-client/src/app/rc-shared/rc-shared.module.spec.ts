import { RcSharedModule } from './rc-shared.module';

describe('RcSharedModule', () => {
  let rcSharedModule: RcSharedModule;

  beforeEach(() => {
    rcSharedModule = new RcSharedModule();
  });

  it('should create an instance', () => {
    expect(rcSharedModule).toBeTruthy();
  });
});
