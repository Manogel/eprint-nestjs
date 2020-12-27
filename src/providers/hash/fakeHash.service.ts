class fakeHashService {
  generateHash(text: string) {
    return text;
  }
  compareHash(payload: string, hashed: string) {
    return payload === hashed;
  }
}

export default fakeHashService;
