/* eslint-disable @typescript-eslint/no-unused-vars */
export class FakeCacheService {
  public async save(_key: string, _value: any) {
    //
  }

  public async recover(_key: string) {
    //
  }

  public async invalidade(_key: string) {
    //
  }

  async getKeysByPrefix(_prefix: string) {
    return [];
  }

  public async invalidadePrefix(_prefix: string) {
    //
  }
}
