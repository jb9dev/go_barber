import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('CreateAppointment', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Mary Smith',
      email: 'marysmith@test.com',
      password: '654321',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Josh Both',
      email: 'joshboth@test.com',
      password: '456789',
    });

    const users = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(users).toEqual([user1, user2]);
  });
});
