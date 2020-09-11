# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

Before all read README.md file

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the README.md or Wiki with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
3. You may merge the Pull Request in once you have the sign-off of two other developers, or if you 
   do not have permission to do that, you may request the second reviewer to merge it for you.

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

If you are a developer adding a new smoke test consider this

1. All test files must have at least 2 'describe' in depth
2. All test suits must have the name of the parent url of the group

```
describe(`${config.url}`, () => {
  describe('Check internal components status', () => {
    let resultApi;
    beforeAll(async () => {
      resultApi = await axios.get(config.url);
    });

    it('Internet connection', async () => {
      const {
        status,
        config: { url }
      } = resultApi;
      expect(status).toBe(200);
      expect(url).toBe(config.url);
    });

    it('Service connection', async () => {
      const {
        data: { service }
      } = resultApi;
      expect(service).toMatch('Wallet service is still running');
    });
    it('Database connection', async () => {
      const {
        data: { database }
      } = resultApi;

      expect(database).toBe(
        'Connection with Database has been established successfully.'
      );
    });
  });
});
```

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

